/**
 * @file primisifty
 * @author hushicai(bluthcy@gmail.com)
 */

let promisify = (fn, receiver) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, res) => {
        return err ? reject(err) : resolve(res);
      }]);
    });
  };
};

export default promisify;
