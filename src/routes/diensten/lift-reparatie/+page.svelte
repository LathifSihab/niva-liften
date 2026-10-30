<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import ContentHero from '#lib/components/ContentHero.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Phone from '#lib/components/Phone.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import Text from '#lib/components/Text.svelte';
	import { content } from '#lib/content.svelte.ts';

	let page = $derived(content.data.pages.liftReparatie);
</script>

<Seo seo={page.seo} />

<ContentHero hero={page.hero} />

<section class="storing on-dark" aria-labelledby="storing-title">
	<div class="container storing-inner">
		<h2 id="storing-title" class="h3"><Text text={page.storingTitle} /></h2>
		<p class="h2"><Phone /></p>
	</div>
</section>

<section class="section tight" aria-labelledby="hulp-title">
	<div class="container two-col">
		<div>
			<h2 id="hulp-title"><Text text={page.help.title} /></h2>
			<p class="lead"><Text text={page.help.lead} /></p>
		</div>
		<div class="card card-body">
			<p class="label">{page.help.cardLabel}</p>
			<CheckList items={page.help.items} columns={1} />
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="voorkomen-title">
	<div class="container two-col">
		<div>
			<h2 id="voorkomen-title"><Text text={page.prevent.title} /></h2>
			<p><Text text={page.prevent.text} /></p>
			<p class="small note"><Text text={page.prevent.note} /></p>
		</div>
	</div>
</section>

<section class="section tight" aria-labelledby="andere-title">
	<div class="container">
		<h2 id="andere-title" class="section-title"><Text text={page.otherTitle} /></h2>
		<ServiceCards exclude="/diensten/lift-reparatie" />
	</div>
</section>

<CtaBand cta={page.cta} />

<style>
	.storing {
		background: var(--color-teal-deep);
	}

	.storing-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-8) var(--space-32);
		padding-block: var(--space-32);
	}

	.storing p {
		max-width: none;
	}

	.note {
		margin-top: var(--space-16);
		color: var(--color-steel);
	}
</style>
