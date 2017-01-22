/**
 * @file 面包屑
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import {Link} from 'react-router';

class Breadcrumb extends Component {
  render() {
    const {pathname} = this.props;

    let segments = pathname.split('/').filter((v) => {
      return v !== "";
    });

    if (segments.length == 0) {
      return null;
    }

    let lastSegment = segments.pop();
    let ret = [
      {
        name: 'Home',
        path: '/'
      }
    ];

    segments.reduce((accumulator, value) => {
      let t = accumulator + value + '/';

      ret.push({
        name: value,
        path: t
      });
      return t;
    }, '');

    if (lastSegment) {
      ret.push({
        name: lastSegment
      });
    }

    return (
      <p className="breadcrumb">
        {ret.map((item) => {
          if (item.path) {
            return (
              <span key={item.name}>
                <Link to={item.path}>{item.name}</Link>
                {' / '}
              </span>
            );
          }
          else {
            return <em key={item.name}>{item.name}</em>
          }
        })}
      </p>
    );
  }
}

export default Breadcrumb;
