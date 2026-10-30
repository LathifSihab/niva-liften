<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { pageSchemas } from '#lib/cms-schema.ts';
	import type { PhotoKey } from '#lib/content.ts';
	import { content, photoOf } from '#lib/content.svelte.ts';
	import { photos } from '#lib/photos.ts';

	const keys = Object.keys(photos) as PhotoKey[];

	let alts = $state(Object.fromEntries(keys.map((key) => [key, photoOf(key).alt])));
	let saved = $state('');
	let message = $state('');
	saved = JSON.stringify(alts);
	let dirty = $derived(JSON.stringify(alts) !== saved);

	beforeNavigate(({ cancel, type }) => {
		if (dirty && type !== 'leave' && !confirm('U heeft niet-opgeslagen wijzigingen. Toch weggaan?')) {
			cancel();
		}
	});

	/** True if any `photo` value in the object (at any depth) is this key. */
	function shows(node: unknown, key: string): boolean {
		if (!node || typeof node !== 'object') return false;
		return Object.entries(node).some(([name, value]) =>
			name === 'photo' ? value === key : shows(value, key)
		);
	}

	function usage(key: string) {
		return [
			...pageSchemas.filter((schema) => shows(content.data.pages[schema.id], key)).map((s) => `Pagina ${s.title}`),
			...content.data.projects.filter((p) => p.photo === key).map((p) => `Project ${p.name}`),
			...content.data.posts.filter((p) => p.image === key).map((p) => `Nieuws: ${p.title}`)
		];
	}

	function save(event: SubmitEvent) {
		event.preventDefault();
		// Store only what differs from photos.ts
		const edited = Object.fromEntries(
			keys.filter((key) => alts[key].trim() && alts[key] !== photos[key].alt).map((key) => [key, alts[key]])
		);
		content.save(['photoAlts'], edited);
		saved = JSON.stringify(alts);
		const time = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
		message = `Opgeslagen om ${time}.`;
	}
</script>

<svelte:head>
	<title>Afbeeldingen | Beheer Nivå Liften</title>
</svelte:head>

<form class="cms-page wide" onsubmit={save}>
	<div class="cms-toolbar">
		<div>
			<h1>Afbeeldingen</h1>
			<p class="cms-state" role="status">
				{#if dirty}Niet-opgeslagen wijzigingen{:else if message}{message}{:else}&nbsp;{/if}
			</p>
		</div>
		<button class="button button-primary" type="submit">Opslaan</button>
	</div>

	<p class="cms-hint intro">
		De foto's die u op de pagina's, bij projecten en bij nieuws kunt kiezen. Dit zijn voorbeeldfoto's
		met een vrije licentie; in de volledige versie uploadt u hier de foto's van Nivå zelf.
	</p>

	<ul class="plain-list grid">
		{#each keys as key (key)}
			{@const photo = photos[key]}
			{@const used = usage(key)}
			<li class="cms-card item">
				<img src={photo.src} alt="" loading="lazy" />
				<div class="cms-field">
					<label for="alt-{key}">Omschrijving (alt-tekst)</label>
					<textarea id="alt-{key}" rows="2" bind:value={alts[key]} aria-describedby="alt-{key}-hint"></textarea>
					<p class="cms-hint" id="alt-{key}-hint">Voor wie de foto niet ziet, en voor Google.</p>
				</div>
				<p class="cms-hint">
					Voorbeeldfoto · <a href={photo.credit.source} target="_blank" rel="noopener">{photo.credit.author}</a>,
					{photo.credit.license}
				</p>
				<p class="cms-hint">
					{#if used.length}Gebruikt op: {used.join(', ')}{:else}Nog niet gebruikt{/if}
				</p>
			</li>
		{/each}
	</ul>
</form>

<style>
	.intro {
		margin-bottom: var(--space-24);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		gap: var(--space-16);
	}

	.item {
		display: grid;
		align-content: start;
		gap: var(--space-12);
		padding: var(--space-16);
	}

	.item img {
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		border-radius: var(--radius);
	}

	textarea {
		min-height: 0;
	}
</style>
