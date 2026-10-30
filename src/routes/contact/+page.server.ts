import { fail } from '@sveltejs/kit';
import { requestTypes, validateContact } from '#lib/contact.ts';
import type { Actions, PageServerLoad } from './$types';

// The form posts here, so this page runs on the worker instead of being prerendered.
export const prerender = false;

// CTA links preselect the request type: /contact?type=Onderhoud
export const load: PageServerLoad = ({ url }) => {
	const type = url.searchParams.get('type') ?? '';
	return { type: requestTypes.includes(type) ? type : '' };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { values, errors, ok } = validateContact(await request.formData());
		if (!ok) return fail(400, { values, errors });

		// Demo: nothing is sent yet. Phase 2: e-mail the request to Nivå.
		return { sent: true };
	}
};
