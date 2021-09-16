'use strict'

const path = require('path')
const changeCase = require('change-case')
const Listr = require('listr')
const chalk = require('chalk')
const { build } = require('vite')
const fsPromises =  require('fs/promises')
const execa = require('execa')
const pkg = require('../package.json')

const components = require('../components.json')

/**
 * 调用 vite 提供的 `build` 函数构建
 * @param {String} componentname - 组件名
 * @param {String} entry - 入口文件
 * @returns 
 */
function buildLib(componentname, entry) {
  // 转换名字格式 component-name => ComponentName
  const ComponentName = changeCase.pascalCase(componentname)

  return build({
    logLevel: 'silent',

    build: {
      outDir: path.resolve(__dirname, '../lib'),

      emptyOutDir: false,

      lib: {
        entry: entry,
        name: ComponentName,
        fileName: (format) => `${componentname}.${format}.js`
      },

      rollupOptions: {
        external: ['vue', 'element-ui'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            'element-ui': 'ElementUI',
          },
        },
      },
    },
  })
}

/**
 * 构建所有组件
 * @param {Object} components - { [组件名]: [入口文件] }
 */
function buildComponents(components) {
  const buildProcesses = Object
    .entries(components)
    .map(([componentname, entry]) => {
      entry = path.resolve(__dirname, '../', entry)
      return buildLib(componentname, entry)
    })

  return Promise.all(buildProcesses)
}


async function main(components) {
  // remove lib directory
  await fsPromises.rm(
    path.resolve(__dirname, '../lib'),
    {
      recursive: true,
      force: true
    }
  )

  const tasks = new Listr(
    [
      {
        title: '整体构建',
        task: () => buildLib(pkg.name, path.resolve(__dirname, '../packages/main.js'))
      },
      {
        title: '分组件构建',
        task: () => buildComponents(components)
      },
      {
        title: '打包样式',
        task: () => execa('gulp', ['--gulpfile', 'scripts/bundle-style.js']),
      }
    ],
    { concurrent: true }
  )

  return tasks.run()
}

main(components)
  .then(() => {
    console.log(chalk.green('BUILD DONE'))
  })
  .catch(err => {
    console.log(chalk.red(`ERROR: ${err}`))
    process.exit(1)
  })
