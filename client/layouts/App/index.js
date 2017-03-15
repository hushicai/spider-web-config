import React, {Component} from 'react';

import Breadcrumb from '../../components/Breadcrumb';

function App(props) {
  const {
    children,
    location
  } = props;

  return (
    <div className="app">
      <header>
        <hgroup>
          <h1>爬虫配置系统</h1>
          <h2>
            <Breadcrumb pathname={location.pathname}></Breadcrumb>
          </h2>
        </hgroup>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy;2017</p>
      </footer>
    </div>
  );
}

export default App;
