import { error } from '@sveltejs/kit';
import { pageSchemas } from '#lib/cms-schema.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => pageSchemas.map(({ id }) => ({ id }));

export const load: PageLoad = ({ params }) => {
	const schema = pageSchemas.find(({ id }) => id === params.id);
	if (!schema) error(404, 'Pagina niet gevonden');
	return { schema };
};
