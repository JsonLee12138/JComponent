window.Ji18n = {};
const currentLan = new Proxy({
  value: 'en', messages: {}, back: 'en'
}, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
  set(target, property, newValue, receiver) {
    const transNodes = document.querySelectorAll("[data-lan=true]");
    for (let itemNode of transNodes) {
      itemNode.setAttribute('lang', newValue);
    }
    if (property === 'value') {
      window.Ji18n.lan = newValue;
    }
    return Reflect.set(target, property, newValue, receiver);
  }
});

window.Ji18n.create = ({ messages = {}, defaultLanguage = 'en', backLanguage = 'en' }) => {
  currentLan.value = defaultLanguage;
  currentLan.back = backLanguage;
  window.Ji18n.messages = messages || {};
  window.Ji18n.backLanguage = backLanguage;
  window.Ji18n.setLanguage = (val) => {
    if(val === window.Ji18n.value) return;
    currentLan.value = val;
    window.Ji18n.value = val;
  }
  window.Ji18n.$t = (key, options)=> trans(key, window.Ji18n.messages, currentLan.value, currentLan.back, options);
  customElements.define('j-trans', Trans);
}
const trans = (key, sourceData, lang, back, options) => {
  const keyArr = key.split('.');
  let result = keyArr.reduce((prev, cur) => {
    if (prev === undefined) return undefined;
    const res = prev[cur];
    return res;
  }, sourceData[lang] || key);
  if (result === undefined && lang !== back) {
    result = keyArr.reduce((prev, cur) => {
      if (prev === undefined) return undefined;
      const res = prev[cur];
      return res;
    }, sourceData[back] || key);
  }
  if (result === undefined) return key;
  if (options && typeof options === 'object') {
    for (const key in options) {
      if (Object.hasOwnProperty.call(options, key)) {
        const val = options[key];
        result = result.replace(`{${key}}`, val);
      }
    }
  }
  return result;
}

class Trans extends HTMLElement {
  constructor() {
    super();
    const label = this.getAttribute('label');
    this.setAttribute('data-lan', true);
    const lang = this.getAttribute('lang');
    this.setParams(this.getAttribute('params'))
    this.label = label;
    this.lang = lang || 'en';
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.textContent = trans(this.label, Ji18n.messages, this.lang, Ji18n.backLanguage, this.options);
    this.content = shadow;
  }
  setParams(params){
    let res = params;
    if (typeof params === 'string') {
      try {
        if (params) {
          res = JSON.parse(params);
        }
      } catch (e) {
        res = null;
      }
    }
    this.options = res;
  }
  disconnectedCallback() {
  }

  attributeChangedCallback(name, oldValue, newValue) {
    setTimeout(()=>{
      if (name === 'options') {
        this.setParams(newValue);
      }
      this.content.textContent = trans(this.label, Ji18n.messages, this.lang, Ji18n.backLanguage, this.options);
    },0)
  }

  static get observedAttributes() {
    return ['lang', 'options'];
  }
}
