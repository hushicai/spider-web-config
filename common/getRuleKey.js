export default function getRuleKey(rule) {
  let ret = ['rule'];

  if (rule.domain) {
    ret.push(rule.domain);
  }

  if (rule.alias) {
    ret.push(rule.alias);
  }

  return ret.join(':');
}
