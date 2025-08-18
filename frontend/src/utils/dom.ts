/**
 * DOM 操作工具函數
 */

/**
 * 檢查元素是否在視窗中可見
 */
export const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 平滑滾動到元素
 */
export const scrollToElement = (
  element: Element | string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): void => {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) 
    : element

  if (targetElement) {
    targetElement.scrollIntoView(options)
  }
}

/**
 * 平滑滾動到頁面頂部
 */
export const scrollToTop = (behavior: ScrollBehavior = 'smooth'): void => {
  window.scrollTo({
    top: 0,
    behavior
  })
}

/**
 * 取得元素的絕對位置
 */
export const getElementPosition = (element: Element): { top: number; left: number } => {
  const rect = element.getBoundingClientRect()
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  }
}

/**
 * 檢查元素是否有指定的 CSS 類別
 */
export const hasClass = (element: Element, className: string): boolean => {
  return element.classList.contains(className)
}

/**
 * 添加 CSS 類別到元素
 */
export const addClass = (element: Element, ...classNames: string[]): void => {
  element.classList.add(...classNames)
}

/**
 * 從元素移除 CSS 類別
 */
export const removeClass = (element: Element, ...classNames: string[]): void => {
  element.classList.remove(...classNames)
}

/**
 * 切換元素的 CSS 類別
 */
export const toggleClass = (element: Element, className: string, force?: boolean): boolean => {
  return element.classList.toggle(className, force)
}

/**
 * 取得元素的計算樣式
 */
export const getComputedStyle = (element: Element, property?: string): string | CSSStyleDeclaration => {
  const styles = window.getComputedStyle(element)
  return property ? styles.getPropertyValue(property) : styles
}

/**
 * 設定元素的樣式
 */
export const setStyle = (element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void => {
  Object.assign(element.style, styles)
}

/**
 * 取得元素的尺寸
 */
export const getElementSize = (element: Element): { width: number; height: number } => {
  const rect = element.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height
  }
}

/**
 * 檢查元素是否為空
 */
export const isEmpty = (element: Element): boolean => {
  return element.children.length === 0 && element.textContent?.trim() === ''
}

/**
 * 取得元素的所有子元素
 */
export const getChildren = (element: Element, selector?: string): Element[] => {
  const children = Array.from(element.children)
  return selector ? children.filter(child => child.matches(selector)) : children
}

/**
 * 取得元素的父元素（符合選擇器）
 */
export const getParent = (element: Element, selector?: string): Element | null => {
  let parent = element.parentElement
  
  while (parent) {
    if (!selector || parent.matches(selector)) {
      return parent
    }
    parent = parent.parentElement
  }
  
  return null
}

/**
 * 取得元素的兄弟元素
 */
export const getSiblings = (element: Element, selector?: string): Element[] => {
  const siblings = Array.from(element.parentElement?.children || [])
    .filter(sibling => sibling !== element)
  
  return selector ? siblings.filter(sibling => sibling.matches(selector)) : siblings
}

/**
 * 建立元素
 */
export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options: {
    className?: string
    id?: string
    textContent?: string
    innerHTML?: string
    attributes?: Record<string, string>
    styles?: Partial<CSSStyleDeclaration>
  } = {}
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tagName)
  
  if (options.className) {
    element.className = options.className
  }
  
  if (options.id) {
    element.id = options.id
  }
  
  if (options.textContent) {
    element.textContent = options.textContent
  }
  
  if (options.innerHTML) {
    element.innerHTML = options.innerHTML
  }
  
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
  }
  
  if (options.styles) {
    Object.assign(element.style, options.styles)
  }
  
  return element
}

/**
 * 移除元素
 */
export const removeElement = (element: Element): void => {
  element.remove()
}

/**
 * 複製元素
 */
export const cloneElement = (element: Element, deep = true): Element => {
  return element.cloneNode(deep) as Element
}

/**
 * 檢查是否支援觸控
 */
export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * 檢查是否為行動裝置
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * 取得視窗尺寸
 */
export const getViewportSize = (): { width: number; height: number } => {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  }
}

/**
 * 取得滾動位置
 */
export const getScrollPosition = (): { x: number; y: number } => {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  }
}
