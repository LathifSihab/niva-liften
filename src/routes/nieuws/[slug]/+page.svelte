<script lang="ts">
	import { formatDate } from '#lib/site.ts';

	let { data } = $props();
	let post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} | Nivå Liften</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="section tight">
	<div class="container">
		<p class="label">
			<time class="num" datetime={post.date}>{formatDate(post.date)}</time> · {post.category}
		</p>
		<h1>{post.title}</h1>
		<p class="lead">{post.excerpt}</p>
		<div class="prose">
			<post.content />
		</div>
		<p class="back"><a href="/nieuws">Alle berichten</a></p>
	</div>
</article>

<style>
	h1 {
		max-width: 20ch;
		margin-block: var(--space-16) var(--space-24);
	}

	.prose {
		max-width: 65ch;
		margin-top: var(--space-48);
	}

	.prose :global(h2) {
		margin-block: var(--space-48) var(--space-16);
		font-size: var(--text-h3);
	}

	.prose :global(p + p) {
		margin-top: var(--space-16);
	}

	.back {
		margin-top: var(--space-64);
		padding-top: var(--space-24);
		border-top: 1px solid var(--color-line);
	}
</style>
