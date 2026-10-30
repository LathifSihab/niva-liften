<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import { photos } from '#lib/photos.ts';
	import { brands } from '#lib/site.ts';

	// Bedrijfspresentatie p.5 and p.15
	const included = [
		'Eigen monteurs',
		'Alle fabricaten, ook marktvrij',
		'24/7 storingsdienst',
		'Klantenportaal 24/7',
		'Marktconforme prijzen'
	];

	// IoT binnen Nivå, Bedrijfspresentatie p.13–14
	const iot = [
		'Storingen voorkomen',
		'Efficiënt onderhoud plegen',
		'Opsluitingen op afstand verhelpen',
		'MJOB-strategie benutten',
		'Dashboard voor de klant'
	];
</script>

<svelte:head>
	<title>Liftonderhoud voor alle merken | Nivå Liften</title>
	<meta
		name="description"
		content="Liftonderhoud door Nivå Liften: periodiek onderhoud voor alle merken en marktvrije liften. Voor VvE's en commerciële opdrachtgevers. 1.200 installaties in onderhoud."
	/>
</svelte:head>

<PageHero photo={photos.liftMotorRoom}>
	<div class="hero-intro">
		<p class="label">Diensten</p>
		<h1>Liftonderhoud</h1>
		<p class="lead">
			Periodiek onderhoud voor alle fabricaten: {brands.join(', ')} en marktvrije liften. Nivå heeft
			1.200 installaties in onderhoud.
		</p>
		<a class="button button-primary" href="/contact?type=Onderhoud">Onderhoud aanvragen</a>
	</div>
</PageHero>

<section class="section tight" aria-labelledby="vve-title">
	<div class="container two-col">
		<div>
			<h2 id="vve-title">Onderhoud voor VvE's en commerciële opdrachtgevers</h2>
			<p class="lead">
				Een betrouwbare lift begint bij regelmatig onderhoud. Nivå onderhoudt liften voor VvE's,
				woningcorporaties en commerciële opdrachtgevers, met eigen monteurs en korte lijnen.
			</p>
			<p>
				Als VvE-bestuur wilt u weten waar u aan toe bent. Via het klantenportaal heeft u 24/7
				inzicht, en voor vragen belt u rechtstreeks met Nivå.
			</p>
		</div>
		<div class="card card-body">
			<p class="label">Wat u van ons krijgt</p>
			<CheckList items={included} columns={1} />
		</div>
	</div>
</section>

<section class="section tight on-dark" aria-labelledby="iot-title">
	<div class="container two-col">
		<div>
			<p class="label">Vooruitblik</p>
			<h2 id="iot-title">24/7 verbonden</h2>
			<p class="lead iot-lead">
				Met de SafetyBlueBox-module is de liftcabine 24/7 verbonden met de cloud. De module meet
				vibraties, positie en rijgedrag. Monteurs zien zo vooraf waar de lift aandacht nodig heeft.
			</p>
			<p class="small iot-note">Inmiddels zijn vijf installaties uitgerust met de module.</p>
		</div>
		<div>
			<p class="label">Wat het oplevert</p>
			<CheckList items={iot} columns={1} />
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="andere-title">
	<div class="container">
		<h2 id="andere-title" class="section-title">Andere <strong>diensten</strong></h2>
		<ServiceCards exclude="/diensten/liftonderhoud" />
	</div>
</section>

<CtaBand
	primary={{ label: 'Onderhoud aanvragen', href: '/contact?type=Onderhoud' }}
	secondary={{ label: 'Contact opnemen', href: '/contact' }}
>
	{#snippet title()}Onderhoud voor <strong>uw lift</strong>?{/snippet}
</CtaBand>

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
