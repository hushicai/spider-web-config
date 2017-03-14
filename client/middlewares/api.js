/**
 * @file server api middleware
 * @author hushicai(bluthcy@gmail.com)
 */

function apiMiddleware(options = {}) {
  return (req, res, next) => {
    const path = req.url;

    console.log('——————————————————');
    console.log(path);
    console.log('——————————————————');

    next();
  };
}

export default apiMiddleware;
