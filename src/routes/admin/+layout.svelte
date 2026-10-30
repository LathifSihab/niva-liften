<script lang="ts">
	import '#lib/admin.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ConfirmDialog from '#lib/components/admin/ConfirmDialog.svelte';
	import { content } from '#lib/content.svelte.ts';

	let { children } = $props();
	let resetDialog = $state<ConfirmDialog>();

	let unread = $derived(content.data.inbox.filter((message) => !message.read).length);

	let nav = $derived([
		{ href: '/admin', label: 'Overzicht' },
		{ href: '/admin/paginas', label: "Pagina's" },
		{ href: '/admin/nieuws', label: 'Nieuws', count: content.data.posts.length },
		{ href: '/admin/projecten', label: 'Projecten', count: content.data.projects.length },
		// Only unread messages are counted, and only when there are any
		{ href: '/admin/berichten', label: 'Berichten', count: unread || undefined, highlight: true },
		{ href: '/admin/afbeeldingen', label: 'Afbeeldingen' },
		{ href: '/admin/instellingen', label: 'Instellingen' }
	]);

	const active = (href: string) =>
		href === '/admin' ? page.url.pathname === '/admin' : page.url.pathname.startsWith(href);

	function reset() {
		content.reset();
		goto('/admin');
	}
</script>

<svelte:head>
	<title>Beheer | Nivå Liften</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="cms">
	<aside class="side on-dark">
		<a class="brand" href="/admin" aria-label="Nivå Liften beheer, naar het overzicht">
			<span class="logo" aria-hidden="true"><span>NIVÅ</span><span>LIFTEN</span></span>
			<span class="label">Beheer</span>
		</a>
		<nav aria-label="Beheermenu">
			<ul class="plain-list">
				{#each nav as item (item.href)}
					<li>
						<a href={item.href} aria-current={active(item.href) ? 'page' : undefined}>
							{item.label}
							{#if item.count !== undefined}
								<span class="count num" class:highlight={item.highlight}>
									{item.count}<span class="visually-hidden">
										{item.highlight ? ' ongelezen' : ''}</span
									>
								</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="side-foot small">
			<a href="/" target="_blank" rel="noopener">Bekijk de site<span class="visually-hidden"> (nieuw tabblad)</span></a>
			<button class="link-button" type="button" onclick={() => resetDialog?.open()}>Demo herstellen</button>
			<p class="demo-note">
				<strong>Demo.</strong> Wijzigingen worden alleen in deze browser bewaard en zijn alleen hier op
				de site te zien.
			</p>
		</div>
	</aside>

	<main id="main" class="main">
		{#if content.ready}
			{@render children()}
		{:else}
			<noscript>
				<p class="noscript">Het beheer werkt alleen met JavaScript aan.</p>
			</noscript>
		{/if}
	</main>
</div>

<ConfirmDialog
	bind:this={resetDialog}
	title="Demo herstellen?"
	confirmLabel="Herstellen"
	onconfirm={reset}
>
	<p>
		Alle wijzigingen en ontvangen berichten gaan verloren. De site toont weer de oorspronkelijke
		inhoud.
	</p>
</ConfirmDialog>

<style>
	.cms {
		min-height: 100svh;
		background: var(--color-surface);
	}

	.side {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-12) var(--space-24);
		padding: var(--space-12) var(--side);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-12);
		text-decoration: none;
	}

	/* Same wordmark stand-in as the site header, smaller */
	.logo {
		display: grid;
		place-content: center;
		width: 2.75rem;
		height: 2.75rem;
		background: var(--color-teal);
		color: var(--color-white);
		font-family: var(--font-heading);
		font-size: 0.5rem;
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: 0.08em;
		text-align: center;
	}

	.logo span:first-child {
		font-size: 0.75rem;
	}

	nav {
		order: 3;
		width: 100%;
		overflow-x: auto;
	}

	nav ul {
		display: flex;
		gap: var(--space-4);
	}

	nav a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-8);
		padding: var(--space-8) var(--space-12);
		border-radius: var(--radius);
		font-family: var(--font-heading);
		font-size: 0.9375rem;
		font-weight: 600;
		text-decoration: none;
		white-space: nowrap;
	}

	nav a:hover {
		background: rgb(255 255 255 / 0.08);
	}

	nav a[aria-current='page'] {
		background: var(--color-white);
		color: var(--color-navy);
	}

	.count {
		min-width: 1.5rem;
		padding: 0 var(--space-4);
		border-radius: var(--radius);
		color: var(--color-teal-mist);
		font-size: var(--text-small);
		text-align: center;
	}

	[aria-current='page'] .count {
		color: var(--color-steel);
	}

	.count.highlight {
		background: var(--color-teal);
		color: var(--color-white);
	}

	.side-foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-8) var(--space-16);
		margin-left: auto;
	}

	.link-button {
		padding: 0;
		border: 0;
		background: none;
		color: var(--color-white);
		font: inherit;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		cursor: pointer;
	}

	.link-button:hover {
		text-decoration-thickness: 2px;
	}

	.demo-note {
		display: none;
		color: var(--color-teal-mist);
	}

	.demo-note strong {
		color: var(--color-white);
	}

	.main {
		min-width: 0;
		padding: var(--space-24) var(--side) var(--space-64);
	}

	.noscript {
		max-width: 40rem;
		margin-inline: auto;
		padding: var(--space-16) var(--space-24);
		border-left: 4px solid var(--color-teal);
		background: var(--color-white);
	}

	/* Sidebar from 960px */
	@media (min-width: 960px) {
		.cms {
			display: grid;
			grid-template-columns: 15rem minmax(0, 1fr);
		}

		.side {
			position: sticky;
			top: 0;
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: stretch;
			height: 100svh;
			padding: var(--space-24) var(--space-16);
		}

		nav {
			order: 0;
			overflow: visible;
		}

		nav ul {
			flex-direction: column;
		}

		.side-foot {
			flex-direction: column;
			align-items: flex-start;
			margin: auto 0 0;
			padding: var(--space-16) var(--space-12) 0;
			border-top: 1px solid rgb(255 255 255 / 0.15);
		}

		.demo-note {
			display: block;
		}

		.main {
			padding: var(--space-32) var(--space-32) var(--space-64);
		}
	}
</style>
