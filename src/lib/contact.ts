// Contact form fields and validation. Used by the /contact form action.

export const requestTypes = ['Onderhoud', 'Reparatie of storing', 'Modernisering', 'Nieuwbouw', 'Anders'];

export const liftBrands = ['Weet ik niet', 'Otis', 'Kone', 'Thyssen', 'Schindler', 'Mitsubishi', 'Marktvrij of ander merk'];

const fields = ['naam', 'organisatie', 'email', 'telefoon', 'adres', 'merk', 'type', 'bericht'] as const;

export type ContactField = (typeof fields)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateContact(form: FormData) {
	const values = Object.fromEntries(
		fields.map((field) => [field, String(form.get(field) ?? '').trim()])
	) as ContactValues;

	const errors: ContactErrors = {};
	if (!values.naam) errors.naam = 'Vul uw naam in.';
	if (!values.email) errors.email = 'Vul uw e-mailadres in.';
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
		errors.email = 'Dit e-mailadres klopt niet. Controleer het nog eens.';
	if (!requestTypes.includes(values.type)) errors.type = 'Kies het type aanvraag.';
	if (!values.bericht) errors.bericht = 'Vertel kort waar uw vraag over gaat.';

	return { values, errors, ok: Object.keys(errors).length === 0 };
}
