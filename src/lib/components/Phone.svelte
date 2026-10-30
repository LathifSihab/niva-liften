<script lang="ts">
	import { contact, PLACEHOLDER } from '#lib/site.ts';

	let { class: className = '' }: { class?: string } = $props();
</script>

{#if contact.phone}
	<a class="num {className}" href="tel:{contact.phone.replace(/[^\d+]/g, '')}">{contact.phone}</a>
{:else}
	<span class="placeholder {className}">{PLACEHOLDER}</span>
{/if}
