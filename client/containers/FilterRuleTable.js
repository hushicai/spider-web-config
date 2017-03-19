
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteRule, doFilterRule} from '../actions';
import FilterRuleTable from '../components/FilterRuleTable';

const mapStateToProps = (state, ownProps) => {
  const {domain, rules} = state;

  return {
    domain: domain,
    ruleList: rules.list.filter((rule) => {
      return (rule.domain || '').indexOf(domain) !== -1;
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    onFilter: (domain) => {
      dispatch(doFilterRule(domain));
    },
    onDelete: (id) => {
      dispatch(deleteRule(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRuleTable);
