/**
 * @file RuleFilter
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import {Link} from 'react-router';

class RuleFilter extends Component {
  constructor(props) {
    super(props);

    this.handleFilter = this.handleFilter.bind(this);
  }
  render() {
    const {domain, onFilter} = this.props;
    return (
      <div>
        Domain:
        <input type="text" name="domain"
          value={domain} ref="domainInput"
          onChange={this.handleFilter}
          autoComplete="off"
        />
        <button onClick={this.handleFilter}>Filter</button>
        <Link to="/rule/add">ADD</Link>
      </div>
    );
  }
  handleFilter() {
    this.props.onFilter(this.refs.domainInput.value);
  }
}

export default RuleFilter;
