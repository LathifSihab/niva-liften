<!-- Homepage: structure and styling follow the client's mockup (docs/Website Mock up.png) -->
<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import NewsItem from '#lib/components/NewsItem.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import PhotoCredit from '#lib/components/PhotoCredit.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import { posts } from '#lib/nieuws.ts';
	import { photos } from '#lib/photos.ts';
	import { projects, reasons, stats, team, values } from '#lib/site.ts';

	const featured = projects.filter((p) => p.featured);
	const banner = photos.modernisedLifts;
</script>

<svelte:head>
	<title>Nivå Liften | Liftonderhoud, reparatie en liftmodernisering</title>
	<meta
		name="description"
		content="Nivå Liften: liftonderhoud, lift reparatie en liftmodernisering voor alle merken. Sinds 2005, 1.200 installaties in onderhoud, 24/7 storingsdienst."
	/>
</svelte:head>

<PageHero photo={photos.liftDoors} tall center aria-labelledby="hero-title">
	<h1 id="hero-title" class="display hero-title">Uw lift moet altijd blijven functioneren.</h1>
	<p class="lead hero-lead">Onderhoud, reparaties en modernisering van liften door Nivå Liften.</p>
	<div class="button-row">
		<a class="button button-primary" href="/contact?type=Onderhoud">Onderhoud aanvragen</a>
		<a class="button button-secondary" href="/diensten/liftmodernisering">Modernisering bespreken</a>
	</div>
</PageHero>

<section id="diensten" class="section tight surface" aria-labelledby="diensten-title">
	<div class="container">
		<h2 id="diensten-title" class="section-title">Onze <strong>Diensten</strong></h2>
		<ServiceCards />
	</div>
</section>

<section class="section tight" aria-labelledby="waarom-title">
	<div class="container">
		<h2 id="waarom-title" class="section-title">Waarom <strong>Nivå Liften</strong>?</h2>
		<CheckList items={reasons} center />
		<dl class="stats">
			{#each stats as stat (stat.label)}
				<div>
					<dt class="label">{stat.label}</dt>
					<dd class="h1 num">{stat.figure}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section class="modernisering on-dark" aria-labelledby="mod-title">
	<div class="mod-text">
		<h2 id="mod-title" class="h1">Is uw lift verouderd?</h2>
		<p class="lead">
			Geef uw lift een tweede leven met modernisering. Veilig, comfortabel en toekomstbestendig,
			met marktvrije onderdelen.
		</p>
		<p class="mod-stat"><span class="num">60–70</span> moderniseringen per jaar</p>
		<a class="button button-primary" href="/diensten/liftmodernisering">Meer over modernisering</a>
	</div>
	<figure class="mod-photo">
		<img
			src={banner.src}
			srcset="{banner.src} 960w, {banner.wide} 1920w"
			sizes="(min-width: 960px) 45vw, 100vw"
			alt={banner.alt}
			width={banner.width}
			height={banner.height}
			loading="lazy"
		/>
		<figcaption><PhotoCredit photo={banner} /></figcaption>
	</figure>
</section>

<section class="section tight surface" aria-labelledby="projecten-title">
	<div class="container">
		<h2 id="projecten-title" class="section-title">Recente <strong>projecten</strong></h2>
		<div class="three-up">
			{#each featured as project (project.name)}
				<ProjectCard {project} />
			{/each}
		</div>
		<div class="section-actions">
			<a class="button button-secondary" href="/projecten">Alle projecten</a>
		</div>
	</div>
</section>

<section class="section tight" aria-labelledby="nieuws-title">
	<div class="container">
		<h2 id="nieuws-title" class="section-title">Laatste <strong>nieuws</strong></h2>
		<div class="news">
			{#each posts.slice(0, 3) as post (post.slug)}
				<NewsItem {post} />
			{/each}
		</div>
		<div class="section-actions">
			<a class="button button-secondary" href="/nieuws">Alle berichten</a>
		</div>
	</div>
</section>

<section id="over-niva" class="section tight surface" aria-labelledby="over-title">
	<div class="container about">
		<div>
			<h2 id="over-title" class="over-title">Over <strong>Nivå Liften</strong></h2>
			<p class="lead">
				In 2005 begon Nivå Liften met één medewerker en twee installaties. Nu zorgen 25 medewerkers
				voor 1.200 installaties bij meer dan 700 klanten, VvE's en commerciële opdrachtgevers.
			</p>
			<blockquote class="values h3">{values}</blockquote>
			<a class="button button-secondary" href="/over-niva-liften">Meer over Nivå</a>
		</div>
		<div class="card team">
			<h3 class="label">Directie</h3>
			<ul class="plain-list">
				{#each team as member (member.name)}
					<li>
						<span class="h3">{member.name}</span>
						<span class="small">{member.role}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<CtaBand>
	{#snippet title()}Heeft u een vraag over <strong>uw lift</strong>?{/snippet}
</CtaBand>

<style>
	/* Hero */
	.hero-title {
		max-width: 16ch;
		text-shadow: 0 2px 24px rgb(11 31 58 / 0.35);
	}

	.hero-lead {
		max-width: 40rem;
		margin-block: var(--space-24) var(--space-32);
	}

	/* Why */
	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-32) var(--space-24);
		max-width: 60rem;
		margin: var(--space-64) auto 0;
		padding-top: var(--space-48);
		border-top: 1px solid var(--color-line);
		text-align: center;
	}

	/* Figure first visually, label read first; figures align on one line even if a label wraps */
	.stats div {
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
		gap: var(--space-8);
	}

	.stats dd {
		color: var(--color-navy);
	}

	/* Modernisering banner: text left, photo right */
	.modernisering {
		display: grid;
	}

	.mod-text {
		display: grid;
		align-content: center;
		justify-items: start;
		gap: var(--space-24);
		padding: var(--space-64) var(--side);
		background-image:
			linear-gradient(color-mix(in srgb, var(--color-teal-mist) 7%, transparent) 1px, transparent 1px),
			linear-gradient(90deg, color-mix(in srgb, var(--color-teal-mist) 7%, transparent) 1px, transparent 1px);
		background-size: 32px 32px;
	}

	.mod-text .lead {
		color: var(--color-line);
	}

	.mod-stat {
		color: var(--color-teal-mist);
		font-weight: 600;
	}

	.mod-stat .num {
		color: var(--color-white);
		font-family: var(--font-heading);
		font-size: var(--text-h2);
		font-weight: 700;
	}

	.mod-photo {
		position: relative;
		min-height: 20rem;
	}

	.mod-photo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.mod-photo figcaption {
		position: absolute;
		right: var(--space-16);
		bottom: var(--space-12);
		padding: var(--space-4) var(--space-8);
		background: color-mix(in srgb, var(--color-navy) 80%, transparent);
		color: var(--color-teal-mist);
		font-size: 0.75rem;
	}

	.mod-photo figcaption :global(a) {
		color: inherit;
	}

	/* News: cards centred, however many posts there are */
	.news {
		display: grid;
		gap: var(--space-32) var(--gutter);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 24rem));
		justify-content: center;
	}

	/* About */
	.about {
		display: grid;
		gap: var(--space-48);
		align-items: center;
	}

	.over-title {
		margin-bottom: var(--space-24);
		font-weight: 500;
	}

	.over-title strong {
		font-weight: 700;
	}

	.values {
		margin: var(--space-32) 0;
		padding-left: var(--space-24);
		border-left: 3px solid var(--color-teal);
		max-width: 32ch;
	}

	.team {
		padding: var(--space-32);
	}

	.team .label {
		margin-bottom: var(--space-8);
	}

	.team li {
		display: grid;
		gap: var(--space-4);
		padding-block: var(--space-16);
		border-top: 1px solid var(--color-line);
	}

	.team li:first-child {
		border-top: 0;
	}

	.team .small {
		color: var(--color-steel);
	}

	@media (min-width: 960px) {
		.stats {
			grid-template-columns: repeat(4, 1fr);
		}

		.modernisering {
			grid-template-columns: 11fr 9fr;
			min-height: 30rem;
		}

		.mod-text {
			padding-block: var(--space-96);
			padding-left: max(var(--side), calc((100vw - 1200px) / 2));
			padding-right: var(--space-64);
		}

		.about {
			grid-template-columns: 7fr 5fr;
			gap: var(--space-96);
		}
	}
</style>
