<script lang="ts">
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { projects } from '#lib/site.ts';
</script>

<svelte:head>
	<title>Projecten | Nivå Liften</title>
	<meta
		name="description"
		content="Projecten van Nivå Liften: liftmodernisering, nieuwbouw en onderhoud voor VvE's, corporaties en bedrijven."
	/>
</svelte:head>

<section class="section tight">
	<div class="container">
		<h1>Projecten</h1>
		<p class="lead intro">
			Een greep uit ons werk voor VvE's, woningcorporaties en bedrijven.
		</p>
		<div class="project-grid">
			{#each projects as project (project.name)}
				<ProjectCard {project} level={2} />
			{/each}
		</div>
	</div>
</section>

<style>
	.intro {
		margin-block: var(--space-16) var(--space-64);
	}

	.project-grid {
		display: grid;
		gap: var(--space-64) var(--gutter);
	}

	@media (min-width: 640px) {
		.project-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 960px) {
		.project-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
