/**
 * @file initClassName
 * @date 2021-12-08
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-08
 */

import styles from "./TransitionContext/style.module.scss";

/**
 *
 * @param { "fade" | "zoom" | "taller" | "wider"  | "inLeft" | "inRight" | "inTop"  | "inBottom"  | "slideDown"| "slideUp"| "slideLeft"| "slideRight"} type
 * @param {string} enterActive
 * @param {string} fromEnter
 * @param {string} toEnter
 * @param {string} leaveActive
 * @param {string} fromLeave
 * @param {string} toLeave
 */

interface InitClassNameProps {
    type?:
        | "fade"
        | "zoom"
        | "taller"
        | "wider"
        | "inLeft"
        | "inRight"
        | "inTop"
        | "inBottom"
        | "slideDown"
        | "slideUp"
        | "slideLeft"
        | "slideRight";
    enterActive?: string;
    fromEnter?: string;
    toEnter?: string;
    leaveActive?: string;
    fromLeave?: string;
    toLeave?: string;
}

interface GetClassNameProps {
    enter: {
        active: string;
        from: string;
        to: string;
    };
    leave: {
        active: string;
        from: string;
        to: string;
    };
}
/**
 *
 * @param {string} name
 * @returns {GetClassNameProps}
 */
export const setClassNameStr = (name: string): GetClassNameProps => {
    return {
        enter: {
            active: styles[`transition_${name}EnterActive`],
            from: styles[`transition_${name}FromEnter`],
            to: styles[`transition_${name}ToEnter`],
        },
        leave: {
            active: styles[`transition_${name}LeaveActive`],
            from: styles[`transition_${name}FromLeave`],
            to: styles[`transition_${name}ToLeave`],
        },
    };
};

export const initClassName = ({
    type,
    enterActive,
    fromEnter,
    toEnter,
    leaveActive,
    fromLeave,
    toLeave,
}: InitClassNameProps): GetClassNameProps => {
    const arr = [
        "fade",
        "zoom",
        "taller",
        "wider",
        "inLeft",
        "inRight",
        "inTop",
        "inBottom",
        "slideDown",
        "slideUp",
        "slideLeft",
        "slideRight",
    ];
    if (type && arr.includes(type)) {
        return setClassNameStr(type);
    } else {
        return {
            enter: {
                active: enterActive || "",
                from: fromEnter || "",
                to: toEnter || "",
            },
            leave: {
                active: leaveActive || "",
                from: fromLeave || "",
                to: toLeave || "",
            },
        };
    }
};
