class CusElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const classNames = this.getAttribute('class');
    // classNames && this.classList.add(...classNames.split(' '));
    classNames && this.setAttribute('class', classNames);
    const styles = this.getAttribute('style');
    styles && this.setAttribute('style', styles)
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // requestAnimationFrame(() => {
    // })
    switch (name) {
      case 'style':
        this.setAttribute('style', newValue);
        break;
      case 'class':
        this.setAttribute('class', newValue);
        break;
      default:
        break;
    }
  }

  static get observedAttributes() {
    return ['style', 'class'];
  }
}
class InfinitScrollPagination extends CusElement {
  private reverse: boolean = false;
  private page: number = 0;
  private loading: boolean = false;
  private threshold: number;
  private instance: IntersectionObserver | null = null;
  private hasMore: boolean = true;
  constructor() {
    super()
    this.reverse = !!this.getAttribute('reverse');
    const threshold = Number(this.getAttribute('threshold')) || 0;
    if (threshold < 0 || threshold > 1) {
      throw new Error('Threshold values must be numbers between 0 and 1');
    }
    this.threshold = threshold;
    const loading = this.getAttribute('loading');
    this.loading = loading === "true";
    const hasMore = this.getAttribute('has-more');
    this.hasMore = hasMore === null ? true : hasMore === "true";
  }
  private callback() {
    const customEvent = new CustomEvent('load', {
      detail: { page: this.page }
    });
    this.dispatchEvent(customEvent);
  }
  private setPage(value: number | ((_p: number) => number)) {
    this.page = typeof value === "number" ? value : value(this.page);
  }
  public scrollToTop(options: ScrollOptions = {}) {
    this.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
      ...options
    })
  }
  public scrollToEnd(options: ScrollOptions = {}) {
    this.scrollTo({
      top: this.scrollHeight,
      left: 0,
      behavior: 'smooth',
      ...options
    })
  }
  connectedCallback() {
    this.instance = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.loading || !this.hasMore) return;
        this.setPage((prev) => prev + 1);
        this.callback();
      }
    }, { threshold: this.threshold })
    const styles: Record<string, string | number> = {
      display: 'block',
      overflow: 'auto',
      height: '100%'
    }
    for (const key in styles) {
      if (Object.hasOwnProperty.call(styles, key)) {
        const val = styles[key];
        (this.style as any)[key] = val;
      }
    }
    const obsDiv = document.createElement('div');
    const height = this.getAttribute('height');
    if (height) {
      this.style.height = height;
    }
    if (this.reverse) {
      this.prepend(obsDiv);
    } else {
      this.append(obsDiv)
    }
    this.instance.observe(obsDiv);
  }
  disconnectedCallback() {
    this.instance && this.instance.disconnect();
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'reverse':
        this.reverse = newValue === "true";
        break;
      case 'loading':
        this.loading = newValue === "true";
        break;
        // case 'class':
        //   newValue && newValue !== oldValue && this.classList.add(...newValue.split(' '));
        break;
      case 'has-more':
        this.hasMore = newValue === null ? true : newValue === "true";
        break;
      case 'height':
        if (newValue) {
          this.style.height = newValue;
        }
        break;
      default:
        break;
    }
  }
  static get observedAttributes() {
    return ['callback', 'reverse', 'loading', 'has-more', 'height']
  }
}

customElements.define('infinit-scroll', InfinitScrollPagination)
