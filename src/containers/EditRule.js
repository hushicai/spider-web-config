import React, {Component} from 'react';
import {connect} from 'react-redux';
import RuleForm from '../components/RuleForm';

const mapStateToProps = (state, ownProps) => {
  const ruleList = state.ruleList;
  const id = ownProps.routeParams.id;

  let rule = ruleList.find((rule) => {
    return rule.id === id;
  });

  return {
    rule: JSON.stringify(rule, null, 2)
  };
};

const mapDispatchToProps =(dispatch, ownProps) => {
  return {
    onSubmit: (rule) => {
      dispatch(editRule(rule));
      dispatch(push('/rule'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleForm);
