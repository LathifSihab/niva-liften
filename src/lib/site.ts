// Site content. Every fact here comes from the client's presentation (see PROJECT_PLAN.md §7).
// `null` = not supplied yet; components render it as the visible placeholder.
import { photos, type Photo } from './photos.ts';

export const PLACEHOLDER = '[input volgt]';

export const contact = {
	phone: null as string | null,
	email: null as string | null,
	address: null as string | null,
	kvk: null as string | null
};

export const nav = [
	{ label: 'Diensten', href: '/#diensten' },
	{ label: 'Projecten', href: '/projecten' },
	{ label: 'Over ons', href: '/#over-niva' },
	{ label: 'Nieuws', href: '/nieuws' },
	{ label: 'Contact', href: '/contact' }
];

// Only Liftmodernisering has a page in the demo; the rest follow in phase 2.
export const services: { title: string; text: string; href?: string }[] = [
	{ title: 'Liftonderhoud', text: 'Periodiek onderhoud voor elk merk, ook marktvrije liften.' },
	{
		title: 'Reparatie & storingen',
		text: '24/7 bereikbaar bij storingen en opsluitingen. Met eigen monteurs.'
	},
	{
		title: 'Liftmodernisering',
		text: 'Besturing, machine, deuren of tableaus vernieuwen in plaats van de hele lift vervangen.',
		href: '/diensten/liftmodernisering'
	},
	{ title: 'Nieuwbouw', text: 'Nieuwe liftinstallaties, waaronder de corporatielift type Mars.' }
];

export const stats = [
	{ figure: '2005', label: 'opgericht' },
	{ figure: '1.200', label: 'installaties in onderhoud' },
	{ figure: '700+', label: 'klanten' },
	{ figure: '25', label: 'medewerkers' }
];

export const brands = ['Otis', 'Kone', 'Thyssen', 'Schindler', 'Mitsubishi'];

export const suppliers = [
	'KLST',
	'Fuji Electric',
	'NewLift',
	'Ziehl-Abegg',
	'Schaefer',
	'Wittur',
	'Meiller',
	'Fermator'
];

export type Project = {
	name: string;
	location: string | null;
	category: 'Modernisering' | 'Nieuwbouw' | 'Onderhoud' | null;
	scope: string | null;
	photo: Photo;
	featured?: boolean;
};

export const projects: Project[] = [
	{
		name: "VvE 's Gravenhof",
		location: 'Roermond',
		category: null,
		scope: null,
		photo: photos.projectGravenhof,
		featured: true
	},
	{
		name: 'Student Hotel',
		location: null,
		category: 'Modernisering',
		scope: '7× modernisering compleet',
		photo: photos.projectStudentHotel,
		featured: true
	},
	{
		name: 'Stadlander',
		location: 'Bergen op Zoom',
		category: 'Nieuwbouw',
		scope: '10 nieuwe liften',
		photo: photos.projectStadlander,
		featured: true
	},
	{
		name: 'Meander',
		location: 'Arnhem',
		category: null,
		scope: null,
		photo: photos.projectMeander
	},
	{
		name: 'Eetvilla',
		location: 'Rosmalen',
		category: null,
		scope: null,
		photo: photos.projectEetvilla
	},
	{
		name: 'Huisartsenpraktijk',
		location: 'Boxtel',
		category: null,
		scope: null,
		photo: photos.projectHuisartsenpraktijk
	}
];

export const team = ['Hasan Koç', 'Mario Leijen', 'Ebad Hashemi'];

const dateFormat = new Intl.DateTimeFormat('nl-NL', {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

export function formatDate(iso: string) {
	return dateFormat.format(new Date(iso));
}
