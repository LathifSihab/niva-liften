<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import ContentHero from '#lib/components/ContentHero.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Text from '#lib/components/Text.svelte';
	import { content } from '#lib/content.svelte.ts';

	let page = $derived(content.data.pages.over);
	let settings = $derived(content.data.settings);
</script>

<Seo seo={page.seo} />

<ContentHero hero={page.hero} />

<section class="section tight" aria-labelledby="groei-title">
	<div class="container">
		<h2 id="groei-title" class="section-title"><Text text={page.growth.title} /></h2>
		<ul class="plain-list three-up">
			{#each page.growth.items as item, i (i)}
				<li class="card card-body growth">
					<p class="label">{item.label}</p>
					<p class="display num">{item.now}</p>
					<p class="small then">In 2005: <span class="num">{item.then}</span></p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section tight surface" aria-label="Waar wij voor staan">
	<div class="container">
		<blockquote class="values h2">{settings.values}</blockquote>
	</div>
</section>

<section class="section tight" aria-labelledby="waarom-title">
	<div class="container">
		<h2 id="waarom-title" class="section-title"><Text text={page.reasons.title} /></h2>
		<div class="center">
			<CheckList items={page.reasons.items} columns={1} />
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="directie-title">
	<div class="container">
		<h2 id="directie-title" class="section-title"><Text text={page.teamTitle} /></h2>
		<ul class="plain-list three-up">
			{#each settings.team as member, i (i)}
				<li class="card card-body member">
					<h3>{member.name}</h3>
					<p>{member.role}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section tight" aria-labelledby="verhaal-title">
	<div class="container">
		<h2 id="verhaal-title"><Text text={page.story.title} /></h2>
		<p class="lead"><Text text={page.story.text} /></p>
	</div>
</section>

<CtaBand cta={page.cta} />

<style>
	.growth {
		display: grid;
		gap: var(--space-8);
		text-align: center;
	}

	.growth .display {
		color: var(--color-teal);
		max-width: none;
	}

	.then {
		color: var(--color-steel);
		max-width: none;
	}

	.values {
		max-width: 28ch;
		margin: 0 auto;
		font-weight: 500;
		text-align: center;
	}

	.center {
		display: flex;
		justify-content: center;
	}

	.member {
		display: grid;
		gap: var(--space-8);
		border-top: 3px solid var(--color-teal);
	}

	.member p {
		color: var(--color-steel);
	}

	h2:not(.section-title) {
		margin-bottom: var(--space-16);
	}
</style>
