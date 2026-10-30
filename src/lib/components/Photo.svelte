<script lang="ts">
	import type { Photo } from '#lib/photos.ts';
	import PhotoCredit from './PhotoCredit.svelte';

	let {
		photo,
		ratio = '4 / 5',
		eager = false
	}: { photo: Photo; ratio?: string; eager?: boolean } = $props();
</script>

<figure>
	<div class="frame" style:aspect-ratio={ratio}>
		<img
			src={photo.src}
			alt={photo.alt}
			width={photo.width}
			height={photo.height}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : undefined}
			decoding="async"
		/>
	</div>
	<figcaption class="small"><PhotoCredit {photo} /></figcaption>
</figure>

<style>
	.frame {
		overflow: hidden;
		background: var(--color-surface);
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
	}

	figcaption {
		margin-top: var(--space-8);
		color: var(--color-steel);
	}

	figcaption :global(a) {
		color: inherit;
	}

	:global(.on-dark) figcaption {
		color: var(--color-teal-mist);
	}
</style>
