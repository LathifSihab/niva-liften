<script lang="ts">
	import ContentHero from '#lib/components/ContentHero.svelte';
	import NewsItem from '#lib/components/NewsItem.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { content } from '#lib/content.svelte.ts';

	let page = $derived(content.data.pages.nieuws);
</script>

<Seo seo={page.seo} />

<ContentHero hero={page.hero} />

<section class="section tight">
	<div class="container">
		<div class="three-up">
			{#each content.posts as post (post.slug)}
				<NewsItem {post} level={2} />
			{/each}
		</div>
	</div>
</section>
