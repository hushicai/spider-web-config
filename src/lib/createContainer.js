/**
 * @file get container
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function defaultGetContainer() {
  const container = document.createElement('div');

  document.body.appendChild(container);

  return container;
}

export default function createContainer(config = {}) {
  const {
    getContainer = defaultGetContainer
  } = config;

  function renderComponent(instance) {
    if (!instance._container) {
      instance._container = getContainer(instance);
    }

    let component = instance.props.children;

    ReactDOM.unstable_renderSubtreeIntoContainer(
      instance,
      component,
      instance._container,
      function callback() {
        instance._component = this;
      }
    );
  }

  function removeContainer(instance) {
    if (instance._container) {
      const container = instance._container;

      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      instance._container = null;
    }
  }


  class Hoc extends Component {
    componentDidMount() {
      // autoMount
      renderComponent(this);
    }

    componentDidUpdate() {
      renderComponent(this);
    }

    componentWillUnmount() {
      // autoDestroy
      removeContainer(this);
    }

    render() {
      return null;
    }
  }

  return Hoc;
}
