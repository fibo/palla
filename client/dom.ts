export type TagName =
  | 'span'
  | 'svg'
  // Custom elements
  | 'game-view'
  | 'socket-status'

export type DomAttributes = Record<string, string>
export type DomChildren = Array<number | string | HTMLElement>

export function h(tagName: TagName, attributes: DomAttributes = {}, children: DomChildren = []) {
  // Create the element with the given tag name.
  const element = document.createElement(tagName) as HTMLElement

  // Set attributes on the element.
  for (const [key, value] of Object.entries(attributes))
    element.setAttribute(key, value)

  // Create and append children.
  for (const child of children)
    element.appendChild(
      (typeof child === 'string' || typeof child === 'number')
        ? document.createTextNode(child as string)
        : child)

  // Return the created element.
  return element
}

globalThis.h = h
