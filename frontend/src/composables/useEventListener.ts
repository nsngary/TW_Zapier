/**
 * 事件監聽器組合式函數
 */

import { onMounted, onUnmounted } from 'vue'

export interface UseEventListenerOptions {
  capture?: boolean
  once?: boolean
  passive?: boolean
}

/**
 * 事件監聽器組合式函數
 */
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: UseEventListenerOptions
): void

export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions
): void

export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: UseEventListenerOptions
): void

export function useEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener,
  options?: UseEventListenerOptions
): void

export function useEventListener(
  target: EventTarget,
  event: string,
  handler: EventListener,
  options: UseEventListenerOptions = {}
): void {
  onMounted(() => {
    target.addEventListener(event, handler, options)
  })

  onUnmounted(() => {
    target.removeEventListener(event, handler, options)
  })
}
