import React, { useState, useEffect } from 'react';
import Markdown from './Markdown';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

type pathType = { path: string; isExact: boolean };
type matchType = { match: pathType };

const Posts = ({ match }: matchType) => {
  const { path, isExact } = match;

  const [postSelected, setPostSelected] = useState(false);
  const CustomLink = (props: any) => (
    <Link onClick={() => setPostSelected(true)} {...props} />
  );

  console.log(match);

  return (
    <div style={{ width: '100%' }}>
      {isExact && (
        <nav className="column">
          <ul>
            <li>
              <CustomLink to={`${path}/simple-js-02-operators`}>
                Simple Javascript - Operators
              </CustomLink>
            </li>
            <li>
              <CustomLink to={`${path}/simple-js-01-datatypes-variables`}>
                Simple Javascript - Datatypes & Variables
              </CustomLink>
            </li>
            <li>
              <CustomLink to={`${path}/simple-js-0-intro`}>
                Simple Javascript - Intro
              </CustomLink>
            </li>
          </ul>
        </nav>
      )}
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
