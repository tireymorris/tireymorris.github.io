import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Posts from './Posts';
import Projects from './Projects';

const App = () => (
  <Router>
    <div id="content">
      <nav className="horizontal">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/posts" component={Posts} />
        <Route path="/projects" component={Projects} />
      </Switch>
    </div>
  </Router>
);

export default App;
