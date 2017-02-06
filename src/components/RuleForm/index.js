import React, {Component} from 'react';

import ReactAce from 'react-ace';
import brace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import styles from './index.scss';

import Loading from '../../containers/Loading';

class RuleForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    let rule = {};

    try {
      rule = JSON.parse(this.props.rule);
    }
    catch (ex) {
      rule = {};
    }
    delete rule.id;

    rule = JSON.stringify(rule, null, 2);

    return (
      <form onSubmit={this.onSubmit}>
        <Loading />
        <ReactAce
          mode="json"
          theme="github"
          name="rule-editor"
          ref="ace"
          className={styles.editor}
          width="1000px"
          height="500px"
          wrapEnabled={true}
          showPrintMargin={false}
          tabSize={2}
          editorProps={{$blockScrolling: true}}
          value={rule}
        />
        <div><button type="submit">submit</button></div>
      </form>
    );
  }
  onSubmit(e) {
    // React Ace Instance
    let ace = this.refs.ace;
    // Ace Editor Instance
    let editor = ace.editor;
    let rule = JSON.parse(editor.getValue());
    let ret = [
      'rule'
    ];

    if (rule.domain) {
      ret.push(rule.domain);
    }

    if (rule.alias) {
      rule.push(rule.alias);
    }

    rule.id = ret.join(':');

    // 旧id
    let oid = this.props.routeParams.id;

    // dispatch submit action to store
    this.props.onSubmit(rule, oid);

    e.preventDefault();
  }
}

export default RuleForm;
