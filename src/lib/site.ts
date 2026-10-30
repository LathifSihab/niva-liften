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

export type ServiceIconName = 'onderhoud' | 'reparatie' | 'modernisering' | 'nieuwbouw';

// Short texts follow the client's mockup ("Onze Diensten")
export const services: { title: string; text: string; href: string; icon: ServiceIconName }[] = [
	{
		title: 'Liftonderhoud',
		text: 'Regelmatig onderhoud voor een betrouwbare lift, voor alle merken.',
		href: '/diensten/liftonderhoud',
		icon: 'onderhoud'
	},
	{
		title: 'Liftreparatie',
		text: 'Snelle hulp bij storingen en defecten, 24/7 bereikbaar.',
		href: '/diensten/lift-reparatie',
		icon: 'reparatie'
	},
	{
		title: 'Liftmodernisering',
		text: 'Uw verouderde lift weer als nieuw, met marktvrije onderdelen.',
		href: '/diensten/liftmodernisering',
		icon: 'modernisering'
	},
	{
		title: 'Nieuwbouw',
		text: 'Nieuwe liftinstallaties op maat, van corporatielift tot homelift.',
		href: '/diensten/nieuwbouw',
		icon: 'nieuwbouw'
	}
];

export const nav = [
	{ label: 'Diensten', href: '/#diensten', children: services },
	{ label: 'Projecten', href: '/projecten' },
	{ label: 'Over ons', href: '/over-niva-liften' },
	{ label: 'Nieuws', href: '/nieuws' },
	{ label: 'Vacatures', href: '/vacatures' },
	{ label: 'Contact', href: '/contact' }
];

// "Waarom Nivå Liften?" from the client's mockup and Framework
export const reasons = [
	'Merkonafhankelijk',
	'Technische expertise',
	'Snelle service',
	'Eigen monteurs',
	'Maatwerk oplossingen',
	'Verantwoordelijk'
];

// "Waarom kiezen klanten voor Nivå?", Bedrijfspresentatie p.5
export const clientReasons = [
	'Korte lijnen',
	'Kennis van grote merken: Otis, Kone, Thyssen, Schindler en Mitsubishi',
	'Marktconforme prijzen',
	'Marktvrije producten',
	'Klantenportaal 24/7'
];

// Ontwikkeling Nivå, Bedrijfspresentatie p.3
export const growth = [
	{ label: 'Installaties in onderhoud', then: '2', now: '1.200' },
	{ label: 'Medewerkers in dienst', then: '1', now: '25' },
	{ label: 'Klanten', then: '2', now: '700+' }
];

// De Corporatielift type Mars, Bedrijfspresentatie p.9
export const marsSpecs = [
	{ label: 'Hefvermogen', value: '≤ 2.500 kg' },
	{ label: 'Snelheid', value: '≤ 1,60 m/s' },
	{ label: 'Hoogte', value: '≤ 45 meter' },
	{ label: 'Putdiepte', value: '≥ 400 mm' },
	{ label: 'Schachttop', value: '≥ 2.500 mm' }
];

export const stats = [
	{ figure: '2005', label: 'opgericht' },
	{ figure: '1.200', label: 'installaties in onderhoud' },
	{ figure: '700+', label: 'klanten' },
	{ figure: '25', label: 'medewerkers' }
];

export const brands = ['Otis', 'Kone', 'Thyssen', 'Schindler', 'Mitsubishi'];

// Toegepaste producten, Bedrijfspresentatie p.7 and p.10–12
export const parts = [
	{
		title: 'Besturing en regelaar',
		text: 'De besturing bepaalt hoe de lift rijdt en op oproepen reageert.',
		suppliers: ['KLST', 'Fuji Electric', 'NewLift']
	},
	{
		title: 'Machine',
		text: 'De aandrijving die de kooi beweegt.',
		suppliers: ['Ziehl-Abegg', 'Alberto Sassi']
	},
	{
		title: 'Deuren',
		text: 'Schachtdeuren en kooideuren, inclusief de deuraandrijving.',
		suppliers: ['Wittur', 'Meiller', 'Fermator']
	},
	{
		title: 'Drukknoptableaus',
		text: 'De bediening in de kooi en op de verdiepingen.',
		suppliers: ['Schaefer']
	}
];

export type Project = {
	name: string;
	location: string | null;
	category: 'Modernisering' | 'Nieuwbouw' | 'Onderhoud' | null;
	scope: string | null;
	photo: Photo;
	featured?: boolean;
};

// Projects 2024–2025, Bedrijfspresentatie p.6 (modernisering) and p.8 (nieuwbouw)
export const projects: Project[] = [
	{
		name: "VvE 's Gravenhof",
		location: 'Roermond',
		category: 'Modernisering',
		scope: 'Modernisering compleet',
		photo: photos.projectGravenhof,
		featured: true
	},
	{
		name: 'Student Hotel',
		location: 'Rotterdam, Den Haag en Maastricht',
		category: 'Modernisering',
		scope: '7× modernisering compleet',
		photo: photos.projectStudentHotel,
		featured: true
	},
	{
		name: 'Stadlander',
		location: 'Diverse locaties, Bergen op Zoom',
		category: 'Nieuwbouw',
		scope: '10 nieuwe corporatieliften',
		photo: photos.projectStadlander,
		featured: true
	},
	{
		name: 'Meander',
		location: 'Arnhem',
		category: 'Modernisering',
		scope: 'Modernisering besturing en buffers',
		photo: photos.projectMeander
	},
	{
		name: 'Eetvilla',
		location: 'Rosmalen',
		category: 'Nieuwbouw',
		scope: '1 nieuwe goederenlift',
		photo: photos.projectEetvilla
	},
	{
		name: 'Huisartsenpraktijk',
		location: 'Boxtel',
		category: 'Nieuwbouw',
		scope: '1 nieuwe homelift',
		photo: photos.projectHuisartsenpraktijk
	}
];

// Bedrijfspresentatie p.4
export const team = [
	{ name: 'Hasan Koç', role: 'Commercie, communicatie en marketing' },
	{ name: 'Mario Leijen', role: 'HR, finance en inkoop' },
	{ name: 'Ebad Hashemi', role: 'Operatie' }
];

// The company's own statement, Bedrijfspresentatie p.3
export const values = 'Wij staan voor deskundigheid, klantgerichtheid, betrouwbaarheid en professionaliteit.';

const dateFormat = new Intl.DateTimeFormat('nl-NL', {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

export function formatDate(iso: string) {
	return dateFormat.format(new Date(iso));
}
