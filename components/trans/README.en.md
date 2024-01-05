## Ji18n Internationalization Language Processing Component
[中文文档](README.md)
### Introduction

Ji18n is a native HTML tag component that is used to process internationalization languages. It can switch the display language of HTML elements such as text, labels, and buttons to the specified language.

### Configuration

The Ji18n component can be configured with the following properties:

* **messages:** The translation text object.
* **defaultLanguage:** The default language.
* **backLanguage:** The fallback language.

### Methods

The Ji18n component provides the following methods:

* **create():** Creates a Ji18n instance.
* **setLanguage():** Sets the current language.
* **$t():** Gets the translation text.
### Usage Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="module" src="./components/trans/index.js"></script>
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
        Ji18n.create({messages, defaultLanguage: 'en', backLanguage: 'en'});
    </script>
</head>
<body>
<j-trans label="app.test" class="demo"></j-trans>
<input type="radio" name="lan" value="en"><label>English</label>
<input type="radio" name="lan" value="zh"><label>Chinese</label>
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
