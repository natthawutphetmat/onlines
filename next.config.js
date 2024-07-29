// next.config.js

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://online.myadsdeps.com/:path*' // Proxy to Backend
        }
      ]
    },
  }
  