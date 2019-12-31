# How to build a blog with propolis.js

[propolis](https://github.com/tireymorris/propolis) is a Markdown-focused blog platform built in [Preact](https://preactjs.com/), with [preact-router](https://github.com/preactjs/preact-router) handling the hash routing, and [highlight.js](https://highlightjs.org/) providing syntax highlighting. It allows you to write all your content in Markdown, and the only code required is an `index.html` file and a simple json manifest file that must be called `pages.json`, both located in the same directory.

## Installation

In your `index.html`, include the following scripts:

```html
<head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/npm/propolis@0.3.6/build/highlight.css"
  />
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/npm/propolis@0.3.6/build/main.css"
  />
</head>

<body>
  <script src="https://cdn.jsdelivr.net/npm/propolis/build/vendors~highlight.js.bundle.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/propolis@0.3.6/build/main.bundle.js"></script>
</body>
```

## Configuration

In the root of your web directory, create a `pages.json` manifest file which tells propolis where to find and route your content.

The file has the the following format:

```json
[
  // normal page
  {
    "name": string, // displayed on navbar
    "id": string, // the route for this page
    "filepath": string // the path to a markdown file on the server
  },
  // Posts page
  {
    "name": string,
    "id": string,
    "posts": [] // Array of normal pages
  }
]
```

## How it works

Propolis' `index.ts` file renders the App component directly, which in turn fetches the `pages.json` file and renders both links to the pages as well as setting up the routes for the pages and posts. The `path` attribute is a sort of magic that `preact-router` expects in order to know which component to render, and is matched automatically against the page URL.

```jsx
const childRoutes = page => [
  pages.map(page => {
    // need two loops here because Fragments don't work with preact-router
    if (page.posts && page.posts.length > 0) {
      return <Posts path={`/${page.id}`} posts={page.posts} />;
    }
  }),
  pages.map(page => {
    if (page.posts && page.posts.length > 0) {
      return page.posts.map(({ id, filepath }) => (
        <Markdown path={`/${page.id}/${id}`} filepath={filepath} />
      ));
    }
    return <Markdown path={`/${page.id}`} filepath={page.filepath} />;
  })
];
```

```jsx
const App = () => {
  const [pages, setPages] = useState([]);

  const fetchPages = async () => {
    const data = await fetch(
      `${location.protocol}//${location.host}/pages.json`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        return [];
      });

    setPages(data);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
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
        <Router history={createHashHistory()}>{...childRoutes(pages)}</Router>
      </div>
    </div>
  );
};
```

The Posts component is rendered whenever the `pages.json` encounters nested routes. It renders a list of links as well as their corresponding routes, using a `preact-router` `Match` component to determine whether to render the links or delegate to the router.

```jsx
const Posts = (props: { path: string, posts: Post[] }) => (
  <Match path="/posts">
    {({ matches, path }: { matches: boolean, path: string }) => (
      <Fragment>
        {matches && (
          <nav className="column">
            <ul>
              {props.posts.map(({ name, id }) => (
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
          {props.posts.map(({ id, filepath }) => (
            <Markdown path={`posts/${id}`} filepath={filepath} />
          ))}
        </Router>
      </Fragment>
    )}
  </Match>
);
```

The Markdown component is used to render both pages and posts, as everything in propolis is rendered via Markdown. The component dynamically loads the `highlight.js` package, fetches the Markdown source for the current page/post, then renders the markdown and highlights the code blocks contained within.

```jsx
const Markdown = (props: { filepath: string; path?: string }) => {
  const [hljs, setHljs] = useState(null as any);
  const [markdownSrc, setMarkdownSrc] = useState('');
  const { filepath } = props;

  useEffect(() => {
    import(/* webpackChunkName: "highlight.js" */ 'highlight.js').then(
      ({ default: hjs }) => {
        setHljs(hjs);
      }
    );
  }, []);

  useEffect(() => {
    if (hljs) {
      document
        .querySelectorAll('pre code')
        .forEach(block => hljs.highlightBlock(block));
    }
  }, [props.path, hljs, markdownSrc]);

  const fetchMarkdownSrc = async () => {
    const markdown: string = await fetch(
      `${location.protocol}//${location.host}/${filepath}`
    )
      .then(response => {
        return response.text();
      })
      .catch(error => {
        console.error(error);
        return '';
      });

    setMarkdownSrc(markdown);
  };

  useEffect(() => {
    fetchMarkdownSrc();
  }, [filepath]);

  return (
    <div
      className="post"
      dangerouslySetInnerHTML={{ __html: marked(markdownSrc) }}
    />
  );
};
```
