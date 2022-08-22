const {merge} = require('webpack-merge');
const config = require('./webpack.configFF.js');

module.exports = merge(config, {
    mode: 'production',
});