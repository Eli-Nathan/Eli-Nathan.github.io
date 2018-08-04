module.exports = {
  extends: 'airbnb',
  rules: {
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-no-bind': 'off',
    'react/no-array-index-key': 'off',
  },
};
