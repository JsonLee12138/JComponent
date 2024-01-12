type CurrentLanProps<T extends string> = {
  value: T;
  messages: Ji18nMessages<T>;
  back: T;
}

const localLanguage = () => {
  switch (navigator.language) {
    case "zh-CN":
      return "zh";
    case "en-US":
      return "en"
    case "fr-FR":
      return "fr"
    default:
      return navigator.language;
  }
};

/**
 * 当不传入 defaultLanguage 和 backLanguage 时, 默认为系统语言
 * When defaultLanguage and backLanguage are not passed, the default language is the system language.
 */
window.createJi18n = <T extends string>({
  messages = {} as Ji18nMessages<T>,
  defaultLanguage = localLanguage() as T,
  backLanguage = localLanguage() as T,
                                          change
}: Ji18nCreateProps<T>): Ji18nInstance<T> => {
  const instance: Ji18nInstance<T> = {
    messages, backLanguage, lang: defaultLanguage, onChange: change
  } as any;
  const currentLan = new Proxy<CurrentLanProps<T>>({
    value: defaultLanguage, messages, back: backLanguage
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
        instance.onChange && instance.onChange(newValue)
      }
      return Reflect.set(target, property, newValue, receiver);
    }
  });
  instance.setLanguage = (val) => {
    if (val === currentLan.value) return;
    currentLan.value = val;
    instance.lang = val;
  }
  instance.$t = (key: string, options?: Record<string, string | number>) => trans<T>(key, instance.messages, currentLan.value, currentLan.back, options) as string | number;
  if (window) {
    window.Ji18n = instance;
    customElements.define('j-trans', Trans);
  }
  return instance;
}

const findItem = (arr: string[], initItem: undefined | string | number | Record<string, string | number>) => {
  return arr.reduce<undefined | string | number | Record<string, string | number>>((prev: undefined | string | number | Record<string, string | number>, cur: string) => {
    if (typeof prev === "undefined") return undefined;
    if (typeof prev === "string" || typeof prev === "number") return prev;
    const res = prev[cur];
    return res;
  }, initItem);
}
const trans = <T extends string>(key: string, sourceData: Ji18nMessages<T> | Record<string, string | number>, lang: T, back: T, options?: Record<string, string | number>) => {
  const keyArr: string[] = key.split('.');
  let result = findItem(keyArr, sourceData[lang] || key);
  if (result === undefined && lang !== back) {
    result = findItem(keyArr, sourceData[back] || key);
  }
  if (result === undefined) return key;
  if (options && typeof options === 'object') {
    for (const key in options) {
      if (Object.hasOwnProperty.call(options, key)) {
        const val = options[key];
        result = (result as string).replace(`{${key}}`, val as string);
      }
    }
  }
  return result;
}

class Trans extends HTMLElement {
  label: string;
  options: Record<string, string | number> | undefined = undefined;
  content: any;

  constructor() {
    super();
    const label = this.getAttribute('label');
    this.setAttribute('data-lan', "true");
    const lang = this.getAttribute('lang');
    this.setParams(this.getAttribute('options') || undefined);
    this.label = label || "";
    this.lang = lang || localLanguage();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });
    let text = trans(this.label, window?.Ji18n.messages, this.lang, window?.Ji18n.backLanguage, this.options) as number | string;
    shadow.textContent = typeof text === "number" ? text.toString() : text;
    this.content = shadow;
  }

  setParams(params: string | undefined | Record<string, string | number>) {
    let res = params;
    if (typeof params === 'string') {
      try {
        if (params) {
          res = JSON.parse(params);
        }
      } catch (e) {
        res = undefined;
      }
    }
    this.options = res as Record<string, string | number> | undefined;
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    requestAnimationFrame(() => {
      if (name === 'options') {
        this.setParams(newValue);
      }
      this.content.textContent = trans(this.label, window?.Ji18n.messages, this.lang, window?.Ji18n.backLanguage, this.options);
    })
  }

  static get observedAttributes() {
    return ['lang', 'options'];
  }
}
