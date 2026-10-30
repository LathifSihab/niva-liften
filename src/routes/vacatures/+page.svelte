<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import ContentHero from '#lib/components/ContentHero.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Text from '#lib/components/Text.svelte';
	import { content } from '#lib/content.svelte.ts';

	let page = $derived(content.data.pages.vacatures);
</script>

<Seo seo={page.seo} />

<ContentHero hero={page.hero} />

<section class="section tight" aria-labelledby="vacatures-title">
	<div class="container two-col">
		<div>
			<h2 id="vacatures-title"><Text text={page.openings.title} /></h2>
			<p class="lead"><Text text={page.openings.text} /></p>
		</div>
		<div class="card card-body">
			<p class="label">{page.facts.label}</p>
			<CheckList items={page.facts.items} columns={1} />
		</div>
	</div>
</section>

<CtaBand cta={page.cta} />
