/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@/lib/*': ['/src/lib/*'],
      '@/components/*': ['/src/components/*'],
      '@/app/*': ['/src/app/*'],
    },
  },
};

module.exports = nextConfig;
