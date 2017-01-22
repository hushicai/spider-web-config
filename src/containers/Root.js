/**
 * @file Root
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

class Root extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {store, history, routes} = this.props;

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

export default Root;
