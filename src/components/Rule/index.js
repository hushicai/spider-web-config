/**
 * @file Rule
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import {Link} from 'react-router';

class Rule extends Component {
  render() {
    const {rule, onDelete} = this.props;

    return (
      <tr>
        <td>{rule.id}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <Link to={'/rule/edit/' + rule.id}>Edit</Link>
          {' '}
          <a onClick={() => this.props.onDelete(rule.id)} href="javascript:;">Delete</a>
        </td>
      </tr>
    );
  }
}

export default Rule;
