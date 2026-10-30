<script lang="ts">
	import CheckList from '#lib/components/CheckList.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import NewsItem from '#lib/components/NewsItem.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import PhotoCredit from '#lib/components/PhotoCredit.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import ServiceCards from '#lib/components/ServiceCards.svelte';
	import Text from '#lib/components/Text.svelte';
	import { content, photoOf } from '#lib/content.svelte.ts';

	let home = $derived(content.data.pages.home);
	let settings = $derived(content.data.settings);
	let featured = $derived(content.data.projects.filter((p) => p.featured));
	let banner = $derived(photoOf(home.modernisation.photo));
</script>

<Seo seo={home.seo} />

<PageHero photo={photoOf(home.hero.photo)} center doors aria-labelledby="hero-title">
	<h1 id="hero-title" class="display hero-title"><Text text={home.hero.title} /></h1>
	<p class="lead hero-lead"><Text text={home.hero.lead} /></p>
	<div class="button-row">
		<a class="button button-primary" href={home.hero.primary.href}>{home.hero.primary.label}</a>
		<a class="button button-secondary" href={home.hero.secondary.href}>{home.hero.secondary.label}</a>
	</div>
</PageHero>

<section id="diensten" class="section tight surface" aria-labelledby="diensten-title">
	<div class="container">
		<h2 id="diensten-title" class="section-title"><Text text={home.services.title} /></h2>
		<ServiceCards />
	</div>
</section>

<section class="section tight" aria-labelledby="waarom-title">
	<div class="container">
		<h2 id="waarom-title" class="section-title"><Text text={home.reasons.title} /></h2>
		<CheckList items={home.reasons.items} center />
		<dl class="stats">
			{#each home.reasons.stats as stat, i (i)}
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
		<h2 id="mod-title" class="h1"><Text text={home.modernisation.title} /></h2>
		<p class="lead"><Text text={home.modernisation.text} /></p>
		<p class="mod-stat">
			<span class="num">{home.modernisation.figure}</span>
			{home.modernisation.figureLabel}
		</p>
		<a class="button button-primary" href={home.modernisation.button.href}>
			{home.modernisation.button.label}
		</a>
	</div>
	<figure class="mod-photo">
		<img
			src={banner.src}
			srcset="{banner.src} 960w, {banner.wide ?? banner.src} 1920w"
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
		<h2 id="projecten-title" class="section-title"><Text text={home.projects.title} /></h2>
		<div class="three-up">
			{#each featured as project, i (i)}
				<ProjectCard {project} />
			{/each}
		</div>
		<div class="section-actions">
			<a class="button button-secondary" href={home.projects.button.href}>{home.projects.button.label}</a>
		</div>
	</div>
</section>

<section class="section tight" aria-labelledby="nieuws-title">
	<div class="container">
		<h2 id="nieuws-title" class="section-title"><Text text={home.news.title} /></h2>
		<div class="news">
			{#each content.posts.slice(0, 3) as post (post.slug)}
				<NewsItem {post} />
			{/each}
		</div>
		<div class="section-actions">
			<a class="button button-secondary" href={home.news.button.href}>{home.news.button.label}</a>
		</div>
	</div>
</section>

<section id="over-niva" class="section tight surface" aria-labelledby="over-title">
	<div class="container about">
		<div>
			<h2 id="over-title" class="over-title"><Text text={home.about.title} /></h2>
			<p class="lead"><Text text={home.about.text} /></p>
			<blockquote class="values h3">{settings.values}</blockquote>
			<a class="button button-secondary" href={home.about.button.href}>{home.about.button.label}</a>
		</div>
		<div class="card team">
			<h3 class="label">{home.about.teamLabel}</h3>
			<ul class="plain-list">
				{#each settings.team as member, i (i)}
					<li>
						<span class="h3">{member.name}</span>
						<span class="small">{member.role}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<CtaBand cta={home.cta} />

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

	.over-title :global(strong) {
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
