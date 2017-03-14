import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addRule} from '../actions';
import RuleForm from '../components/RuleForm';

const DefaultRuleValue = JSON.stringify({
  "domain": "",
  "alias": "",
  "url_pattern": "",
  "id_parameter": [],
  "encoding": "auto",
  "type": "node",
  "save_page": true,
  "format": "html",
  "jshandle": false,
  "extract_rule": {
    "category": "crawled",
    "rule": {
      "title": {
        "base": "content",
        "mode": "css",
        "expression": "title",
        "pick": "text",
        "index": 1
      }
    }
  },
  "cookie": [],
  "inject_jquery": false,
  "load_img": false,
  "drill_rules": [],
  "drill_relation": {
    "base": "content",
    "mode": "css",
    "expression": "title",
    "pick": "text",
    "index": 1
  },
  "validation_keywords": [],
  "script": [],
  "navigate_rule": [],
  "stoppage": -1,
  "priority": 1,
  "weight": 10,
  "schedule_interval": 86400,
  "active": true,
  "seed": [],
  "schedule_rule": "FIFO",
  "use_proxy": false
});

const mapStateToProps = (state, ownProps) => {
  return {
    rule: DefaultRuleValue
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (rule) => {
      dispatch(addRule(rule))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleForm);
