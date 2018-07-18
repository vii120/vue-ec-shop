'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PATH: '"https://vue-course-api.hexschool.io"',
  CUSTOM_PATH: '"circle"'
})
