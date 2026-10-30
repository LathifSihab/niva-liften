<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import ContentHero from '#lib/components/ContentHero.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import Text from '#lib/components/Text.svelte';
	import { content } from '#lib/content.svelte.ts';

	let page = $derived(content.data.pages.liftonderhoud);
</script>

<Seo seo={page.seo} />

<ContentHero hero={page.hero} />

<section class="section tight" aria-labelledby="vve-title">
	<div class="container two-col">
		<div>
			<h2 id="vve-title"><Text text={page.intro.title} /></h2>
			<p class="lead"><Text text={page.intro.lead} /></p>
			<p><Text text={page.intro.text} /></p>
		</div>
		<div class="card card-body">
			<p class="label">{page.intro.cardLabel}</p>
			<CheckList items={page.intro.items} columns={1} />
		</div>
	</div>
</section>

<section class="section tight on-dark" aria-labelledby="iot-title">
	<div class="container two-col">
		<div>
			<p class="label">{page.iot.label}</p>
			<h2 id="iot-title"><Text text={page.iot.title} /></h2>
			<p class="lead iot-lead"><Text text={page.iot.lead} /></p>
			<p class="small iot-note"><Text text={page.iot.note} /></p>
		</div>
		<div>
			<p class="label">{page.iot.itemsLabel}</p>
			<CheckList items={page.iot.items} columns={1} />
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="andere-title">
	<div class="container">
		<h2 id="andere-title" class="section-title"><Text text={page.otherTitle} /></h2>
		<ServiceCards exclude="/diensten/liftonderhoud" />
	</div>
</section>

<CtaBand cta={page.cta} />

<style>
	.iot-lead {
		color: var(--color-line);
	}

	.iot-note {
		margin-top: var(--space-16);
		color: var(--color-teal-mist);
	}

	.on-dark .label {
		margin-bottom: var(--space-16);
	}
</style>
