// The current public rtsm release, read from PyPI: the thing the site claims ("on PyPI"). vite.config.js uses it at
// build time and the deploy workflow's check step runs it from the command line. Stable versions only: a pre-release
// (a, b, rc, dev) or a yanked release never reaches the page.
//   node scripts/release-version.js   prints the version, or exits 1 when PyPI cannot be reached
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PYPI_JSON = 'https://pypi.org/pypi/rtsm/json';
const STABLE = /^\d+(\.\d+)*$/;

export function compareVersions(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const d = (pa[i] ?? 0) - (pb[i] ?? 0);
        if (d) return d;
    }
    return 0;
}

// The highest stable version that still has at least one file that is not yanked, or null.
export function pickStable(releases) {
    const stable = Object.entries(releases || {})
        .filter(([version, files]) => STABLE.test(version) && Array.isArray(files) && files.some((f) => !f.yanked))
        .map(([version]) => version)
        .sort(compareVersions);
    return stable.length ? stable[stable.length - 1] : null;
}

export async function latestStableVersion({ timeoutMs = 8000 } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(PYPI_JSON, {
            signal: controller.signal,
            headers: { Accept: 'application/json', 'User-Agent': 'calabi.com build (release version check)' },
        });
        if (!res.ok) throw new Error(`PyPI answered ${res.status}`);
        const data = await res.json();
        return pickStable(data.releases);
    } finally {
        clearTimeout(timer);
    }
}

// The committed fallback: the FALLBACK literal in src/data/release.js.
export function fallbackVersion() {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const src = readFileSync(path.join(here, '..', 'src', 'data', 'release.js'), 'utf8');
    const m = src.match(/FALLBACK\s*=\s*'([^']+)'/);
    if (!m) throw new Error('src/data/release.js: no FALLBACK literal');
    return m[1];
}

const runAsScript = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (runAsScript) {
    latestStableVersion()
        .then((version) => {
            if (!version) {
                console.error('PyPI lists no stable rtsm release');
                process.exit(1);
            }
            console.log(version);
        })
        .catch((e) => {
            console.error(`PyPI unreachable: ${e.message}`);
            process.exit(1);
        });
}
