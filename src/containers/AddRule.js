import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addRule} from '../actions';
import RuleForm from '../components/RuleForm';
import {push} from 'react-router-redux';
import DefaultRuleValue from '../constants/DefaultRuleValue';

const mapStateToProps = (state, ownProps) => {
  return {
    rule: DefaultRuleValue
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (rule) => {
      dispatch(addRule(rule))
      dispatch(push('/rule'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleForm);
