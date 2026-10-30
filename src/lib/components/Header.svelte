<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { nav } from '#lib/site.ts';
	import Phone from './Phone.svelte';

	// <details> keeps the mobile menu working without JS; JS only closes it after navigating.
	let menuOpen = $state(false);
	afterNavigate(() => (menuOpen = false));

	const isCurrent = (href: string) => !href.includes('#') && page.url.pathname.startsWith(href);
</script>

<header class="site-header">
	<div class="container bar">
		<!-- Wordmark stand-in until the client's logo SVG arrives -->
		<a class="logo" href="/" aria-label="Nivå Liften, naar de homepage">
			<span>NIVÅ</span><span>LIFTEN</span>
		</a>

		<nav class="nav-desktop" aria-label="Hoofdmenu">
			<ul class="plain-list">
				{#each nav as item (item.href)}
					<li>
						<a href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="actions">
			<Phone class="phone" />
			<a class="button button-signal" href="/contact#storing">Storing melden 24/7</a>
		</div>

		<a class="icon-button call-mobile" href="/contact#storing" aria-label="Storing melden 24/7">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="square"
				/>
			</svg>
		</a>

		<details class="menu" bind:open={menuOpen}>
			<summary class="icon-button">
				<span>{menuOpen ? 'Sluiten' : 'Menu'}</span>
			</summary>
			<div class="menu-panel on-dark">
				<nav class="container" aria-label="Hoofdmenu mobiel">
					<ul class="plain-list">
						{#each nav as item (item.href)}
							<li><a href={item.href}>{item.label}</a></li>
						{/each}
					</ul>
					<div class="menu-storing">
						<a class="button button-signal" href="/contact#storing">Storing melden 24/7</a>
						<p class="label">24/7 storingsdienst</p>
						<p class="h3"><Phone /></p>
					</div>
				</nav>
			</div>
		</details>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--color-white);
		border-bottom: 1px solid var(--color-line);
	}

	/* Border only once the page has scrolled, where supported */
	@supports (animation-timeline: scroll()) {
		.site-header {
			border-bottom-color: transparent;
			animation: header-line linear both;
			animation-timeline: scroll();
			animation-range: 0 1px;
		}

		@keyframes header-line {
			to {
				border-bottom-color: var(--color-line);
			}
		}
	}

	.bar {
		display: flex;
		align-items: center;
		gap: var(--space-24);
		height: var(--header-h);
	}

	.logo {
		display: grid;
		place-content: center;
		width: 3.5rem;
		height: 3.5rem;
		margin-right: auto;
		background: var(--color-teal);
		color: var(--color-white);
		font-family: var(--font-heading);
		font-size: 0.625rem;
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: 0.08em;
		text-align: center;
		text-decoration: none;
	}

	.logo span:first-child {
		font-size: 0.9375rem;
	}

	.nav-desktop,
	.actions {
		display: none;
	}

	.nav-desktop ul {
		display: flex;
		gap: var(--space-24);
	}

	.nav-desktop a {
		color: var(--color-navy);
		font-family: var(--font-heading);
		font-size: 0.9375rem;
		font-weight: 600;
		text-decoration: none;
	}

	.nav-desktop a:hover,
	.nav-desktop a[aria-current='page'] {
		color: var(--color-teal);
		text-decoration: underline;
	}

	.actions {
		align-items: center;
		gap: var(--space-24);
	}

	.actions :global(.phone) {
		display: none;
		font-weight: 600;
	}

	.icon-button {
		display: inline-grid;
		place-items: center;
		min-width: 48px;
		height: 48px;
		color: var(--color-navy);
		font-family: var(--font-heading);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
	}

	summary {
		list-style: none;
		padding-inline: var(--space-8);
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.menu-panel {
		position: fixed;
		inset: var(--header-h) 0 0;
		overflow-y: auto;
		padding-block: var(--space-32);
	}

	.menu-panel ul {
		display: grid;
		gap: var(--space-8);
	}

	.menu-panel li a {
		font-family: var(--font-heading);
		font-size: var(--text-h2);
		font-weight: 700;
		text-decoration: none;
	}

	.menu-storing {
		display: grid;
		justify-items: start;
		gap: var(--space-8);
		margin-top: var(--space-48);
		padding-top: var(--space-32);
		border-top: 1px solid var(--color-steel);
	}

	.menu-storing .label {
		margin-top: var(--space-16);
	}

	@media (min-width: 960px) {
		.nav-desktop,
		.actions {
			display: flex;
		}

		.logo {
			margin-right: var(--space-24);
		}

		.nav-desktop {
			margin-right: auto;
		}

		.call-mobile,
		.menu {
			display: none;
		}
	}

	@media (min-width: 1280px) {
		.actions :global(.phone) {
			display: inline;
		}
	}
</style>
