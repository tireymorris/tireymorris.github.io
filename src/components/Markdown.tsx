import React, { useEffect } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

const Markdown = (props: { path: string }) => {
  useEffect(() => {
    document
      .querySelectorAll('pre code')
      .forEach(block => hljs.highlightBlock(block));
  }, [props.path]);

  const { path } = props;
  const markdownSrc = require(`../content/${path}`).default;
  return (
    <div
      className="post"
      dangerouslySetInnerHTML={{ __html: marked(markdownSrc) }}
    />
  );
};

export default Markdown;
