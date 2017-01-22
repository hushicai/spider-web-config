/**
 * @file routes
 * @author hushicai(bluthcy@gmail.com)
 */

import React from 'react';
import {Route, IndexRoute, hashHistory} from 'react-router';

import AppLayout from '../layouts/App';

import Home from '../components/Home';
import NotFound from '../components/NotFount';

import FilterRuleTableContainer from '../containers/FilterRuleTable';
import AddRuleContainer from '../containers/AddRule';
import EditRuleContainer from '../containers/EditRule';

const routes = (
  <Route>
    <Route path="/" component={AppLayout}>
      <IndexRoute components={{main: Home}}></IndexRoute>
      <Route path="rule" components={{main: FilterRuleTableContainer}}></Route>
      <Route path="rule/add" components={{main: AddRuleContainer}}></Route>
      <Route path="rule/edit/:id" components={{main: EditRuleContainer}}></Route>
    </Route>
    <Route path="*" component={NotFound}></Route>
  </Route>
);

export default routes;
