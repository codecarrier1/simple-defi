module.exports = {
  reactStrictMode: true,
  images: {
    domains: [''],
  },
  fallback: {
    fs: false,
  },
  webpack5: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false, // Optimization caused bugs with some of my SVGs
          },
        },
      ],
    })
    return config
  },
}
