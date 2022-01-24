/**
 * @file: bind methods
 * @date: 2021-05-20 14:19
 * @author: xuejie.he
 * @lastModify: xuejie.he 2021-05-20 14:20
 */

import { useEffect } from "react";

//  window event params
export interface EventParams {
    type: keyof WindowEventMap;
    listener: EventListenerOrEventListenerObject;
    option?: boolean | AddEventListenerOptions;
}
/**
 * @param {window | Document | Element} el element
 * @param {EventParams[]} params eventParams
 * @returns {void}
 */

export const useEventList = (
    el: typeof window | Document | Element | null,
    events: EventParams[] | null
): void => {
    useEffect(() => {
        if (events && el) {
            for (let i = 0; i < events.length; i++) {
                el.addEventListener(
                    events[i].type,
                    events[i].listener,
                    events[i].option
                );
            }
            return () => {
                for (let i = 0; i < events.length; i++) {
                    el.removeEventListener(
                        events[i].type,
                        events[i].listener,
                        events[i].option
                    );
                }
            };
        }
    }, [el, events]);
};

// window event add
export function addEventListener(
    el: typeof window | Document | Element,
    params: EventParams[]
): void {
    for (let i = 0; i < params.length; i++) {
        el.addEventListener(
            params[i].type,
            params[i].listener,
            params[i].option
        );
    }
}

/**
 * @param {window | Document | Element} el element
 * @param {EventParams[]} params eventParams
 */
// window event remove
export function removeEventList(
    el: typeof window | Document | Element,
    params: EventParams[]
): void {
    for (let i = 0; i < params.length; i++) {
        el.removeEventListener(
            params[i].type,
            params[i].listener,
            params[i].option
        );
    }
}
