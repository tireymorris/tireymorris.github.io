import React from 'react';
import { render } from 'react-dom';
require('file-loader?name=[name].[ext]!../index.html');

import App from './components/App';

render(<App />, document.querySelector('#root'));