<!-- Current photo, with a grid of the photo library to pick another (radio buttons as tiles) -->
<script lang="ts">
	import { photoOf } from '#lib/content.svelte.ts';
	import { photos } from '#lib/photos.ts';

	let { value = $bindable(), id, label }: { value: string; id: string; label: string } = $props();

	let open = $state(false);
	let current = $derived(photoOf(value));
</script>

<fieldset class="cms-field">
	<legend>{label}</legend>
	<div class="current">
		<img src={current.src} alt="" />
		<div>
			<p class="cms-hint">{current.alt}</p>
			<button
				class="cms-small-button"
				type="button"
				aria-expanded={open}
				aria-controls="{id}-keuze"
				onclick={() => (open = !open)}
			>
				{open ? 'Klaar met kiezen' : 'Andere foto kiezen'}
			</button>
		</div>
	</div>
	{#if open}
		<div class="choices" id="{id}-keuze">
			{#each Object.keys(photos) as key (key)}
				<label class="choice">
					<input class="visually-hidden" type="radio" name={id} value={key} bind:group={value} />
					<img src={photos[key as keyof typeof photos].src} alt="" loading="lazy" />
					<span>{photoOf(key).alt}</span>
				</label>
			{/each}
		</div>
	{/if}
</fieldset>

<style>
	.current {
		display: grid;
		grid-template-columns: 7.5rem 1fr;
		align-items: center;
		gap: var(--space-16);
	}

	.current img,
	.choice img {
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		border-radius: var(--radius);
	}

	.current .cms-hint {
		margin-bottom: var(--space-8);
	}

	.choices {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
		gap: var(--space-8);
		margin-top: var(--space-8);
	}

	.choice {
		display: grid;
		gap: var(--space-4);
		align-content: start;
		padding: var(--space-4);
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
		cursor: pointer;
	}

	.choice:hover {
		border-color: var(--color-steel);
	}

	.choice:has(:checked) {
		border-color: var(--color-teal);
		box-shadow: 0 0 0 1px var(--color-teal);
	}

	.choice:has(:focus-visible) {
		outline: 2px solid var(--color-teal);
		outline-offset: 2px;
	}

	.choice span {
		color: var(--color-steel);
		font-size: 0.75rem;
		line-height: 1.35;
	}
</style>
