import { error } from '@sveltejs/kit';
import { posts } from '#lib/nieuws.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => posts.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const post = posts.find(({ slug }) => slug === params.slug);
	if (!post) error(404, 'Bericht niet gevonden');
	return { post };
};
