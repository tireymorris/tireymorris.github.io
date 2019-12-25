import { h } from 'preact';
import Markdown from './Markdown';

import Router from 'preact-router';
import { createHashHistory } from 'history';
import Match, { Link } from 'preact-router/match';

type matchType = { matches: boolean; path: string };

type Props = {
  path: string;
};

const Posts = (props: Props) => (
  <Match path="/posts">
    {({ matches, path }: matchType) => {
      console.log(matches, path);
      return (
        <div style={{ width: '100%' }}>
          {matches && (
            <nav className="column">
              <ul>
                <li>
                  <Link
                    activeClassName="active"
                    href={`${path}/simple-js-02-operators`}
                  >
                    Simple Javascript - Operators
                  </Link>
                </li>
                <li>
                  <Link
                    activeClassName="active"
                    href={`${path}/simple-js-01-datatypes-variables`}
                  >
                    Simple Javascript - Datatypes & Variables
                  </Link>
                </li>
                <li>
                  <Link
                    activeClassName="active"
                    href={`${path}/simple-js-0-intro`}
                  >
                    Simple Javascript - Intro
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          <Router history={createHashHistory()}>
            <Markdown
              path="/posts/simple-js-0-intro"
              filepath="simple-js/0-intro"
            />
            <Markdown
              path={`/posts/simple-js-01-datatypes-variables`}
              filepath="simple-js/01-datatypes-variables"
            />
            <Markdown
              path={`/posts/simple-js-02-operators`}
              filepath="simple-js/02-operators"
            />
          </Router>
        </div>
      );
    }}
  </Match>
);

export default Posts;
