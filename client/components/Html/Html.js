/**
 * @file Html
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';

import styles from './Html.scss';

class Html extends Component {
  render() {
    const {state, assets = {}, children} = this.props;
    const {js, css} = assets;

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>爬虫配置系统</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {
            css && (<link rel="stylesheet" href={css} />)
          }
        </head>
        <body>
          <div id="root"
            dangerouslySetInnerHTML={
              {__html: children}
            }
          />

          {state && (
            <script
              dangerouslySetInnerHTML={
                {__html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`}
              }
            />
          )}

          {
            js && (<script async src={js}></script>)
          }

        </body>
      </html>
    );
  }
}

export default Html;
