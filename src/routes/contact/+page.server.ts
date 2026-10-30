import { fail } from '@sveltejs/kit';
import { validateContact } from '#lib/contact.ts';
import type { Actions } from './$types';

// The form posts here, so this page runs on the worker instead of being prerendered.
export const prerender = false;

export const actions: Actions = {
	default: async ({ request }) => {
		const { values, errors, ok } = validateContact(await request.formData());
		if (!ok) return fail(400, { values, errors });

		// Demo: nothing is sent yet. Phase 2: e-mail the request to Nivå.
		return { sent: true };
	}
};
