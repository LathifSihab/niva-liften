<script lang="ts">
	import ContentHero from '#lib/components/ContentHero.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import Text from '#lib/components/Text.svelte';
	import { content } from '#lib/content.svelte.ts';

	let page = $derived(content.data.pages.liftmodernisering);
	let modernisering = $derived(content.data.projects.filter((p) => p.category === 'Modernisering'));
</script>

<Seo seo={page.seo} />

<ContentHero hero={page.hero} />

<section class="section tight" aria-labelledby="intro-title">
	<div class="container two-col">
		<div>
			<h2 id="intro-title"><Text text={page.intro.title} /></h2>
			<p class="lead"><Text text={page.intro.lead} /></p>
			<p><Text text={page.intro.text} /></p>
		</div>
		<div class="card card-body">
			<p class="label">{page.intro.cardLabel}</p>
			<p><Text text={page.intro.cardText} /></p>
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="parts-title">
	<div class="container">
		<h2 id="parts-title" class="section-title"><Text text={page.parts.title} /></h2>
		<ul class="plain-list parts">
			{#each page.parts.items as part, i (i)}
				<li class="card card-body">
					<h3>{part.title}</h3>
					<p><Text text={part.text} /></p>
					<p class="label suppliers">{part.suppliers.join(' · ')}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section tight" aria-labelledby="projecten-title">
	<div class="container">
		<h2 id="projecten-title" class="section-title"><Text text={page.projectsTitle} /></h2>
		<div class="three-up">
			{#each modernisering as project, i (i)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="andere-title">
	<div class="container">
		<h2 id="andere-title" class="section-title"><Text text={page.otherTitle} /></h2>
		<ServiceCards exclude="/diensten/liftmodernisering" />
	</div>
</section>

<CtaBand cta={page.cta} />

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
