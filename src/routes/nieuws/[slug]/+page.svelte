<script lang="ts">
	import NewsItem from '#lib/components/NewsItem.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { posts } from '#lib/nieuws.ts';
	import { formatDate } from '#lib/site.ts';

	let { data } = $props();
	let post = $derived(data.post);
	let more = $derived(posts.filter((p) => p.slug !== post.slug).slice(0, 3));
</script>

<svelte:head>
	<title>{post.title} | Nivå Liften</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<PageHero photo={post.photo}>
	<div class="hero-intro">
		<p class="label">
			<time class="num" datetime={post.date}>{formatDate(post.date)}</time> · {post.category}
		</p>
		<h1>{post.title}</h1>
		<p class="lead">{post.excerpt}</p>
	</div>
</PageHero>

<article class="section tight">
	<div class="container article">
		<div class="prose">
			<post.content />
		</div>
		<p class="back"><a href="/nieuws">Alle berichten</a></p>
	</div>
</article>

<section class="section tight surface" aria-labelledby="meer-title">
	<div class="container">
		<h2 id="meer-title" class="section-title">Meer <strong>nieuws</strong></h2>
		<div class="three-up">
			{#each more as item (item.slug)}
				<NewsItem post={item} />
			{/each}
		</div>
	</div>
</section>

<style>
	.article {
		max-width: calc(52rem + 2 * var(--side));
	}

	.prose :global(h2) {
		margin-block: var(--space-48) var(--space-16);
		font-size: var(--text-h3);
	}

	.prose :global(p + p),
	.prose :global(ul + p),
	.prose :global(p + ul) {
		margin-top: var(--space-16);
	}

	.prose :global(ul) {
		display: grid;
		gap: var(--space-8);
		padding-left: 1.25em;
	}

	.back {
		margin-top: var(--space-64);
		padding-top: var(--space-24);
		border-top: 1px solid var(--color-line);
	}
</style>
