import { h, Fragment } from 'preact';
import Markdown from './Markdown';

import Router from 'preact-router';
import { createHashHistory } from 'history';
import Match, { Link } from 'preact-router/match';

type Post = {
  name: string;
  id: string;
  filepath: string;
  url?: string;
};

let posts: Post[] = [
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
];

posts = posts.map(post => ({ ...post, url: `posts/${post.id}` }));

const Posts = (props: { path: string }) => (
  <Match path="/posts">
    {({ matches, path }: { matches: boolean; path: string }) => (
      <Fragment>
        {matches && (
          <nav className="column">
            <ul>
              {posts.map(({ name, id }) => (
                <li style={{ paddingBottom: '8px' }} key={id}>
                  <Link activeClassName="active" href={`${path}/${id}`}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <Router history={createHashHistory()}>
          {posts.map(({ filepath, url }) => (
            <Markdown path={url} filepath={filepath} />
          ))}
        </Router>
      </Fragment>
    )}
  </Match>
);

export default Posts;
