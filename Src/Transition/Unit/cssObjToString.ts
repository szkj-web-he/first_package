/**
 * @file json css to string
 * @date 2021-08-20
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-20
 */

import React from "react";

/**
 *
 * @param { React.CSSProperties} data style
 * @returns { string }
 */
export const cssObjToString = (data: React.CSSProperties): string => {
    let str = "";
    for (const key in data) {
        const keyString = key.replace(/[A-Z]/g, (res) => {
            return `-${res.toLowerCase()}`;
        });

        str += `${keyString}:${
            (data as Record<string, number | string>)[key]
        };`;
    }
    return str;
};
