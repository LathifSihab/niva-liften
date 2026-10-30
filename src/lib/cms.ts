// Pure helpers for the demo CMS at /admin. No Svelte or Vite imports, so node --test runs them.

export type Status = 'gepubliceerd' | 'concept';

export type CmsPost = {
	slug: string;
	title: string;
	/** YYYY-MM-DD */
	date: string;
	category: string;
	/** Key in photos.ts */
	image: string;
	excerpt: string;
	/** Markdown */
	body: string;
	status: Status;
};

export type CmsErrors = Partial<Record<keyof CmsPost, string>>;

/** "Nivå: één lift" → "niva-een-lift" */
export function slugify(text: string) {
	return text
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Markdown file contents without the frontmatter block. */
export function stripFrontmatter(raw: string) {
	return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
}

export function validate(post: CmsPost, posts: CmsPost[], originalSlug: string | null): CmsErrors {
	const errors: CmsErrors = {};
	if (!post.title.trim()) errors.title = 'Vul een titel in.';
	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug)) {
		errors.slug = 'Gebruik alleen kleine letters, cijfers en streepjes.';
	} else if (posts.some(({ slug }) => slug === post.slug && slug !== originalSlug)) {
		errors.slug = 'Er is al een bericht met dit webadres.';
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) errors.date = 'Kies een datum.';
	if (!post.category.trim()) errors.category = 'Kies of typ een categorie.';
	if (!post.excerpt.trim()) errors.excerpt = 'Schrijf een korte samenvatting.';
	if (!post.body.trim()) errors.body = 'Schrijf de tekst van het bericht.';
	return errors;
}

const escape = (text: string) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const safeHref = (href: string) => /^(\/|#|https?:|mailto:|tel:)/.test(href);

/** One line of text with **bold**, *italic* and [links](/pad), as safe HTML. */
export function inlineMarkdown(text: string) {
	return escape(text)
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) =>
			safeHref(href) ? `<a href="${href}">${label}</a>` : label
		);
}

/**
 * Preview renderer for the subset the news posts use: headings, paragraphs, lists, bold,
 * italic and links. The site itself renders posts with mdsvex.
 */
export function markdownToHtml(markdown: string) {
	const html: string[] = [];
	let paragraph: string[] = [];
	let items: string[] = [];
	let listTag = 'ul';

	const flush = () => {
		if (paragraph.length) html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
		if (items.length) {
			html.push(`<${listTag}>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${listTag}>`);
		}
		paragraph = [];
		items = [];
	};

	for (const line of markdown.split(/\r?\n/)) {
		const heading = /^(#{1,3})\s+(.*)$/.exec(line);
		const item = /^\s*([-*]|\d+\.)\s+(.*)$/.exec(line);
		if (heading) {
			flush();
			// The page title is the h1, so body headings start at h2
			const level = Math.max(2, heading[1].length);
			html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
		} else if (item) {
			const tag = item[1].endsWith('.') ? 'ol' : 'ul';
			if (paragraph.length || (items.length && tag !== listTag)) flush();
			listTag = tag;
			items.push(item[2]);
		} else if (!line.trim()) {
			flush();
		} else if (items.length) {
			items[items.length - 1] += ` ${line.trim()}`;
		} else {
			paragraph.push(line.trim());
		}
	}
	flush();
	return html.join('\n');
}
