<!-- Photo tile with a dark caption bar, as in the client's mockup ("Recente projecten") -->
<script lang="ts">
	import type { Project } from '#lib/content.ts';
	import { photoOf } from '#lib/content.svelte.ts';
	import { PLACEHOLDER } from '#lib/site.ts';
	import PhotoCredit from './PhotoCredit.svelte';

	let { project, level = 3 }: { project: Project; level?: 2 | 3 } = $props();
	let photo = $derived(photoOf(project.photo));
</script>

<article class="project">
	<div class="tile">
		<img
			src={photo.src}
			alt={photo.alt}
			width={photo.width}
			height={photo.height}
			loading="lazy"
			decoding="async"
		/>
		<div class="bar">
			<p class="label">
				{project.category} · {project.location || PLACEHOLDER}
			</p>
			<svelte:element this={`h${level}`} class="name">{project.name}</svelte:element>
			<p class="scope">{project.scope || PLACEHOLDER}</p>
		</div>
	</div>
	<p class="credit"><PhotoCredit {photo} /></p>
</article>

<style>
	.tile {
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		border-radius: var(--radius);
		background: var(--color-surface);
		box-shadow: var(--shadow-card);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (prefers-reduced-motion: no-preference) {
		img {
			transition: transform 0.6s cubic-bezier(0.2, 0.6, 0.2, 1);
		}

		.project:hover img {
			transform: scale(1.04);
		}
	}

	.bar {
		position: absolute;
		inset: auto 0 0;
		display: grid;
		gap: var(--space-4);
		padding: var(--space-48) var(--space-24) var(--space-16);
		background: linear-gradient(
			to top,
			color-mix(in srgb, var(--color-navy) 92%, transparent) 55%,
			transparent
		);
		color: var(--color-white);
	}

	.bar .label {
		color: var(--color-teal-mist);
	}

	.name {
		font-size: var(--text-h3);
		font-weight: 700;
		line-height: 1.2;
	}

	.scope {
		color: var(--color-line);
		font-size: var(--text-small);
	}

	.credit {
		margin-top: var(--space-8);
		color: var(--color-steel);
		font-size: 0.75rem;
	}

	.credit :global(a) {
		color: inherit;
	}
</style>
