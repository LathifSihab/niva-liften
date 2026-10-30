<script lang="ts">
	import NewsItem from '#lib/components/NewsItem.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { posts } from '#lib/nieuws.ts';
	import { photos } from '#lib/photos.ts';
</script>

<svelte:head>
	<title>Nieuws | Nivå Liften</title>
	<meta name="description" content="Nieuws en advies over liftonderhoud en liftmodernisering van Nivå Liften." />
</svelte:head>

<PageHero photo={photos.modernisedLifts}>
	<div class="hero-intro">
		<p class="label">Nieuws</p>
		<h1>Nieuws en advies</h1>
		<p class="lead">
			Nieuws van Nivå en praktisch advies over onderhoud en modernisering van uw lift.
		</p>
	</div>
</PageHero>

<section class="section tight">
	<div class="container">
		<div class="three-up">
			{#each posts as post (post.slug)}
				<NewsItem {post} level={2} />
			{/each}
		</div>
	</div>
</section>
