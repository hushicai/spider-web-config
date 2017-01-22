import React, {Component} from 'react';

function App(props) {
  const {
    main,
    location
  } = props;

  return (
    <div className="app">
      <header>
        <hgroup>
          <h1>爬虫配置系统</h1>
          <h2>{location.pathname}</h2>
        </hgroup>
      </header>
      <main>
        {main}
      </main>
      <footer>
        <p>&copy;2017</p>
      </footer>
    </div>
  );
}

export default App;
