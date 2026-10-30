<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import { photos } from '#lib/photos.ts';
	import { parts, projects } from '#lib/site.ts';

	const modernisering = projects.filter((p) => p.category === 'Modernisering');
</script>

<svelte:head>
	<title>Liftmodernisering | Nivå Liften</title>
	<meta
		name="description"
		content="Liftmodernisering door Nivå Liften: besturing, machine, deuren en tableaus vernieuwen in plaats van de hele lift vervangen. 60–70 moderniseringen per jaar, voor elk merk."
	/>
</svelte:head>

<PageHero photo={photos.controllerCabinets}>
	<div class="hero-intro">
		<p class="label">Diensten</p>
		<h1>Liftmodernisering</h1>
		<p class="lead">
			Renoveren in plaats van vervangen. Nivå moderniseert 60 tot 70 liften per jaar, van alle
			merken.
		</p>
		<a class="button button-primary" href="/contact?type=Modernisering">Modernisering bespreken</a>
	</div>
</PageHero>

<section class="section tight" aria-labelledby="intro-title">
	<div class="container two-col">
		<div>
			<h2 id="intro-title">Geef uw lift een tweede leven</h2>
			<p class="lead">
				Een verouderde lift hoeft niet in zijn geheel te worden vervangen. Niet elk onderdeel
				veroudert even snel: wij vervangen wat nodig is en houden wat nog goed is.
			</p>
			<p>
				Worden alle hoofdcomponenten vernieuwd, dan spreken wij van een complete modernisering. Zo
				moderniseerden wij zeven liften van Student Hotel volledig.
			</p>
		</div>
		<div class="card card-body">
			<p class="label">Marktvrije onderdelen</p>
			<p>
				Wij kiezen voor marktvrije componenten: onderdelen die elk liftbedrijf kan onderhouden. Zo
				zit u na de modernisering niet vast aan één merk of leverancier.
			</p>
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="parts-title">
	<div class="container">
		<h2 id="parts-title" class="section-title">Wat wij <strong>vernieuwen</strong></h2>
		<ul class="plain-list parts">
			{#each parts as part (part.title)}
				<li class="card card-body">
					<h3>{part.title}</h3>
					<p>{part.text}</p>
					<p class="label suppliers">{part.suppliers.join(' · ')}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section tight" aria-labelledby="projecten-title">
	<div class="container">
		<h2 id="projecten-title" class="section-title">Modernisering <strong>projecten</strong></h2>
		<div class="three-up">
			{#each modernisering as project (project.name)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="andere-title">
	<div class="container">
		<h2 id="andere-title" class="section-title">Andere <strong>diensten</strong></h2>
		<ServiceCards exclude="/diensten/liftmodernisering" />
	</div>
</section>

<CtaBand
	primary={{ label: 'Modernisering bespreken', href: '/contact?type=Modernisering' }}
	secondary={{ label: 'Offerte aanvragen', href: '/contact?type=Modernisering' }}
>
	{#snippet title()}Is uw lift <strong>verouderd</strong>?{/snippet}
</CtaBand>

<style>
	.parts {
		display: grid;
		gap: var(--gutter);
	}

	.parts li {
		display: grid;
		align-content: start;
		gap: var(--space-12);
		border-top: 3px solid var(--color-teal);
	}

	.parts p {
		color: var(--color-steel);
	}

	.parts .suppliers {
		margin-top: auto;
		padding-top: var(--space-8);
		color: var(--color-teal);
	}

	@media (min-width: 640px) {
		.parts {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 960px) {
		.parts {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
