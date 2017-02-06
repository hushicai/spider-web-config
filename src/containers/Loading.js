/**
 * @file loading
 * @author hushicai(bluthcy@gmail.com)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import Loading from '../components/Loading';

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading
  };
};

export default connect(mapStateToProps)(Loading);
