import type { DomAttributes, DomChildren, TagName } from './dom'
import type { Action, Callback, SubscriptionKey } from './state'

declare global {
  function h(tagName: TagName, attributes?: DomAttributes, children?: DomChildren): HTMLElement

  function publish(action: Action): void
  function subscribe(key: SubscriptionKey, callback: Callback): () => void
}
