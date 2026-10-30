<script lang="ts">
	import FloorLabel from '#lib/components/FloorLabel.svelte';
	import NewsItem from '#lib/components/NewsItem.svelte';
	import Phone from '#lib/components/Phone.svelte';
	import PhotoPlaceholder from '#lib/components/PhotoPlaceholder.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { posts } from '#lib/nieuws.ts';
	import { brands, projects, services, stats, team, PLACEHOLDER } from '#lib/site.ts';

	const reasons = [
		{
			title: 'Merkonafhankelijk',
			text: `Wij onderhouden alle merken: ${brands.join(', ')} en marktvrije liften.`
		},
		{ title: 'Eigen monteurs', text: 'Het werk aan uw lift doen monteurs van Nivå zelf.' },
		{ title: '24/7 service', text: 'Storing of opsluiting? Wij zijn dag en nacht bereikbaar.' },
		{ title: 'Korte lijnen', text: 'U belt rechtstreeks met Nivå, een team van 25 mensen.' },
		{
			title: 'Marktconforme prijzen',
			text: 'Eerlijke tarieven voor onderhoud, reparatie en modernisering.'
		}
	];

	// Floor indicator: shows the floor in view on wide screens. Without JS it simply isn't shown;
	// every section still carries its own FloorLabel.
	let currentFloor = $state<string | null>(null);

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) currentFloor = (entry.target as HTMLElement).dataset.floor!;
				}
			},
			{ rootMargin: '-45% 0px -55% 0px' }
		);
		document.querySelectorAll('[data-floor]').forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Nivå Liften | Liftonderhoud, reparatie en liftmodernisering</title>
	<meta
		name="description"
		content="Nivå Liften: liftonderhoud, reparatie en liftmodernisering voor elk merk. Sinds 2005, 1.200 installaties in onderhoud, 24/7 storingsdienst."
	/>
</svelte:head>

{#if currentFloor}
	<div class="shaft" aria-hidden="true">
		<span class="label num">{currentFloor}</span>
	</div>
{/if}

<section class="hero" data-floor="00" aria-labelledby="hero-title">
	<div class="container hero-grid">
		<div class="hero-text">
			<FloorLabel floor="00" label="Home" />
			<h1 id="hero-title" class="display">Uw lift moet altijd blijven functioneren.</h1>
			<p class="lead">
				Onderhoud, reparatie en modernisering van liften, voor elk merk. Sinds 2005, met eigen
				monteurs.
			</p>
			<div class="button-row">
				<a class="button button-primary" href="/contact">Onderhoud aanvragen</a>
				<a class="button button-secondary" href="/diensten/liftmodernisering">
					Modernisering bespreken
				</a>
			</div>
		</div>
		<PhotoPlaceholder alt="Monteur van Nivå aan het werk in de liftschacht" />
	</div>
</section>

<section id="diensten" class="section tight" data-floor="01" aria-labelledby="diensten-title">
	<div class="container">
		<FloorLabel floor="01" label="Diensten" />
		<h2 id="diensten-title">Van periodiek onderhoud tot een nieuwe lift</h2>
		<ol class="plain-list service-list">
			{#each services as service, i (service.title)}
				<li>
					<svelte:element this={service.href ? 'a' : 'div'} href={service.href} class="service-row">
						<span class="label num">{String(i + 1).padStart(2, '0')}</span>
						<h3>{service.title}</h3>
						<p>{service.text}</p>
						{#if service.href}<span class="more" aria-hidden="true">Bekijk →</span>{/if}
					</svelte:element>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="section surface" data-floor="02" aria-labelledby="waarom-title">
	<div class="container">
		<FloorLabel floor="02" label="Waarom Nivå" />
		<h2 id="waarom-title">Liftservice met korte lijnen, voor elk merk</h2>
		<div class="why-grid">
			<dl class="stats">
				{#each stats as stat (stat.label)}
					<div>
						<dt class="small">{stat.label}</dt>
						<dd class="h1 num">{stat.figure}</dd>
					</div>
				{/each}
			</dl>
			<dl class="reasons">
				{#each reasons as reason (reason.title)}
					<div>
						<dt class="h3">{reason.title}</dt>
						<dd>{reason.text}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<section class="section on-dark modernisering" data-floor="03" aria-labelledby="mod-title">
	<div class="container mod-grid">
		<div>
			<FloorLabel floor="03" label="Modernisering" />
			<h2 id="mod-title" class="h1">Renoveren in plaats van vervangen.</h2>
			<p class="lead">
				Een verouderde lift hoeft niet in zijn geheel te worden vervangen. Wij vernieuwen de
				besturing, de machine, de deuren of de drukknoptableaus, met marktvrije onderdelen. Zo zit u
				niet vast aan één merk.
			</p>
			<div class="button-row">
				<a class="button button-secondary" href="/diensten/liftmodernisering">
					Modernisering bespreken
				</a>
			</div>
		</div>
		<p class="mod-stat">
			<span class="display num">60–70</span>
			<span class="label">moderniseringen per jaar</span>
		</p>
	</div>
</section>

<section class="section" data-floor="04" aria-labelledby="projecten-title">
	<div class="container">
		<FloorLabel floor="04" label="Projecten" />
		<div class="section-head">
			<h2 id="projecten-title">Projecten</h2>
			<a href="/projecten">Alle projecten</a>
		</div>
		<div class="project-grid">
			{#each projects.filter((p) => p.featured) as project (project.name)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<section class="section tight surface" data-floor="05" aria-labelledby="nieuws-title">
	<div class="container">
		<FloorLabel floor="05" label="Nieuws" />
		<div class="section-head">
			<h2 id="nieuws-title">Nieuws</h2>
			<a href="/nieuws">Alle berichten</a>
		</div>
		<div class="news-list">
			{#each posts.slice(0, 3) as post (post.slug)}
				<NewsItem {post} />
			{/each}
		</div>
	</div>
</section>

<section id="over-niva" class="section" data-floor="06" aria-labelledby="over-title">
	<div class="container about-grid">
		<div>
			<FloorLabel floor="06" label="Over Nivå" />
			<h2 id="over-title">Sinds 2005 in liften</h2>
			<p class="lead">
				Nivå Liften onderhoudt, repareert en moderniseert liften sinds 2005. Met 25 medewerkers
				zorgen wij voor 1.200 installaties bij meer dan 700 klanten.
			</p>
			<p><span class="placeholder">{PLACEHOLDER}</span> Ons verhaal.</p>
			<h3 class="label team-title">Directie</h3>
			<ul class="plain-list team">
				{#each team as name (name)}
					<li>
						<span class="h3">{name}</span>
						<span class="small placeholder">{PLACEHOLDER}</span>
					</li>
				{/each}
			</ul>
		</div>
		<PhotoPlaceholder alt="Het team van Nivå Liften bij de bedrijfsbussen" ratio="3 / 2" />
	</div>
</section>

<section class="section tight surface" data-floor="07" aria-labelledby="contact-title">
	<div class="container">
		<FloorLabel floor="07" label="Contact" />
		<h2 id="contact-title">Heeft u een vraag over uw lift?</h2>
		<p class="lead contact-line">Bel ons op <Phone /> of stuur ons een bericht.</p>
		<a class="button button-primary" href="/contact">Neem contact op</a>
	</div>
</section>

<style>
	/* Floor indicator + shaft line, wide screens only */
	.shaft {
		display: none;
	}

	@media (min-width: 1280px) {
		.shaft {
			display: block;
			position: fixed;
			top: 0;
			bottom: 0;
			left: var(--space-16);
			z-index: 5;
			width: 1px;
			background: var(--color-line);
		}

		.shaft .label {
			position: absolute;
			top: 50%;
			left: 0;
			transform: translate(-50%, -50%);
			padding: var(--space-4) 0;
			background: var(--color-white);
			color: var(--color-teal);
		}
	}

	.hero {
		padding-block: var(--space-48) var(--space-64);
	}

	.hero-grid,
	.about-grid,
	.mod-grid,
	.why-grid {
		display: grid;
		gap: var(--space-48);
	}

	.hero-text {
		display: grid;
		align-content: center;
		gap: var(--space-24);
	}

	.hero-text :global(.floor-label) {
		margin-bottom: 0;
	}

	h2 {
		margin-bottom: var(--space-32);
	}

	/* Services */
	.service-list {
		border-top: 1px solid var(--color-line);
	}

	.service-row {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: var(--space-4) var(--space-16);
		padding: var(--space-24) var(--space-8);
		border-bottom: 1px solid var(--color-line);
		color: inherit;
		text-decoration: none;
	}

	.service-row .label {
		padding-top: 0.4em;
	}

	.service-row p,
	.service-row .more {
		grid-column: 2;
	}

	.service-row p {
		color: var(--color-steel);
	}

	a.service-row:hover {
		background: var(--color-surface);
	}

	a.service-row:hover h3 {
		color: var(--color-teal);
	}

	.more {
		color: var(--color-teal);
		font-weight: 600;
	}

	/* Why */
	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-32) var(--space-24);
		align-content: start;
	}

	.stats div {
		display: flex;
		flex-direction: column-reverse;
		gap: var(--space-4);
	}

	.stats dt {
		color: var(--color-steel);
	}

	.reasons div {
		padding-block: var(--space-16);
		border-top: 1px solid var(--color-line);
	}

	.reasons dd {
		margin-top: var(--space-4);
		color: var(--color-steel);
	}

	/* Modernisering: blueprint grid as a nod to the technical drawing */
	.modernisering {
		background-image:
			linear-gradient(color-mix(in srgb, var(--color-teal-mist) 8%, transparent) 1px, transparent 1px),
			linear-gradient(90deg, color-mix(in srgb, var(--color-teal-mist) 8%, transparent) 1px, transparent 1px);
		background-size: 32px 32px;
		padding-block: var(--space-96);
	}

	.modernisering .lead {
		margin-bottom: var(--space-32);
		color: var(--color-line);
	}

	.mod-stat {
		display: grid;
		align-content: end;
		gap: var(--space-8);
	}

	/* Lists */
	.section-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-8) var(--space-24);
		margin-bottom: var(--space-32);
	}

	.section-head h2 {
		margin-bottom: 0;
	}

	.project-grid {
		display: grid;
		gap: var(--space-48) var(--gutter);
	}

	.news-list {
		max-width: 50rem;
	}

	/* About */
	.about-grid .lead {
		margin-bottom: var(--space-16);
	}

	.team-title {
		margin-top: var(--space-48);
		margin-bottom: var(--space-16);
	}

	.team li {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--space-4) var(--space-16);
		padding-block: var(--space-12);
		border-top: 1px solid var(--color-line);
	}

	.team .small {
		color: var(--color-steel);
	}

	.contact-line {
		margin-bottom: var(--space-32);
	}

	@media (min-width: 640px) {
		.project-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 960px) {
		.hero {
			padding-block: var(--space-64) var(--space-128);
		}

		.hero-grid {
			grid-template-columns: 7fr 5fr;
		}

		.service-row {
			grid-template-columns: 3rem 2fr 3fr 6rem;
			align-items: baseline;
			padding-inline: var(--space-16);
		}

		.service-row p,
		.service-row .more {
			grid-column: auto;
		}

		.more {
			text-align: right;
		}

		.why-grid {
			grid-template-columns: 5fr 7fr;
			gap: var(--space-96);
		}

		.modernisering {
			padding-block: var(--space-128) var(--space-96);
		}

		.mod-grid {
			grid-template-columns: 8fr 4fr;
		}

		.about-grid {
			grid-template-columns: 6fr 6fr;
			align-items: end;
		}
	}
</style>
