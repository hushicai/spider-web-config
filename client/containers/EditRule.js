import React, {Component} from 'react';
import {connect} from 'react-redux';
import RuleForm from '../components/RuleForm';
import {editRule} from '../actions';

const mapStateToProps = (state, ownProps) => {
  const ruleList = state.rules.list;
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
    onSubmit: (id, rule) => {
      dispatch(editRule(id, rule));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleForm);
