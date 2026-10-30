import { posts } from '#lib/nieuws.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => posts.map(({ slug }) => ({ slug }));

// The page reads the post from the content store, so a post made or renamed in the demo CMS
// still opens when clicked through to. `original` is the compiled Markdown, if the post has one.
export const load: PageLoad = ({ params }) => ({
	slug: params.slug,
	original: posts.find(({ slug }) => slug === params.slug)?.content
});
