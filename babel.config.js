module.exports = {
  env: {
    production: {
      sourceMaps: false,
    }
  },
  presets: [
    '@babel/preset-env',
    '@babel/typescript',
    'minify',
  ],
  sourceMaps: 'inline',
};
