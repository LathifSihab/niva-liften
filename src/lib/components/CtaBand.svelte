<!-- Closing call to action, centred as in the client's mockup -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Link = { label: string; href: string };

	let {
		title,
		text,
		primary = { label: 'Contact opnemen', href: '/contact' },
		secondary = { label: 'Offerte aanvragen', href: '/contact' }
	}: { title: Snippet; text?: string; primary?: Link; secondary?: Link } = $props();
</script>

<section class="section tight cta surface" aria-label="Contact">
	<div class="container">
		<h2 class="section-title">{@render title()}</h2>
		{#if text}<p class="lead">{text}</p>{/if}
		<div class="section-actions">
			<a class="button button-primary" href={primary.href}>{primary.label}</a>
			<a class="button button-secondary" href={secondary.href}>{secondary.label}</a>
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
