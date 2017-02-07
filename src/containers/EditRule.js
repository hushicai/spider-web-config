import React, {Component} from 'react';
import {connect} from 'react-redux';
import RuleForm from '../components/RuleForm';
import {editRule} from '../actions';
import {push} from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
  const ruleList = state.ruleList;
  const id = ownProps.routeParams.id;

  let rule = ruleList.find((rule) => {
    return rule.id === id;
  });

  rule = rule || {};

  return {
    rule: JSON.stringify(rule)
  };
};

const mapDispatchToProps =(dispatch, ownProps) => {
  return {
    onSubmit: (rule, id) => {
      dispatch(editRule(rule, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleForm);
