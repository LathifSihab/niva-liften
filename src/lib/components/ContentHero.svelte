<!-- PageHero for inner pages, filled from the page's `hero` content -->
<script lang="ts">
	import type { Hero } from '#lib/content.ts';
	import { photoOf } from '#lib/content.svelte.ts';
	import PageHero from './PageHero.svelte';
	import Text from './Text.svelte';

	let { hero }: { hero: Hero } = $props();
</script>

<PageHero photo={photoOf(hero.photo)}>
	<div class="hero-intro">
		<p class="label">{hero.label}</p>
		<h1><Text text={hero.title} /></h1>
		<p class="lead"><Text text={hero.lead} /></p>
		{#if hero.button.label}
			<a class="button button-primary" href={hero.button.href}>{hero.button.label}</a>
		{/if}
	</div>
</PageHero>
