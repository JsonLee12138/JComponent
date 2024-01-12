## Ji18n 国际化语言处理组件
[English Documents](https://github.com/JsonLee12138/JComponent/tree/main/components/trans/README.en.md)
### 介绍

Ji18n 是一个原生 HTML 标签组件，用于处理国际化语言。它可以将文本、标签、按钮等 HTML 元素的显示语言切换为指定的语言。

### 配置

Ji18n 组件可以通过以下属性进行配置：

* **messages**：翻译文本对象。
* **defaultLanguage**：默认语言。
* **backLanguage**：回退语言。

### 方法

Ji18n 组件提供以下方法：

* **createJi18n()**：创建 Ji18n 实例。
* **setLanguage()**：设置当前语言。
* **$t()**：获取翻译文本。
* **onChange()**：语言更换的回调。
### 使用示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="module" src="https://unpkg.com/@json_web_component/ji18n/dist/main.min.js"></script>
    <title>Title</title>
    <script type="module">
        const en = {
            "app": {
                "test": "test"
            }
        }
        const zh = {
            "app": {
                "test": "测试"
            }
        }
        const messages = {en, zh}
        // 当不传入 defaultLanguage 和 backLanguage 时, 默认为系统语言
        createJi18n({messages, defaultLanguage: 'en', backLanguage: 'en'});
    </script>
</head>
<body>
<j-trans label="app.test" class="demo"></j-trans>
<input type="radio" name="lan" value="en"><label>English</label>
<input type="radio" name="lan" value="zh"><label>中文</label>
<script>
    const radios = document.querySelectorAll('input[type="radio"][name="lan"]');
    for (let radio of radios) {
        radio.addEventListener('change', e => {
            Ji18n.setLanguage(e.target.value)
            setTimeout(() => {
                console.log(Ji18n.$t("app.test"))
            }, 500)
        })
    }
</script>
</body>
</html>
```

```html
<!-- 原生 html 引用 -->
<script type="module" src="https://unpkg.com/@json_web_component/ji18n/dist/main.min.js"></script>
```

```js
// vue3 vite处理
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                isCustomElement: tag => tag === 'j-trans'
                }
            }
        })
    ]
})
// vue 或 react只需在 main.js 中引用
import "@json_web_component/ji18n";

window.createJi18n({
  messages: {
    en: {},
    zh: {}
  }
})
```

```typescript
// 如果需要用到 ts , 请实例化的时候重新赋值全局变量
// 示例:
window.Ji18n = createJi18n<"en" | "zh">({messages, defaultLanguage: 'en', backLanguage: 'en'});
```