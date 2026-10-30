<script lang="ts">
	import ContentEditor from '#lib/components/admin/ContentEditor.svelte';
	import { settingsSections } from '#lib/cms-schema.ts';
</script>

<svelte:head>
	<title>Instellingen | Beheer Nivå Liften</title>
</svelte:head>

<!-- Settings show on every page; the homepage previews most of them -->
<ContentEditor title="Instellingen" path={['settings']} sections={settingsSections} preview="/" />
