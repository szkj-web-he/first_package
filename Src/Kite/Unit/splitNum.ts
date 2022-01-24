/**
 * @file 2px to {unit:px,value:2} file
 * @date 2021-05-28
 * @author xuejie.he
 * @lastModify xuejie.he 2021-05-28
 */

/**
 *
 * @param {string} str  width:"1px" get 1px unit='px' value = 1;
 * @returns {{ unit: string; value: number } | undefined}
 */
export function splitNum(
    str: string
): { unit: string; value: number } | undefined {
    const unitArr = str.match(/[a-z%]+/gi);
    if (unitArr && unitArr.length > 1) {
        console.error(`Failed to obtain the unit of ${str}`);
        return;
    }
    const unit = unitArr ? unitArr[0] : "";
    const value = Number(str.replace(unit, "")) || 0;
    return {
        unit,
        value,
    };
}
