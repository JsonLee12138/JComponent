## InfinitScrollPagination Infinite Scroll Paging Component
[中文文档](https://github.com/JsonLee12138/JComponent/blob/master/components/infiniteScrollPagination/README.md)
### Introduction

This custom web component enables smooth scrolling paging in web applications. It supports bi-directional loading of new entries and provides clear indication of loading status.

### Configuration

The InfinitScrollPagination component can be configured with the following properties:

* **reverse**：If true, it will scroll to the top for the next page; if false, it will scroll to the bottom for the next page.
* **loading**：Whether the request is in progress.
* **height**：The height of the container, if not set the height may cause the function error, or the outer layer is if you need to auto-propel please use the flexible box to the parent, set flex-grow: 1 for the current box.
* **has-more**：Availability of additional data.
* **class**：The CSS class name of the component to add styles to, note: in react it is also class instead of className.
* **threshold**：Distance from the edge of the visual area (top or bottom, depending on the `reverse` attribute), value 0-1, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds).

### methods

The InfinitScrollPagination component provides the following methods:

* **scrollToTop()**：Scrolls the content container to the top.
* **scrollToEnd()**：Scroll the content container to the bottom.

### Event

* **load()**：Triggered when the scroll position reaches the set `threshold`. Responsible for fetching new data and appending it to the content container.

### Usage Example

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
          // If reverse is true
          container.append(item);
          // If reverse is false
          // container.prepend(item)
          // If you need to scroll to the bottom
          // container.scrollToEnd();
          // If you need to scroll to the top
          // container.scrollToTop();
        }
      }, 800)
    }
  </script>
</body>

</html>

```

```html
<!-- Native html references -->
<script type="module" src="https://unpkg.com/@json_web_component/infinitscrollpagination/dist/main.min.js"></script>
```

```js
// vue3 vite processing
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
// vue or react simply refer to it in main.js.
import "@json_web_component/infinitscrollpagination";
// 其他使用方法请参考html的写法结合 vue 的写法
```

```typescript
// Add include to tsconfig
{
  "compilerOptions":{},
  "include": ["node_modules/@json_web_component/infinitscrollpagination/dist/global.d.ts"],
}
```

```typescript
// react usage issues
// If ts reports an error: Property 'infinit-scroll' does not exist on type 'JSX.IntrinsicElements'.
// 1. Create a global type file, e.g. global.d.ts.
// 2. Add the global type file to the include in tsconfig.
// The contents of the global file would look like this:

declare namespace JSX {
  interface IntrinsicElements {
    'infinit-scroll': React.DetailedHTMLProps<PageContainerProps, HTMLElement>;
  }
}

// If you need to define the current element's ref type in the
// vue
const cusref = ref<InfinitScrollPaginationElement | null>(null);
// react
const cusref = useRef<InfinitScrollPaginationElement | null>(null)
```
