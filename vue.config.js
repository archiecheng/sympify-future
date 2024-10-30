/*
 * @Author: archiecheng archiechengice@outlook.com
 * @Date: 2024-10-04 14:14:58
 * @LastEditors: archiecheng archiechengice@outlook.com
 * @LastEditTime: 2024-10-29 20:53:45
 * @FilePath: \sympifyfuture\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === 'production' ? '/sympify-future/' : '/'
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})
