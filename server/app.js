/**
 * @file server
 * @author hushicai(bluthcy@gmail.com)
 */

import express from 'express';

const router = express.Router();

router.get('api-*', (req, res, next) => {
  console.log('api————————', req.url);
});

module.exports = router;
