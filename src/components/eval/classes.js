// The attribution classes of a sighting, in the report's order and colours, shared by the panel's components.
export const CLASSES = [
    { key: 'reobserved', label: 're-observed', color: '#10b981' },
    { key: 'split', label: 'split into a new id', color: '#6366f1' },
    { key: 'merged', label: 'merged into a neighbour', color: '#a855f7' },
    { key: 'no_3d', label: 'no 3D centroid', color: '#f59e0b' },
    { key: 'filtered', label: 'detected, then filtered', color: '#f97316' },
    { key: 'no_detection', label: 'no detection near it', color: '#ef4444' },
    { key: 'hidden', label: 'likely hidden (excluded)', color: '#52525b' },
];

export const CLASS_BY_LABEL = Object.fromEntries(CLASSES.map((c) => [c.label.replace(' (excluded)', ''), c]));

export const fmtPct = (v, digits = 1) => (v == null ? '–' : `${Number(v).toFixed(digits)} %`);
export const fmtInt = (v) => (v == null ? '–' : Number(v).toLocaleString('en-US').replace(/,/g, ' '));
export const fmtSigned = (v, unit) => {
    if (v == null) return '–';
    const n = Number(v);
    const sign = n > 0 ? '+' : '';
    if (unit === 'pp') return `${sign}${n.toFixed(1)} pp`;
    if (unit === 'm') return `${sign}${n.toFixed(3)} m`;
    if (unit === 'ms') return `${sign}${n.toFixed(1)} ms`;
    return `${sign}${n.toFixed(1)}`;
};
export const fmtVal = (v, unit) => {
    if (v == null) return '–';
    const n = Number(v);
    if (unit === 'pp') return `${n.toFixed(1)} %`;
    if (unit === 'm') return `${n.toFixed(3)} m`;
    if (unit === 'ms') return `${n.toFixed(1)} ms`;
    return `${n.toFixed(1)}`;
};
