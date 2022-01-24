/**
 * @file toFixed
 * @date 2022-01-05
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-05
 */

/**
 * Keep three decimal places
 * @param {number} val
 * @returns {number}
 */
export const toFixed = (val: number): number => {
    return Math.round(val * 1000) / 1000;
};
