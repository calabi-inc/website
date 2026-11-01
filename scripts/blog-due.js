// Prints the slugs of the posts whose date has arrived, as a sorted JSON array. The deploy workflow compares it with
// the live site's /blog.json (written by generate-meta.js) and deploys when a scheduled post is due.
import { loadPosts, publishedSlugs } from './posts-data.js';

process.stdout.write(JSON.stringify(publishedSlugs(loadPosts())) + '\n');
