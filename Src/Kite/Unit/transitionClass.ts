/**
 * @file transitionClass
 * @date 2022-01-06
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-06
 */

import styles from "../style.module.scss";

export interface TransitionClassProps {
    enter: {
        active: string;
        to: string;
        from: string;
    };
    leave: {
        active: string;
        to: string;
        from: string;
    };
}

export const getTransitionClass = (
    placement: "left" | "top" | "right" | "bottom"
): TransitionClassProps => {
    return {
        enter: {
            active: styles[`kite_${placement}EnterActive`],
            to: styles[`kite_${placement}EnterTo`],
            from: styles[`kite_${placement}EnterFrom`],
        },
        leave: {
            active: styles[`kite_${placement}LeaveActive`],
            to: styles[`kite_${placement}LeaveTo`],
            from: styles[`kite_${placement}LeaveFrom`],
        },
    };
};
