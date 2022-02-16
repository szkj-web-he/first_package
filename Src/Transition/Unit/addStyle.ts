/**
 * @file add style
 * @date 2021-11-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-26
 */

import React from "react";
import { cssObjToString } from "./cssObjToString";

/**
 *
 * @param {string} cssText
 * @returns
 */
export const parseStyleText = (cssText: string): React.CSSProperties => {
    const res: Record<string, string> = {};
    cssText.split(";").forEach(function (item) {
        if (item) {
            const tmp = item.split(":");
            tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return res as React.CSSProperties;
};

/**
 *
 * @param {HTMLElement} el
 * @param {React.CSSProperties} css
 * @returns {void}
 */
export const setStyle = (el: HTMLElement, css: React.CSSProperties): void => {
    const cssText = cssObjToString(css).trim();
    if (cssText) {
        el.setAttribute("style", cssText);
    } else {
        el.removeAttribute("style");
    }
};
