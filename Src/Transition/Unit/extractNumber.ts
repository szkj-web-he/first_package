/**
 * @file extract number
 * @date 2021-05-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-05-26
 */
/**
 * @param {string} str
 * @returns {number}
 */

export function extractNumber(str: string): number {
    str = str.replace(/[^0-9.,]/g, "");
    if (str.includes(",")) {
        const arr = str.split(",").map((index) => Number(index));
        return Math.max(...arr);
    } else {
        return Number(str);
    }
}
