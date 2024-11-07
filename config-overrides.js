const path = require('path');
const {
  override,
  addWebpackAlias,
  addPostcssPlugins,
} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@ui': path.resolve(__dirname, 'src/components/ui'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@containers': path.resolve(__dirname, 'src/containers'),
    '@context': path.resolve(__dirname, 'src/context'),
    '@utils': path.resolve(__dirname, 'src/lib/utils.ts'),
    '@appTypes': path.resolve(__dirname, 'src/types'),
  }),
  addPostcssPlugins([require('tailwindcss'), require('autoprefixer')])
);
