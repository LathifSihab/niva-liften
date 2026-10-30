<script lang="ts">
	import type { Photo } from '#lib/photos.ts';

	let {
		photo,
		ratio = '4 / 5',
		eager = false
	}: { photo: Photo; ratio?: string; eager?: boolean } = $props();
</script>

<figure>
	<img
		src={photo.src}
		alt={photo.alt}
		width={photo.width}
		height={photo.height}
		style:aspect-ratio={ratio}
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : undefined}
		decoding="async"
	/>
	<figcaption class="small">
		Voorbeeldfoto · <a href={photo.credit.source}>{photo.credit.author}</a>,
		<a href={photo.credit.licenseUrl}>{photo.credit.license}</a>
	</figcaption>
</figure>

<style>
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	figcaption {
		margin-top: var(--space-8);
		color: var(--color-steel);
	}

	figcaption a {
		color: inherit;
	}
</style>
