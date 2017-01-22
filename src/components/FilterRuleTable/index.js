/**
 * @file RuleList
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import RuleFilter from '../RuleFilter';
import RuleList from '../RuleList';

import styles from './index.scss';

class FilterRuleTable extends Component {
  render() {
    const {
      domain,
      ruleList,
      onFilter,
      onDelete
    } = this.props;

    return (
      <div>
        <RuleFilter domain={domain} onFilter={onFilter} />
        <RuleList ruleList={ruleList} onDelete={onDelete} />
      </div>
    );
  }
}

export default FilterRuleTable;

