<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { photos } from '#lib/photos.ts';
	import { PLACEHOLDER } from '#lib/site.ts';

	// Facts from the Bedrijfspresentatie (p.3, p.15)
	const facts = [
		'Eigen monteurs',
		'Alle fabricaten, van Otis tot marktvrij',
		'25 collega’s, 1.200 installaties in onderhoud',
		'60–70 moderniseringen per jaar'
	];
</script>

<svelte:head>
	<title>Vacatures | Werken bij Nivå Liften</title>
	<meta
		name="description"
		content="Werken bij Nivå Liften: liftonderhoud, reparatie en modernisering met eigen monteurs. Bekijk de vacatures of stuur een open sollicitatie."
	/>
</svelte:head>

<PageHero photo={photos.liftInstallation}>
	<div class="hero-intro">
		<p class="label">Vacatures</p>
		<h1>Werken bij Nivå Liften</h1>
		<p class="lead">Nivå werkt met eigen monteurs aan liften van alle merken.</p>
	</div>
</PageHero>

<section class="section tight" aria-labelledby="vacatures-title">
	<div class="container two-col">
		<div>
			<h2 id="vacatures-title">Openstaande vacatures</h2>
			<p class="lead"><span class="placeholder">{PLACEHOLDER}</span></p>
		</div>
		<div class="card card-body">
			<p class="label">Werken bij Nivå</p>
			<CheckList items={facts} columns={1} />
		</div>
	</div>
</section>

<CtaBand
	text="Staat uw functie er niet bij? Stuur ons een open sollicitatie."
	primary={{ label: 'Open sollicitatie', href: '/contact' }}
	secondary={{ label: 'Contact opnemen', href: '/contact' }}
>
	{#snippet title()}Interesse in <strong>Nivå</strong>?{/snippet}
</CtaBand>
