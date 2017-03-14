/**
 * @file Html
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';

class Html extends Component {
  render() {
    const {state, children} = this.props;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>爬虫配置系统</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {
            (() => {
              if (process.env.NODE_ENV === 'production') {
               return <link rel="stylesheet" href="/client.css" />
              }
            })()
          }
        </head>
        <body>
          <div id="root"
            dangerouslySetInnerHTML={
              {__html: process.env.NODE_ENV === 'production' ? children : ''}
            }
          />

          {state && (
            <script
              dangerouslySetInnerHTML={
                {__html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`}
              }
            />
          )}

          <script async src="/client.js"></script>
        </body>
      </html>
    );
  }
}

export default Html;
