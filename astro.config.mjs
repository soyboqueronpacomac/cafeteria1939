// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    
    adapter: vercel(),
    vite: {
        plugins: [ tailwindcss()]
    },
    image: {
        domains: ['dev-cafeteria1939.pantheonsite.io']
    }
});
