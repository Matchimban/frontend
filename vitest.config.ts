/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './'),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		css: false,
		setupFiles: [resolve(__dirname, 'app/__tests__/tests-setup.ts')],
	},
});
