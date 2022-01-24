/**
 * @file add class
 * @date 2021-11-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-26
 */
/**
 *
 * @param {HTMLElement} el
 * @param {string} cls
 * @param {string[]} container
 * @returns  {void}
 */
export const addClass = (
    el: HTMLElement,
    cls: string,
    container?: string[]
): void => {
    const cur = el.getAttribute("class")?.split(" ") || [];

    const val = cls.trim();
    if (val) {
        if (container && container.includes(val) === false) {
            container.push(val);
        }
        if (cur.includes(val) === false) {
            cur.push(val);
        }
    }

    el.setAttribute("class", cur.join(" ").trim());
};

/**
 *
 * @param {HTMLElement} el
 * @param {string | string[]} classList
 * @returns {boolean}
 */
export const hasClass = (el: HTMLElement, cls: string): boolean => {
    const cur = el.getAttribute("class")?.trim() || "";
    const value = cls.trim();
    if (value) {
        return cur.includes(value);
    } else {
        return false;
    }
};
