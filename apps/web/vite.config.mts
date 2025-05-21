/// <reference types="vite" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
	plugins: [tailwindcss(), react()],
	build: {
		assetsDir: 'res',
		minify: mode === 'production',
		sourcemap: mode !== 'production',
		emptyOutDir: true,
		outDir: './dist'
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
	},
}))
