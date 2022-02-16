/**
 * @file abc
 * @date 2021-12-21
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-21
 */

/**
 *
 * @returns {Promise<number>}
 */
// force reflow to put everything in position
export const forceReflow = (): number => {
    return document.body.offsetHeight;
};
