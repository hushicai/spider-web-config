/**
 * @file RuleList
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import RuleFilter from '../RuleFilter';
import RuleList from '../RuleList';
import {getRuleList} from '../../actions';

import styles from './FilterRuleTable.scss';

class FilterRuleTable extends Component {
  // for server side render
  static needs = [
    getRuleList
  ]

  componentDidMount () {
    const {loaded} = this.props;

    if (!loaded) {
      this.props.getRuleList();
    }
  }

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

