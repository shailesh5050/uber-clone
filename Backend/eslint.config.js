export default [
  {
    files: ['**/*.js'], // only apply these rules to .js files anywhere
    rules: {
      semi: 'error', // require semicolons; error if missing
      'no-unused-vars': 'warn', // warn on unused variables
    },
  },
];
