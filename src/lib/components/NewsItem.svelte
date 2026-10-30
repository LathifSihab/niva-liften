<script lang="ts">
	import type { Post } from '#lib/nieuws.ts';
	import { formatDate } from '#lib/site.ts';
	import PhotoCredit from './PhotoCredit.svelte';

	// Without `content`, so the CMS preview can show a draft in the same card
	let { post, level = 3 }: { post: Omit<Post, 'content'>; level?: 2 | 3 } = $props();
</script>

<article class="card news-item">
	<div class="image">
		<img
			src={post.photo.src}
			alt=""
			width={post.photo.width}
			height={post.photo.height}
			loading="lazy"
			decoding="async"
		/>
	</div>
	<div class="body">
		<p class="label">
			<time class="num" datetime={post.date}>{formatDate(post.date)}</time> · {post.category}
		</p>
		<svelte:element this={`h${level}`} class="h3">
			<a href="/nieuws/{post.slug}">{post.title}</a>
		</svelte:element>
		<p class="excerpt">{post.excerpt}</p>
		<p class="more" aria-hidden="true">Lees meer</p>
		<p class="credit"><PhotoCredit photo={post.photo} /></p>
	</div>
</article>

<style>
	.news-item {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		transition: box-shadow 0.2s;
	}

	.news-item:hover {
		box-shadow: var(--shadow-card-hover);
	}

	/* Decorative here (alt=""): the title says what the post is about */
	.image {
		aspect-ratio: 16 / 10;
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

		.news-item:hover img {
			transform: scale(1.04);
		}
	}

	.body {
		display: grid;
		flex: 1;
		align-content: start;
		gap: var(--space-12);
		padding: var(--space-24) var(--space-24) var(--space-16);
	}

	a {
		color: var(--color-navy);
		text-decoration: none;
	}

	/* Whole card clickable via the title link */
	a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.news-item:hover h2 a,
	.news-item:hover h3 a {
		color: var(--color-teal);
	}

	.excerpt {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: var(--color-steel);
	}

	.more {
		color: var(--color-teal);
		font-weight: 600;
	}

	/* Credit links sit above the card's stretched link so they stay clickable */
	.credit {
		position: relative;
		z-index: 1;
		margin-top: var(--space-8);
		color: var(--color-steel);
		font-size: 0.75rem;
	}

	.credit :global(a) {
		color: inherit;
		text-decoration: underline;
	}
</style>
