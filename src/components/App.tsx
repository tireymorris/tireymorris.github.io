import { h } from 'preact';

import Router from 'preact-router';
import { createHashHistory } from 'history';
import { Link } from 'preact-router/match';

import Home from './Home';
import Posts from './Posts';
import Projects from './Projects';

const App = () => (
  <div id="root">
    <div id="content">
      <nav className="horizontal">
        <ul>
          <li>
            <Link activeClassName="active" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/posts">
              Posts
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/projects">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
      <Router history={createHashHistory()}>
        <Home path="/" />
        <Posts path="/posts" />
        <Posts path="/posts/:id" />
        <Projects path="/projects" />
      </Router>
    </div>
  </div>
);

export default App;
