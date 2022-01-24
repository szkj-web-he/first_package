/**
 * @file transition component
 * @date 2021-11-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    useRef,
    useState,
    useLayoutEffect,
    useEffect,
    forwardRef,
} from "react";
import styles from "./style.module.scss";
import { addClass, hasClass } from "../addClass";
import { setStyle } from "../addStyle";
import { getTransitionAttr } from "../getTransitionAttr";
import { removeClass } from "../removeClass";
import { initClassName } from "../initClassName";
import { nextFrame } from "../useAnimationFrame";
import { forceReflow } from "../forceReflow";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

interface TransitionProps {
    /**
     * is child component visible
     */
    show: boolean;
    /**
     * enter className
     * * Intersection of fromEnter and toEnter
     */
    enterActive?: string;
    /**
     * leave className
     * * Intersection of fromLeave and toLeave
     */
    leaveActive?: string;
    /**
     * ClassName when entering
     */
    toEnter?: string;
    /**
     * ClassName when leaving
     */
    toLeave?: string;
    /**
     * ClassName when starting to enter
     */
    fromEnter?: string;
    /**
     * ClassName when starting to leave
     */
    fromLeave?: string;
    /**
     * children of ReactNode
     */
    children: React.ReactNode;
    /**
     * first animation
     */
    firstAnimation?: boolean;
    /**
     * The component library encapsulates several default animation libraries
     */
    animationType?:
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
    /**
     * getBoundingClientRect callback
     */
    getNodeRect?: (res: DOMRect) => void;
    /**
     * transitionEnd callback
     */
    handleTransitionEnd?: () => void;
    /**
     * transitionStart callback
     */
    handleTransitionStart?: () => void;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * tabIndex of this component
     */
    tabIndex?: number;
    /**
     * id of this component
     */
    id?: string;
    /**
     * title of this component
     */
    title?: string;
    /**
     * onMouseOver callback
     */
    onMouseOver?: () => void;
    /**
     * onMouseOut callback
     */
    onMouseOut?: () => void;
    /**
     * onClick callback
     */
    onClick?: () => void;
    /**
     * onMouseDown callback
     */
    onMouseDown?: () => void;
    /**
     * onMouseUp callback
     */
    onMouseUp?: () => void;
    /**
     * onFocus callback
     */
    onFocus?: () => void;
    /**
     * onBlur callback
     */
    onBlur?: () => void;
    /**
     * onMouseLeave callback
     */
    onMouseLeave?: () => void;
    /**
     * onMouseEnter callback
     */
    onMouseEnter?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Transition = forwardRef<HTMLDivElement, TransitionProps>(
    (
        {
            show,
            enterActive,
            leaveActive,
            toEnter,
            toLeave,
            fromEnter,
            fromLeave,
            children,
            firstAnimation = false,
            animationType,
            getNodeRect,
            handleTransitionEnd,
            handleTransitionStart,
            className,
            style,
            id,
            title,
            tabIndex,
            onMouseOver,
            onMouseOut,
            onClick,
            onMouseDown,
            onMouseUp,
            onFocus,
            onBlur,
            onMouseLeave,
            onMouseEnter,
            ...props
        },
        ref
    ) => {
        Transition.displayName = "TransitionContext";
        /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const cRef = useRef<HTMLDivElement | null>(null);

        const commonData = useRef<{
            count: number;
            originalStyle?: React.CSSProperties;
            firstAnimation: typeof firstAnimation;
            animationType: typeof animationType;
            transitionList: string[];
            transitionEnd: boolean;
            style?: React.CSSProperties;
            originalClassName?: string;
        }>({
            count: 0,
            originalStyle: undefined,
            firstAnimation: firstAnimation,
            animationType: animationType,
            transitionList: [],
            style: undefined,
            transitionEnd: true,
        });

        const transitionClassName = useRef({
            enter: {
                active: "",
                from: "",
                to: "",
            },
            leave: {
                active: "",
                from: "",
                to: "",
            },
        });

        const nodeSize = useRef({
            width: 0,
            height: 0,
        });

        const [readyStatus, setReadyStatus] = useState(false);

        /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /**
         * Record times
         */
        useLayoutEffect(() => {
            const data = commonData.current;
            return () => {
                ++data.count;
            };
        }, [show]);

        /**
         * Record animation type
         */

        useLayoutEffect(() => {
            commonData.current.animationType = animationType;
        }, [animationType]);

        /**
         * Record the state of the first animation
         */
        useEffect(() => {
            commonData.current.firstAnimation = firstAnimation;
        }, [firstAnimation]);

        useLayoutEffect(() => {
            commonData.current.originalStyle = style;
        }, [style]);

        useLayoutEffect(() => {
            commonData.current.originalClassName = className;
        }, [className]);

        /**
         * During animation execution, this change will cause variation
         * get transition class
         */
        useLayoutEffect(() => {
            const node = cRef.current;

            const data = initClassName({
                type: animationType,
                enterActive,
                fromEnter,
                toEnter,
                leaveActive,
                fromLeave,
                toLeave,
            });
            const fn = (oldVal: string, newVal: string) => {
                if (node) {
                    if (oldVal !== newVal && hasClass(node, oldVal)) {
                        removeClass(
                            node,
                            oldVal,
                            commonData.current.transitionList
                        );
                        addClass(
                            node,
                            newVal,
                            commonData.current.transitionList
                        );
                    }
                }
            };
            const transitionClsData = transitionClassName.current as Record<
                string,
                Record<string, string>
            >;
            for (const key in transitionClsData) {
                for (const itemKey in transitionClsData[key]) {
                    fn(
                        transitionClsData[key][itemKey],
                        ((data as unknown) as Record<
                            string,
                            Record<string, string>
                        >)[key][itemKey]
                    );
                }
            }

            transitionClassName.current = data;
        }, [
            animationType,
            enterActive,
            fromEnter,
            fromLeave,
            leaveActive,
            toEnter,
            toLeave,
        ]);

        useLayoutEffect(() => {
            const node = cRef.current;
            const timer: { current: null | number } = { current: null };
            let timeout: null | number = null;
            let count = 0;
            let isEnd = false;
            let transitionInfo = {
                timeout: 0,
                propCount: 0,
            };

            const addTransitionStyle = () => {
                if (node) {
                    switch (commonData.current.animationType) {
                        case "taller":
                            commonData.current.style = {
                                height: `${nodeSize.current.height}px`,
                            };
                            setStyle(
                                node,
                                Object.assign(
                                    {},
                                    commonData.current.originalStyle,
                                    commonData.current.style
                                )
                            );

                            break;
                        case "wider":
                            commonData.current.style = {
                                width: `${nodeSize.current.width}px`,
                            };
                            setStyle(
                                node,
                                Object.assign(
                                    {},
                                    commonData.current.originalStyle,
                                    commonData.current.style
                                )
                            );

                            break;
                    }
                }
            };

            /**
             * transitionEnd
             */
            const transitionEndFnWhenShow = () => {
                if (node) {
                    commonData.current.style = undefined;

                    if (commonData.current.originalClassName) {
                        node.setAttribute(
                            "class",
                            commonData.current.originalClassName
                        );
                    } else {
                        node.removeAttribute("class");
                    }
                    setStyle(
                        node,
                        Object.assign(
                            {},
                            commonData.current.originalStyle,
                            commonData.current.style
                        )
                    );
                    commonData.current.transitionList = [];

                    const rect = node.getBoundingClientRect();
                    nodeSize.current = {
                        width: rect.width,
                        height: rect.height,
                    };
                }
            };
            const transitionEndFnWhenHidden = () => {
                if (node) {
                    commonData.current.style = undefined;
                    setStyle(
                        node,
                        Object.assign(
                            {},
                            commonData.current.originalStyle,
                            commonData.current.style
                        )
                    );
                    const arr = [styles.transition_hidden];
                    commonData.current.originalClassName &&
                        arr.push(commonData.current.originalClassName);

                    node.setAttribute("class", arr.join(" "));

                    commonData.current.transitionList = [
                        styles.transition_hidden,
                    ];
                }
            };

            const transitionEndFn = (e: TransitionEvent) => {
                ++count;
                if (e.target === node) {
                    (() => {
                        if (count >= transitionInfo.propCount) {
                            if (show) {
                                transitionEndFnWhenShow();
                            } else {
                                transitionEndFnWhenHidden();
                            }

                            handleTransitionEnd && handleTransitionEnd();

                            node &&
                                node.removeEventListener(
                                    "transitionend",
                                    transitionEndFn,
                                    false
                                );

                            commonData.current.transitionEnd = true;
                        }
                    })();
                }
            };

            const fromEnterFn = () => {
                if (node) {
                    commonData.current.style = undefined;
                    addClass(
                        node,
                        transitionClassName.current.enter.from,
                        commonData.current.transitionList
                    );
                    addClass(
                        node,
                        transitionClassName.current.enter.active,
                        commonData.current.transitionList
                    );
                }
            };

            const enterToFn = () => {
                if (node) {
                    removeClass(
                        node,
                        transitionClassName.current.enter.from,
                        commonData.current.transitionList
                    );

                    addClass(
                        node,
                        transitionClassName.current.enter.to,
                        commonData.current.transitionList
                    );

                    addTransitionStyle();
                    timeout = window.setTimeout(() => {
                        transitionEndFnWhenShow();
                        handleTransitionEnd && handleTransitionEnd();
                        commonData.current.transitionEnd = true;
                    }, transitionInfo.timeout + 1);
                    node.addEventListener(
                        "transitionend",
                        transitionEndFn,
                        false
                    );
                }
            };

            const entering = async () => {
                fromEnterFn();
                node &&
                    removeClass(
                        node,
                        styles.transition_hidden,
                        commonData.current.transitionList
                    );
                forceReflow();
                if (node) {
                    transitionInfo = getTransitionAttr(node);
                }
                await nextFrame(() => {
                    if (isEnd) {
                        return;
                    }
                    enterToFn();
                }, timer);
            };

            const leaveToFn = () => {
                if (node) {
                    removeClass(
                        node,
                        transitionClassName.current.leave.from,
                        commonData.current.transitionList
                    );

                    addClass(
                        node,
                        transitionClassName.current.leave.to,
                        commonData.current.transitionList
                    );

                    commonData.current.style = undefined;
                    setStyle(
                        node,
                        Object.assign(
                            {},
                            commonData.current.originalStyle,
                            commonData.current.style
                        )
                    );

                    node.addEventListener(
                        "transitionend",
                        transitionEndFn,
                        false
                    );

                    timeout = window.setTimeout(() => {
                        transitionEndFnWhenHidden();
                        handleTransitionEnd && handleTransitionEnd();
                        commonData.current.transitionEnd = true;
                    }, transitionInfo.timeout + 1);
                }
            };

            const fromLeaveFn = () => {
                if (node) {
                    addTransitionStyle();
                    addClass(
                        node,
                        transitionClassName.current.leave.from,
                        commonData.current.transitionList
                    );

                    addClass(
                        node,
                        transitionClassName.current.leave.active,
                        commonData.current.transitionList
                    );
                }
            };

            const leaving = async () => {
                fromLeaveFn();
                forceReflow();
                if (node) {
                    transitionInfo = getTransitionAttr(node);
                }
                await nextFrame(() => {
                    if (isEnd) {
                        return;
                    }
                    leaveToFn();
                }, timer);
            };

            const initTransitionFn = () => {
                handleTransitionStart && handleTransitionStart();

                if (show) {
                    if (!commonData.current.transitionEnd) {
                        transitionEndFnWhenHidden();
                    }
                    if (transitionClassName.current.enter.active) {
                        commonData.current.transitionEnd = false;
                        void entering();
                    } else {
                        transitionEndFnWhenShow();
                    }
                } else {
                    if (!commonData.current.transitionEnd) {
                        transitionEndFnWhenShow();
                    }
                    if (transitionClassName.current.leave.active) {
                        commonData.current.transitionEnd = false;
                        void leaving();
                    } else {
                        transitionEndFnWhenHidden();
                    }
                }
            };
            if (readyStatus) {
                if (commonData.current.count) {
                    initTransitionFn();
                } else {
                    if (commonData.current.firstAnimation) {
                        initTransitionFn();
                    } else {
                        node &&
                            show &&
                            removeClass(
                                node,
                                styles.transition_hidden,
                                commonData.current.transitionList
                            );
                    }
                }
            }
            return () => {
                isEnd = true;
                timer.current && window.cancelAnimationFrame(timer.current);
                timeout && window.clearTimeout(timeout);
                node &&
                    node.removeEventListener(
                        "transitionend",
                        transitionEndFn,
                        false
                    );
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [show, readyStatus]);

        useLayoutEffect(() => {
            let isEnd = false;
            const node = cRef.current;
            const fn = () => {
                if (isEnd) {
                    return;
                }
                const rect = node?.getBoundingClientRect();
                if (rect) {
                    forceReflow();
                    nodeSize.current = {
                        width: rect.width,
                        height: rect.height,
                    };
                    getNodeRect && getNodeRect(rect);
                }
            };
            if (
                show &&
                node &&
                readyStatus &&
                commonData.current.transitionEnd &&
                commonData.current.animationType &&
                ["taller", "wider"].includes(commonData.current.animationType)
            ) {
                fn();
            }
            return () => {
                isEnd = true;
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [show, readyStatus, children]);

        useLayoutEffect(() => {
            const timer: { current: null | number } = { current: null };
            let isEnd = false;
            const init = async (node: HTMLElement) => {
                const rect = node.getBoundingClientRect();
                if (rect) {
                    nodeSize.current = {
                        width: rect.width,
                        height: rect.height,
                    };

                    await nextFrame(() => {
                        if (isEnd) {
                            return;
                        }
                        getNodeRect && getNodeRect(rect);
                    }, timer);

                    addClass(
                        node,
                        styles.transition_hidden,
                        commonData.current.transitionList
                    );
                    forceReflow();
                    node.removeAttribute("transition-clock");
                    if (isEnd) return;
                    setReadyStatus(true);
                }
            };
            const node = cRef.current;
            if (node) {
                void init(node);
            }
            return () => {
                isEnd = true;
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        return (
            <div
                id={id}
                title={title}
                {...Object.assign(
                    {},
                    !commonData.current.count
                        ? { "transition-clock": "true" }
                        : {}
                )}
                ref={(el) => {
                    cRef.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onFocus={onFocus}
                onBlur={onBlur}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={Object.assign({}, commonData.current.style, style)}
                tabIndex={tabIndex}
                className={
                    [...commonData.current.transitionList].join(" ") +
                    (className ? " " + className : "")
                }
                {...props}
            >
                {children}
            </div>
        );
    }
);
Transition.displayName = "TransitionContext";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Transition;
