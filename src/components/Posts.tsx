import React from 'react';
import Markdown from './Markdown';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

type pathType = { path: string };
type matchType = { match: pathType };

const Posts = ({ match }: matchType) => {
  const { path } = match;

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`${path}/simple-js-02-operators`}>
              Simple Javascript - Operators
            </Link>
          </li>
          <li>
            <Link to={`${path}/simple-js-01-datatypes-variables`}>
              Simple Javascript - Datatypes & Variables
            </Link>
          </li>
          <li>
            <Link to={`${path}/simple-js-0-intro`}>
              Simple Javascript - Intro
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={`${path}/simple-js-0-intro`}>
          <Markdown path="simple-js/0-intro" />
        </Route>
        <Route path={`${path}/simple-js-01-datatypes-variables`}>
          <Markdown path="simple-js/01-datatypes-variables" />
        </Route>
        <Route path={`${path}/simple-js-02-operators`}>
          <Markdown path="simple-js/02-operators" />
        </Route>
      </Switch>
    </div>
  );
};

export default Posts;
