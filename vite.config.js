import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vite.dev/config/
export default defineConfig({
	build: {
		target: 'es6',
	},
	server: {
		host: '0.0.0.0' // Listen on all IPv4 addresses, not just IPv6
	},
	plugins: [
		svelte(),
		viteSingleFile()
	],
});


