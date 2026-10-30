<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Pagina niet gevonden | Nivå Liften</title>
</svelte:head>

<section class="section container">
	<p class="label num">{page.status}</p>
	<h1>{page.status === 404 ? 'Deze pagina bestaat niet (meer).' : 'Er ging iets mis.'}</h1>
	<p class="lead">Ga terug naar de <a href="/">homepage</a> of neem <a href="/contact">contact</a> met ons op.</p>
</section>

<style>
	h1 {
		margin-block: var(--space-16);
	}
</style>
