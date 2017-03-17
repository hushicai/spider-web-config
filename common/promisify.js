/**
 * @file primisifty
 * @author hushicai(bluthcy@gmail.com)
 */

let promisify = (fn, receiver) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, ...res) => {
        // resolve只能一个参数，所以判断一下
        const v = res.length > 1 ? res : res[0];

        return err ? reject(err) : resolve(v);
      }]);
    });
  };
};

export default promisify;
