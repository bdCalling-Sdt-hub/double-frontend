import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
        plugins: [react()],
        server: {
                // host: '68.178.202.182',
                host: '10.0.60.123',
                port: 3006,
                allowedHosts: ['apu.binarybards.online'], // Ensure this line is present
        },
        // preview: {
        //         allowedHosts: ['cannasseurshemp.com'],
        // },
});
