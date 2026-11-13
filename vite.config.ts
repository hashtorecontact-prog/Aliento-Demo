import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          shapemaster: path.resolve(__dirname, 'shapemaster.html'),
          vacushape: path.resolve(__dirname, 'vacushape.html'),
          wholeBodyVibration: path.resolve(__dirname, 'whole-body-vibration.html'),
          vibrosaun: path.resolve(__dirname, 'vibrosaun.html'),
          massageChair: path.resolve(__dirname, 'massage-chair.html'),
          fitnessAwareness: path.resolve(__dirname, 'fitness-awareness.html'),
          offers: path.resolve(__dirname, 'offers.html'),
          freeTrial: path.resolve(__dirname, 'free-trial.html'),
          shop: path.resolve(__dirname, 'shop.html'),
          downloads: path.resolve(__dirname, 'downloads.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          booking: path.resolve(__dirname, 'booking.html'),
          privacy: path.resolve(__dirname, 'privacy.html'),
          terms: path.resolve(__dirname, 'terms.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
