<script lang="ts">
	import { content } from '#lib/content.svelte.ts';
	import { PLACEHOLDER } from '#lib/site.ts';

	let settings = $derived(content.data.settings);
	import Phone from './Phone.svelte';
</script>

<footer class="on-dark">
	<div class="container groups">
		<section aria-labelledby="footer-storing" class="storing">
			<h2 id="footer-storing" class="label">24/7 storingsdienst</h2>
			<p class="h2"><Phone /></p>
			<p class="small">{settings.footerStoring}</p>
		</section>

		<section aria-labelledby="footer-contact">
			<h2 id="footer-contact" class="label">Contact</h2>
			<dl>
				{#each [['Adres', settings.contact.address], ['E-mail', settings.contact.email], ['KvK', settings.contact.kvk]] as [term, value] (term)}
					<div>
						<dt class="visually-hidden">{term}</dt>
						<dd>{#if value}{value}{:else}{term}: <span class="placeholder">{PLACEHOLDER}</span>{/if}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<nav aria-labelledby="footer-diensten">
			<h2 id="footer-diensten" class="label">Diensten</h2>
			<ul class="plain-list">
				{#each settings.services as service (service.href)}
					<li>
						{#if service.href}<a href={service.href}>{service.title}</a>{:else}{service.title}{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="container">
		<p class="legal small">© {new Date().getFullYear()} Nivå Liften</p>
	</div>
</footer>

<style>
	footer {
		padding-top: var(--space-64);
	}

	.groups {
		display: grid;
		gap: var(--space-48);
	}

	.label {
		margin-bottom: var(--space-16);
	}

	dl,
	ul {
		display: grid;
		gap: var(--space-8);
	}

	.storing .small {
		margin-top: var(--space-8);
		color: var(--color-teal-mist);
	}

	.legal {
		max-width: none;
		margin-top: var(--space-64);
		padding-block: var(--space-24);
		border-top: 1px solid var(--color-steel);
		color: var(--color-teal-mist);
	}

	@media (min-width: 960px) {
		footer {
			padding-top: var(--space-96);
		}

		.groups {
			grid-template-columns: 2fr 1fr 1fr;
		}
	}
</style>
