import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import marked from 'marked';

const Markdown = (props: { filepath: string; path?: string }) => {
  const [hljs, setHljs] = useState(null as any);

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
  }, [props.path, hljs]);

  const { filepath } = props;
  const markdownSrc = require(`../content/${filepath}`).default;
  return (
    <div
      className="post"
      dangerouslySetInnerHTML={{ __html: marked(markdownSrc) }}
    />
  );
};

export default Markdown;
