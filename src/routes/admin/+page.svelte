<script lang="ts">
	import { missingFields, pageSchemas } from '#lib/cms-schema.ts';
	import { content } from '#lib/content.svelte.ts';

	let data = $derived(content.data);
	let missing = $derived(missingFields(data));
	let unread = $derived(data.inbox.filter((message) => !message.read).length);
	let featured = $derived(data.projects.filter((project) => project.featured).length);
	let concepts = $derived(data.posts.filter((post) => post.status === 'concept').length);

	const where: Record<string, { label: string; href: string }> = {
		settings: { label: 'Instellingen', href: '/admin/instellingen' },
		projects: { label: 'Projecten', href: '/admin/projecten' },
		posts: { label: 'Nieuws', href: '/admin/nieuws' },
		photoAlts: { label: 'Afbeeldingen', href: '/admin/afbeeldingen' },
		...Object.fromEntries(
			pageSchemas.map((schema) => [
				`pages.${schema.id}`,
				{ label: `Pagina ${schema.title}`, href: `/admin/paginas/${schema.id}` }
			])
		)
	};

	let recent = $derived(
		Object.entries(data.updated)
			.filter(([key]) => where[key])
			.sort(([, a], [, b]) => b.localeCompare(a))
			.slice(0, 6)
			.map(([key, when]) => ({ ...where[key], when }))
	);

	const time = (iso: string) =>
		new Date(iso).toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' });
</script>

<svelte:head>
	<title>Overzicht | Beheer Nivå Liften</title>
</svelte:head>

<div class="cms-page">
	<div class="cms-heading">
		<div>
			<h1 class="h2">Overzicht</h1>
			<p>Beheer van nivaliften.nl</p>
		</div>
	</div>

	<ul class="plain-list tiles">
		<li class="cms-card tile">
			<h2 class="label">Pagina's</h2>
			<p class="h2 num">{pageSchemas.length}</p>
			<p class="cms-hint">{missing.length} {missing.length === 1 ? 'veld' : 'velden'} nog in te vullen</p>
			<a class="button button-secondary" href="/admin/paginas">Bewerken</a>
		</li>
		<li class="cms-card tile">
			<h2 class="label">Nieuws</h2>
			<p class="h2 num">{data.posts.length}</p>
			<p class="cms-hint">{concepts === 1 ? '1 concept' : `${concepts} concepten`}</p>
			<a class="button button-secondary" href="/admin/nieuws">Bewerken</a>
		</li>
		<li class="cms-card tile">
			<h2 class="label">Projecten</h2>
			<p class="h2 num">{data.projects.length}</p>
			<p class="cms-hint">{featured} op de homepage</p>
			<a class="button button-secondary" href="/admin/projecten">Bewerken</a>
		</li>
		<li class="cms-card tile">
			<h2 class="label">Berichten</h2>
			<p class="h2 num">{unread}</p>
			<p class="cms-hint">ongelezen</p>
			<a class="button button-secondary" href="/admin/berichten">Bekijken</a>
		</li>
	</ul>

	<h2>Nog in te vullen</h2>
	{#if missing.length}
		<p class="cms-hint intro">
			Op de site staat hier nu <span class="placeholder">[input volgt]</span>. Deze gegevens komen van
			Nivå.
		</p>
		<table class="cms-table">
			<thead>
				<tr><th>Wat</th><th><span class="visually-hidden">Actie</span></th></tr>
			</thead>
			<tbody>
				{#each missing as item (item.label)}
					<tr>
						<td>{item.label}</td>
						<td><a class="button button-secondary" href={item.href}>Invullen</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="cms-card"><p>Alles is ingevuld.</p></div>
	{/if}

	<h2>Recent bewerkt</h2>
	{#if recent.length}
		<table class="cms-table">
			<thead>
				<tr><th>Wat</th><th>Opgeslagen</th></tr>
			</thead>
			<tbody>
				{#each recent as item (item.href)}
					<tr>
						<td><a href={item.href}>{item.label}</a></td>
						<td class="cms-hint">{time(item.when)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="cms-card"><p class="cms-hint">Nog niets bewerkt in deze browser.</p></div>
	{/if}
</div>

<style>
	.tiles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		gap: var(--space-16);
	}

	.tile {
		display: grid;
		align-content: start;
		justify-items: start;
		gap: var(--space-8);
	}

	.tile .button {
		margin-top: var(--space-8);
		min-height: 40px;
	}

	.intro {
		margin: calc(-1 * var(--space-8)) 0 var(--space-16);
	}
</style>
