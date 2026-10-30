import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, writeFileSync } from 'fs'
import { latestStableVersion, fallbackVersion } from './scripts/release-version.js'

// The rtsm release the site shows comes from PyPI at build time (scripts/release-version.js). When PyPI cannot be
// reached, the committed fallback in src/data/release.js is used. RTSM_VERSION_OVERRIDE forces a value (checks, emergencies).
async function resolveRelease() {
    const fallback = fallbackVersion()
    if (process.env.RTSM_VERSION_OVERRIDE) return { version: process.env.RTSM_VERSION_OVERRIDE, source: 'override' }
    try {
        const version = await latestStableVersion()
        if (version) return { version, source: 'pypi' }
        console.warn(`[release] PyPI lists no stable release; using the fallback ${fallback}`)
    } catch (e) {
        console.warn(`[release] PyPI unreachable (${e.message}); using the fallback ${fallback}`)
    }
    return { version: fallback, source: 'fallback' }
}

// https://vitejs.dev/config/
export default defineConfig(async () => {
    const release = await resolveRelease()
    console.log(`[release] rtsm ${release.version} (${release.source})`)
    return {
        plugins: [
            react(),
            {
                // dist/release.json says what this build shows; the deploy workflow compares it with PyPI before rebuilding.
                name: 'release-json',
                apply: 'build',
                closeBundle() {
                    mkdirSync('dist', { recursive: true })
                    writeFileSync('dist/release.json', JSON.stringify({ rtsm: release.version, source: release.source, built_at: new Date().toISOString() }) + '\n')
                },
            },
        ],
        define: { __RTSM_VERSION__: JSON.stringify(release.version) },
        build: {
            outDir: 'dist',
        },
        base: '/',
    }
})
