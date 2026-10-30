<!-- Content text: **bold** and [links](/pad) render as HTML; empty text shows the placeholder -->
<script lang="ts">
	import { inlineMarkdown } from '#lib/cms.ts';
	import { PLACEHOLDER } from '#lib/site.ts';

	let { text }: { text: string } = $props();
</script>

{#if text.trim()}{@html inlineMarkdown(text)}{:else}<span class="placeholder">{PLACEHOLDER}</span>{/if}
