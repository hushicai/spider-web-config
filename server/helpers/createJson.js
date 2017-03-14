/**
 * @file 通用json格式
 * @author hushicai(bluthcy@gmail.com)
 */

export default function ({data = {}, code = 0, msg = ''} = {}) {
  return {
    code,
    msg,
    data
  };
}
