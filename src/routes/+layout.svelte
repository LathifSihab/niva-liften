<script lang="ts">
	import '@fontsource-variable/montserrat';
	import '@fontsource-variable/source-sans-3';
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import { content } from '#lib/content.svelte.ts';

	let { children } = $props();

	// Demo CMS: apply the edits saved in this browser (the prerendered HTML has the defaults)
	onMount(() => content.load());
</script>

<a class="skip-link button button-primary" href="#main">Naar de inhoud</a>
{#if page.url.pathname.startsWith('/admin')}
	<!-- The demo CMS brings its own shell (src/routes/admin/+layout.svelte) -->
	{@render children()}
{:else}
	<Header />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
{/if}

<style>
	.skip-link {
		position: absolute;
		top: var(--space-8);
		left: var(--space-8);
		z-index: 20;
		transform: translateY(-200%);
	}

	.skip-link:focus {
		transform: none;
	}
</style>
