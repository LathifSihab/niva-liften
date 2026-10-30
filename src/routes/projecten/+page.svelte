<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { photos } from '#lib/photos.ts';
	import { projects } from '#lib/site.ts';

	// Grouped as in the Bedrijfspresentatie: "Onze projecten 2024 – 2025"
	const groups = (['Modernisering', 'Nieuwbouw'] as const).map((category) => ({
		category,
		items: projects.filter((p) => p.category === category)
	}));
</script>

<svelte:head>
	<title>Projecten | Nivå Liften</title>
	<meta
		name="description"
		content="Projecten van Nivå Liften 2024–2025: liftmodernisering en nieuwbouw voor VvE's, woningcorporaties en bedrijven."
	/>
</svelte:head>

<PageHero photo={photos.projectStadlander}>
	<div class="hero-intro">
		<p class="label">Projecten</p>
		<h1>Onze projecten 2024 – 2025</h1>
		<p class="lead">Een greep uit ons werk voor VvE's, woningcorporaties en bedrijven.</p>
	</div>
</PageHero>

{#each groups as group, i (group.category)}
	<section class="section tight" class:surface={i % 2 === 1} aria-labelledby="group-{i}">
		<div class="container">
			<h2 id="group-{i}" class="section-title"><strong>{group.category}</strong></h2>
			<div class="three-up">
				{#each group.items as project (project.name)}
					<ProjectCard {project} />
				{/each}
			</div>
		</div>
	</section>
{/each}

<CtaBand>
	{#snippet title()}Een project <strong>bespreken</strong>?{/snippet}
</CtaBand>
