// Ji18n类型文件, 需要先去tsconfig.json文件中配置

declare type Ji18nMessages<T extends string> = Record<T, any>;

declare type Ji18nCreateProps<T extends string> = {
  messages: Ji18nMessages<T>;
  defaultLanguage?: T;
  backLanguage?: T;
  change?: (value: T) => any;
}

declare interface Ji18nInstance<T extends string> {
  messages: Ji18nMessages<T>;
  backLanguage: T;
  lang: T;
  setLanguage: (lan: T) => void;
  $t: (key: string, options?: Record<string, string | number>) => string | number;
  onChange: (value: T) => any;
}

interface Window {
  Ji18n: Ji18nInstance<any>;
  createJi18n: <T extends string>(props: Ji18nCreateProps<T>) => Ji18nInstance<T>;
}

declare type CusElementAttr = {
  class?: string;
  style?: string;
}

declare type Ji18nAttr = CusElementAttr & {
  label: string;
  options?: string | Record<string, any>;
}
