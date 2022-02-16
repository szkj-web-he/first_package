/**
 * @file
 * @date 2021-12-10
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-10
 */

import { useRef, useState } from "react";

/**
 *
 * @param {T} data
 * @returns {[T, { current: T }]}
 */
export const useSyncState = <T>(data: T): [T, { current: T }] => {
    const [state, setState] = useState<T>(data);
    const refVal = useRef<T>(data);

    const proxyData = new Proxy(refVal, {
        set: (target, property, value: T, receiver) => {
            if (value !== state) {
                setState(value);
            }
            return Reflect.set(target, property, value, receiver);
        },
    });

    return [state, proxyData];
};
