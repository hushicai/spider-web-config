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
        <td>{rule.active}</td>
        <td>{rule['save_page']}</td>
        <td>{rule['use_proxy']}</td>
        <td>{rule['page_type']}</td>
        <td>{rule['handle_js']}</td>
        <td>{rule['priority']}</td>
        <td>{rule['weight']}</td>
        <td>{rule['schedule_interval']}</td>
        <td></td>
        <td>
          <Link to={'/rule/' + rule.id}>Edit</Link>
          {' '}
          <a onClick={() => this.props.onDelete(rule.id)} href="javascript:;">Delete</a>
        </td>
      </tr>
    );
  }
}

export default Rule;
