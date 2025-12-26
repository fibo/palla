import type { DomChildren, TagNameMap } from './dom';
import type { Action, Callback, SubscriptionKey } from './state';

declare global {
  function h(
    tagName: keyof TagNameMap,
    attributes?: Record<string, string> | null,
    children?: DomChildren
  ): TagNameMap[typeof tagName];

  function publish(action: Action): void;
  function subscribe(key: SubscriptionKey, callback: Callback): () => void;
}
