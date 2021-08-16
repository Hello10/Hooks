module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    '@hello10/eslint-config-react',
    'plugin:@typescript-eslint/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx']
      }
    }
  },
  rules: {
    'import/extensions': 'off'
  }
};
