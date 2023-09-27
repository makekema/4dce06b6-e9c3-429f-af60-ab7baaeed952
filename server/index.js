require('ignore-styles');
const register = require('@babel/register');

register({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('./server');