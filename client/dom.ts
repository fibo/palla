import { SocketStatus } from './elements/socket-status'

// See HTMLElementTagNameMap
export type TagNameMap = {
  'span': HTMLSpanElement
  // Custom elements
  'socket-status': SocketStatus
}

export type DomChildren = Array<number | string | HTMLElement>

export function h(
  tagName: keyof TagNameMap,
  attributes: Record<string, string> | null = null,
  children: DomChildren = []
) {

  // Create the element with the given tag name.
  const element = document.createElement(tagName) as HTMLElement

  // Set attributes on the element.
  if (attributes)
    for (const [key, value] of Object.entries(attributes))
      element.setAttribute(key, value)

  // Create and append children.
  for (const child of children)
    element.appendChild(
      (typeof child === 'string' || typeof child === 'number')
      ? document.createTextNode(child as string)
      : child
    )

  // Return the created element.
  return element as TagNameMap[typeof tagName]
}

globalThis.h = h
