<!-- Full-bleed photo with white text. Navy shade only where text sits (bottom, and left on wide screens). -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Photo } from '#lib/photos.ts';
	import PhotoCredit from './PhotoCredit.svelte';

	let {
		photo,
		tall = false,
		center = false,
		children,
		...rest
	}: { photo: Photo; tall?: boolean; center?: boolean; children: Snippet } & HTMLAttributes<HTMLElement> =
		$props();
</script>

<section class="page-hero on-dark" class:tall class:center {...rest}>
	<img
		src={photo.src}
		srcset={photo.wide ? `${photo.src} 960w, ${photo.wide} 1920w` : undefined}
		sizes="100vw"
		alt={photo.alt}
		width={photo.width}
		height={photo.height}
		fetchpriority="high"
	/>
	<div class="container content">
		{@render children()}
	</div>
	<p class="credit small"><PhotoCredit {photo} /></p>
</section>

<style>
	.page-hero {
		position: relative;
		isolation: isolate;
		display: grid;
		align-content: end;
		min-height: min(72svh, 640px);
		overflow: hidden;
	}

	.page-hero.tall {
		min-height: min(88svh, 860px);
	}

	img {
		position: absolute;
		inset: 0;
		z-index: -2;
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* Slight cool grade so the photo sits with navy/teal (DESIGN_SYSTEM.md §7) */
		filter: saturate(0.7) contrast(1.05);
	}

	.page-hero::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			to top,
			color-mix(in srgb, var(--color-navy) 96%, transparent) 0%,
			color-mix(in srgb, var(--color-navy) 82%, transparent) 50%,
			color-mix(in srgb, var(--color-navy) 20%, transparent) 90%
		);
	}

	.content {
		width: 100%;
		padding-top: var(--space-128);
		padding-bottom: var(--space-64);
	}

	.content :global(p:not(.label)) {
		color: var(--color-line);
	}

	/* Centred variant (homepage, as in the client's mockup): even shade over the whole photo */
	.center {
		align-content: center;
		text-align: center;
	}

	.center .content {
		padding-block: var(--space-96);
	}

	.center .content :global(> *) {
		margin-inline: auto;
	}

	.center .content :global(.button-row) {
		justify-content: center;
	}

	.page-hero.center::before {
		background: color-mix(in srgb, var(--color-navy) 55%, transparent);
	}

	.credit {
		position: absolute;
		right: var(--side);
		bottom: var(--space-12);
		max-width: none;
		color: var(--color-teal-mist);
		font-size: 0.75rem;
	}

	.credit :global(a) {
		color: inherit;
	}

	@media (min-width: 960px) {
		.page-hero::before {
			background:
				linear-gradient(
					90deg,
					color-mix(in srgb, var(--color-navy) 80%, transparent) 0%,
					color-mix(in srgb, var(--color-navy) 40%, transparent) 50%,
					transparent 75%
				),
				linear-gradient(
					to top,
					color-mix(in srgb, var(--color-navy) 92%, transparent) 0%,
					transparent 60%
				);
		}

		.content {
			padding-bottom: var(--space-96);
		}
	}
</style>
