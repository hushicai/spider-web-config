/**
 * @file rule model
 * @author hushicai(bluthcy@gmail.com)
 */

import redis from 'redis';
import settings from '../settings';
import getRuleKey from '../../common/helpers/getRuleKey';

const client = redis.createClient(settings.rule_redis_db);

export function add(rule, callback) {
  const key = getRuleKey(rule);

  client.hmset(key, rule, (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }

    callback(err, result);
  });
}

function makeTask(key) {
  return new Promise(function (resolve, reject) {
    client.hgetall(key, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      result.id = key;

      resolve(result);
    });
  });
}

export function list(callback) {
  client.keys('rule:*', (err, keys) => {
    if (err) {
      console.log(err);
      return callback(err);
    }

    let tasks = keys.map((key) => {
      return makeTask(key);
    });

    Promise.all(tasks).then((result) => {
      callback(err, result);
    });
  });
}
