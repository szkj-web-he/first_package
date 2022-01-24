/**
 * @file is true
 * @date 2021-08-24
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-24
 */
/**
 * is null or is undefined
 * @param {T} val
 * @returns {boolean}
 */

export const isTrue = <T>(val: T): boolean => {
    if (val === null || val === undefined) {
        return false;
    } else {
        return true;
    }
};
