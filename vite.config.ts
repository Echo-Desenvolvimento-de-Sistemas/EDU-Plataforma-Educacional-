import { wayfinder } from '@laravel/vite-plugin-wayfinder';
// Fix git object corruption
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                // Only use React Compiler in production for better dev performance
                plugins: process.env.NODE_ENV === 'production' ? ['babel-plugin-react-compiler'] : [],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
            // Skip type generation during production build (Docker)
            // PHP is not available in the frontend-builder stage
            generateTypes: process.env.NODE_ENV !== 'production',
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        host: '127.0.0.1',
        hmr: {
            host: 'localhost',
        },
    },
});
