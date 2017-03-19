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
export async function detail(req, res) {
  let {id} = req.query;

  try {
    let rule = await ruleModel.read(id);

    let d = createJSON({data: rule});

    res.status(200).json(d);
  }
  catch (ex) {
    console.log(ex);
  }
}
// add rule
export async function add(req, res) {
  let {rule} = req.body;

  try {
    let result = await ruleModel.create(rule);
    let d = createJSON();

    res.status(200).json(d);
  }
  catch (ex) {
    console.log('[rule.add]', ex);
  }
}
// edit rule
export async function edit(req, res) {
  let {id, rule} = req.body;

  try {
    let result = await ruleModel.update(id, rule);
    let d = createJSON();

    res.status(200).json(d);
  }
  catch (ex) {
    console.log(ex);
  }
}
// remove rule
export async function remove(req, res) {
  let {id} = req.body;

  try {
    let status = await ruleModel.del(id);

    if (status === 0) {
      let d = createJSON({data: {status: 0}});

      res.status(200).json(d);
    }
  }
  catch (ex) {
    console.log(ex);
  }
}
