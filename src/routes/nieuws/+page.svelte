<script lang="ts">
	import NewsItem from '#lib/components/NewsItem.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import { posts } from '#lib/nieuws.ts';
</script>

<svelte:head>
	<title>Nieuws | Nivå Liften</title>
	<meta name="description" content="Nieuws en advies over liftonderhoud en liftmodernisering van Nivå Liften." />
</svelte:head>

<PageHeader
	eyebrow="Nieuws"
	title="Nieuws en advies"
	lead="Nieuws van Nivå en praktisch advies over onderhoud en modernisering van uw lift."
/>

<section class="section tight">
	<div class="container">
		<div class="three-up">
			{#each posts as post (post.slug)}
				<NewsItem {post} level={2} />
			{/each}
		</div>
	</div>
</section>
