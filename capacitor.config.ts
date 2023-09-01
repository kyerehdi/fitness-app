import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'fitness-app',
  webDir: 'www',
  server: {
    url: 'http://192.168.1.162:4200',
    cleartext: true,
  },
};

export default config;
