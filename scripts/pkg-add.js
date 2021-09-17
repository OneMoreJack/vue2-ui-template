'use strict'

const chalk = require('chalk')
const parseArgs = require('minimist')
const argv = parseArgs(process.argv.slice(2), {
  boolean: ['basic', 'business']
})

console.log()
process.on('exit', () => {
  console.log()
})

if (!argv._.length) {
  console.log(chalk.red('组件名必填 - yarn pkg:add component-name [组件中文名]'));
  process.exit(1);
}

const inquirer = require('inquirer')
const changeCase = require('change-case');
const Listr = require('listr');
const execa = require('execa');
const componentsJson = require('../components.json');


async function addPkg() {
  const componentname = argv._[0]
  const componentInfo = {
    componentname: componentname,
    chineseName: argv._[1] || componentname,
    ComponentName: changeCase.pascalCase(componentname),
    type: argv.basic 
      ? 'basic'
      : argv.business
        ? 'business'
        : undefined
  }

  // 检查组件名是否被占用
  await checkName(componentInfo.componentname, componentsJson)

  // 若没指定组件类型，则需手动选择组件类型
  if (!componentInfo.type) {
    const { componentType } = await selectComponentType()
    componentInfo.type = componentType
  }

  await createPkg(componentInfo)
  console.log('\n',chalk.green('DONE'))
}

addPkg()
  .catch(async err => {
    console.log(chalk.bgRed(err))
    await execa('git', ['restore', '.'])
    process.exit(1)
  })


async function checkName(componentname, componentsJson) {
  if (componentsJson[componentname]) {
    return Promise.reject(`${componentname} 已存在.`);
  }
  return Promise.resolve()
}

/**
 * 选择组件类型
 * @returns {Object} ans
 * @returns {String} ans.componentType - 组件类型
 */
async function selectComponentType() {
  const ans = await inquirer.prompt({
    type: 'list',
    name: 'componentType',
    message: '组件类型?',
    choices: [
      { name: '基础组件', value: 'basic' },
      { name: '业务组件', value: 'business'}
    ],
  })
  return ans
}

async function createPkg(componentInfo) {
  const tasks = new Listr([
    {
      title: '创建package',
      task: ctx => execa(
        'hygen', 
        [
          'package', 
          'new', 
          '--name', 
          ctx.componentname,
        ]
      ),
    },
    {
      title: '创建文档',
      task: ctx => execa(
        'hygen', 
        [
          'package', 
          'doc', 
          '--name', 
          ctx.componentname,
          '--chName',
          ctx.chineseName,
          '--type',
          ctx.type,
        ]
      ),
    },
    {
      title: '更新入口文件',
      task: () => execa('yarn', ['gen:entry']),
    },
  ])

  return tasks.run(componentInfo)
}
