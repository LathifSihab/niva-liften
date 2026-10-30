<!-- Line icons for the four services: navy stroke, teal accent, square caps like the logo -->
<script lang="ts">
	import type { ServiceIconName } from '#lib/site.ts';

	let { name, size = 48 }: { name: ServiceIconName; size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 40 40"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="square"
	aria-hidden="true"
>
	{#if name === 'onderhoud'}
		<rect x="9" y="6" width="22" height="30" rx="1.5" />
		<path d="M15 6V3h10v3" />
		<path d="M14 15h12M14 21h12M14 27h7" class="accent" />
	{:else if name === 'reparatie'}
		<path
			d="M27 5a7 7 0 0 0-6.7 9.1L6.8 27.6a2.6 2.6 0 0 0 3.6 3.6l13.5-13.5A7 7 0 0 0 33 11.3l-4.2 4.2-4-1.3-1.3-4L27.7 6A7 7 0 0 0 27 5Z"
		/>
		<path d="M30 30l4 4M26 34l8-8" class="accent" />
	{:else if name === 'modernisering'}
		<path d="M7 20a13 13 0 0 1 22.6-8.8" />
		<path d="M33 20a13 13 0 0 1-22.6 8.8" />
		<path d="M30 4v7.5h-7.5M10 36v-7.5h7.5" />
		<rect x="16" y="15" width="8" height="10" class="accent" />
	{:else}
		<rect x="10" y="4" width="20" height="32" />
		<path d="M10 36h20M20 4v32" />
		<rect x="13" y="17" width="14" height="9" class="accent" />
	{/if}
</svg>

<style>
	svg {
		color: var(--color-navy);
	}

	.accent {
		color: var(--color-teal);
		stroke: var(--color-teal);
	}
</style>
