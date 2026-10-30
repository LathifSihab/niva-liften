<script lang="ts">
	import type { Post } from '#lib/nieuws.ts';
	import { formatDate } from '#lib/site.ts';

	let { post, level = 3 }: { post: Post; level?: 2 | 3 } = $props();
</script>

<article class="card news-item">
	<p class="label">
		<time class="num" datetime={post.date}>{formatDate(post.date)}</time> · {post.category}
	</p>
	<svelte:element this={`h${level}`} class="h3">
		<a href="/nieuws/{post.slug}">{post.title}</a>
	</svelte:element>
	<p class="excerpt">{post.excerpt}</p>
	<p class="more" aria-hidden="true">Lees meer</p>
</article>

<style>
	.news-item {
		position: relative;
		display: grid;
		align-content: start;
		gap: var(--space-12);
		height: 100%;
		padding: var(--space-32);
		transition: box-shadow 0.2s;
	}

	.news-item:hover {
		box-shadow: var(--shadow-card-hover);
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

	.news-item:hover a {
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
		margin-top: var(--space-8);
		color: var(--color-teal);
		font-weight: 600;
	}
</style>
