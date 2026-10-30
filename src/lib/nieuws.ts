import type { Component } from 'svelte';
import { photos, type Photo } from './photos.ts';

type Frontmatter = {
	title: string;
	date: string;
	category: string;
	excerpt: string;
	/** Key in photos.ts */
	image: keyof typeof photos;
};

const modules = import.meta.glob<{ metadata: Frontmatter; default: Component }>(
	'/src/content/nieuws/*.md',
	{ eager: true }
);

export type Post = Omit<Frontmatter, 'image'> & { slug: string; photo: Photo; content: Component };

export const posts: Post[] = Object.entries(modules)
	.map(([path, { metadata, default: content }]) => {
		const slug = path.slice(path.lastIndexOf('/') + 1, -'.md'.length);
		const photo = photos[metadata.image];
		if (!photo) throw new Error(`Nieuws "${slug}": unknown image "${metadata.image}"`);
		const { image: _, ...rest } = metadata;
		return { ...rest, slug, photo, content };
	})
	.sort((a, b) => b.date.localeCompare(a.date));
