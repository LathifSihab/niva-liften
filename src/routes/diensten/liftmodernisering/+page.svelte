<script lang="ts">
	import Photo from '#lib/components/Photo.svelte';
	import { photos } from '#lib/photos.ts';
	import { suppliers } from '#lib/site.ts';

	const parts = [
		{ title: 'Besturing', text: 'De regelaar die bepaalt hoe de lift rijdt en op oproepen reageert.' },
		{ title: 'Machine', text: 'De aandrijving die de kooi beweegt.' },
		{ title: 'Deuren', text: 'Schachtdeuren en kooideuren, inclusief de deuraandrijving.' },
		{ title: 'Drukknoptableaus', text: 'De bediening in de kooi en op de verdiepingen.' }
	];
</script>

<svelte:head>
	<title>Liftmodernisering | Nivå Liften</title>
	<meta
		name="description"
		content="Liftmodernisering door Nivå Liften: besturing, machine, deuren en tableaus vernieuwen in plaats van de hele lift vervangen. 60–70 moderniseringen per jaar, voor elk merk."
	/>
</svelte:head>

<section class="intro">
	<div class="container intro-grid">
		<div class="intro-text">
			<p class="label">Diensten</p>
			<h1>Liftmodernisering</h1>
			<p class="lead">
				Renoveren in plaats van vervangen. Nivå moderniseert 60 tot 70 liften per jaar, van alle
				merken.
			</p>
			<div class="button-row">
				<a class="button button-primary" href="/contact">Modernisering bespreken</a>
			</div>
		</div>
		<Photo photo={photos.controllerCabinets} eager />
	</div>
</section>

<section class="section tight surface" aria-labelledby="parts-title">
	<div class="container">
		<h2 id="parts-title">Wat wij vernieuwen</h2>
		<p class="lead section-intro">
			Niet elk onderdeel van een lift veroudert even snel. Wij vervangen wat nodig is en houden wat
			nog goed is.
		</p>
		<dl class="parts">
			{#each parts as part (part.title)}
				<div>
					<dt class="h3">{part.title}</dt>
					<dd>{part.text}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section class="section" aria-labelledby="compleet-title">
	<div class="container columns">
		<div>
			<h2 id="compleet-title">Modernisering compleet</h2>
			<p>
				Worden alle hoofdcomponenten vernieuwd, dan spreken wij van een complete modernisering. Zo
				moderniseerden wij zeven liften van Student Hotel volledig.
			</p>
		</div>
		<div>
			<h2>Marktvrije onderdelen</h2>
			<p>
				Wij kiezen voor marktvrije componenten: onderdelen die elk liftbedrijf kan onderhouden. Zo zit
				u na de modernisering niet vast aan één merk of leverancier.
			</p>
		</div>
	</div>
</section>

<section class="section tight on-dark" aria-labelledby="suppliers-title">
	<div class="container">
		<h2 id="suppliers-title" class="label">Wij werken onder meer met componenten van</h2>
		<ul class="plain-list suppliers">
			{#each suppliers as supplier (supplier)}
				<li class="h3">{supplier}</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section tight" aria-labelledby="cta-title">
	<div class="container">
		<h2 id="cta-title">Wat is de beste keuze voor uw lift?</h2>
		<p class="lead cta-text">
			Wij bekijken uw installatie en adviseren welke onderdelen u nu vernieuwt en welke later kunnen.
		</p>
		<a class="button button-primary" href="/contact">Modernisering bespreken</a>
	</div>
</section>

<style>
	.intro {
		padding-block: var(--space-48) var(--space-64);
	}

	.intro-grid {
		display: grid;
		gap: var(--space-48);
	}

	.intro-text {
		display: grid;
		align-content: center;
		gap: var(--space-24);
	}

	h2:not(.label) {
		margin-bottom: var(--space-16);
	}

	.section-intro {
		margin-bottom: var(--space-48);
	}

	.parts {
		display: grid;
		gap: 0 var(--gutter);
	}

	.parts div {
		padding-block: var(--space-24);
		border-top: 1px solid var(--color-line);
	}

	.parts dd {
		margin-top: var(--space-8);
		color: var(--color-steel);
	}

	.columns {
		display: grid;
		gap: var(--space-48);
	}

	.suppliers {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-16) var(--space-48);
		margin-top: var(--space-24);
	}

	.cta-text {
		margin-bottom: var(--space-32);
	}

	@media (min-width: 640px) {
		.parts {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 960px) {
		.intro {
			padding-block: var(--space-64) var(--space-96);
		}

		.intro-grid {
			grid-template-columns: 7fr 5fr;
		}

		.parts {
			grid-template-columns: repeat(4, 1fr);
		}

		.columns {
			grid-template-columns: 1fr 1fr;
			gap: var(--space-96);
		}
	}
</style>
