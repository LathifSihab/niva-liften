<script lang="ts">
	import type { Post } from '#lib/nieuws.ts';
	import { formatDate } from '#lib/site.ts';

	let { post, level = 3 }: { post: Post; level?: 2 | 3 } = $props();
</script>

<article class="news-item">
	<p class="label">
		<time class="num" datetime={post.date}>{formatDate(post.date)}</time> · {post.category}
	</p>
	<svelte:element this={`h${level}`} class="h3">
		<a href="/nieuws/{post.slug}">{post.title}</a>
	</svelte:element>
	<p class="excerpt">{post.excerpt}</p>
</article>

<style>
	.news-item {
		display: grid;
		gap: var(--space-8);
		padding-block: var(--space-24);
		border-top: 1px solid var(--color-line);
	}

	a {
		color: var(--color-navy);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-teal);
		text-decoration: underline;
	}

	.excerpt {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: var(--color-steel);
	}
</style>
