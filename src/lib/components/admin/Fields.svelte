<!-- Edits `value` according to a field list from cms-schema.ts. Rows nest another Fields. -->
<script lang="ts">
	import type { Field } from '#lib/cms-schema.ts';
	import Fields from './Fields.svelte';
	import PhotoPicker from './PhotoPicker.svelte';

	type Value = Record<string, any>;

	let { fields, value = $bindable(), id }: { fields: Field[]; value: Value; id: string } = $props();

	function blank(fields: Field[]): Value {
		return Object.fromEntries(
			fields.map((field) => {
				switch (field.kind) {
					case 'list':
					case 'rows':
						return [field.key, []];
					case 'checkbox':
						return [field.key, false];
					case 'link':
						return [field.key, { label: '', href: '' }];
					case 'select':
						return [field.key, field.options[0]];
					case 'photo':
						return [field.key, 'liftDoors'];
					default:
						return [field.key, ''];
				}
			})
		);
	}

	function move(list: unknown[], from: number, to: number) {
		[list[from], list[to]] = [list[to], list[from]];
	}

	const capital = (text: string) => text[0].toUpperCase() + text.slice(1);
</script>

{#snippet controls(list: unknown[], i: number, noun: string)}
	<div class="controls">
		<button
			class="cms-small-button"
			type="button"
			disabled={i === 0}
			aria-label="{capital(noun)} {i + 1} omhoog"
			onclick={() => move(list, i, i - 1)}>↑</button
		>
		<button
			class="cms-small-button"
			type="button"
			disabled={i === list.length - 1}
			aria-label="{capital(noun)} {i + 1} omlaag"
			onclick={() => move(list, i, i + 1)}>↓</button
		>
		<button
			class="cms-small-button"
			type="button"
			aria-label="{capital(noun)} {i + 1} verwijderen"
			onclick={() => list.splice(i, 1)}>Verwijderen</button
		>
	</div>
{/snippet}

{#each fields as field (field.key)}
	{@const fid = `${id}-${field.key}`}
	{#if field.kind === 'text' || field.kind === 'textarea'}
		{@const length = String(value[field.key] ?? '').length}
		<div class="cms-field">
			<label for={fid}>
				{field.label}
				{#if field.optional}<span class="optional">(optioneel)</span>{/if}
			</label>
			{#if field.kind === 'text'}
				<input id={fid} bind:value={value[field.key]} aria-describedby={field.hint || field.max ? `${fid}-hint` : undefined} />
			{:else}
				<textarea
					id={fid}
					rows="3"
					bind:value={value[field.key]}
					aria-describedby={field.hint || field.max ? `${fid}-hint` : undefined}
				></textarea>
			{/if}
			{#if field.hint || field.max}
				<p class="cms-hint" id="{fid}-hint">
					{field.hint ?? ''}
					{#if field.max}
						<span class="num count" class:over={length > field.max}>{length} / {field.max} tekens</span>
					{/if}
				</p>
			{/if}
		</div>
	{:else if field.kind === 'photo'}
		<PhotoPicker id={fid} label={field.label} bind:value={value[field.key]} />
	{:else if field.kind === 'checkbox'}
		<label class="cms-check"><input type="checkbox" bind:checked={value[field.key]} /> {field.label}</label>
	{:else if field.kind === 'select'}
		<div class="cms-field">
			<label for={fid}>{field.label}</label>
			<select id={fid} bind:value={value[field.key]}>
				{#each field.options as option (option)}
					<option>{option}</option>
				{/each}
			</select>
		</div>
	{:else if field.kind === 'link'}
		<fieldset class="cms-field">
			<legend>{field.label}{#if field.optional} <span class="optional">(optioneel)</span>{/if}</legend>
			<div class="cms-pair">
				<div class="cms-field">
					<label class="sub" for="{fid}-label">Tekst op de knop</label>
					<input id="{fid}-label" bind:value={value[field.key].label} />
				</div>
				<div class="cms-field">
					<label class="sub" for="{fid}-href">Gaat naar</label>
					<input id="{fid}-href" bind:value={value[field.key].href} spellcheck="false" placeholder="/contact" />
				</div>
			</div>
			{#if field.hint}<p class="cms-hint">{field.hint}</p>{/if}
		</fieldset>
	{:else if field.kind === 'list'}
		<fieldset class="cms-field">
			<legend>{field.label}</legend>
			{#if field.hint}<p class="cms-hint">{field.hint}</p>{/if}
			<ol class="plain-list items">
				{#each value[field.key] as _, i (i)}
					<li class="item">
						<label class="visually-hidden" for="{fid}-{i}">{capital(field.noun)} {i + 1}</label>
						<input id="{fid}-{i}" bind:value={value[field.key][i]} />
						{@render controls(value[field.key], i, field.noun)}
					</li>
				{/each}
			</ol>
			<button class="cms-small-button add" type="button" onclick={() => value[field.key].push('')}>
				{capital(field.noun)} toevoegen
			</button>
		</fieldset>
	{:else if field.kind === 'rows'}
		<fieldset class="cms-field">
			<legend>{field.label}</legend>
			{#if field.hint}<p class="cms-hint">{field.hint}</p>{/if}
			<ol class="plain-list rows">
				{#each value[field.key] as row, i (i)}
					<li class="row">
						<div class="row-head">
							<p class="row-title">{row[field.summary] || `${capital(field.noun)} ${i + 1}`}</p>
							{#if !field.fixed}{@render controls(value[field.key], i, field.noun)}{/if}
						</div>
						<div class="row-body">
							<Fields fields={field.fields} bind:value={value[field.key][i]} id="{fid}-{i}" />
						</div>
					</li>
				{/each}
			</ol>
			{#if !field.fixed}
				<button
					class="cms-small-button add"
					type="button"
					onclick={() => value[field.key].push(blank(field.fields))}
				>
					{capital(field.noun)} toevoegen
				</button>
			{/if}
		</fieldset>
	{/if}
{/each}

<style>
	.optional {
		color: var(--color-steel);
		font-weight: 400;
	}

	.sub {
		font-size: var(--text-small);
		font-weight: 400;
		color: var(--color-steel);
	}

	.count {
		margin-left: var(--space-8);
		white-space: nowrap;
	}

	.over {
		color: var(--color-navy);
		font-weight: 600;
	}

	.items {
		display: grid;
		gap: var(--space-8);
	}

	.item {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: var(--space-8);
	}

	@media (max-width: 479px) {
		.item {
			grid-template-columns: 1fr;
		}
	}

	.controls {
		display: flex;
		gap: var(--space-4);
	}

	.add {
		justify-self: start;
	}

	.rows {
		display: grid;
		gap: var(--space-12);
	}

	.row {
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
	}

	.row-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-8);
		padding: var(--space-8) var(--space-8) var(--space-8) var(--space-16);
		border-bottom: 1px solid var(--color-line);
		background: var(--color-surface);
	}

	.row-title {
		font-family: var(--font-heading);
		font-weight: 600;
	}

	.row-body {
		display: grid;
		gap: var(--space-16);
		padding: var(--space-16);
	}
</style>
