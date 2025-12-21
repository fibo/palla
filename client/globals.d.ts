import type { Action, Callback } from './state';

declare global {
    function publish(action: Action): void;
    function subscribe(types: Array<Action['type']>, callback: Callback): () => void;
}
