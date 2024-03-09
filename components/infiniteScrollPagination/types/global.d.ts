declare interface InfinitScrollPaginationElement extends HTMLElement {
  scrollToTop: () => void;
  scrollToEnd: () => void;
}

declare type ScrollOptions = {
  top?: number;
  left?: number,
  behavior?: 'smooth' | 'instant' | 'into'
}

declare type PageContainerProps = React.HTMLAttributes<HTMLElement> & {
  reverse?: boolean;
  loading?: boolean;
  ['has-more']?: boolean;
  class?: string;
  threshold?: number;
  height?: string;
}
