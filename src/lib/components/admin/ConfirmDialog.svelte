<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		confirmLabel,
		onconfirm,
		children
	}: { title: string; confirmLabel: string; onconfirm: () => void; children: Snippet } = $props();

	let dialog: HTMLDialogElement;

	export function open() {
		dialog.showModal();
	}
</script>

<dialog bind:this={dialog} class="card" aria-labelledby="dialog-title">
	<form method="dialog">
		<h2 id="dialog-title" class="h3">{title}</h2>
		<div class="text">{@render children()}</div>
		<div class="button-row">
			<button class="button button-primary" value="confirm" onclick={onconfirm}>{confirmLabel}</button>
			<button class="button button-secondary" value="cancel">Annuleren</button>
		</div>
	</form>
</dialog>

<style>
	dialog {
		width: min(28rem, calc(100% - 2 * var(--space-16)));
		padding: var(--space-32);
		border: 0;
		color: var(--color-navy);
	}

	dialog::backdrop {
		background: rgb(11 31 58 / 0.55);
	}

	.text {
		margin-block: var(--space-12) var(--space-24);
		color: var(--color-steel);
	}
</style>
