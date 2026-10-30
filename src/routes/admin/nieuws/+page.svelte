<script lang="ts">
	import { seedPosts } from '#lib/content.ts';
	import { content, photoOf } from '#lib/content.svelte.ts';
	import type { Status } from '#lib/cms.ts';
	import { formatDate } from '#lib/site.ts';

	let query = $state('');
	let status = $state<Status | 'alle'>('alle');

	const filters: { value: Status | 'alle'; label: string }[] = [
		{ value: 'alle', label: 'Alle' },
		{ value: 'gepubliceerd', label: 'Gepubliceerd' },
		{ value: 'concept', label: 'Concept' }
	];

	let posts = $derived([...content.data.posts].sort((a, b) => b.date.localeCompare(a.date)));
	let shown = $derived(
		posts.filter(
			(post) =>
				(status === 'alle' || post.status === status) &&
				`${post.title} ${post.category}`.toLowerCase().includes(query.trim().toLowerCase())
		)
	);
	const count = (value: Status | 'alle') =>
		value === 'alle' ? posts.length : posts.filter((post) => post.status === value).length;
	// Posts that exist on the site, so 'Bekijk op website' only links to real pages
	const liveSlugs = new Set(seedPosts.map(({ slug }) => slug));
</script>

<svelte:head>
	<title>Nieuws | Beheer Nivå Liften</title>
</svelte:head>

<div class="page">
	<div class="heading">
		<div>
			<h1 class="h2">Nieuws</h1>
			<p>Berichten op de pagina Nieuws, nieuwste eerst.</p>
		</div>
		<a class="button button-primary" href="/admin/nieuws/bewerk">Nieuw bericht</a>
	</div>

	<div class="tools">
		<label class="search">
			<span class="visually-hidden">Zoek op titel of categorie</span>
			<input type="search" placeholder="Zoek op titel of categorie" bind:value={query} />
		</label>
		<div class="filters" role="group" aria-label="Filter op status">
			{#each filters as filter (filter.value)}
				<button
					type="button"
					aria-pressed={status === filter.value}
					onclick={() => (status = filter.value)}
				>
					{filter.label} <span class="num">{count(filter.value)}</span>
				</button>
			{/each}
		</div>
	</div>

	{#if shown.length}
		<ul class="plain-list posts">
			{#each shown as post (post.slug)}
				<li class="card post">
					<img src={photoOf(post.image).src} alt="" width="96" height="64" loading="lazy" />
					<div class="post-text">
						<p class="label">
							<time class="num" datetime={post.date}>{formatDate(post.date)}</time> · {post.category}
						</p>
						<h2 class="h3">
							<a class="edit" href="/admin/nieuws/bewerk?slug={post.slug}">{post.title}</a>
						</h2>
					</div>
					<p class="status" data-status={post.status}>
						{post.status === 'gepubliceerd' ? 'Gepubliceerd' : 'Concept'}
					</p>
					{#if liveSlugs.has(post.slug)}
						<a class="view small" href="/nieuws/{post.slug}" target="_blank" rel="noopener">
							Bekijk op website<span class="visually-hidden">: {post.title} (nieuw tabblad)</span>
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<div class="card empty">
			<p>Geen berichten gevonden.</p>
		</div>
	{/if}
</div>

<style>
	.page {
		max-width: 64rem;
		margin-inline: auto;
	}

	.heading {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: var(--space-16);
		margin-bottom: var(--space-32);
	}

	.heading p {
		margin-top: var(--space-4);
		color: var(--color-steel);
	}

	.tools {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-12) var(--space-24);
		margin-bottom: var(--space-16);
	}

	.search {
		flex: 1 1 16rem;
	}

	input {
		width: 100%;
		min-height: 48px;
		padding: var(--space-8) var(--space-12);
		border: 1px solid var(--color-steel-light);
		border-radius: var(--radius);
		background: var(--color-white);
		color: var(--color-navy);
		font: inherit;
	}

	input:focus-visible {
		border-color: var(--color-teal);
		outline-offset: 0;
	}

	.filters {
		display: flex;
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
		background: var(--color-white);
	}

	.filters button {
		min-height: 46px;
		padding: 0 var(--space-16);
		border: 0;
		background: none;
		color: var(--color-steel);
		font-family: var(--font-heading);
		font-size: var(--text-small);
		font-weight: 600;
		cursor: pointer;
	}

	.filters button + button {
		border-left: 1px solid var(--color-line);
	}

	.filters button:hover {
		color: var(--color-navy);
	}

	.filters button[aria-pressed='true'] {
		background: var(--color-teal);
		color: var(--color-white);
	}

	.posts {
		display: grid;
		gap: var(--space-12);
	}

	.post {
		position: relative;
		display: grid;
		grid-template-columns: 64px 1fr;
		align-items: start;
		gap: var(--space-8) var(--space-16);
		padding: var(--space-16);
		transition: box-shadow 0.2s;
	}

	.post:hover {
		box-shadow: var(--shadow-card-hover);
	}

	.post img {
		width: 100%;
		height: auto;
		aspect-ratio: 3 / 2;
		object-fit: cover;
		border-radius: var(--radius);
	}

	.post-text {
		display: grid;
		gap: var(--space-4);
		min-width: 0;
	}

	.post h2 {
		font-size: 1.125rem;
	}

	.edit {
		color: var(--color-navy);
		text-decoration: none;
	}

	/* Whole row opens the editor */
	.edit::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.post:hover .edit {
		color: var(--color-teal);
	}

	.status {
		justify-self: start;
		padding: var(--space-4) var(--space-8);
		border: 1px solid var(--color-teal);
		border-radius: var(--radius);
		color: var(--color-teal);
		font-family: var(--font-label);
		font-size: var(--text-label);
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.status[data-status='concept'] {
		border-style: dashed;
		border-color: var(--color-steel);
		color: var(--color-steel);
	}

	/* Sits above the row's stretched link */
	.view {
		position: relative;
		z-index: 1;
		justify-self: start;
	}

	.post .status,
	.post .view {
		grid-column: 2;
	}

	@media (min-width: 640px) {
		.post {
			grid-template-columns: 96px 1fr auto auto;
			align-items: center;
			column-gap: var(--space-24);
		}

		.post .status,
		.post .view {
			grid-column: auto;
		}
	}

	.empty {
		padding: var(--space-48) var(--space-24);
		color: var(--color-steel);
		text-align: center;
	}

	.empty p {
		margin-inline: auto;
	}
</style>
