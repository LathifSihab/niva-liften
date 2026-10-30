import type { Component } from 'svelte';

type Frontmatter = { title: string; date: string; category: string; excerpt: string };

const modules = import.meta.glob<{ metadata: Frontmatter; default: Component }>(
	'/src/content/nieuws/*.md',
	{ eager: true }
);

export type Post = Frontmatter & { slug: string; content: Component };

export const posts: Post[] = Object.entries(modules)
	.map(([path, module]) => ({
		...module.metadata,
		slug: path.slice(path.lastIndexOf('/') + 1, -'.md'.length),
		content: module.default
	}))
	.sort((a, b) => b.date.localeCompare(a.date));
