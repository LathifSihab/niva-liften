<script lang="ts">
	import ContentEditor from '#lib/components/admin/ContentEditor.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.schema.title} bewerken | Beheer Nivå Liften</title>
</svelte:head>

<p class="cms-back"><a href="/admin/paginas">Alle pagina's</a></p>

<!-- Keyed, so switching pages starts a fresh draft -->
{#key data.schema.id}
	<ContentEditor
		title={data.schema.title}
		path={['pages', data.schema.id]}
		sections={data.schema.sections}
		preview={data.schema.path}
		live={data.schema.path}
	/>
{/key}
