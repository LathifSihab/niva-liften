<!-- "Onze Diensten": four white cards with icon, title, rule and short text (client's mockup) -->
<script lang="ts">
	import { services } from '#lib/site.ts';
	import ServiceIcon from './ServiceIcon.svelte';

	let { exclude }: { exclude?: string } = $props();
</script>

<ul class="plain-list cards">
	{#each services.filter((s) => s.href !== exclude) as service (service.href)}
		<li>
			<a class="card service" href={service.href}>
				<ServiceIcon name={service.icon} />
				<h3>{service.title}</h3>
				<p>{service.text}</p>
			</a>
		</li>
	{/each}
</ul>

<style>
	.cards {
		display: grid;
		gap: var(--gutter);
	}

	.service {
		display: grid;
		justify-items: center;
		align-content: start;
		gap: var(--space-16);
		height: 100%;
		padding: var(--space-32) var(--space-24);
		text-align: center;
	}

	h3 {
		width: 100%;
		padding-bottom: var(--space-16);
		border-bottom: 1px solid var(--color-line);
	}

	.service:hover h3 {
		color: var(--color-teal);
	}

	p {
		color: var(--color-steel);
	}

	@media (min-width: 640px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 960px) {
		.cards {
			grid-template-columns: none;
			grid-auto-flow: column;
			grid-auto-columns: 1fr;
		}
	}
</style>
