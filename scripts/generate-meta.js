import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const postsFile = path.join(rootDir, 'src', 'data', 'blogPosts.js');
const templateFile = path.join(distDir, 'index.html');

console.log('Generating meta tags for blog posts...');

if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory not found. Run npm run build first.');
    process.exit(1);
}

// Read blog posts data
let postsContent;
try {
    postsContent = fs.readFileSync(postsFile, 'utf-8');
} catch (e) {
    console.error(`Error reading blog posts file: ${postsFile}`, e);
    process.exit(1);
}

// Extract the object. regex to match "export const posts = { ... };"
// Note: we are looking for the object literal. 
// Uses [^] to match any character including newlines
const match = postsContent.match(/export const posts = (\{[^]*?\});/);

if (!match) {
    console.error('Error: Could not parse posts from blogPosts.js. Ensure it exports "posts" as a const object.');
    process.exit(1);
}

// Evaluate string to get object
let posts;
try {
    // Wrap in parens to make it an expression
    const evalCode = '(' + match[1] + ')';
    posts = eval(evalCode);
} catch (e) {
    console.error('Error evaluating posts object:', e);
    process.exit(1);
}

// Read template
let template;
try {
    template = fs.readFileSync(templateFile, 'utf-8');
} catch (e) {
    console.error(`Error reading template file: ${templateFile}`, e);
    process.exit(1);
}

// Helper to escape HTML attributes
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Helper to get excerpt (strip HTML)
function getExcerpt(htmlChunk) {
    // Simple regex to strip tags
    const text = htmlChunk.replace(/<[^>]+>/g, ' ');
    // Collapse whitespace
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length > 160) {
        return clean.substring(0, 157) + '...';
    }
    return clean;
}

// Loop through posts
let count = 0;
for (const [slug, post] of Object.entries(posts)) {
    console.log(`Processing: ${slug}`);

    const title = post.title + " | Calabi";
    const description = getExcerpt(post.content);
    // Use https domain for full url
    const image = post.image ? `https://www.calabi.com${post.image}` : "https://www.calabi.com/og/og-home.jpg";
    const url = `https://www.calabi.com/blog/${slug}`;

    let html = template;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);

    // Replace Meta Description
    // We use a regex that is flexible about attributes order, but assuming standard format is easier.
    // Index.html has <meta name="description" content="..." />
    html = html.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${escapeHtml(description)}"`);

    // Replace OG Tags
    html = html.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${escapeHtml(title)}"`);
    html = html.replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${escapeHtml(description)}"`);
    html = html.replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${url}"`);
    html = html.replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${image}"`);

    // Replace Twitter Tags
    html = html.replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${escapeHtml(title)}"`);
    html = html.replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${escapeHtml(description)}"`);
    html = html.replace(/<meta name="twitter:url" content=".*?"/, `<meta name="twitter:url" content="${url}"`);
    html = html.replace(/<meta name="twitter:image" content=".*?"/, `<meta name="twitter:image" content="${image}"`);

    // Ensure directory exists
    const postDir = path.join(distDir, 'blog', slug);
    if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
    }

    // Write index.html
    fs.writeFileSync(path.join(postDir, 'index.html'), html);
    count++;
}

console.log(`Generated meta tags for ${count} posts.`);
