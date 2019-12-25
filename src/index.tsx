import { h, render } from 'preact';

import './assets/resume.pdf';

import './styles/main.css';
import './styles/highlight.css';

import '../index.html';
import './assets/img/headshot.jpg';

import './content/home.md';
import './content/projects.md';
import './content/simple-js/0-intro.md';
import './content/simple-js/01-datatypes-variables.md';
import './content/simple-js/02-operators.md';

import App from './components/App';

render(<App />, document.body);
