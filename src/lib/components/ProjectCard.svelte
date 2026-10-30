<script lang="ts">
	import { PLACEHOLDER, type Project } from '#lib/site.ts';
	import Photo from './Photo.svelte';

	let { project, level = 3 }: { project: Project; level?: 2 | 3 } = $props();
</script>

<article class="project">
	<Photo photo={project.photo} />
	<p class="label">
		{#if project.location}{project.location}{:else}<span class="placeholder">{PLACEHOLDER}</span>{/if}
	</p>
	<svelte:element this={`h${level}`} class="h3">{project.name}</svelte:element>
	<p>
		{#if project.scope}{project.scope}{:else}<span class="placeholder">{PLACEHOLDER}</span>{/if}
	</p>
	{#if project.category}
		<p class="tag small">{project.category}</p>
	{/if}
</article>

<style>
	.project {
		display: grid;
		gap: var(--space-8);
		align-content: start;
	}

	.label {
		margin-top: var(--space-8);
	}

	.tag {
		justify-self: start;
		padding: 0 var(--space-8);
		border: 1px solid var(--color-line);
		border-radius: var(--radius);
		color: var(--color-steel);
	}
</style>
