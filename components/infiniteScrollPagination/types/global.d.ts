declare interface InfinitScrollPaginationElement extends HTMLElement {
  scrollToTop: () => void;
  scrollToEnd: () => void;
}

declare type ScrollOptions = {
  top?: number;
  left?: number,
  behavior?: 'smooth' | 'instant' | 'into'
}

declare type CusElementAttr = {
  class?: string;
  style?: string;
}

declare type InfinitScrollPaginationAttr = CusElementAttr & {
  reverse?: boolean;
  loading?: boolean;
  ['has-more']?: boolean;
  threshold?: number;
  height?: string;
}
