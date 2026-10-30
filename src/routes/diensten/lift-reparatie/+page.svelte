<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Phone from '#lib/components/Phone.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import { photos } from '#lib/photos.ts';

	const promises = [
		'24/7 bereikbaar',
		'Eigen monteurs',
		'Kennis van alle grote merken',
		'Korte lijnen'
	];
</script>

<svelte:head>
	<title>Lift reparatie en storingen, 24/7 | Nivå Liften</title>
	<meta
		name="description"
		content="Lift reparatie door Nivå Liften: storingsdienst 24/7 bereikbaar, eigen monteurs, voor alle merken liften."
	/>
</svelte:head>

<PageHero photo={photos.liftMachine}>
	<div class="hero-intro">
		<p class="label">Diensten</p>
		<h1>Liftreparatie en storingen</h1>
		<p class="lead">
			Storing of opsluiting? Onze storingsdienst is 24/7 bereikbaar. Eigen monteurs, voor alle
			merken.
		</p>
		<a class="button button-primary" href="/contact?type=Reparatie%20of%20storing">
			Reparatie aanvragen
		</a>
	</div>
</PageHero>

<section class="storing on-dark" aria-labelledby="storing-title">
	<div class="container storing-inner">
		<h2 id="storing-title" class="h3">Bel direct onze 24/7 storingsdienst</h2>
		<p class="h2"><Phone /></p>
	</div>
</section>

<section class="section tight" aria-labelledby="hulp-title">
	<div class="container two-col">
		<div>
			<h2 id="hulp-title">Snelle hulp bij storingen en defecten</h2>
			<p class="lead">
				Een lift die stilstaat, raakt iedereen in het gebouw. Daarom is onze storingsdienst dag en
				nacht bereikbaar, en werken wij met eigen monteurs die alle grote merken kennen.
			</p>
		</div>
		<div class="card card-body">
			<p class="label">Daar kunt u op rekenen</p>
			<CheckList items={promises} columns={1} />
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="voorkomen-title">
	<div class="container two-col">
		<div>
			<h2 id="voorkomen-title">Storingen voorkomen</h2>
			<p>
				Regelmatig <a href="/diensten/liftonderhoud">liftonderhoud</a> voorkomt veel storingen. Met
				de SafetyBlueBox-module kan Nivå bovendien opsluitingen op afstand verhelpen: de lift wordt
				via de smartphone naar een andere verdieping gestuurd en de deuren gaan open.
			</p>
			<p class="small note">Inmiddels zijn vijf installaties uitgerust met de module.</p>
		</div>
	</div>
</section>

<section class="section tight" aria-labelledby="andere-title">
	<div class="container">
		<h2 id="andere-title" class="section-title">Andere <strong>diensten</strong></h2>
		<ServiceCards exclude="/diensten/lift-reparatie" />
	</div>
</section>

<CtaBand
	primary={{ label: 'Reparatie aanvragen', href: '/contact?type=Reparatie%20of%20storing' }}
	secondary={{ label: 'Contact opnemen', href: '/contact' }}
>
	{#snippet title()}Is uw lift <strong>defect</strong>?{/snippet}
</CtaBand>

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
