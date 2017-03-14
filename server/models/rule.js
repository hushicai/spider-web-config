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

export function list() {}
