<script lang="ts">
	import ContentEditor from '#lib/components/admin/ContentEditor.svelte';
	import { projectSections } from '#lib/cms-schema.ts';
</script>

<svelte:head>
	<title>Projecten | Beheer Nivå Liften</title>
</svelte:head>

<ContentEditor
	title="Projecten"
	path={['projects']}
	sections={projectSections}
	preview="/projecten"
	live="/projecten"
/>
