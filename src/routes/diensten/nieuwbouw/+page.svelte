<script lang="ts">
	import ContentHero from '#lib/components/ContentHero.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import Text from '#lib/components/Text.svelte';
	import { content } from '#lib/content.svelte.ts';

	let page = $derived(content.data.pages.nieuwbouw);
	let nieuwbouw = $derived(content.data.projects.filter((p) => p.category === 'Nieuwbouw'));
</script>

<Seo seo={page.seo} />

<ContentHero hero={page.hero} />

<section class="section tight" aria-labelledby="mars-title">
	<div class="container two-col">
		<div>
			<p class="label">{page.mars.label}</p>
			<h2 id="mars-title"><Text text={page.mars.title} /></h2>
			<p class="lead"><Text text={page.mars.lead} /></p>
		</div>
		<div class="card card-body">
			<p class="label">{page.mars.specsLabel}</p>
			<dl class="specs">
				{#each page.mars.specs as spec, i (i)}
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
		<h2 id="projecten-title" class="section-title"><Text text={page.projectsTitle} /></h2>
		<div class="three-up">
			{#each nieuwbouw as project, i (i)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<section class="section tight" aria-labelledby="andere-title">
	<div class="container">
		<h2 id="andere-title" class="section-title"><Text text={page.otherTitle} /></h2>
		<ServiceCards exclude="/diensten/nieuwbouw" />
	</div>
</section>

<CtaBand cta={page.cta} />

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
