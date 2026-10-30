<!-- Checkmark list in the style of the client's mockup ("Waarom Nivå Liften?") -->
<script lang="ts">
	let {
		items,
		columns = 3,
		center = false
	}: { items: string[]; columns?: 1 | 2 | 3; center?: boolean } = $props();
</script>

<ul class="plain-list checks" class:center class:single={columns === 1} style:--columns={columns}>
	{#each items as item, i (i)}
		<li>
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M4 12.5l5 5L20 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="square" />
			</svg>
			<span>{item}</span>
		</li>
	{/each}
</ul>

<style>
	.checks {
		display: grid;
		gap: var(--space-16) var(--space-32);
	}

	.center {
		justify-content: center;
	}

	li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-12);
		font-size: var(--text-body-lg);
		font-weight: 600;
		line-height: 1.4;
	}

	svg {
		flex: none;
		color: var(--color-teal);
	}

	@media (min-width: 640px) {
		.checks:not(.single) {
			grid-template-columns: repeat(2, max-content);
		}
	}

	@media (min-width: 960px) {
		.checks:not(.single) {
			grid-template-columns: repeat(var(--columns), max-content);
			column-gap: var(--space-64);
		}
	}
</style>
