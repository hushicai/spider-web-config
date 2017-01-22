import React, {Component} from 'react';

import ReactAce from 'react-ace';
import brace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

import styles from './index.scss';

class RuleForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
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
          value={this.props.rule}
        />
        <div>
         <button type="submit">submit</button>
        </div>
      </form>
    );
  }
  onSubmit(e) {
    // React Ace Instance
    let ace = this.refs.ace;
    // Ace Editor Instance
    let editor = ace.editor;
    let rule = JSON.parse(editor.getValue());

    rule.id = 'rule:' + rule.domain + ':' + rule.alias;

    // dispatch submit action to store
    this.props.onSubmit(rule);

    e.preventDefault();
  }
}

export default RuleForm;
