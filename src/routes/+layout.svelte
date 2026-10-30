<script lang="ts">
	import '@fontsource-variable/montserrat';
	import '@fontsource-variable/source-sans-3';
	import '../app.css';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';

	let { children } = $props();
</script>

<a class="skip-link button button-primary" href="#main">Naar de inhoud</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />

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
