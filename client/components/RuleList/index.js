/**
 * @file RuleList
 * @author hushicai(bluthcy@gmail.com)
 */

import React from 'react';
import Rule from '../Rule';

import styles from './index.scss';

function RuleList(props) {
  const {ruleList, onDelete} = props;

  if (ruleList.length === 0) {
    return null;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>id</th>
          <th>active</th>
          <th>save content</th>
          <th>use proxy</th>
          <th>page type</th>
          <th>handle js</th>
          <th>priority</th>
          <th>weight</th>
          <th>schedule interval</th>
          <th>last schedual</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {
          ruleList.map((rule, index) =>
            <Rule
              rule={rule}
              key={index}
              onDelete={onDelete}
            />
          )
        }
      </tbody>
    </table>
  );
}

export default RuleList;
