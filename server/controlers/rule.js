/**
 * @file rule controller
 * @author hushicai(bluthcy@gmail.com)
 */

import createJSON from '../helpers/createJSON';
import * as ruleModel from '../models/rule';

// rule list
export async function list(req, res) {
  try {
    let result = await ruleModel.getList();

    let d = createJSON({data: {list: result}});

    res.status(200).json(d);
  }
  catch (ex) {
    let d = createJSON({code: 1});

    res.status(200).json(d);
  }
}
// rule detail
export function detail(req, res) {}
// add rule
export async function add(req, res) {
  let {rule} = req.body;

  rule = JSON.parse(rule);

  try {
    let result = await ruleModel.add(rule);
    let d = createJSON({msg: '添加成功'});

    res.status(200).json(d);
  }
  catch (ex) {
    let d = createJSON({
      msg: '添加失败',
      code: 1
    });

    res.status(200).json(d);
  }
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
