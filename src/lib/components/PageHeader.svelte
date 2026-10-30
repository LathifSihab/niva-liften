<!-- Title band for pages without a hero photo -->
<script lang="ts">
	let { eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string } = $props();
</script>

<header class="page-header surface">
	<div class="container">
		<p class="label">{eyebrow}</p>
		<h1>{title}</h1>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</div>
</header>

<style>
	.page-header {
		padding-block: var(--space-64) var(--space-48);
		border-bottom: 1px solid var(--color-line);
	}

	h1 {
		margin-block: var(--space-16);
	}

	.lead {
		color: var(--color-steel);
	}

	@media (min-width: 960px) {
		.page-header {
			padding-block: var(--space-96) var(--space-64);
		}
	}
</style>
