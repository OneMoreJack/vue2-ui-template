---
title: 快速开始
---
# 快速开始

## 引入

**完整引入**

```js
// main.js

import Vue from 'vue';
import App from './App.vue';
import CiasUI from 'cias-ui';
// 需引入样式文件
import 'cias-ui/lib/styles/cias-ui.css';

Vue.use(CiasUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```


**按需引入**

首先在项目中安装 `babel-plugin-component`
```sh
yarn add --dev babel-plugin-component
```

修改 `.babelrc`:
```json
// .babelrc
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    ["component", {
      "libraryName": "cias-ui",
      "libDir": "lib",
      "styleLibrary": {
        "name": "styles",
        "base": false,
        "path": "[module].css"
      }
    }]
  ]
}
```

按需引入
```js
import Vue from 'vue';
import App from './App.vue';
import { Table } from 'cias-ui';

Vue.use(Table)

new Vue({
  el: '#app',
  render: h => h(App)
});
```
