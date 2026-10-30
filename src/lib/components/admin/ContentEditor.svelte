<!-- Edits one part of the content (a page, the settings, the projects) with a live preview. -->
<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import type { Section } from '#lib/cms-schema.ts';
	import { defaults } from '#lib/content.ts';
	import { content } from '#lib/content.svelte.ts';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import Fields from './Fields.svelte';
	import PreviewFrame from './PreviewFrame.svelte';

	// The shape comes from the schema
	type Value = Record<string, any>;

	let {
		title,
		path,
		sections,
		preview,
		live
	}: {
		title: string;
		/** Where in the content this editor saves, e.g. ['pages', 'home'] */
		path: string[];
		sections: Section[];
		/** Page shown in the preview frame */
		preview: string;
		/** Link to the page on the site, if this is a page */
		live?: string;
	} = $props();

	const read = (root: unknown) => path.reduce((node: Value, key) => node[key], root as Value);
	const copy = (value: unknown) => structuredClone($state.snapshot(value));
	// A list at the top (the projects) is edited as { items }, so Fields always gets an object
	const isList = Array.isArray(read(defaults));
	const wrap = (value: unknown): Value => (isList ? { items: value } : (value as Value));
	const unwrap = (value: Value) => (isList ? value.items : value);

	const initial = wrap(copy(read(content.data)));
	let draft = $state(initial);
	let saved = $state(JSON.stringify(initial));
	let message = $state('');
	let restoreDialog = $state<ConfirmDialog>();

	let dirty = $derived(JSON.stringify(draft) !== saved);
	let previewValue = $derived(unwrap(draft));

	beforeNavigate(({ cancel, type }) => {
		if (dirty && type !== 'leave' && !confirm('U heeft niet-opgeslagen wijzigingen. Toch weggaan?')) {
			cancel();
		}
	});

	/** Drops empty entries from lists of text, so a stray empty line shows no empty bullet. */
	function clean(node: Value) {
		for (const key in node) {
			const value = node[key];
			if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
				node[key] = value.filter((item) => item.trim());
			} else if (value && typeof value === 'object') {
				clean(value);
			}
		}
	}

	function save(event: SubmitEvent) {
		event.preventDefault();
		clean(draft);
		content.save(path, unwrap(draft));
		saved = JSON.stringify(draft);
		const time = new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
		message = `Opgeslagen om ${time}. De site toont het nu in deze browser.`;
	}

	function restore() {
		draft = wrap(copy(read(defaults)));
		message = 'Originele inhoud teruggezet. Klik op Opslaan om dit te bewaren.';
	}
</script>

<form class="cms-page wide" onsubmit={save}>
	<div class="cms-toolbar">
		<div>
			<h1>{title}</h1>
			<p class="cms-state" role="status">
				{#if dirty}Niet-opgeslagen wijzigingen{:else if message}{message}{:else}&nbsp;{/if}
			</p>
		</div>
		<div class="cms-toolbar-actions">
			{#if live}
				<a class="button button-secondary" href={live} target="_blank" rel="noopener">
					Bekijk op site<span class="visually-hidden"> (nieuw tabblad)</span>
				</a>
			{/if}
			<button class="button button-secondary" type="button" onclick={() => restoreDialog?.open()}>
				Origineel terugzetten
			</button>
			<button class="button button-primary" type="submit">Opslaan</button>
		</div>
	</div>

	<p class="cms-hint tip">
		Tip: zet <code>**sterretjes**</code> om een woord om het vet te maken, en
		<code>[tekst](/contact)</code> maakt een link.
	</p>

	<div class="columns">
		<div class="sections">
			{#each sections as section, i (i)}
				<section class="cms-card section" aria-labelledby="sectie-{i}">
					<h2 id="sectie-{i}" class="h3">{section.title}</h2>
					{#if section.hint}<p class="cms-hint">{section.hint}</p>{/if}
					{#if section.key}
						<Fields fields={section.fields} bind:value={draft[section.key]} id="veld-{section.key}" />
					{:else}
						<Fields fields={section.fields} bind:value={draft} id="veld-{i}" />
					{/if}
				</section>
			{/each}
		</div>
		<div class="preview-column">
			<PreviewFrame src={preview} {path} value={previewValue} />
		</div>
	</div>
</form>

<ConfirmDialog
	bind:this={restoreDialog}
	title="Origineel terugzetten?"
	confirmLabel="Terugzetten"
	onconfirm={restore}
>
	<p>Alle velden krijgen weer de inhoud die nu op de website staat. Daarna kunt u nog kiezen of u opslaat.</p>
</ConfirmDialog>

<style>
	.tip {
		margin-bottom: var(--space-24);
	}

	code {
		padding: 0 var(--space-4);
		white-space: nowrap;
		border-radius: var(--radius);
		background: var(--color-white);
		font-size: 0.875em;
	}

	.columns {
		display: grid;
		gap: var(--space-32);
		align-items: start;
	}

	.sections {
		display: grid;
		gap: var(--space-24);
		min-width: 0;
	}

	.section {
		display: grid;
		gap: var(--space-24);
	}

	.section > .cms-hint {
		margin-top: calc(-1 * var(--space-16));
	}

	@media (min-width: 1100px) {
		.columns {
			grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		}

		.preview-column {
			position: sticky;
			top: 6.5rem;
		}
	}
</style>
