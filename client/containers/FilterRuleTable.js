
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteRule, doFilterRule, getRuleList} from '../actions';
import FilterRuleTable from '../components/FilterRuleTable';

const mapStateToProps = (state, ownProps) => {
  const {domain, rules} = state;

  return {
    domain: domain,
    ruleList: rules.list.filter((rule) => {
      return (rule.domain || '').indexOf(domain) !== -1;
    }),
    loaded: rules.loaded
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch: dispatch,
    onDelete: (id) => {
      return dispatch(deleteRule(id));
    },
    onFilter: (domain) => {
      return dispatch(doFilterRule(domain));
    },
    getRuleList: () => {
      return dispatch(getRuleList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRuleTable);
