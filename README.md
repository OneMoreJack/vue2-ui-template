# vue2-ui-template

## 构建
```sh
  yarn build
```


## 添加组件
项目使用 `hygen` 生成或更新部分文件，需全局安装 `hygen` 才能正常使用 `yarn pkg:add` 命令：
```shell
    npm i -g hygen
```

创建一个新组件：
```shell
  # 中文名可选
  yarn pkg:add component-name [组件中文名]

  # NOTE:
  # 1. 组件名无需带 zb- 前缀，脚本会自动处理前缀
  # 2. 组件名使用短横线(kebab-case)命名规范
  #
  # 例：
  # yarn pkg:add table 表格
  # yarn pkg:add drop-down 下拉菜单
```

你还可以通过 `--basic`, `--business` 指定组件类型是基础组件还是业务组件：
```shell
  yarn pkg:add table 表格 --basic
  # 该命令将创建基础组件 table
```
