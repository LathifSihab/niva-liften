<!-- The real page in a frame, showing the unsaved draft (see sendPreview in content.svelte.ts) -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { onPreviewReady, sendPreview } from '#lib/content.svelte.ts';

	let { src, path, value }: { src: string; path: string[]; value: unknown } = $props();

	let frame = $state<HTMLIFrameElement>();
	let device = $state<'computer' | 'mobiel'>('computer');
	let width = $state(0);
	let height = $state(0);

	let viewport = $derived(device === 'computer' ? 1280 : 390);
	let scale = $derived(width ? Math.min(1, width / viewport) : 1);

	const send = () => {
		if (frame) sendPreview(frame, path, value);
	};

	// Re-sends on every change to the draft, and whenever the framed page (re)loads
	$effect(send);
	onMount(() => onPreviewReady(send));
</script>

<section class="preview" aria-label="Voorbeeld">
	<div class="bar">
		<p class="label">Voorbeeld</p>
		<div class="devices" role="group" aria-label="Schermgrootte">
			<button type="button" aria-pressed={device === 'computer'} onclick={() => (device = 'computer')}>
				Computer
			</button>
			<button type="button" aria-pressed={device === 'mobiel'} onclick={() => (device = 'mobiel')}>
				Mobiel
			</button>
		</div>
	</div>
	<div class="screen" class:mobile={device === 'mobiel'} bind:clientWidth={width} bind:clientHeight={height}>
		<iframe
			bind:this={frame}
			{src}
			title="Voorbeeld van de pagina met uw wijzigingen"
			style:width="{viewport}px"
			style:height="{height / scale}px"
			style:transform="scale({scale})"
		></iframe>
	</div>
	<p class="cms-hint">Toont uw wijzigingen meteen, ook voor u opslaat.</p>
</section>

<style>
	.preview {
		display: grid;
		gap: var(--space-8);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-12);
	}

	.devices {
		display: flex;
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
		background: var(--color-white);
	}

	.devices button {
		min-height: 36px;
		padding: 0 var(--space-12);
		border: 0;
		background: none;
		color: var(--color-steel);
		font-family: var(--font-heading);
		font-size: var(--text-small);
		font-weight: 600;
		cursor: pointer;
	}

	.devices button + button {
		border-left: 1px solid var(--color-line);
	}

	.devices button[aria-pressed='true'] {
		background: var(--color-teal);
		color: var(--color-white);
	}

	.screen {
		height: min(75svh, 56rem);
		overflow: hidden;
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
		background: var(--color-white);
		box-shadow: var(--shadow-card);
	}

	.screen.mobile {
		display: flex;
		justify-content: center;
		background: var(--color-surface);
	}

	iframe {
		display: block;
		flex: none;
		border: 0;
		background: var(--color-white);
		transform-origin: top left;
	}

	.mobile iframe {
		transform-origin: top center;
	}
</style>
