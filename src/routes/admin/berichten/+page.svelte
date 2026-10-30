<script lang="ts">
	import ConfirmDialog from '#lib/components/admin/ConfirmDialog.svelte';
	import { content } from '#lib/content.svelte.ts';

	const labels: Record<string, string> = {
		naam: 'Naam',
		organisatie: 'Organisatie of VvE',
		email: 'E-mail',
		telefoon: 'Telefoon',
		adres: 'Adres van de lift',
		merk: 'Merk lift',
		type: 'Type aanvraag',
		bericht: 'Bericht'
	};

	let inbox = $derived(content.data.inbox);
	let selectedId = $state<string | null>(null);
	let selected = $derived(inbox.find((message) => message.id === selectedId));
	let deleteDialog = $state<ConfirmDialog>();

	const time = (iso: string) =>
		new Date(iso).toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' });

	function open(id: string) {
		selectedId = id;
		if (inbox.some((message) => message.id === id && !message.read)) {
			content.save(
				['inbox'],
				inbox.map((message) => (message.id === id ? { ...message, read: true } : message))
			);
		}
	}

	function remove() {
		content.save(['inbox'], inbox.filter((message) => message.id !== selectedId));
		selectedId = null;
	}
</script>

<svelte:head>
	<title>Berichten | Beheer Nivå Liften</title>
</svelte:head>

<div class="cms-page">
	<div class="cms-heading">
		<div>
			<h1 class="h2">Berichten</h1>
			<p>Aanvragen via het contactformulier.</p>
		</div>
	</div>

	{#if inbox.length}
		<div class="inbox">
			<ul class="plain-list list cms-card" aria-label="Ontvangen berichten">
				{#each inbox as message (message.id)}
					<li>
						<button
							type="button"
							class="item"
							class:unread={!message.read}
							aria-current={message.id === selectedId ? 'true' : undefined}
							onclick={() => open(message.id)}
						>
							<span class="item-head">
								<span class="name">{message.values.naam || 'Zonder naam'}</span>
								<time class="cms-hint num" datetime={message.received}>{time(message.received)}</time>
							</span>
							<span class="cms-hint">
								{message.values.type}{#if !message.read} · <strong>Nieuw</strong>{/if}
							</span>
						</button>
					</li>
				{/each}
			</ul>

			<section class="cms-card detail" aria-live="polite">
				{#if selected}
					<div class="detail-head">
						<div>
							<h2 class="h3">{selected.values.type}: {selected.values.naam}</h2>
							<p class="cms-hint">Ontvangen op {time(selected.received)}</p>
						</div>
						<div class="button-row">
							{#if selected.values.email}
								<a class="button button-primary" href="mailto:{selected.values.email}">Beantwoorden</a>
							{/if}
							<button class="button button-secondary" type="button" onclick={() => deleteDialog?.open()}>
								Verwijderen
							</button>
						</div>
					</div>
					<dl>
						{#each Object.entries(labels) as [key, label] (key)}
							{#if selected.values[key]}
								<div class:full={key === 'bericht'}>
									<dt class="label">{label}</dt>
									<dd>{selected.values[key]}</dd>
								</div>
							{/if}
						{/each}
					</dl>
				{:else}
					<p class="cms-hint">Kies een bericht om het te lezen.</p>
				{/if}
			</section>
		</div>
	{:else}
		<div class="cms-card cms-empty">
			<p><strong>Nog geen berichten.</strong></p>
			<p>
				Verstuur het formulier op de
				<a href="/contact" target="_blank" rel="noopener">contactpagina<span class="visually-hidden"> (nieuw tabblad)</span></a>:
				in deze demo komt de aanvraag hier binnen.
			</p>
		</div>
	{/if}
</div>

<ConfirmDialog
	bind:this={deleteDialog}
	title="Bericht verwijderen?"
	confirmLabel="Verwijderen"
	onconfirm={remove}
>
	<p>Het bericht van {selected?.values.naam || 'deze afzender'} wordt verwijderd.</p>
</ConfirmDialog>

<style>
	.inbox {
		display: grid;
		gap: var(--space-24);
		align-items: start;
	}

	@media (min-width: 900px) {
		.inbox {
			grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
		}
	}

	.list {
		padding: var(--space-8);
	}

	.item {
		display: grid;
		gap: var(--space-4);
		width: 100%;
		padding: var(--space-12) var(--space-16);
		border: 0;
		border-radius: var(--radius);
		background: none;
		color: var(--color-navy);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.item:hover {
		background: var(--color-surface);
	}

	.item[aria-current='true'] {
		background: var(--color-surface);
		box-shadow: inset 3px 0 0 var(--color-teal);
	}

	.item-head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--space-8);
	}

	.unread .name {
		font-weight: 700;
	}

	.detail {
		display: grid;
		gap: var(--space-24);
	}

	.detail-head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--space-16);
	}

	dl {
		display: grid;
		gap: var(--space-16) var(--space-24);
		margin: 0;
	}

	@media (min-width: 640px) {
		dl {
			grid-template-columns: 1fr 1fr;
		}
	}

	.full {
		grid-column: 1 / -1;
	}

	dd {
		margin: var(--space-4) 0 0;
		white-space: pre-line;
	}
</style>
