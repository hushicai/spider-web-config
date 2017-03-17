import express from 'express';
import * as ruleController from './controlers/rule';
import * as ssrController from './controlers/ssr';

const router = express.Router();

// server api
router.get('/api-rule/list', ruleController.list);
router.post('/api-rule/add', ruleController.add);
router.post('/api-rule/edit', ruleController.edit);
router.post('/api-rule/delete', ruleController.remove);

// server side render
router.get('*', ssrController.render);

module.exports = router;
