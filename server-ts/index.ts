import 'ignore-styles';
import register from '@babel/register';

register({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

import './server';