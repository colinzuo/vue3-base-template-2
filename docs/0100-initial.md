
## 初始化工程

<https://vuejs.org/guide/quick-start.html#creating-a-vue-application>

```bash
npm init vue@latest

√ Project name: ... vue3-base-template
√ Add TypeScript? ... Yes
√ Add JSX Support? ... No
√ Add Vue Router for Single Page Application development? ... Yes
√ Add Pinia for state management? ... Yes
√ Add Vitest for Unit Testing? ... Yes
√ Add an End-to-End Testing Solution? » Cypress
√ Add ESLint for code quality? ... Yes
√ Add Prettier for code formatting? ... No
```

## 使用Volar的Take Over模式

- 删掉对应Readme描述
- 删掉`.vscode/extensions.json`中的recommendation

## 添加element plus

<https://element-plus.org/zh-CN/guide/installation.html>

<https://element-plus.org/zh-CN/guide/quickstart.html>

<https://element-plus.org/zh-CN/component/icon.html>

```bash
npm install element-plus

npm install @element-plus/icons-vue
```

修改`src\main.ts`

```ts title="src\main.ts"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
```
