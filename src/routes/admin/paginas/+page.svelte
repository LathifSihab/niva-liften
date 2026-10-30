<script lang="ts">
	import { missingFields, pageSchemas } from '#lib/cms-schema.ts';
	import { defaults } from '#lib/content.ts';
	import { content } from '#lib/content.svelte.ts';

	let missing = $derived(missingFields(content.data));

	const groups = ['Algemeen', 'Diensten'] as const;

	const changed = (id: keyof typeof defaults.pages) =>
		JSON.stringify(content.data.pages[id]) !== JSON.stringify(defaults.pages[id]);
	const open = (id: string) => missing.filter((item) => item.href === `/admin/paginas/${id}`).length;
</script>

<svelte:head>
	<title>Pagina's | Beheer Nivå Liften</title>
</svelte:head>

<div class="cms-page">
	<div class="cms-heading">
		<div>
			<h1 class="h2">Pagina's</h1>
			<p>Alle teksten, foto's en knoppen op de pagina's van de site.</p>
		</div>
	</div>

	{#each groups as group (group)}
		{@const rows = pageSchemas.filter((schema) => schema.group === group)}
		<h2 class="cms-subtitle">{group} <span class="cms-hint num">({rows.length})</span></h2>
		<table class="cms-table">
			<thead>
				<tr><th>Pagina</th><th>Adres</th><th>Status</th><th><span class="visually-hidden">Actie</span></th></tr>
			</thead>
			<tbody>
				{#each rows as schema (schema.id)}
					<tr>
						<td><a href="/admin/paginas/{schema.id}">{schema.title}</a></td>
						<td class="cms-hint">{schema.path}</td>
						<td class="badges">
							{#if changed(schema.id)}<span class="cms-badge">Gewijzigd</span>{/if}
							{#if open(schema.id)}<span class="cms-badge muted">{open(schema.id)} in te vullen</span>{/if}
						</td>
						<td><a class="button button-secondary" href="/admin/paginas/{schema.id}">Bewerken</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/each}
</div>

<style>
	.cms-subtitle:first-of-type {
		margin-top: 0;
	}

	/* Same columns in both tables */
	@media (min-width: 640px) {
		.cms-table {
			table-layout: fixed;
		}

		th:nth-child(1) {
			width: 26%;
		}

		th:nth-child(2) {
			width: 32%;
		}

		th:nth-child(4) {
			width: 9rem;
		}
	}

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-8);
	}

	@media (min-width: 640px) {
		.badges {
			display: table-cell;
		}

		.badges .cms-badge + .cms-badge {
			margin-left: var(--space-8);
		}
	}
</style>
