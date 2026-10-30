<script lang="ts">
	import ContentHero from '#lib/components/ContentHero.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { content } from '#lib/content.svelte.ts';

	let page = $derived(content.data.pages.projecten);

	// Grouped as in the Bedrijfspresentatie: "Onze projecten 2024 – 2025"
	let groups = $derived(
		(['Modernisering', 'Nieuwbouw', 'Onderhoud'] as const)
			.map((category) => ({
				category,
				items: content.data.projects.filter((p) => p.category === category)
			}))
			.filter((group) => group.items.length)
	);
</script>

<Seo seo={page.seo} />

<ContentHero hero={page.hero} />

{#each groups as group, i (group.category)}
	<section class="section tight" class:surface={i % 2 === 1} aria-labelledby="group-{i}">
		<div class="container">
			<h2 id="group-{i}" class="section-title"><strong>{group.category}</strong></h2>
			<div class="three-up">
				{#each group.items as project, j (j)}
					<ProjectCard {project} />
				{/each}
			</div>
		</div>
	</section>
{/each}

<CtaBand cta={page.cta} />
