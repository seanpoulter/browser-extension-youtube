import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';

const extensions = [
  '.ts',
];

module.exports = {
  input: 'src/extension/index.ts',
  output: {
    compact: true,
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve({
      extensions,
    }),
    babel({
      extensions,
    }),
  ],
  watch: {
    include: 'src/**',
    exclude: [
      'node_modules/**',
      'src/**/__mocks__/**',
      'src/**/__tests__/**',
    ],
  },
};
