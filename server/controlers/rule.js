/**
 * @file rule controller
 * @author hushicai(bluthcy@gmail.com)
 */

import createJSON from '../helpers/createJSON';
import * as ruleModel from '../models/rule';

// rule list
export function list(req, res) {}
// rule detail
export function detail(req, res) {}
// add rule
export function add(req, res) {
  let {rule} = req.body;

  rule = JSON.parse(rule);

  ruleModel.add(rule, (err, result) => {
    let d;

    if (err) {
      d = createJSON({msg: '添加失败', code: 1});
    } else {
      d = createJSON({msg: '添加成功'});
    }

    res.status(200).json(d);
  });
}
// edit rule
export function edit(req, res) {
  const d = createJSON({msg: "更新成功"});

  res.status(200).json(d);
}
// remove rule
export function remove(req, res) {
  const d = createJSON({msg: '删除成功'});

  res.status(200).json(d);
}
