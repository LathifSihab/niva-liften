<!-- Full-screen photo hero used on every page. White text; navy shade only where text sits
     (bottom, and left on wide screens). Motion (CSS only, motion-safe): slow zoom-out on the
     photo, text rises in one element at a time, scroll cue to the content below. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Photo } from '#lib/photos.ts';
	import LiftIntro from './LiftIntro.svelte';
	import PhotoCredit from './PhotoCredit.svelte';

	let {
		photo,
		center = false,
		doors = false,
		children,
		...rest
	}: {
		photo: Photo;
		center?: boolean;
		/** Lift-entrance intro (LiftIntro): doors open on load, close again when scrolling away */
		doors?: boolean;
		children: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<section class="page-hero on-dark" class:center class:with-doors={doors} {...rest}>
	{#if doors}
		<LiftIntro />
	{/if}
	<img
		src={photo.src}
		srcset={photo.wide ? `${photo.src} 960w, ${photo.wide} ${photo.wideWidth ?? 1920}w` : undefined}
		sizes="100vw"
		alt={photo.alt}
		width={photo.width}
		height={photo.height}
		fetchpriority="high"
	/>
	<div class="container content">
		{@render children()}
	</div>
	<a class="scroll-cue" href="#inhoud" aria-label="Naar de inhoud">
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" />
		</svg>
	</a>
	<p class="credit small"><PhotoCredit {photo} /></p>
</section>
<!-- Target of the scroll cue: the content right below the hero (one hero per page) -->
<span id="inhoud"></span>

<style>
	.page-hero {
		position: relative;
		isolation: isolate;
		display: grid;
		align-content: end;
		/* Fill the screen below the header and top bar */
		min-height: calc(100svh - var(--header-h) - var(--topbar-h));
		/* clip, not hidden: hidden would make this a scroll container and break the doors' view() timeline */
		overflow: clip;
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

	.scroll-cue {
		position: absolute;
		bottom: var(--space-48);
		left: 50%;
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		margin-left: -24px;
		border: 1px solid color-mix(in srgb, var(--color-white) 45%, transparent);
		border-radius: 50%;
		color: var(--color-white);
	}

	.scroll-cue:hover {
		border-color: var(--color-white);
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

	@media (prefers-reduced-motion: no-preference) {
		.page-hero {
			--intro-delay: 0s;
		}

		.with-doors {
			/* Text waits until the doors are open; LiftIntro scrolls on this timeline */
			--intro-delay: 1.3s;
			view-timeline: --hero block;
		}

		img {
			animation: hero-zoom 14s cubic-bezier(0.16, 0.6, 0.3, 1) both;
		}

		.content > :global(:not(.hero-intro)),
		.content :global(.hero-intro > *) {
			animation: hero-rise 0.9s var(--intro-delay) cubic-bezier(0.2, 0.7, 0.2, 1) both;
		}

		.content > :global(:nth-child(2)),
		.content :global(.hero-intro > :nth-child(2)) {
			animation-delay: calc(var(--intro-delay) + 0.12s);
		}

		.content > :global(:nth-child(3)),
		.content :global(.hero-intro > :nth-child(3)) {
			animation-delay: calc(var(--intro-delay) + 0.24s);
		}

		.content > :global(:nth-child(4)),
		.content :global(.hero-intro > :nth-child(4)) {
			animation-delay: calc(var(--intro-delay) + 0.36s);
		}

		.scroll-cue {
			animation:
				hero-rise 0.9s calc(var(--intro-delay) + 0.6s) cubic-bezier(0.2, 0.7, 0.2, 1) both,
				hero-bob 2.4s calc(var(--intro-delay) + 1.5s) ease-in-out infinite;
		}
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
