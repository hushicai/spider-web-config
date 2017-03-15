/**
 * @file rule model
 * @author hushicai(bluthcy@gmail.com)
 */

import redis from 'redis';
import settings from '../settings';
import getRuleKey from '../../common/helpers/getRuleKey';
import promisify from '../helpers/promisify';

const client = redis.createClient(settings.rule_redis_db);

const hmset = promisify(client.hmset, client);
const hgetall = promisify(client.hgetall, client);
const keys = promisify(client.keys, client);

export async function add(rule) {
  const key = getRuleKey(rule);

  try {
    let result = await hmset(key, rule);

    return result;
  }
  catch (ex) {
    console.log(ex);
    return ex;
  }
}

async function __makeTask(key) {
  try {
    let result = await hgetall(key);

    result.id = key;

    return result;
  }
  catch (ex) {
    console.log(ex);

    return ex;
  }
}

export async function getList(callback) {
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
