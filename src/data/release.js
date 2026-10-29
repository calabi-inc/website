/* global __RTSM_VERSION__ */
// The current public rtsm release, shown on the home hero and the product page.
// At build time vite.config.js asks PyPI for the latest stable release and defines __RTSM_VERSION__ (scripts/release-version.js);
// FALLBACK is what the site shows when PyPI cannot be reached. Bumping it at a release is no longer required, only tidy.
const FALLBACK = '0.3.1';
export const RTSM_VERSION = typeof __RTSM_VERSION__ === 'string' ? __RTSM_VERSION__ : FALLBACK;
