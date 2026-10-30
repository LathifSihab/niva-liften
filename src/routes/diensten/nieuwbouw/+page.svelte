<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import { photos } from '#lib/photos.ts';
	import { marsSpecs, projects } from '#lib/site.ts';

	const nieuwbouw = projects.filter((p) => p.category === 'Nieuwbouw');
</script>

<svelte:head>
	<title>Nieuwbouw liften en de corporatielift | Nivå Liften</title>
	<meta
		name="description"
		content="Nieuwe liftinstallaties door Nivå Liften: corporatieliften type Mars, goederenliften en homeliften."
	/>
</svelte:head>

<PageHero photo={photos.liftInstallation}>
	<div class="hero-intro">
		<p class="label">Diensten</p>
		<h1>Nieuwbouw</h1>
		<p class="lead">
			Nieuwe liftinstallaties op maat: van corporatielift tot goederenlift en homelift.
		</p>
		<a class="button button-primary" href="/contact?type=Nieuwbouw">Offerte aanvragen</a>
	</div>
</PageHero>

<section class="section tight" aria-labelledby="mars-title">
	<div class="container two-col">
		<div>
			<p class="label">Voor woningcorporaties</p>
			<h2 id="mars-title">De corporatielift type Mars</h2>
			<p class="lead">
				Voor woningcorporaties installeert Nivå de corporatielift type Mars. Zo plaatsten wij tien
				nieuwe corporatieliften op diverse locaties in Bergen op Zoom.
			</p>
		</div>
		<div class="card card-body">
			<p class="label">Specificaties</p>
			<dl class="specs">
				{#each marsSpecs as spec (spec.label)}
					<div>
						<dt>{spec.label}</dt>
						<dd class="num">{spec.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="projecten-title">
	<div class="container">
		<h2 id="projecten-title" class="section-title">Nieuwbouw <strong>projecten</strong></h2>
		<div class="three-up">
			{#each nieuwbouw as project (project.name)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<section class="section tight" aria-labelledby="andere-title">
	<div class="container">
		<h2 id="andere-title" class="section-title">Andere <strong>diensten</strong></h2>
		<ServiceCards exclude="/diensten/nieuwbouw" />
	</div>
</section>

<CtaBand
	primary={{ label: 'Offerte aanvragen', href: '/contact?type=Nieuwbouw' }}
	secondary={{ label: 'Contact opnemen', href: '/contact' }}
>
	{#snippet title()}Een nieuwe lift <strong>plannen</strong>?{/snippet}
</CtaBand>

<style>
	.two-col .label {
		margin-bottom: var(--space-12);
	}

	.specs div {
		display: flex;
		justify-content: space-between;
		gap: var(--space-16);
		padding-block: var(--space-12);
		border-top: 1px solid var(--color-line);
	}

	.specs div:first-child {
		border-top: 0;
	}

	dt {
		color: var(--color-steel);
	}

	dd {
		font-weight: 600;
	}
</style>
