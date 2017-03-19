
// 开发模式
const isDev = process.env.NODE_ENV === 'development';
// 仿真测试模式
const isTest = process.env.NODE_ENV === 'test';
// 生产模式
const isProd = process.env.NODE_ENV === 'production';

exports.isDev = isDev;
exports.isTest = isTest;
exports.isProd = isProd;
exports.isDebug = isDev || isTest;
