<!-- Closing call to action, centred as in the client's mockup -->
<script lang="ts">
	import type { Cta } from '#lib/content.ts';
	import Text from './Text.svelte';

	let { cta }: { cta: Cta } = $props();
</script>

<section class="section tight cta surface" aria-label="Contact">
	<div class="container">
		<h2 class="section-title"><Text text={cta.title} /></h2>
		{#if cta.text}<p class="lead"><Text text={cta.text} /></p>{/if}
		<div class="section-actions">
			<a class="button button-primary" href={cta.primary.href}>{cta.primary.label}</a>
			<a class="button button-secondary" href={cta.secondary.href}>{cta.secondary.label}</a>
		</div>
	</div>
</section>

<style>
	.cta {
		text-align: center;
		border-top: 1px solid var(--color-line);
	}

	.section-title {
		margin-bottom: var(--space-16);
	}

	.lead {
		margin-inline: auto;
		color: var(--color-steel);
	}

	.section-actions {
		margin-top: var(--space-32);
	}
</style>
