import React, { Component } from 'react'
import ReactDOM from "react-dom";
import {marked} from "marked";
import hljs from "highlight.js";
import styles from './index.module.scss'

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function(code) {
    return hljs.highlightAuto(code, ["html", "javascript"]).value;
  }
});

export default class Text extends React.Component {

MARKDOWN_TEXT = `
\`\`\`javascript
${this.props.text}
\`\`\`
`;
  render() {
    return (
        <div 
            className={styles.codeBlocks}  
            dangerouslySetInnerHTML={{ __html: marked(this.MARKDOWN_TEXT) }} 
        />
    )
  }
}
