// The blog posts as the build sees them: src/data/blogPosts.js read and evaluated (the file is plain data, template
// literals included), and the publication rule shared with the site (src/data/blogIndex.js): a post is published once
// its date has arrived. generate-meta.js uses this to prerender, list and sitemap only published posts; blog-due.js
// prints the published slugs so the deploy workflow can tell when a scheduled post is due.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsFile = path.join(path.resolve(__dirname, '..'), 'src', 'data', 'blogPosts.js');

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

export function parseDate(s) {
    const m = /^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/.exec(String(s).trim());
    if (!m) return new Date(NaN);
    return new Date(Number(m[3]), MONTHS[m[1]], Number(m[2]));
}

export function loadPosts() {
    const content = fs.readFileSync(postsFile, 'utf-8');
    // The object literal after "export const posts = "; [^] matches newlines too.
    const match = content.match(/export const posts = (\{[^]*?\});/);
    if (!match) throw new Error('Could not parse posts from blogPosts.js. Ensure it exports "posts" as a const object.');
    return eval('(' + match[1] + ')');
}

export function publishedPosts(posts, now = new Date()) {
    const out = {};
    for (const [slug, post] of Object.entries(posts)) {
        const d = parseDate(post.date);
        if (Number.isNaN(d.getTime())) throw new Error(`post ${slug}: date "${post.date}" is not "Mon D, YYYY"`);
        if (d <= now) out[slug] = post;
    }
    return out;
}

export const publishedSlugs = (posts, now = new Date()) => Object.keys(publishedPosts(posts, now)).sort();
