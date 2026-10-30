// What the demo CMS lets you edit, per page: sections of fields over the content in content.ts.
// The editor (ContentEditor + Fields) is built from this, so a new field is one line here.
import type { Content, PageId } from './content.ts';

export type Field =
	| {
			kind: 'text' | 'textarea';
			key: string;
			label: string;
			hint?: string;
			/** Counter for SEO fields */
			max?: number;
			/** Empty is fine; otherwise an empty field is listed under "Nog in te vullen" */
			optional?: boolean;
	  }
	| { kind: 'photo' | 'checkbox'; key: string; label: string; hint?: string }
	| { kind: 'link'; key: string; label: string; hint?: string; optional?: boolean }
	| { kind: 'select'; key: string; label: string; options: string[] }
	| { kind: 'list'; key: string; label: string; noun: string; hint?: string }
	| {
			kind: 'rows';
			key: string;
			label: string;
			noun: string;
			fields: Field[];
			/** Field shown as the row's title */
			summary: string;
			/** Rows can be edited but not added, removed or moved */
			fixed?: boolean;
			hint?: string;
	  };

/** A card in the editor. With `key`, its fields edit that sub-object. */
export type Section = { title: string; key?: string; hint?: string; fields: Field[] };

export type PageSchema = {
	id: PageId;
	title: string;
	path: string;
	group: 'Algemeen' | 'Diensten';
	sections: Section[];
};

const seo: Section = {
	title: 'Vindbaarheid in Google',
	key: 'seo',
	fields: [
		{ kind: 'text', key: 'title', label: 'Paginatitel', max: 60, hint: 'Staat in het tabblad en als titel in Google.' },
		{ kind: 'textarea', key: 'description', label: 'Omschrijving', max: 160, hint: 'De tekst onder de titel in Google.' }
	]
};

const hero: Section = {
	title: 'Bovenaan de pagina',
	key: 'hero',
	fields: [
		{ kind: 'text', key: 'label', label: 'Label boven de titel' },
		{ kind: 'text', key: 'title', label: 'Titel' },
		{ kind: 'textarea', key: 'lead', label: 'Introductie' },
		{ kind: 'photo', key: 'photo', label: 'Foto' },
		{ kind: 'link', key: 'button', label: 'Knop', optional: true, hint: 'Laat de tekst leeg voor geen knop.' }
	]
};

const cta: Section = {
	title: 'Contactblok onderaan',
	key: 'cta',
	fields: [
		{ kind: 'text', key: 'title', label: 'Titel' },
		{ kind: 'textarea', key: 'text', label: 'Tekst', optional: true },
		{ kind: 'link', key: 'primary', label: 'Eerste knop' },
		{ kind: 'link', key: 'secondary', label: 'Tweede knop' }
	]
};

const otherServices: Section = {
	title: 'Andere diensten',
	hint: 'De dienstkaarten zelf pas je aan onder Instellingen.',
	fields: [{ kind: 'text', key: 'otherTitle', label: 'Titel' }]
};

const checks = (label: string): Field => ({ kind: 'list', key: 'items', label, noun: 'punt' });

export const pageSchemas: PageSchema[] = [
	{
		id: 'home',
		title: 'Home',
		path: '/',
		group: 'Algemeen',
		sections: [
			{
				title: 'Bovenaan de pagina',
				key: 'hero',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'lead', label: 'Introductie' },
					{ kind: 'photo', key: 'photo', label: 'Foto' },
					{ kind: 'link', key: 'primary', label: 'Eerste knop' },
					{ kind: 'link', key: 'secondary', label: 'Tweede knop' }
				]
			},
			{
				title: 'Onze diensten',
				key: 'services',
				hint: 'De vier dienstkaarten pas je aan onder Instellingen.',
				fields: [{ kind: 'text', key: 'title', label: 'Titel' }]
			},
			{
				title: 'Waarom Nivå',
				key: 'reasons',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					checks('Punten met vinkje'),
					{
						kind: 'rows',
						key: 'stats',
						label: 'Kerncijfers',
						noun: 'cijfer',
						summary: 'figure',
						fields: [
							{ kind: 'text', key: 'figure', label: 'Cijfer' },
							{ kind: 'text', key: 'label', label: 'Omschrijving' }
						]
					}
				]
			},
			{
				title: 'Modernisering',
				key: 'modernisation',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' },
					{ kind: 'text', key: 'figure', label: 'Cijfer' },
					{ kind: 'text', key: 'figureLabel', label: 'Bij het cijfer' },
					{ kind: 'link', key: 'button', label: 'Knop' },
					{ kind: 'photo', key: 'photo', label: 'Foto' }
				]
			},
			{
				title: 'Recente projecten',
				key: 'projects',
				hint: 'Welke projecten hier staan, kies je onder Projecten ("Op de homepage").',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'link', key: 'button', label: 'Knop' }
				]
			},
			{
				title: 'Laatste nieuws',
				key: 'news',
				hint: 'Hier staan vanzelf de drie nieuwste berichten.',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'link', key: 'button', label: 'Knop' }
				]
			},
			{
				title: 'Over Nivå',
				key: 'about',
				hint: 'Het citaat en de directie pas je aan onder Instellingen.',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' },
					{ kind: 'link', key: 'button', label: 'Knop' },
					{ kind: 'text', key: 'teamLabel', label: 'Kop boven de directie' }
				]
			},
			cta,
			seo
		]
	},
	{
		id: 'liftonderhoud',
		title: 'Liftonderhoud',
		path: '/diensten/liftonderhoud',
		group: 'Diensten',
		sections: [
			hero,
			{
				title: 'Introductie',
				key: 'intro',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'lead', label: 'Introductie' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' },
					{ kind: 'text', key: 'cardLabel', label: 'Kop van de kaart' },
					checks('Punten in de kaart')
				]
			},
			{
				title: 'Vooruitblik: 24/7 verbonden',
				key: 'iot',
				fields: [
					{ kind: 'text', key: 'label', label: 'Label' },
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'lead', label: 'Tekst' },
					{ kind: 'text', key: 'note', label: 'Opmerking' },
					{ kind: 'text', key: 'itemsLabel', label: 'Kop boven de punten' },
					checks('Punten')
				]
			},
			otherServices,
			cta,
			seo
		]
	},
	{
		id: 'liftReparatie',
		title: 'Liftreparatie',
		path: '/diensten/lift-reparatie',
		group: 'Diensten',
		sections: [
			hero,
			{
				title: 'Storingsdienst',
				hint: 'Het telefoonnummer pas je aan onder Instellingen.',
				fields: [{ kind: 'text', key: 'storingTitle', label: 'Titel' }]
			},
			{
				title: 'Snelle hulp',
				key: 'help',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'lead', label: 'Tekst' },
					{ kind: 'text', key: 'cardLabel', label: 'Kop van de kaart' },
					checks('Punten in de kaart')
				]
			},
			{
				title: 'Storingen voorkomen',
				key: 'prevent',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' },
					{ kind: 'text', key: 'note', label: 'Opmerking' }
				]
			},
			otherServices,
			cta,
			seo
		]
	},
	{
		id: 'liftmodernisering',
		title: 'Liftmodernisering',
		path: '/diensten/liftmodernisering',
		group: 'Diensten',
		sections: [
			hero,
			{
				title: 'Introductie',
				key: 'intro',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'lead', label: 'Introductie' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' },
					{ kind: 'text', key: 'cardLabel', label: 'Kop van de kaart' },
					{ kind: 'textarea', key: 'cardText', label: 'Tekst in de kaart' }
				]
			},
			{
				title: 'Wat wij vernieuwen',
				key: 'parts',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{
						kind: 'rows',
						key: 'items',
						label: 'Onderdelen',
						noun: 'onderdeel',
						summary: 'title',
						fields: [
							{ kind: 'text', key: 'title', label: 'Naam' },
							{ kind: 'textarea', key: 'text', label: 'Omschrijving' },
							{ kind: 'list', key: 'suppliers', label: 'Leveranciers', noun: 'leverancier' }
						]
					}
				]
			},
			{
				title: 'Projecten',
				hint: 'Hier staan vanzelf de projecten met categorie Modernisering.',
				fields: [{ kind: 'text', key: 'projectsTitle', label: 'Titel' }]
			},
			otherServices,
			cta,
			seo
		]
	},
	{
		id: 'nieuwbouw',
		title: 'Nieuwbouw',
		path: '/diensten/nieuwbouw',
		group: 'Diensten',
		sections: [
			hero,
			{
				title: 'Corporatielift type Mars',
				key: 'mars',
				fields: [
					{ kind: 'text', key: 'label', label: 'Label' },
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'lead', label: 'Tekst' },
					{ kind: 'text', key: 'specsLabel', label: 'Kop van de kaart' },
					{
						kind: 'rows',
						key: 'specs',
						label: 'Specificaties',
						noun: 'specificatie',
						summary: 'label',
						fields: [
							{ kind: 'text', key: 'label', label: 'Naam' },
							{ kind: 'text', key: 'value', label: 'Waarde' }
						]
					}
				]
			},
			{
				title: 'Projecten',
				hint: 'Hier staan vanzelf de projecten met categorie Nieuwbouw.',
				fields: [{ kind: 'text', key: 'projectsTitle', label: 'Titel' }]
			},
			otherServices,
			cta,
			seo
		]
	},
	{
		id: 'projecten',
		title: 'Projecten',
		path: '/projecten',
		group: 'Algemeen',
		sections: [
			{ ...hero, hint: 'De projecten zelf pas je aan onder Projecten.' },
			cta,
			seo
		]
	},
	{
		id: 'over',
		title: 'Over Nivå',
		path: '/over-niva-liften',
		group: 'Algemeen',
		sections: [
			hero,
			{
				title: 'Van 2005 tot nu',
				key: 'growth',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{
						kind: 'rows',
						key: 'items',
						label: 'Cijfers',
						noun: 'cijfer',
						summary: 'label',
						fields: [
							{ kind: 'text', key: 'label', label: 'Omschrijving' },
							{ kind: 'text', key: 'now', label: 'Nu' },
							{ kind: 'text', key: 'then', label: 'In 2005' }
						]
					}
				]
			},
			{
				title: 'Waarom kiezen klanten voor Nivå',
				key: 'reasons',
				fields: [{ kind: 'text', key: 'title', label: 'Titel' }, checks('Punten met vinkje')]
			},
			{
				title: 'Directie',
				hint: 'De namen en functies pas je aan onder Instellingen.',
				fields: [{ kind: 'text', key: 'teamTitle', label: 'Titel' }]
			},
			{
				title: 'Ons verhaal',
				key: 'story',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' }
				]
			},
			cta,
			seo
		]
	},
	{
		id: 'nieuws',
		title: 'Nieuws',
		path: '/nieuws',
		group: 'Algemeen',
		sections: [{ ...hero, hint: 'De berichten zelf pas je aan onder Nieuws.' }, seo]
	},
	{
		id: 'vacatures',
		title: 'Vacatures',
		path: '/vacatures',
		group: 'Algemeen',
		sections: [
			hero,
			{
				title: 'Openstaande vacatures',
				key: 'openings',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' }
				]
			},
			{
				title: 'Werken bij Nivå',
				key: 'facts',
				fields: [{ kind: 'text', key: 'label', label: 'Kop van de kaart' }, checks('Punten in de kaart')]
			},
			cta,
			seo
		]
	},
	{
		id: 'contact',
		title: 'Contact',
		path: '/contact',
		group: 'Algemeen',
		sections: [
			{ ...hero, hint: 'Telefoon, e-mail, adres en KvK pas je aan onder Instellingen.' },
			{
				title: 'Storingsdienst',
				key: 'storing',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' }
				]
			},
			{
				title: 'Na het versturen',
				key: 'sent',
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'text', label: 'Tekst' }
				]
			},
			seo
		]
	}
];

export const settingsSections: Section[] = [
	{
		title: 'Bedrijfsgegevens',
		key: 'contact',
		hint: 'Staan in de kop, de voettekst en op de contactpagina.',
		fields: [
			{ kind: 'text', key: 'phone', label: 'Telefoon (24/7 storingsdienst)' },
			{ kind: 'text', key: 'email', label: 'E-mailadres' },
			{ kind: 'text', key: 'address', label: 'Adres' },
			{ kind: 'text', key: 'kvk', label: 'KvK-nummer' }
		]
	},
	{
		title: 'Teksten op elke pagina',
		fields: [
			{ kind: 'text', key: 'tagline', label: 'Balk bovenaan', hint: 'Links in de donkere balk boven het menu.' },
			{ kind: 'text', key: 'footerStoring', label: 'Storingsdienst in de voettekst' },
			{ kind: 'textarea', key: 'values', label: 'Waar wij voor staan', hint: 'Het citaat op de homepage en Over Nivå.' }
		]
	},
	{
		title: 'Hoofdmenu',
		fields: [
			{
				kind: 'rows',
				key: 'nav',
				label: 'Menu-items',
				noun: 'menu-item',
				summary: 'label',
				hint: 'Het item met link /#diensten klapt de vier diensten uit.',
				fields: [
					{ kind: 'text', key: 'label', label: 'Tekst' },
					{ kind: 'text', key: 'href', label: 'Link' }
				]
			}
		]
	},
	{
		title: 'Diensten',
		hint: 'De vier kaarten bij "Onze diensten", in het menu en in de voettekst.',
		fields: [
			{
				kind: 'rows',
				key: 'services',
				label: 'Dienstkaarten',
				noun: 'dienst',
				summary: 'title',
				fixed: true,
				fields: [
					{ kind: 'text', key: 'title', label: 'Titel' },
					{ kind: 'textarea', key: 'text', label: 'Korte tekst' }
				]
			}
		]
	},
	{
		title: 'Directie',
		hint: 'Op de homepage en op Over Nivå.',
		fields: [
			{
				kind: 'rows',
				key: 'team',
				label: 'Personen',
				noun: 'persoon',
				summary: 'name',
				fields: [
					{ kind: 'text', key: 'name', label: 'Naam' },
					{ kind: 'text', key: 'role', label: 'Functie' }
				]
			}
		]
	}
];

export const projectSections: Section[] = [
	{
		title: 'Projecten',
		hint: 'Op de pagina Projecten, gegroepeerd per categorie, en bij de passende dienst.',
		fields: [
			{
				kind: 'rows',
				key: 'items',
				label: 'Projecten',
				noun: 'project',
				summary: 'name',
				fields: [
					{ kind: 'text', key: 'name', label: 'Naam' },
					{ kind: 'text', key: 'location', label: 'Plaats' },
					{ kind: 'select', key: 'category', label: 'Categorie', options: ['Modernisering', 'Nieuwbouw', 'Onderhoud'] },
					{ kind: 'text', key: 'scope', label: 'Wat wij deden' },
					{ kind: 'photo', key: 'photo', label: 'Foto' },
					{ kind: 'checkbox', key: 'featured', label: 'Op de homepage' }
				]
			}
		]
	}
];

export type Missing = { label: string; href: string };

/** Required text fields that are still empty: they show "[input volgt]" on the site. */
export function missingFields(data: Content): Missing[] {
	const missing: Missing[] = [];
	const scan = (sections: Section[], source: Record<string, unknown>, where: string, href: string) => {
		for (const section of sections) {
			const values = (section.key ? source[section.key] : source) as Record<string, unknown>;
			for (const field of section.fields) {
				const empty = typeof values[field.key] === 'string' && !(values[field.key] as string).trim();
				const required = (field.kind === 'text' || field.kind === 'textarea') && !field.optional;
				if (empty && required) missing.push({ label: `${where} › ${section.title} › ${field.label}`, href });
			}
		}
	};
	for (const schema of pageSchemas) {
		scan(schema.sections, data.pages[schema.id], schema.title, `/admin/paginas/${schema.id}`);
	}
	scan(settingsSections, data.settings, 'Instellingen', '/admin/instellingen');
	return missing;
}
