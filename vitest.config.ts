/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './'),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		css: false,
		setupFiles: './app/tests-setup.ts',
	},
});
