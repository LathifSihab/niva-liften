<script lang="ts">
	import { tick, untrack } from 'svelte';
	import { browser } from '$app/env';
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import NewsItem from '#lib/components/NewsItem.svelte';
	import ConfirmDialog from '#lib/components/admin/ConfirmDialog.svelte';
	import PhotoPicker from '#lib/components/admin/PhotoPicker.svelte';
	import { markdownToHtml, slugify, validate, type CmsErrors, type CmsPost } from '#lib/cms.ts';
	import { content, photoOf } from '#lib/content.svelte.ts';
	import { photos } from '#lib/photos.ts';
	import { formatDate } from '#lib/site.ts';

	type PhotoKey = keyof typeof photos;

	const EXCERPT_MAX = 160;
	const photoKeys = Object.keys(photos) as PhotoKey[];
	// Local date as YYYY-MM-DD (toISOString would give the UTC date)
	const today = () => new Date().toLocaleDateString('sv-SE');
	const empty = (): CmsPost => ({
		slug: '',
		title: '',
		date: today(),
		category: '',
		image: photoKeys[0],
		excerpt: '',
		body: '',
		status: 'concept'
	});

	// Query params are only readable in the browser; the prerendered page is an empty shell.
	let slugParam = $derived(browser ? page.url.searchParams.get('slug') : null);

	let draft = $state<CmsPost | null>(null);
	let saved = $state<CmsPost | null>(null);
	let originalSlug = $state<string | null>(null);
	let notFound = $state(false);
	let slugEdited = $state(false);
	// Validates live once the user has tried to save, so fixed fields lose their error right away
	let submitted = $state(false);
	let message = $state('');
	let bodyField = $state<HTMLTextAreaElement>();
	let deleteDialog = $state<ConfirmDialog>();

	$effect(() => {
		if (!browser) return;
		const slug = slugParam;
		untrack(() => {
			const existing = slug ? content.data.posts.find((post) => post.slug === slug) : undefined;
			notFound = !!slug && !existing;
			draft = existing ? { ...existing } : empty();
			saved = existing ? { ...existing } : null;
			originalSlug = existing?.slug ?? null;
			slugEdited = !!existing;
			submitted = false;
		});
	});

	let dirty = $derived(!!draft && JSON.stringify(draft) !== JSON.stringify(saved ?? empty()));
	let categories = $derived([...new Set(content.data.posts.map(({ category }) => category))].sort());
	let photo = $derived(draft ? photoOf(draft.image) : undefined);
	let bodyHtml = $derived(draft ? markdownToHtml(draft.body) : '');
	let errors = $derived<CmsErrors>(
		submitted && draft ? validate(draft, content.data.posts, originalSlug) : {}
	);

	beforeNavigate(({ cancel, type }) => {
		if (dirty && type !== 'leave' && !confirm('U heeft niet-opgeslagen wijzigingen. Toch weggaan?')) {
			cancel();
		}
	});

	function onTitleInput() {
		if (draft && !slugEdited) draft.slug = slugify(draft.title);
	}

	async function save(event: SubmitEvent) {
		event.preventDefault();
		if (!draft) return;
		draft.slug = draft.slug.trim();
		submitted = true;
		const [first] = Object.keys(errors);
		if (first) {
			message = '';
			await tick();
			document.getElementById(`veld-${first}`)?.focus();
			return;
		}
		submitted = false;
		const isNew = originalSlug === null;
		const others = content.data.posts.filter(({ slug }) => slug !== originalSlug);
		content.save(['posts'], [...others, draft].sort((a, b) => b.date.localeCompare(a.date)));
		saved = { ...draft };
		const time = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
		message = `${isNew ? 'Bericht aangemaakt' : 'Opgeslagen'} om ${time}.`;
		if (draft.slug !== originalSlug) {
			originalSlug = draft.slug;
			slugEdited = true;
			goto(`/admin/nieuws/bewerk?slug=${draft.slug}`, { replace: true, reset: false });
		}
	}

	function remove() {
		if (!originalSlug) return;
		content.save(['posts'], content.data.posts.filter(({ slug }) => slug !== originalSlug));
		saved = draft;
		goto('/admin/nieuws');
	}

	/** Wraps the selection in the body field, e.g. **vet**. */
	async function wrap(before: string, after: string, placeholder: string) {
		if (!draft || !bodyField) return;
		const { selectionStart: start, selectionEnd: end } = bodyField;
		const selected = draft.body.slice(start, end) || placeholder;
		draft.body = draft.body.slice(0, start) + before + selected + after + draft.body.slice(end);
		await tick();
		bodyField.focus();
		bodyField.setSelectionRange(start + before.length, start + before.length + selected.length);
	}

	/** Puts a prefix at the start of the current line, e.g. "## " or "- ". */
	async function prefixLine(prefix: string) {
		if (!draft || !bodyField) return;
		const start = bodyField.selectionStart;
		const lineStart = draft.body.lastIndexOf('\n', start - 1) + 1;
		draft.body = draft.body.slice(0, lineStart) + prefix + draft.body.slice(lineStart);
		await tick();
		bodyField.focus();
		bodyField.setSelectionRange(start + prefix.length, start + prefix.length);
	}

	const describedBy = (field: keyof CmsPost, hint?: string) =>
		[hint, errors[field] && `fout-${field}`].filter(Boolean).join(' ') || undefined;
</script>

<svelte:head>
	<title>{originalSlug ? 'Bericht bewerken' : 'Nieuw bericht'} | Beheer Nivå Liften</title>
</svelte:head>

{#snippet fieldError(field: keyof CmsPost)}
	{#if errors[field]}
		<p class="error" id="fout-{field}">{errors[field]}</p>
	{/if}
{/snippet}

<p class="back small"><a href="/admin/nieuws">Alle berichten</a></p>

{#if notFound}
	<div class="card notice">
		<h1 class="h3">Bericht niet gevonden</h1>
		<p>Dit bericht bestaat niet (meer). Misschien is het verwijderd of is de demo hersteld.</p>
		<a class="button button-primary" href="/admin/nieuws">Naar het overzicht</a>
	</div>
{:else if draft}
	<form class="editor" onsubmit={save} novalidate>
		<div class="toolbar">
			<div>
				<h1 class="h3">{originalSlug ? 'Bericht bewerken' : 'Nieuw bericht'}</h1>
				<p class="small state" role="status">
					{#if message && !dirty}{message}{:else if dirty}Niet-opgeslagen wijzigingen{:else}&nbsp;{/if}
				</p>
			</div>
			<div class="toolbar-actions">
				<label class="status-field">
					<span class="visually-hidden">Status</span>
					<select bind:value={draft.status}>
						<option value="concept">Concept</option>
						<option value="gepubliceerd">Gepubliceerd</option>
					</select>
				</label>
				{#if originalSlug}
					<button class="button button-secondary" type="button" onclick={() => deleteDialog?.open()}>
						Verwijderen
					</button>
				{/if}
				<button class="button button-primary" type="submit">Opslaan</button>
			</div>
		</div>

		{#if Object.keys(errors).length}
			<p class="error-summary" role="alert">Controleer de velden die gemarkeerd zijn.</p>
		{/if}

		<div class="columns">
			<div class="fields card">
				<div class="field">
					<label for="veld-title">Titel</label>
					<input
						id="veld-title"
						class="title-input"
						bind:value={draft.title}
						oninput={onTitleInput}
						aria-invalid={errors.title ? 'true' : undefined}
						aria-describedby={describedBy('title')}
					/>
					{@render fieldError('title')}
				</div>

				<div class="field">
					<label for="veld-slug">Webadres</label>
					<div class="slug" class:invalid={errors.slug}>
						<span aria-hidden="true">/nieuws/</span>
						<input
							id="veld-slug"
							bind:value={draft.slug}
							oninput={() => (slugEdited = true)}
							spellcheck="false"
							aria-invalid={errors.slug ? 'true' : undefined}
							aria-describedby={describedBy('slug', 'hint-slug')}
						/>
					</div>
					<p class="hint" id="hint-slug">Wordt automatisch gemaakt uit de titel.</p>
					{@render fieldError('slug')}
				</div>

				<div class="field-pair">
					<div class="field">
						<label for="veld-date">Datum</label>
						<input
							id="veld-date"
							type="date"
							bind:value={draft.date}
							aria-invalid={errors.date ? 'true' : undefined}
							aria-describedby={describedBy('date')}
						/>
						{@render fieldError('date')}
					</div>
					<div class="field">
						<label for="veld-category">Categorie</label>
						<input
							id="veld-category"
							list="categorieen"
							bind:value={draft.category}
							aria-invalid={errors.category ? 'true' : undefined}
							aria-describedby={describedBy('category', 'hint-category')}
						/>
						<datalist id="categorieen">
							{#each categories as category (category)}
								<option value={category}></option>
							{/each}
						</datalist>
						<p class="hint" id="hint-category">Kies een bestaande of typ een nieuwe.</p>
						{@render fieldError('category')}
					</div>
				</div>

				<div class="field">
					<label for="veld-excerpt">Samenvatting</label>
					<textarea
						id="veld-excerpt"
						rows="3"
						bind:value={draft.excerpt}
						aria-invalid={errors.excerpt ? 'true' : undefined}
						aria-describedby={describedBy('excerpt', 'hint-excerpt')}
					></textarea>
					<p class="hint" id="hint-excerpt">
						Staat in het overzicht en in Google.
						<span class="num" class:over={draft.excerpt.length > EXCERPT_MAX}>
							{draft.excerpt.length} / {EXCERPT_MAX} tekens
						</span>
					</p>
					{@render fieldError('excerpt')}
				</div>

				<PhotoPicker id="veld-image" label="Foto" bind:value={draft.image} />

				<div class="field">
					<label for="veld-body">Tekst</label>
					<div class="body-editor" class:invalid={errors.body}>
						<div class="format" role="toolbar" aria-label="Opmaak" aria-controls="veld-body">
							<button type="button" onclick={() => prefixLine('## ')}>Tussenkop</button>
							<button type="button" onclick={() => wrap('**', '**', 'vetgedrukte tekst')}>
								<strong>Vet</strong>
							</button>
							<button type="button" onclick={() => prefixLine('- ')}>Opsomming</button>
							<button type="button" onclick={() => wrap('[', '](/contact)', 'linktekst')}>Link</button>
						</div>
						<textarea
							id="veld-body"
							rows="16"
							bind:this={bodyField}
							bind:value={draft.body}
							aria-invalid={errors.body ? 'true' : undefined}
							aria-describedby={describedBy('body', 'hint-body')}
						></textarea>
					</div>
					<p class="hint" id="hint-body">
						Een regel met <code>## </code> wordt een tussenkop, <code>- </code> een opsomming,
						<code>**tekst**</code> vet.
					</p>
					{@render fieldError('body')}
				</div>
			</div>

			<section class="preview" aria-labelledby="preview-title">
				<h2 id="preview-title" class="label">Voorbeeld</h2>

				{#if photo}
					<p class="small preview-caption">In het nieuwsoverzicht</p>
					<!-- Inert: a preview, not a link to the (maybe not yet existing) page -->
					<div class="preview-card" inert>
						<NewsItem
							post={{
								...draft,
								title: draft.title || 'Titel van het bericht',
								excerpt: draft.excerpt || 'Samenvatting van het bericht.',
								photo
							}}
						/>
					</div>
				{/if}

				<p class="small preview-caption">Op de berichtpagina</p>
				<article class="card preview-article" inert>
					<p class="label">
						{#if draft.date}<time class="num" datetime={draft.date}>{formatDate(draft.date)}</time>{/if}
						{#if draft.category}· {draft.category}{/if}
					</p>
					<h3 class="h2">{draft.title || 'Titel van het bericht'}</h3>
					{#if draft.excerpt}<p class="lead">{draft.excerpt}</p>{/if}
					{#if photo}<img src={photo.src} alt="" />{/if}
					<div class="prose">
						{@html bodyHtml}
					</div>
				</article>
			</section>
		</div>
	</form>

	<ConfirmDialog
		bind:this={deleteDialog}
		title="Bericht verwijderen?"
		confirmLabel="Verwijderen"
		onconfirm={remove}
	>
		<p>“{saved?.title}” wordt verwijderd. In deze demo kunt u het terugzetten met Demo herstellen.</p>
	</ConfirmDialog>
{/if}

<style>
	.back {
		max-width: 88rem;
		margin: 0 auto var(--space-16);
	}

	.notice {
		display: grid;
		justify-items: start;
		gap: var(--space-16);
		max-width: 40rem;
		margin-inline: auto;
		padding: var(--space-32);
	}

	.editor {
		max-width: 88rem;
		margin-inline: auto;
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-12) var(--space-24);
		margin-bottom: var(--space-24);
		padding: var(--space-12) var(--space-16);
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
		background: var(--color-white);
	}

	/* Keeps Opslaan in reach while scrolling; on phones the wrapped toolbar is too tall for that */
	@media (min-width: 640px) {
		.toolbar {
			position: sticky;
			top: 0;
			z-index: 5;
			padding-inline: var(--space-24);
		}
	}

	.state {
		color: var(--color-steel);
	}

	.toolbar-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-12);
	}

	.error-summary {
		max-width: none;
		margin-bottom: var(--space-24);
		padding: var(--space-12) var(--space-24);
		border-left: 4px solid var(--color-navy);
		background: var(--color-white);
		font-weight: 600;
	}

	.columns {
		display: grid;
		gap: var(--space-32);
		align-items: start;
	}

	@media (min-width: 1100px) {
		.columns {
			grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		}

		.preview {
			position: sticky;
			top: 7rem;
			max-height: calc(100svh - 8rem);
			overflow-y: auto;
		}
	}

	/* Form fields: same look as the contact form */

	.fields {
		display: grid;
		gap: var(--space-32);
		padding: var(--space-32) var(--space-24);
	}

	@media (min-width: 640px) {
		.fields {
			padding-inline: var(--space-32);
		}
	}

	.field {
		display: grid;
		gap: var(--space-8);
		align-content: start;
		min-width: 0;
	}

	.field-pair {
		display: grid;
		gap: var(--space-32) var(--space-24);
	}

	@media (min-width: 640px) {
		.field-pair {
			grid-template-columns: 1fr 1fr;
		}
	}

	label {
		font-weight: 600;
	}

	input:not([type='radio']),
	select,
	textarea {
		width: 100%;
		min-height: 48px;
		padding: var(--space-8) var(--space-12);
		border: 1px solid var(--color-steel-light);
		border-radius: var(--radius);
		background: var(--color-white);
		color: var(--color-navy);
		font: inherit;
	}

	textarea {
		resize: vertical;
	}

	input:focus-visible,
	select:focus-visible,
	textarea:focus-visible {
		border-color: var(--color-teal);
		outline-offset: 0;
	}

	[aria-invalid='true'],
	.invalid {
		border: 2px solid var(--color-navy);
	}

	.title-input {
		font-family: var(--font-heading);
		font-size: var(--text-h3);
		font-weight: 600;
	}

	.status-field select {
		min-width: 10rem;
		font-family: var(--font-heading);
		font-weight: 600;
	}

	.hint {
		color: var(--color-steel);
		font-size: var(--text-small);
	}

	.hint .num {
		margin-left: var(--space-8);
	}

	.hint .over {
		color: var(--color-navy);
		font-weight: 600;
	}

	.error {
		font-weight: 600;
	}

	code {
		padding: 0 var(--space-4);
		border-radius: var(--radius);
		background: var(--color-surface);
		font-size: 0.875em;
	}

	/* "/nieuws/" prefix inside the field */
	.slug {
		display: flex;
		align-items: center;
		border: 1px solid var(--color-steel-light);
		border-radius: var(--radius);
		background: var(--color-surface);
	}

	.slug:focus-within {
		border-color: var(--color-teal);
		outline: 2px solid var(--color-teal);
	}

	.slug span {
		padding-left: var(--space-12);
		color: var(--color-steel);
	}

	.slug input {
		border: 0;
		background: transparent;
		outline: 0;
	}

	.slug input[aria-invalid='true'] {
		border: 0;
	}

	/* Body: formatting buttons above the textarea */
	.body-editor {
		border: 1px solid var(--color-steel-light);
		border-radius: var(--radius);
	}

	.body-editor:focus-within {
		border-color: var(--color-teal);
	}

	.format {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		padding: var(--space-8);
		border-bottom: 1px solid var(--color-line);
		background: var(--color-surface);
	}

	.format button {
		min-height: 36px;
		padding: 0 var(--space-12);
		border: 1px solid transparent;
		border-radius: var(--radius);
		background: none;
		color: var(--color-navy);
		font: inherit;
		font-size: var(--text-small);
		cursor: pointer;
	}

	.format button:hover {
		border-color: var(--color-line);
		background: var(--color-white);
	}

	.body-editor textarea {
		border: 0;
		font-family: ui-monospace, 'Cascadia Mono', Consolas, monospace;
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.body-editor textarea:focus-visible {
		outline: 0;
	}

	/* Preview */

	.preview {
		display: grid;
		gap: var(--space-12);
	}

	.preview-caption {
		margin-top: var(--space-12);
		color: var(--color-steel);
	}

	.preview-card {
		max-width: 24rem;
	}

	.preview-article {
		display: grid;
		gap: var(--space-16);
		padding: var(--space-32) var(--space-24);
	}

	.preview-article img {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}

	.prose :global(h2) {
		margin-block: var(--space-32) var(--space-12);
		font-size: var(--text-h3);
	}

	.prose :global(h3) {
		margin-block: var(--space-24) var(--space-8);
		font-size: 1.125rem;
	}

	.prose :global(p + p),
	.prose :global(ul + p),
	.prose :global(ol + p),
	.prose :global(p + ul),
	.prose :global(p + ol) {
		margin-top: var(--space-16);
	}

	.prose :global(ul),
	.prose :global(ol) {
		display: grid;
		gap: var(--space-8);
		padding-left: 1.25em;
	}
</style>
