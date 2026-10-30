<!-- Signature detail: homepage sections are labelled like lift floors. DESIGN_SYSTEM.md §2 -->
<script lang="ts">
	let { floor, label }: { floor: string; label: string } = $props();
</script>

<p class="label floor-label"><span class="num">{floor}</span>{label}</p>

<style>
	.floor-label {
		display: flex;
		gap: var(--space-12);
		margin-bottom: var(--space-24);
	}

	.num {
		color: var(--color-teal);
	}

	:global(.on-dark) .num {
		color: var(--color-white);
	}
</style>
