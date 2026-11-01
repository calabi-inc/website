import { posts } from './blogPosts.js';

// The blog's index: every post with its slug, the published ones in date order, and a series' parts in order.
// A post is published once its date has arrived. The build applies the same rule (scripts/posts-data.js), so a post
// whose date is still ahead has no prerendered page, no sitemap entry and no card until the daily deploy on its date.
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

export const parseDate = (s) => {
    const m = /^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/.exec(String(s).trim());
    if (!m) return new Date(NaN);
    return new Date(Number(m[3]), MONTHS[m[1]], Number(m[2]));
};

export const isPublished = (post, now = new Date()) => parseDate(post.date) <= now;

export const allPosts = () => Object.entries(posts).map(([slug, p]) => ({ slug, ...p }));

export const publishedPosts = (now = new Date()) =>
    allPosts().filter((p) => isPublished(p, now)).sort((a, b) => parseDate(b.date) - parseDate(a.date));

// The listing: published posts newest first, a series collapsed to its latest published part. The rest of a series
// is reached through the series block on the blog page and the series navigation on a post page.
export const listingPosts = (now = new Date()) => {
    const seen = new Set();
    return publishedPosts(now).filter((p) => {
        if (!p.series) return true;
        if (seen.has(p.series.name)) return false;
        seen.add(p.series.name);
        return true;
    });
};

export const seriesOf = (name) =>
    allPosts().filter((p) => p.series && p.series.name === name).sort((a, b) => a.series.part - b.series.part);
