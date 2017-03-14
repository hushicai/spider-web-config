
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteRule, doFilterRule} from '../actions';
import FilterRuleTable from '../components/FilterRuleTable';

const mapStateToProps = (state, ownProps) => {
  const {domain, ruleList} = state;

  return {
    domain: domain,
    ruleList: ruleList.filter((rule) => {
      return (rule.domain || '').indexOf(domain) !== -1;
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: (id) => {
      dispatch(deleteRule(id));
    },
    onFilter: (domain) => {
      dispatch(doFilterRule(domain));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRuleTable);
