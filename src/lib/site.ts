// Site-wide helpers. The content itself lives in content.ts and is read through the content store.

export const PLACEHOLDER = '[input volgt]';

const dateFormat = new Intl.DateTimeFormat('nl-NL', {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

export function formatDate(iso: string) {
	return dateFormat.format(new Date(iso));
}
