/**
 * @file
 * @date 2021-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { Transition } from "../main";
import { createHash } from "./Unit/createHash";
import styles from "./style.module.scss";
import Triangle from "./Unit/triangle";
import Root from "./Unit/kiteRoot";
import { autoPosition } from "./Unit/autoPosition";
import {
    EventParams,
    addEventListener,
    removeEventList,
} from "./Unit/eventListener";
import { toFixed } from "./Unit/toFixed";
import {
    getTransitionClass,
    TransitionClassProps,
} from "./Unit/transitionClass";
import { mountElement } from "./Unit/mount";
import { getScrollValue } from "./Unit/getScrollValue";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface KiteProps {
    /**
     * 线圈
     */
    root: React.ReactElement | Element;
    /**
     * 挂载点
     */
    mount?: Element;
    /**
     * kite内容
     */
    children?: React.ReactNode;
    /**
     * show
     */
    show?: boolean;
    /**
     * width : The width of the box where the triangle is located
     * height : The width of the box where the triangle is located
     * color : Triangle color
     * offset : Triangle offset
     */
    triangle?: {
        width: string;
        height: string;
        color?: string;
        offset?: {
            x?:
                | number
                | ((
                      val: number,
                      width: { triangle: number; root: number; kite: number }
                  ) => number);
            y?:
                | number
                | ((
                      val: number,
                      height: { triangle: number; root: number; kite: number }
                  ) => number);
        };
    };
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * offset of 'Kite'
     */
    offset?: {
        x?:
            | number
            | ((
                  val: number,
                  width: { triangle: number; root: number; kite: number }
              ) => number);
        y?:
            | number
            | ((
                  val: number,
                  height: { triangle: number; root: number; kite: number }
              ) => number);
    };
    /**
     * Callback function for global click
     */
    handleGlobalClick?: (status: { isBtn: boolean; isMenu: boolean }) => void;
    /**
     * Where to put it in root
     */
    placement?: "lb" | "rb" | "cb" | "lt" | "rt" | "ct" | "rc" | "lc";
    /**
     * The direction of the main axis
     */
    direction?: "vertical" | "horizontal";
    /**
     * Callback function for position change
     */
    handlePositionChange?: (
        x: number | undefined,
        y: number | undefined
    ) => void;
    /**
     * tabIndex of this component
     */
    tabIndex?: number;
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
    /**
     * Remove when the element is hidden
     */
    removeOnHidden?: boolean;
    /**
     * Cache only works if removeOnHidden=true.
     * When cache=true, as long as the element has been rendered, it will no longer be removed.  The opposite is the state of cache=false.
     */
    cache?: boolean;
    /**
     * callback of make hash id
     */
    getHashId?: (id: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Kite = forwardRef<HTMLDivElement, KiteProps>(
    (
        {
            root,
            mount,
            children,
            show,
            triangle,
            className,
            style,
            offset,
            handleGlobalClick,
            placement = "cb",
            direction = "vertical",
            handlePositionChange,
            tabIndex,
            onMouseOver,
            onMouseOut,
            onClick,
            onMouseDown,
            onMouseUp,
            onFocus,
            onBlur,
            onMouseLeave,
            removeOnHidden = true,
            cache = true,
            getHashId,
            onMouseEnter,
            ...props
        },
        ref
    ) => {
        Kite.displayName = "Kite";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const hashId = useRef(createHash());

        const [positional, setPositional] = useState<{
            triangle: [number, number];
            menu: [number, number];
            reverse: boolean;
        }>();

        const triangleSize = useRef<{
            width: number;
            height: number;
        }>();

        const mainSize = useRef<{
            width: number;
            height: number;
        }>();

        const staticData = useRef({
            width: window.innerWidth,
            height: window.innerHeight,
            top: 0,
            left: 0,
            scrollTop: window.scrollY,
            scrollLeft: window.scrollX,
        });

        const diffCountRef = useRef(0);

        const [diffCount, setDiffCount] = useState(diffCountRef.current);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useEffect(() => {
            getHashId && getHashId(hashId.current);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useEffect(() => {
            const fn = () => {
                const btnRect = document
                    .querySelector(`[data-i=kiteRoot${hashId.current}]`)
                    ?.getBoundingClientRect();

                if (btnRect && mainSize.current) {
                    const data = autoPosition({
                        btnRect,
                        triangleSize: [
                            triangleSize.current?.width || 0,
                            triangleSize.current?.height || 0,
                        ],
                        menuSize: mainSize.current,
                        direction,
                        placement,
                        offset: {
                            menu: offset,
                            triangle: triangle?.offset,
                        },
                    });
                    setPositional(data);
                    handlePositionChange &&
                        handlePositionChange(data.menu[0], data.menu[1]);
                }
            };
            if (diffCount && show) {
                fn();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [diffCount]);

        useEffect(() => {
            const fn = (e: Event) => {
                const event = e as MouseEvent;
                let node = event.target as HTMLElement | null;
                const status = {
                    isBtn: false,
                    isMenu: false,
                };

                while (node && node.getAttribute) {
                    const id = node.getAttribute("data-i");
                    if (id === `kiteRoot${hashId.current}`) {
                        status.isBtn = true;
                    } else if (id === `kite${hashId.current}`) {
                        status.isMenu = true;
                    }
                    node = node.parentElement;
                }
                handleGlobalClick && handleGlobalClick(status);
            };
            const events: EventParams[] = [
                {
                    type: "mouseup",
                    listener: fn,
                    option: {
                        capture: true,
                    },
                },
                {
                    type: "touchend",
                    listener: fn,
                    option: {
                        capture: true,
                    },
                },
            ];

            if (handleGlobalClick && show) {
                addEventListener(window, events);
            }
            return () => {
                removeEventList(window, events);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [show]);

        const setMainSize = (rect: DOMRect) => {
            staticData.current.top = rect.top;
            staticData.current.left = rect.left;

            mainSize.current = {
                width: rect.width,
                height: rect.height,
            };
        };

        const setTriangleSize = () => {
            const node = document.querySelector(
                `[data-id=triangle${hashId.current}]`
            );

            const rect = node?.getBoundingClientRect();
            if (rect) {
                triangleSize.current = {
                    width: rect.width,
                    height: rect.height,
                };
            }
        };

        const handleTransitionEnd = () => {
            if (show) {
                const node = document.querySelector(
                    `[data-id=kite${hashId.current}]`
                );
                const rect = node?.getBoundingClientRect();
                if (rect) {
                    setMainSize(rect);
                    setTriangleSize();
                }
            }
        };

        useLayoutEffect(() => {
            let timerOut: null | number = null;
            const event: EventParams[] = [
                {
                    type: "scroll",
                    listener: () => {
                        const data = staticData.current;
                        const rect = document
                            .querySelector(`[data-i=kiteRoot${hashId.current}]`)
                            ?.getBoundingClientRect();
                        const scrollData = getScrollValue();
                        if (
                            rect &&
                            (rect.top + rect.left !== data.left + data.top ||
                                scrollData.x + scrollData.y !==
                                    data.scrollLeft + data.scrollTop)
                        ) {
                            data.left = rect.left;
                            data.top = rect.top;
                            data.scrollLeft = scrollData.x;
                            data.scrollTop = scrollData.y;
                            ++diffCountRef.current;
                            setDiffCount(diffCountRef.current);
                        }
                    },
                    option: true,
                },
                {
                    type: "resize",
                    listener: () => {
                        timerOut && window.clearTimeout(timerOut);
                        const fn = () => {
                            const data = staticData.current;
                            const scrollData = getScrollValue();
                            if (
                                window.innerWidth + window.innerHeight !==
                                    data.width + data.height ||
                                scrollData.x + scrollData.y !==
                                    data.scrollLeft + data.scrollTop
                            ) {
                                data.width = window.innerWidth;
                                data.height = window.innerHeight;
                                data.scrollLeft = scrollData.x;
                                data.scrollTop = scrollData.y;
                                ++diffCountRef.current;
                                setDiffCount(diffCountRef.current);
                            }
                        };
                        timerOut = window.setTimeout(fn, 300);
                    },
                },
            ];

            if (show) {
                ++diffCountRef.current;
                setDiffCount(diffCountRef.current);
                addEventListener(window, event);
            }

            return () => {
                removeEventList(window, event);
                timerOut && window.clearTimeout(timerOut);
            };
        }, [show]);

        useEffect(() => {
            ++diffCountRef.current;
            setDiffCount(diffCountRef.current);
        }, [children, triangle, direction, offset, placement, root]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const getClassName = () => {
            const arr = [
                styles[
                    `kite_${direction}${placement
                        .slice(0, 1)
                        .toUpperCase()}${placement.slice(1, 2)}`
                ],
            ];
            className && arr.push(className);
            if (positional?.reverse) {
                arr.push(styles.kite_reverse);
            }

            arr.push(styles.kite_transition);

            return arr.join(" ");
        };

        const setLatLng = () => {
            if (positional) {
                if (mount) {
                    const pRect = mount.getBoundingClientRect();
                    const scrollData = getScrollValue();
                    if (pRect) {
                        const x = pRect.left + scrollData.x,
                            y = pRect.top + scrollData.y;
                        return {
                            left: `${toFixed(positional.menu[0] - x)}px`,
                            top: `${toFixed(positional.menu[1] - y)}px`,
                        };
                    } else {
                        return {
                            left: `${toFixed(positional.menu[0])}px`,
                            top: `${toFixed(positional.menu[1])}px`,
                        };
                    }
                } else {
                    return {
                        left: `${toFixed(positional.menu[0])}px`,
                        top: `${toFixed(positional.menu[1])}px`,
                    };
                }
            }
        };

        let classList: undefined | TransitionClassProps = undefined;

        switch (direction) {
            case "horizontal":
                if (placement.startsWith("l")) {
                    classList = positional?.reverse
                        ? getTransitionClass("right")
                        : getTransitionClass("left");
                } else {
                    classList = positional?.reverse
                        ? getTransitionClass("left")
                        : getTransitionClass("right");
                }
                break;
            case "vertical":
                if (placement.endsWith("b")) {
                    classList = positional?.reverse
                        ? getTransitionClass("top")
                        : getTransitionClass("bottom");
                } else {
                    classList = positional?.reverse
                        ? getTransitionClass("bottom")
                        : getTransitionClass("top");
                }
                break;
        }
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        return (
            <>
                <Root id={hashId.current} key={hashId.current}>
                    {root}
                </Root>
                {createPortal(
                    <Transition
                        show={show || false}
                        getNodeRect={(rect) => {
                            setMainSize(rect);
                            setTriangleSize();
                            ++diffCountRef.current;
                            setDiffCount(diffCountRef.current);
                        }}
                        key={hashId.current}
                        enterActive={classList.enter.active}
                        toEnter={classList.enter.to}
                        fromEnter={classList.enter.from}
                        leaveActive={classList.leave.active}
                        toLeave={classList.leave.to}
                        fromLeave={classList.leave.from}
                        removeOnHidden={removeOnHidden}
                        cache={cache}
                        handleTransitionEnd={handleTransitionEnd}
                        firstAnimation={show}
                        className={getClassName()}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        onClick={onClick}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onFocus={onFocus}
                        onMouseEnter={onMouseEnter}
                        onBlur={onBlur}
                        onMouseLeave={onMouseLeave}
                        ref={ref}
                        style={Object.assign({}, style, setLatLng())}
                        tabIndex={tabIndex}
                        data-i={`kite${hashId.current}`}
                        {...props}
                    >
                        <>
                            {triangle && Object.keys(triangle).length ? (
                                <Triangle
                                    className={styles.kite_triangle}
                                    width={triangle.width}
                                    height={triangle.height}
                                    color={triangle.color}
                                    x={
                                        positional?.triangle[0]
                                            ? toFixed(positional.triangle[0])
                                            : 0
                                    }
                                    y={
                                        positional?.triangle[1]
                                            ? toFixed(positional.triangle[1])
                                            : 0
                                    }
                                    reverse={positional?.reverse}
                                    d={direction}
                                    placement={placement}
                                    id={hashId.current}
                                />
                            ) : (
                                <></>
                            )}
                            <div className={styles.kite_body}>{children}</div>
                        </>
                    </Transition>,
                    mountElement(mount)
                )}
            </>
        );
    }
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Kite.displayName = "Kite";
