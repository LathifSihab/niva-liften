// All editable site content, as the demo CMS sees it. Every fact comes from the client's
// presentation (PROJECT_PLAN.md §7); an empty string renders as the visible placeholder.
// Text fields accept **bold** and [links](/pad) (see inlineMarkdown in cms.ts).
// Pages read this through the `content` store (content.svelte.ts), never directly.
import { stripFrontmatter, type CmsPost } from './cms.ts';
import { posts } from './nieuws.ts';
import { photos } from './photos.ts';

export type PhotoKey = keyof typeof photos;
export type Link = { label: string; href: string };
export type Seo = { title: string; description: string };
export type Hero = { label: string; title: string; lead: string; photo: PhotoKey; button: Link };
export type Cta = { title: string; text: string; primary: Link; secondary: Link };
export type ProjectCategory = 'Modernisering' | 'Nieuwbouw' | 'Onderhoud';

export type Project = {
	name: string;
	location: string;
	category: ProjectCategory;
	scope: string;
	photo: PhotoKey;
	featured: boolean;
};

/** A contact-form submission, kept in the demo inbox (Berichten). */
export type Message = {
	id: string;
	received: string;
	read: boolean;
	values: Record<string, string>;
};

const contactCta = (title: string): Cta => ({
	title,
	text: '',
	primary: { label: 'Contact opnemen', href: '/contact' },
	secondary: { label: 'Offerte aanvragen', href: '/contact' }
});

const noButton: Link = { label: '', href: '' };

const pages = {
	home: {
		seo: {
			title: 'Nivå Liften | Liftonderhoud, reparatie en liftmodernisering',
			description:
				'Nivå Liften: liftonderhoud, lift reparatie en liftmodernisering voor alle merken. Sinds 2005, 1.200 installaties in onderhoud, 24/7 storingsdienst.'
		},
		hero: {
			title: 'Uw lift moet altijd blijven functioneren.',
			lead: 'Onderhoud, reparaties en modernisering van liften door Nivå Liften.',
			photo: 'liftDoorFront' as PhotoKey,
			primary: { label: 'Onderhoud aanvragen', href: '/contact?type=Onderhoud' },
			secondary: { label: 'Modernisering bespreken', href: '/diensten/liftmodernisering' }
		},
		services: { title: 'Onze **Diensten**' },
		// "Waarom Nivå Liften?" from the client's mockup and Framework
		reasons: {
			title: 'Waarom **Nivå Liften**?',
			items: [
				'Merkonafhankelijk',
				'Technische expertise',
				'Snelle service',
				'Eigen monteurs',
				'Maatwerk oplossingen',
				'Verantwoordelijk'
			],
			stats: [
				{ figure: '2005', label: 'opgericht' },
				{ figure: '1.200', label: 'installaties in onderhoud' },
				{ figure: '700+', label: 'klanten' },
				{ figure: '25', label: 'medewerkers' }
			]
		},
		modernisation: {
			title: 'Is uw lift verouderd?',
			text: 'Geef uw lift een tweede leven met modernisering. Veilig, comfortabel en toekomstbestendig, met marktvrije onderdelen.',
			figure: '60–70',
			figureLabel: 'moderniseringen per jaar',
			button: { label: 'Meer over modernisering', href: '/diensten/liftmodernisering' },
			photo: 'modernisedLifts' as PhotoKey
		},
		projects: {
			title: 'Recente **projecten**',
			button: { label: 'Alle projecten', href: '/projecten' }
		},
		news: {
			title: 'Laatste **nieuws**',
			button: { label: 'Alle berichten', href: '/nieuws' }
		},
		about: {
			title: 'Over **Nivå Liften**',
			text: "In 2005 begon Nivå Liften met één medewerker en twee installaties. Nu zorgen 25 medewerkers voor 1.200 installaties bij meer dan 700 klanten, VvE's en commerciële opdrachtgevers.",
			button: { label: 'Meer over Nivå', href: '/over-niva-liften' },
			teamLabel: 'Directie'
		},
		cta: contactCta('Heeft u een vraag over **uw lift**?')
	},

	liftonderhoud: {
		seo: {
			title: 'Liftonderhoud voor alle merken | Nivå Liften',
			description:
				"Liftonderhoud door Nivå Liften: periodiek onderhoud voor alle merken en marktvrije liften. Voor VvE's en commerciële opdrachtgevers. 1.200 installaties in onderhoud."
		},
		hero: {
			label: 'Diensten',
			title: 'Liftonderhoud',
			lead: 'Periodiek onderhoud voor alle fabricaten: Otis, Kone, Thyssen, Schindler, Mitsubishi en marktvrije liften. Nivå heeft 1.200 installaties in onderhoud.',
			photo: 'liftMotorRoom',
			button: { label: 'Onderhoud aanvragen', href: '/contact?type=Onderhoud' }
		} as Hero,
		intro: {
			title: "Onderhoud voor VvE's en commerciële opdrachtgevers",
			lead: "Een betrouwbare lift begint bij regelmatig onderhoud. Nivå onderhoudt liften voor VvE's, woningcorporaties en commerciële opdrachtgevers, met eigen monteurs en korte lijnen.",
			text: 'Als VvE-bestuur wilt u weten waar u aan toe bent. Via het klantenportaal heeft u 24/7 inzicht, en voor vragen belt u rechtstreeks met Nivå.',
			cardLabel: 'Wat u van ons krijgt',
			// Bedrijfspresentatie p.5 and p.15
			items: [
				'Eigen monteurs',
				'Alle fabricaten, ook marktvrij',
				'24/7 storingsdienst',
				'Klantenportaal 24/7',
				'Marktconforme prijzen'
			]
		},
		// IoT binnen Nivå, Bedrijfspresentatie p.13–14
		iot: {
			label: 'Vooruitblik',
			title: '24/7 verbonden',
			lead: 'Met de SafetyBlueBox-module is de liftcabine 24/7 verbonden met de cloud. De module meet vibraties, positie en rijgedrag. Monteurs zien zo vooraf waar de lift aandacht nodig heeft.',
			note: 'Inmiddels zijn vijf installaties uitgerust met de module.',
			itemsLabel: 'Wat het oplevert',
			items: [
				'Storingen voorkomen',
				'Efficiënt onderhoud plegen',
				'Opsluitingen op afstand verhelpen',
				'MJOB-strategie benutten',
				'Dashboard voor de klant'
			]
		},
		otherTitle: 'Andere **diensten**',
		cta: {
			title: 'Onderhoud voor **uw lift**?',
			text: '',
			primary: { label: 'Onderhoud aanvragen', href: '/contact?type=Onderhoud' },
			secondary: { label: 'Contact opnemen', href: '/contact' }
		}
	},

	liftReparatie: {
		seo: {
			title: 'Lift reparatie en storingen, 24/7 | Nivå Liften',
			description:
				'Lift reparatie door Nivå Liften: storingsdienst 24/7 bereikbaar, eigen monteurs, voor alle merken liften.'
		},
		hero: {
			label: 'Diensten',
			title: 'Liftreparatie en storingen',
			lead: 'Storing of opsluiting? Onze storingsdienst is 24/7 bereikbaar. Eigen monteurs, voor alle merken.',
			photo: 'liftMachine',
			button: { label: 'Reparatie aanvragen', href: '/contact?type=Reparatie%20of%20storing' }
		} as Hero,
		storingTitle: 'Bel direct onze 24/7 storingsdienst',
		help: {
			title: 'Snelle hulp bij storingen en defecten',
			lead: 'Een lift die stilstaat, raakt iedereen in het gebouw. Daarom is onze storingsdienst dag en nacht bereikbaar, en werken wij met eigen monteurs die alle grote merken kennen.',
			cardLabel: 'Daar kunt u op rekenen',
			items: ['24/7 bereikbaar', 'Eigen monteurs', 'Kennis van alle grote merken', 'Korte lijnen']
		},
		prevent: {
			title: 'Storingen voorkomen',
			text: 'Regelmatig [liftonderhoud](/diensten/liftonderhoud) voorkomt veel storingen. Met de SafetyBlueBox-module kan Nivå bovendien opsluitingen op afstand verhelpen: de lift wordt via de smartphone naar een andere verdieping gestuurd en de deuren gaan open.',
			note: 'Inmiddels zijn vijf installaties uitgerust met de module.'
		},
		otherTitle: 'Andere **diensten**',
		cta: {
			title: 'Is uw lift **defect**?',
			text: '',
			primary: { label: 'Reparatie aanvragen', href: '/contact?type=Reparatie%20of%20storing' },
			secondary: { label: 'Contact opnemen', href: '/contact' }
		}
	},

	liftmodernisering: {
		seo: {
			title: 'Liftmodernisering | Nivå Liften',
			description:
				'Liftmodernisering door Nivå Liften: besturing, machine, deuren en tableaus vernieuwen in plaats van de hele lift vervangen. 60–70 moderniseringen per jaar, voor elk merk.'
		},
		hero: {
			label: 'Diensten',
			title: 'Liftmodernisering',
			lead: 'Renoveren in plaats van vervangen. Nivå moderniseert 60 tot 70 liften per jaar, van alle merken.',
			photo: 'controllerCabinets',
			button: { label: 'Modernisering bespreken', href: '/contact?type=Modernisering' }
		} as Hero,
		intro: {
			title: 'Geef uw lift een tweede leven',
			lead: 'Een verouderde lift hoeft niet in zijn geheel te worden vervangen. Niet elk onderdeel veroudert even snel: wij vervangen wat nodig is en houden wat nog goed is.',
			text: 'Worden alle hoofdcomponenten vernieuwd, dan spreken wij van een complete modernisering. Zo moderniseerden wij zeven liften van Student Hotel volledig.',
			cardLabel: 'Marktvrije onderdelen',
			cardText:
				'Wij kiezen voor marktvrije componenten: onderdelen die elk liftbedrijf kan onderhouden. Zo zit u na de modernisering niet vast aan één merk of leverancier.'
		},
		// Toegepaste producten, Bedrijfspresentatie p.7 and p.10–12
		parts: {
			title: 'Wat wij **vernieuwen**',
			items: [
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
			]
		},
		projectsTitle: 'Modernisering **projecten**',
		otherTitle: 'Andere **diensten**',
		cta: {
			title: 'Is uw lift **verouderd**?',
			text: '',
			primary: { label: 'Modernisering bespreken', href: '/contact?type=Modernisering' },
			secondary: { label: 'Offerte aanvragen', href: '/contact?type=Modernisering' }
		}
	},

	nieuwbouw: {
		seo: {
			title: 'Nieuwbouw liften en de corporatielift | Nivå Liften',
			description:
				'Nieuwe liftinstallaties door Nivå Liften: corporatieliften type Mars, goederenliften en homeliften.'
		},
		hero: {
			label: 'Diensten',
			title: 'Nieuwbouw',
			lead: 'Nieuwe liftinstallaties op maat: van corporatielift tot goederenlift en homelift.',
			photo: 'liftInstallation',
			button: { label: 'Offerte aanvragen', href: '/contact?type=Nieuwbouw' }
		} as Hero,
		// De Corporatielift type Mars, Bedrijfspresentatie p.9
		mars: {
			label: 'Voor woningcorporaties',
			title: 'De corporatielift type Mars',
			lead: 'Voor woningcorporaties installeert Nivå de corporatielift type Mars. Zo plaatsten wij tien nieuwe corporatieliften op diverse locaties in Bergen op Zoom.',
			specsLabel: 'Specificaties',
			specs: [
				{ label: 'Hefvermogen', value: '≤ 2.500 kg' },
				{ label: 'Snelheid', value: '≤ 1,60 m/s' },
				{ label: 'Hoogte', value: '≤ 45 meter' },
				{ label: 'Putdiepte', value: '≥ 400 mm' },
				{ label: 'Schachttop', value: '≥ 2.500 mm' }
			]
		},
		projectsTitle: 'Nieuwbouw **projecten**',
		otherTitle: 'Andere **diensten**',
		cta: {
			title: 'Een nieuwe lift **plannen**?',
			text: '',
			primary: { label: 'Offerte aanvragen', href: '/contact?type=Nieuwbouw' },
			secondary: { label: 'Contact opnemen', href: '/contact' }
		}
	},

	projecten: {
		seo: {
			title: 'Projecten | Nivå Liften',
			description:
				"Projecten van Nivå Liften 2024–2025: liftmodernisering en nieuwbouw voor VvE's, woningcorporaties en bedrijven."
		},
		hero: {
			label: 'Projecten',
			title: 'Onze projecten 2024 – 2025',
			lead: "Een greep uit ons werk voor VvE's, woningcorporaties en bedrijven.",
			photo: 'projectStadlander',
			button: noButton
		} as Hero,
		cta: contactCta('Een project **bespreken**?')
	},

	over: {
		seo: {
			title: 'Over Nivå Liften | Lift onderhoud bedrijf sinds 2005',
			description:
				'Nivå Liften is sinds 2005 een lift onderhoud bedrijf voor service, modernisering, reparatie en nieuwbouw. 25 medewerkers, 1.200 installaties, meer dan 700 klanten.'
		},
		hero: {
			label: 'Over ons',
			title: 'Over Nivå Liften',
			lead: "Service, modernisering, reparatie en nieuwbouw van liften. Sinds 2005, voor VvE's en commerciële opdrachtgevers.",
			photo: 'projectGravenhof',
			button: noButton
		} as Hero,
		// Ontwikkeling Nivå, Bedrijfspresentatie p.3
		growth: {
			title: 'Van 2005 tot **nu**',
			items: [
				{ label: 'Installaties in onderhoud', then: '2', now: '1.200' },
				{ label: 'Medewerkers in dienst', then: '1', now: '25' },
				{ label: 'Klanten', then: '2', now: '700+' }
			]
		},
		// "Waarom kiezen klanten voor Nivå?", Bedrijfspresentatie p.5
		reasons: {
			title: 'Waarom kiezen klanten voor **Nivå**?',
			items: [
				'Korte lijnen',
				'Kennis van grote merken: Otis, Kone, Thyssen, Schindler en Mitsubishi',
				'Marktconforme prijzen',
				'Marktvrije producten',
				'Klantenportaal 24/7'
			]
		},
		teamTitle: '**Directie**',
		story: { title: 'Ons verhaal', text: '' },
		cta: contactCta('Kennismaken met **Nivå**?')
	},

	nieuws: {
		seo: {
			title: 'Nieuws | Nivå Liften',
			description: 'Nieuws en advies over liftonderhoud en liftmodernisering van Nivå Liften.'
		},
		hero: {
			label: 'Nieuws',
			title: 'Nieuws en advies',
			lead: 'Nieuws van Nivå en praktisch advies over onderhoud en modernisering van uw lift.',
			photo: 'modernisedLifts',
			button: noButton
		} satisfies Hero
	},

	vacatures: {
		seo: {
			title: 'Vacatures | Werken bij Nivå Liften',
			description:
				'Werken bij Nivå Liften: liftonderhoud, reparatie en modernisering met eigen monteurs. Bekijk de vacatures of stuur een open sollicitatie.'
		},
		hero: {
			label: 'Vacatures',
			title: 'Werken bij Nivå Liften',
			lead: 'Nivå werkt met eigen monteurs aan liften van alle merken.',
			photo: 'liftInstallation',
			button: noButton
		} as Hero,
		openings: { title: 'Openstaande vacatures', text: '' },
		// Facts from the Bedrijfspresentatie (p.3, p.15)
		facts: {
			label: 'Werken bij Nivå',
			items: [
				'Eigen monteurs',
				'Alle fabricaten, van Otis tot marktvrij',
				'25 collega’s, 1.200 installaties in onderhoud',
				'60–70 moderniseringen per jaar'
			]
		},
		cta: {
			title: 'Interesse in **Nivå**?',
			text: 'Staat uw functie er niet bij? Stuur ons een open sollicitatie.',
			primary: { label: 'Open sollicitatie', href: '/contact' },
			secondary: { label: 'Contact opnemen', href: '/contact' }
		}
	},

	contact: {
		seo: {
			title: 'Contact en onderhoud aanvragen | Nivå Liften',
			description:
				'Neem contact op met Nivå Liften voor liftonderhoud, reparatie of liftmodernisering. Storing? Wij zijn 24/7 bereikbaar.'
		},
		hero: {
			label: 'Contact',
			title: 'Onderhoud aanvragen of een vraag stellen',
			lead: 'Vul het formulier in, dan nemen wij contact met u op. Storing? Bel direct onze 24/7 storingsdienst.',
			photo: 'liftDoors',
			button: noButton
		} as Hero,
		storing: {
			title: 'Storing of opsluiting?',
			text: 'Bel onze 24/7 storingsdienst. Wij zijn dag en nacht bereikbaar.'
		},
		sent: {
			title: 'Bedankt voor uw bericht.',
			text: 'Dit is een demo: uw bericht is nog niet verzonden.'
		}
	}
};

export type ServiceIconName = 'onderhoud' | 'reparatie' | 'modernisering' | 'nieuwbouw';

const settings = {
	contact: { phone: '', email: '', address: '', kvk: '' },
	tagline: 'Merkonafhankelijk liftonderhoud sinds 2005',
	footerStoring: 'Storing of opsluiting? Wij zijn dag en nacht bereikbaar.',
	// The company's own statement, Bedrijfspresentatie p.3
	values: 'Wij staan voor deskundigheid, klantgerichtheid, betrouwbaarheid en professionaliteit.',
	// The item linking to /#diensten gets the services as its dropdown
	nav: [
		{ label: 'Diensten', href: '/#diensten' },
		{ label: 'Projecten', href: '/projecten' },
		{ label: 'Over ons', href: '/over-niva-liften' },
		{ label: 'Nieuws', href: '/nieuws' },
		{ label: 'Vacatures', href: '/vacatures' },
		{ label: 'Contact', href: '/contact' }
	],
	// Short texts follow the client's mockup ("Onze Diensten"). One per service page, so the
	// CMS edits title and text only.
	services: [
		{
			title: 'Liftonderhoud',
			text: 'Regelmatig onderhoud voor een betrouwbare lift, voor alle merken.',
			href: '/diensten/liftonderhoud',
			icon: 'onderhoud' as ServiceIconName
		},
		{
			title: 'Liftreparatie',
			text: 'Snelle hulp bij storingen en defecten, 24/7 bereikbaar.',
			href: '/diensten/lift-reparatie',
			icon: 'reparatie' as ServiceIconName
		},
		{
			title: 'Liftmodernisering',
			text: 'Uw verouderde lift weer als nieuw, met marktvrije onderdelen.',
			href: '/diensten/liftmodernisering',
			icon: 'modernisering' as ServiceIconName
		},
		{
			title: 'Nieuwbouw',
			text: 'Nieuwe liftinstallaties op maat, van corporatielift tot homelift.',
			href: '/diensten/nieuwbouw',
			icon: 'nieuwbouw' as ServiceIconName
		}
	],
	// Bedrijfspresentatie p.4
	team: [
		{ name: 'Hasan Koç', role: 'Commercie, communicatie en marketing' },
		{ name: 'Mario Leijen', role: 'HR, finance en inkoop' },
		{ name: 'Ebad Hashemi', role: 'Operatie' }
	]
};

// Projects 2024–2025, Bedrijfspresentatie p.6 (modernisering) and p.8 (nieuwbouw)
const projects: Project[] = [
	{
		name: "VvE 's Gravenhof",
		location: 'Roermond',
		category: 'Modernisering',
		scope: 'Modernisering compleet',
		photo: 'projectGravenhof',
		featured: true
	},
	{
		name: 'Student Hotel',
		location: 'Rotterdam, Den Haag en Maastricht',
		category: 'Modernisering',
		scope: '7× modernisering compleet',
		photo: 'projectStudentHotel',
		featured: true
	},
	{
		name: 'Stadlander',
		location: 'Diverse locaties, Bergen op Zoom',
		category: 'Nieuwbouw',
		scope: '10 nieuwe corporatieliften',
		photo: 'projectStadlander',
		featured: true
	},
	{
		name: 'Meander',
		location: 'Arnhem',
		category: 'Modernisering',
		scope: 'Modernisering besturing en buffers',
		photo: 'projectMeander',
		featured: false
	},
	{
		name: 'Eetvilla',
		location: 'Rosmalen',
		category: 'Nieuwbouw',
		scope: '1 nieuwe goederenlift',
		photo: 'projectEetvilla',
		featured: false
	},
	{
		name: 'Huisartsenpraktijk',
		location: 'Boxtel',
		category: 'Nieuwbouw',
		scope: '1 nieuwe homelift',
		photo: 'projectHuisartsenpraktijk',
		featured: false
	}
];

const files = import.meta.glob<string>('/src/content/nieuws/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

/** The posts as they are in src/content/nieuws. */
export const seedPosts: CmsPost[] = posts.map(({ slug, title, date, category, excerpt, photo }) => ({
	slug,
	title,
	date,
	category,
	excerpt,
	image: Object.keys(photos).find((key) => photos[key as PhotoKey] === photo) ?? '',
	body: stripFrontmatter(files[`/src/content/nieuws/${slug}.md`]),
	status: 'gepubliceerd'
}));

export const defaults = {
	pages,
	settings,
	projects,
	posts: seedPosts,
	/** Alt text edited in Afbeeldingen, by photo key. Empty: the alt text from photos.ts. */
	photoAlts: {} as Partial<Record<PhotoKey, string>>,
	inbox: [] as Message[],
	/** When each part was last saved in the CMS, for "Recent bewerkt". */
	updated: {} as Record<string, string>
};

export type Content = typeof defaults;
export type PageId = keyof Content['pages'];
