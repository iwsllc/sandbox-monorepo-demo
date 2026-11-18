/// <reference types="vitest/config" />
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
		port: 3000 // normally vite uses 5173; we're overriding it for no particular reason here.
	},
	test: {
		globals: true,
		mockReset: true,
		environment: 'happy-dom'
	}
}))
