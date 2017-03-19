/**
 * @file RuleList
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import RuleFilter from '../RuleFilter';
import RuleList from '../RuleList';
import Loading from '../../containers/Loading';
import {deleteRule, doFilterRule, getRuleList} from '../../actions';

import styles from './FilterRuleTable.scss';

class FilterRuleTable extends Component {
  // for server side render
  static needs = [
    getRuleList
  ]

  componentDidMount () {
    const {ruleList} = this.props;

    if (ruleList.length === 0) {
      this.props.dispatch(getRuleList());
    }
  }

  render () {
    const {
      domain,
      ruleList,
      onFilter,
      onDelete
    } = this.props;

    return (
      <div>
        <Loading />
        <RuleFilter domain={domain} onFilter={onFilter} />
        <RuleList ruleList={ruleList} onDelete={onDelete} />
      </div>
    );
  }
}

export default FilterRuleTable;

