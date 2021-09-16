const path = require('path')
const { defineConfig } = require('vite')
const { createVuePlugin } = require('vite-plugin-vue2')
const pkg = require('./package.json')

module.exports = defineConfig({
  plugins: [createVuePlugin()],

  resolve: {
    alias: {
      packages: path.resolve(__dirname, './packages'),
      '@': path.resolve(__dirname, './src')
    },
  },
})
