## InfinitScrollPagination 无限滚动分页组件
[English Documents](https://github.com/JsonLee12138/JComponent/blob/master/components/infiniteScrollPagination/README.en.md)
### 介绍

这个自定义 Web 组件可以在网页应用中实现流畅的滚动分页功能。它支持双向加载新条目，并提供清晰的加载状态指示。

### 配置

InfinitScrollPagination 组件可以通过以下属性进行配置：

* **reverse**：如果为true, 会滚到顶部进行下一页; 如果为false, 会滚动到底部进行下一页。
* **loading**：是否正在请求中。
* **height**：容器的高度, 如果不设置高度可能导致功能错误, 或者外层是如果需要自动撑开请用弹性盒子给父级, 给当前盒子设置flex-grow: 1。
* **has-more**：是否有更多的数据。
* **class**：组件添加样式的 CSS 类名, 注: 在react中也是用class而不是className。
* **threshold**：距离可视区域边缘（顶部或底部，取决于 `reverse` 属性）的距离，值为0-1, 具体请查阅 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds)。

### 方法

InfinitScrollPagination 组件提供以下方法：

* **scrollToTop()**：滚动内容容器到顶部。
* **scrollToEnd()**：滚动内容容器到底部。

### 事件

* **load()**：当滚动位置达到设定的 `threshold` 时触发。负责获取新数据并追加到内容容器中。

### 使用示例

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <script type="module" src="https://unpkg.com/@json_web_component/infinitscrollpagination/dist/main.min.js"></script>
  <title>Title</title>
  <script type="module">
  </script>
  <style>
    .scroll-container {}
  </style>
</head>

<body>
  <infinit-scroll class="scroll-container" height="200px">
  </infinit-scroll>
  <script>
    const container = document.querySelector('.scroll-container');
    let loading = false;
    let hasMore = true;
    container.setAttribute('has-more', hasMore);
    container.setAttribute('loading', loading);
    container.addEventListener('load', getListData)
    function getListData(page) {
      loading = true;
      container.setAttribute('loading', loading);
      setTimeout(() => {
        loading = false;
        hasMore = false;
        container.setAttribute('has-more', hasMore);
        container.setAttribute('loading', loading);
        console.log(page, '获取到数据');
        for (let i = 0; i < 12; i++) {
          const item = document.createElement('div');
          const styles = {
            height: '80px',
            background: '#eee',
            marginBottom: '10px'
          }
          for (const key in styles) {
            if (Object.hasOwnProperty.call(styles, key)) {
              const val = styles[key];
              item.style[key] = val;
            }
          }
          // 如果 reverse 为 true
          container.append(item);
          // 如果 reverse 为 false
          // container.prepend(item)
          // 如果需要滚动到底部
          // container.scrollToEnd();
          // 如果需要滚动到顶部
          // container.scrollToTop();
        }
      }, 800)
    }
  </script>
</body>

</html>

```

```html
<!-- 原生 html 引用 -->
<script type="module" src="https://unpkg.com/@json_web_component/infinitscrollpagination/dist/main.min.js"></script>
```

```js
// vue3 vite处理
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                isCustomElement: tag => tag === 'infinit-scroll'
                }
            }
        })
    ]
})
// vue 或 react只需在 main.js 中引用
import "@json_web_component/infinitscrollpagination";
// 其他使用方法请参考html的写法结合 vue 的写法
```

```typescript
// tsconfig 中添加 include
{
  "compilerOptions":{},
  "include": ["node_modules/@json_web_component/infinitscrollpagination/dist/global.d.ts"],
}
```

```typescript
// react 使用问题
// 如果ts报错: Property 'infinit-scroll' does not exist on type 'JSX.IntrinsicElements'.
// 1. 创建一个全局类型文件 例如 global.d.ts
// 2. 在tsconfig 中include 中加入该全局类型文件
// 该全局文件的内容如下:

declare namespace JSX {
  interface IntrinsicElements {
    'infinit-scroll': React.DetailedHTMLProps<InfinitScrollPaginationProps, HTMLElement>;
  }
}

// 如果需要在定义当前元素的ref类型
// vue
const cusref = ref<InfinitScrollPaginationElement | null>(null);
// react
const cusref = useRef<InfinitScrollPaginationElement | null>(null)
```
