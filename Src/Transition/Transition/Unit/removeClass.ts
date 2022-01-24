/**
 * @file remove class
 * @date 2021-11-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-26
 */

/**
 *
 * @param {HTMLElement} el
 * @param {string | string[]} cls
 * @param {string[]} container
 * @param {string | string[]|undefined} ignoreClass
 */
export const removeClass = (
    el: HTMLElement,
    cls: string,
    container?: string[]
): void => {
    const clString = el.getAttribute("class") || "";

    const cur = clString.split(" ");

    const val = cls.trim();

    if (val) {
        let n = container && container.findIndex((item) => item === val);

        if (Number(n) >= 0) {
            container && container.splice(n as number, 1);
        }
        n = cur.findIndex((item) => item === val);
        if (n >= 0) {
            cur.splice(n, 1);
        }
    }
    const curStr = cur.join(" ").trim();
    if (curStr) {
        el.setAttribute("class", curStr);
    } else {
        el.removeAttribute("class");
    }
};
