// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [ tailwindcss()]
    },
    image: {
        domains: ['dev-cafeteria1939.pantheonsite.io']
    }
});
