/**
 * @file server
 * @author hushicai(bluthcy@gmail.com)
 */

import express from 'express';
import * as ruleControler from './controlers/rule';

const router = express.Router();

router.get('/api-rule/list', ruleControler.list);
router.post('/api-rule/add', ruleControler.add);
router.post('/api-rule/edit', ruleControler.edit);
router.post('/api-rule/delete', ruleControler.remove);

module.exports = router;
