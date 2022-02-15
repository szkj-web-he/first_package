/**
 * @file getScrollValue
 * @date 2022-01-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-14
 */

export const getScrollValue = (): {
    x: number;
    y: number;
} => {
    let x = window.scrollX || window.pageXOffset;
    let y = window.scrollY || window.pageYOffset;
    const node = document.documentElement || document.body.parentNode;
    if (!x) {
        x = (typeof node.scrollLeft == "number" ? node : document.body)
            .scrollLeft;
    } else if (!y) {
        y = (typeof node.scrollTop == "number" ? node : document.body)
            .scrollTop;
    }
    return {
        x,
        y,
    };
};
