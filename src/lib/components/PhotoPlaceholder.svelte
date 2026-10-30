<!-- Stands in for a real Nivå photo until the client supplies originals. Never use stock. -->
<script lang="ts">
	let { alt, ratio = '4 / 5' }: { alt: string; ratio?: string } = $props();
</script>

<div class="photo" style:aspect-ratio={ratio} role="img" aria-label="Foto volgt: {alt}">
	<span class="label">[foto volgt]</span>
	<span class="small">{alt}</span>
</div>

<style>
	.photo {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: var(--space-4);
		width: 100%;
		padding: var(--space-16);
		border: 1px solid var(--color-line);
		background: var(--color-surface);
		color: var(--color-steel);
	}

	:global(.on-dark) .photo {
		border-color: var(--color-steel);
		background: transparent;
		color: var(--color-teal-mist);
	}
</style>
