module.exports = {
  '*.{css,scss}': ['pnpm run csslint:fix', 'pnpm run formatter:fix'],
  '*.{ts,tsx}': ['pnpm run lint:fix', 'pnpm run formatter:fix'],
};
