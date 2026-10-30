<script lang="ts">
	import type { Seo } from '#lib/content.ts';

	let { seo }: { seo: Seo } = $props();
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
</svelte:head>
