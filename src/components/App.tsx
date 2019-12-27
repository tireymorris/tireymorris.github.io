import { h, Fragment } from 'preact';

import Router from 'preact-router';
import { createHashHistory } from 'history';
import { Link } from 'preact-router/match';

import Posts from './Posts';
import Markdown from './Markdown';

const pages = [
  {
    name: 'Home',
    id: '',
    filepath: 'home.md'
  },
  {
    name: 'Posts',
    id: 'posts',
    posts: [
      {
        name: 'Simple Javascript - Operators',
        id: 'simple-js-02-operators',
        filepath: 'simple-js/02-operators'
      },
      {
        name: 'Simple Javascript - Datatypes & Variables',
        id: 'simple-js-01-datatypes-variables',
        filepath: 'simple-js/01-datatypes-variables'
      },
      {
        name: 'Simple Javascript - Intro',
        id: 'simple-js-0-intro',
        filepath: 'simple-js/0-intro'
      }
    ]
  },
  {
    name: 'Projects',
    id: 'projects',
    filepath: 'projects.md'
  }
];

const App = () => (
  <div id="root">
    <div id="content">
      <nav className="horizontal">
        <ul>
          {pages.map(page => (
            <li>
              <Link activeClassName="active" href={`/${page.id}`}>
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Router history={createHashHistory()}>
        {pages.map(page => {
          if (page.posts && page.posts.length > 0) {
            return <Posts path="/posts/:id?" posts={page.posts} />;
          } else if (page.filepath && page.filepath.length > 0) {
            return <Markdown path={`/${page.id}`} filepath={page.filepath} />;
          } else {
            return <div />;
          }
        })}
      </Router>
    </div>
  </div>
);

export default App;
