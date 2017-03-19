/**
 * @file rule model
 * @author hushicai(bluthcy@gmail.com)
 */

import redis from 'redis';
// import {flatten, unflatten} from 'flat';
import settings from '../../settings';
import promisify from '../../common/promisify';

const client = redis.createClient(settings.rule_redis_db);

const keys = promisify(client.keys, client);

// string
const pdel = promisify(client.del, client);
const pset = promisify(client.set, client);
const pget = promisify(client.get, client);

async function __makeTask (key) {
  try {
    let result = await pget(key);

    // 转成json格式
    let rule = JSON.parse(result);

    // result = unflatten(result);
    // result.id = key;

    return rule;
  }
  catch (ex) {
    console.log(ex);

    return ex;
  }
}

export async function create (rule) {
  const d = JSON.parse(rule);
  const key = d.id;

  try {
    // node redis不支持nested hash
    // 直接存储string吧
    let result = await pset(key, rule);

    return result;
  }
  catch (ex) {
    console.log(ex);
    return ex;
  }
}

export async function read (key) {
  let task = __makeTask(key);

  try {
    let rule = await task;

    return rule;
  }
  catch (ex) {
    console.log(ex);

    return ex;
  }
}

export async function update (id, rule) {
  const d = JSON.parse(rule);
  const key = d.id;

  console.log(id, key);

  try {
    if (id != key) {
       await pdel(id);
    }

    await pset(key, rule);
  }
  catch (ex) {
    console.log(ex);
  }
}

export async function del (key) {
  try {
    pdel(key);

    return 0;
  }
  catch (ex) {
    console.log(ex);
    return 1;
  }
}

export async function getList () {
  let result = await keys('rule:*');
  let tasks = result.map((key) => {
    return __makeTask(key)
  });

  try {
    let result = await Promise.all(tasks);

    return result;
  }
  catch (ex) {
    console.log(ex);
    return ex;
  }
}
