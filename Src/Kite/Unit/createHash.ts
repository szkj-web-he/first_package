/**
 * @file create hash
 * @date 2021-09-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-09-12
 */

/**
 *
 * @param {string|undefined} name
 * @returns {string}
 */
export const createHash = (name?: string): string => {
    const randomMath =
        (Math.random() * -1 * Math.pow(10, 16)) >>>
        Math.round(Math.random() * 10);

    let id = Date.now().toString(36);
    id += randomMath.toString(32);

    if (name) {
        return `${name}_${id}`;
    } else {
        return id;
    }
};
