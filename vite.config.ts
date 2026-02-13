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
        // Only use wayfinder in development (requires PHP)
        ...(process.env.NODE_ENV !== 'production' ? [
            wayfinder({
                formVariants: true,
            })
        ] : []),
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
