import React from 'react';
import {Link} from 'react-router';

function Home(props) {
  const {children}  = props;

  return (
    <ul className="home">
      <li>
        <Link to="/rule">Rule Configure</Link>
      </li>
      <li>
        <Link to="/proxy">Proxy Configure</Link>
      </li>
      <li>
        <Link to="/report">Daily Report</Link>
      </li>
    </ul>
  );
}

export default Home;
