import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			extensions: ['.svelte', '.md'],
			preprocess: [mdsvex({ extensions: ['.md'] })]
		})
	]
});
