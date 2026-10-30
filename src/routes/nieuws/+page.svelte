<script lang="ts">
	import NewsItem from '#lib/components/NewsItem.svelte';
	import { posts } from '#lib/nieuws.ts';
</script>

<svelte:head>
	<title>Nieuws | Nivå Liften</title>
	<meta name="description" content="Nieuws en advies over liftonderhoud en liftmodernisering van Nivå Liften." />
</svelte:head>

<section class="section tight">
	<div class="container">
		<h1>Nieuws</h1>
		<div class="list">
			{#each posts as post (post.slug)}
				<NewsItem {post} level={2} />
			{/each}
		</div>
	</div>
</section>

<style>
	.list {
		max-width: 50rem;
		margin-top: var(--space-48);
	}
</style>
