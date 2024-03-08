## Ji18n Internationalization Language Processing Component
[中文文档](https://github.com/JsonLee12138/JComponent/blob/master/components/trans/README.md)
### Introduction

Ji18n is a native HTML tag component that is used to process internationalization languages. It can switch the display language of HTML elements such as text, labels, and buttons to the specified language.

### Configuration

The Ji18n component can be configured with the following properties:

* **messages:** The translation text object.
* **defaultLanguage:** The default language.
* **backLanguage:** The fallback language.

### Methods

The Ji18n component provides the following methods:

* **createJi18n():** Creates a Ji18n instance.
* **setLanguage():** Sets the current language.
* **$t():** Gets the translation text.
* **onChange()**：Callbacks for language change。
### Usage Example

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
        // When defaultLanguage and backLanguage are not passed, the default language is the system language.
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
// vue3 vite processing
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

// vue or react simply refer to it in main.js.
import "@json_web_component/ji18n";

window.createJi18n({
  messages: {
    en: {},
    zh: {}
  }
})
```

```typescript
// Add include to tsconfig
{
  "compilerOptions":{},
  "include": ["node_modules/@json_web_component/ji18n/dist/global.d.ts"],
}
// If you need to use ts, reassign the global variable when instantiating it.
// eg:
window.Ji18n = createJi18n<"en" | "zh">({messages, defaultLanguage: 'en', backLanguage: 'en'});
```

```typescript
// react usage issues
// If ts reports an error: Property 'j-trans' does not exist on type 'JSX.IntrinsicElements'.
// 1. Create a global type file, e.g. global.d.ts.
// 2. Add the global type file to the include in tsconfig.
// The contents of the global file will look like this:
type JTransProps = React.HTMLAttributes<HTMLElement> & {
  label: string;
  options?: Record<string, any>;
  lang?: string;
}
declare namespace JSX {
  interface IntrinsicElements {
    'j-trans': React.DetailedHTMLProps<JTransProps, HTMLElement>;
  }
}
```
