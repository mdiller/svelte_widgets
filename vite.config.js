import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  server: {
		host: '0.0.0.0' // Listen on all IPv4 addresses, not just IPv6
	},
  plugins: [svelte()],
})
