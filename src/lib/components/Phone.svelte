<script lang="ts">
	import { content } from '#lib/content.svelte.ts';
	import { PLACEHOLDER } from '#lib/site.ts';

	let { class: className = '' }: { class?: string } = $props();
	let phone = $derived(content.data.settings.contact.phone);
</script>

{#if phone}
	<a class="num {className}" href="tel:{phone.replace(/[^\d+]/g, '')}">{phone}</a>
{:else}
	<span class="placeholder {className}">{PLACEHOLDER}</span>
{/if}
