<script lang="ts">
	import { enhance } from '$app/forms';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Phone from '#lib/components/Phone.svelte';
	import { liftBrands, requestTypes, type ContactField } from '#lib/contact.ts';
	import { contact, PLACEHOLDER } from '#lib/site.ts';

	let { data, form } = $props();

	const value = (field: ContactField) =>
		form?.values?.[field] ?? (field === 'type' ? data.type : '');
	const error = (field: ContactField) => form?.errors?.[field];
	const describedBy = (field: ContactField) => (error(field) ? `${field}-error` : undefined);
</script>

<svelte:head>
	<title>Contact en onderhoud aanvragen | Nivå Liften</title>
	<meta
		name="description"
		content="Neem contact op met Nivå Liften voor liftonderhoud, reparatie of liftmodernisering. Storing? Wij zijn 24/7 bereikbaar."
	/>
</svelte:head>

{#snippet fieldError(field: ContactField)}
	{#if error(field)}
		<p class="error" id="{field}-error">{error(field)}</p>
	{/if}
{/snippet}

<PageHeader
	eyebrow="Contact"
	title="Onderhoud aanvragen of een vraag stellen"
	lead="Vul het formulier in, dan nemen wij contact met u op. Storing? Bel direct onze 24/7 storingsdienst."
/>

<section class="section tight">
	<div class="container layout">
		<div>

			{#if form && 'sent' in form}
				<div class="sent" role="status">
					<h2 class="h3">Bedankt voor uw bericht.</h2>
					<p>Dit is een demo: uw bericht is nog niet verzonden.</p>
				</div>
			{:else}
				<form method="POST" use:enhance>
					<div class="field">
						<label for="naam">Naam</label>
						<input
							id="naam"
							name="naam"
							autocomplete="name"
							required
							value={value('naam')}
							aria-invalid={error('naam') ? 'true' : undefined}
							aria-describedby={describedBy('naam')}
						/>
						{@render fieldError('naam')}
					</div>
					<div class="field">
						<label for="organisatie">
							Organisatie of VvE <span class="optional">(optioneel)</span>
						</label>
						<input
							id="organisatie"
							name="organisatie"
							autocomplete="organization"
							value={value('organisatie')}
						/>
					</div>
					<div class="field-pair">
						<div class="field">
							<label for="email">E-mail</label>
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								value={value('email')}
								aria-invalid={error('email') ? 'true' : undefined}
								aria-describedby={describedBy('email')}
							/>
							{@render fieldError('email')}
						</div>
						<div class="field">
							<label for="telefoon">Telefoon <span class="optional">(optioneel)</span></label>
							<input
								id="telefoon"
								name="telefoon"
								type="tel"
								autocomplete="tel"
								value={value('telefoon')}
							/>
						</div>
					</div>
					<div class="field">
						<label for="adres">Adres van de lift <span class="optional">(optioneel)</span></label>
						<input id="adres" name="adres" autocomplete="street-address" value={value('adres')} />
					</div>
					<div class="field-pair">
						<div class="field">
							<label for="type">Type aanvraag</label>
							<select
								id="type"
								name="type"
								required
								aria-invalid={error('type') ? 'true' : undefined}
								aria-describedby={describedBy('type')}
							>
								<option value="" selected={!value('type')}>Kies een type</option>
								{#each requestTypes as type (type)}
									<option selected={value('type') === type}>{type}</option>
								{/each}
							</select>
							{@render fieldError('type')}
						</div>
						<div class="field">
							<label for="merk">Merk lift <span class="optional">(optioneel)</span></label>
							<select id="merk" name="merk">
								{#each liftBrands as brand (brand)}
									<option selected={value('merk') === brand}>{brand}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="field">
						<label for="bericht">Bericht</label>
						<textarea
							id="bericht"
							name="bericht"
							rows="6"
							required
							value={value('bericht')}
							aria-invalid={error('bericht') ? 'true' : undefined}
							aria-describedby={describedBy('bericht')}
						></textarea>
						{@render fieldError('bericht')}
					</div>
					<button class="button button-primary" type="submit">Versturen</button>
				</form>
			{/if}
		</div>

		<aside class="details">
			<section id="storing" class="storing on-dark" aria-labelledby="storing-title">
				<h2 id="storing-title" class="label">Storing of opsluiting?</h2>
				<p>Bel onze 24/7 storingsdienst. Wij zijn dag en nacht bereikbaar.</p>
				<p class="h2"><Phone /></p>
			</section>

			<section aria-labelledby="gegevens-title">
				<h2 id="gegevens-title" class="label">Gegevens</h2>
				<dl>
					{#each [['Telefoon', contact.phone], ['E-mail', contact.email], ['Adres', contact.address], ['KvK', contact.kvk]] as [term, val] (term)}
						<div>
							<dt class="small">{term}</dt>
							<dd>
								{#if val}{val}{:else}<span class="placeholder">{PLACEHOLDER}</span>{/if}
							</dd>
						</div>
					{/each}
				</dl>
			</section>
		</aside>
	</div>
</section>

<style>
	.layout {
		display: grid;
		gap: var(--space-64);
	}

	form {
		display: grid;
		gap: var(--space-24);
		max-width: 44rem;
	}

	.field {
		display: grid;
		gap: var(--space-8);
		align-content: start;
	}

	.field-pair {
		display: grid;
		gap: var(--space-24);
	}

	label {
		font-weight: 600;
	}

	.optional {
		color: var(--color-steel);
		font-weight: 400;
	}

	input,
	select,
	textarea {
		width: 100%;
		min-height: 48px;
		padding: var(--space-8) var(--space-12);
		border: 1px solid var(--color-steel-light);
		border-radius: var(--radius);
		background: var(--color-white);
		color: var(--color-navy);
		font: inherit;
	}

	textarea {
		resize: vertical;
	}

	input:focus-visible,
	select:focus-visible,
	textarea:focus-visible {
		border-color: var(--color-teal);
		outline-offset: 0;
	}

	[aria-invalid='true'] {
		border: 2px solid var(--color-navy);
	}

	.error {
		font-weight: 600;
	}

	button {
		justify-self: start;
	}

	.sent {
		max-width: 44rem;
		padding: var(--space-24);
		border-left: 4px solid var(--color-teal);
		background: var(--color-surface);
	}

	.sent p {
		margin-top: var(--space-8);
	}

	.details {
		display: grid;
		gap: var(--space-48);
		align-content: start;
	}

	.storing {
		display: grid;
		gap: var(--space-12);
		padding: var(--space-32);
	}

	.details dl {
		display: grid;
		gap: var(--space-16);
		margin-top: var(--space-16);
	}

	dt {
		color: var(--color-steel);
	}

	@media (min-width: 640px) {
		.field-pair {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 960px) {
		.layout {
			grid-template-columns: 7fr 4fr;
			gap: var(--space-96);
		}

		.details {
			padding-top: var(--space-16);
		}
	}
</style>
