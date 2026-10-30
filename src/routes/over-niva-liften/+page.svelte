<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { photos } from '#lib/photos.ts';
	import { clientReasons, growth, PLACEHOLDER, team, values } from '#lib/site.ts';
</script>

<svelte:head>
	<title>Over Nivå Liften | Lift onderhoud bedrijf sinds 2005</title>
	<meta
		name="description"
		content="Nivå Liften is sinds 2005 een lift onderhoud bedrijf voor service, modernisering, reparatie en nieuwbouw. 25 medewerkers, 1.200 installaties, meer dan 700 klanten."
	/>
</svelte:head>

<PageHero photo={photos.projectGravenhof}>
	<div class="hero-intro">
		<p class="label">Over ons</p>
		<h1>Over Nivå Liften</h1>
		<p class="lead">
			Service, modernisering, reparatie en nieuwbouw van liften. Sinds 2005, voor VvE's en
			commerciële opdrachtgevers.
		</p>
	</div>
</PageHero>

<section class="section tight" aria-labelledby="groei-title">
	<div class="container">
		<h2 id="groei-title" class="section-title">Van 2005 tot <strong>nu</strong></h2>
		<ul class="plain-list three-up">
			{#each growth as item (item.label)}
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
		<blockquote class="values h2">{values}</blockquote>
	</div>
</section>

<section class="section tight" aria-labelledby="waarom-title">
	<div class="container">
		<h2 id="waarom-title" class="section-title">Waarom kiezen klanten voor <strong>Nivå</strong>?</h2>
		<div class="center">
			<CheckList items={clientReasons} columns={1} />
		</div>
	</div>
</section>

<section class="section tight surface" aria-labelledby="directie-title">
	<div class="container">
		<h2 id="directie-title" class="section-title"><strong>Directie</strong></h2>
		<ul class="plain-list three-up">
			{#each team as member (member.name)}
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
		<h2 id="verhaal-title">Ons verhaal</h2>
		<p class="lead"><span class="placeholder">{PLACEHOLDER}</span></p>
	</div>
</section>

<CtaBand>
	{#snippet title()}Kennismaken met <strong>Nivå</strong>?{/snippet}
</CtaBand>

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
