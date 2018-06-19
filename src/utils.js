// @flow

export type Measurements = {|
  x: number,
  y: number,
  width: number,
  height: number,
  top: number,
  right: number,
  bottom: number,
  left: number,
  offsetWidth: number,
  offsetHeight: number,
  scrollTop: number,
  scrollLeft: number,
  scrollWidth: number,
  scrollHeight: number,
|}

export function isScrollElement(element: Node) {
  try {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(element)
    return /(auto|scroll)/.test(overflow + overflowX + overflowY)
  } catch (e) {
    return false
  }
}

export function getParentNode(element: Node) {
  if (element.nodeName === 'HTML') {
    return element
  }
  // $FlowFixMe shadowRoot.host
  return element.parentNode || element.host || null
}

export function getClosestScrollElement(element: ?Node) {
  if (!element || !document || element === document.body) {
    return window
  } else if (isScrollElement(element)) {
    return element
  } else {
    return getClosestScrollElement(getParentNode(element))
  }
}

export function getScrollXDirection(last: number, next: number) {
  if (next === last) {
    return null
  } else {
    return next - last > 0 ? 'right' : 'left'
  }
}

export function getScrollYDirection(last: number, next: number) {
  if (next === last) {
    return null
  } else {
    return next - last > 0 ? 'down' : 'up'
  }
}

export function getDocumentWidth() {
  if (document && document.body && document.documentElement) {
    return Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    )
  }
  return 0
}

export function getDocumentHeight() {
  if (document && document.body && document.documentElement) {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )
  }
  return 0
}

export function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollWidth: getDocumentWidth(),
    scrollHeight: getDocumentHeight(),
  }
}

export function getElementSize(node: HTMLElement) {
  return {
    width: node.offsetWidth,
    height: node.offsetHeight,
    scrollWidth: node.scrollWidth,
    scrollHeight: node.scrollHeight,
  }
}

export function getMeasurements(node: HTMLElement) {
  const rect = node.getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    offsetWidth: node.offsetWidth,
    offsetHeight: node.offsetHeight,
    scrollTop: node.scrollTop,
    scrollLeft: node.scrollLeft,
    scrollWidth: node.scrollWidth,
    scrollHeight: node.scrollHeight,
  }
}
