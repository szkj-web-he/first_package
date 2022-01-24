/**
 * @file transition component
 * @date 2021-11-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, forwardRef, useState } from "react";
import TransitionContext from "./Unit/TransitionContext";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface TransitionProps {
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
     * ontransitionEnd callback
     */
    handleTransitionEnd?: () => void;
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
     * Remove when the element is hidden
     */
    removeOnHidden?: boolean;
    /**
     * Cache only works if removeOnHidden=true.
     * When cache=true, as long as the element has been rendered, it will no longer be removed.  The opposite is the state of cache=false.
     */
    cache?: boolean;
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
     * transitionStart callback
     */
    handleTransitionStart?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Transition = forwardRef<HTMLDivElement, TransitionProps>(
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
            removeOnHidden = false,
            cache,
            ...props
        },
        ref
    ) => {
        Transition.displayName = "Transition";
        /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [isShow, setIsShow] = useState(removeOnHidden ? show : true);
        /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

        const handleEnd = () => {
            if (!show && removeOnHidden && !cache) {
                setIsShow(false);
            }

            handleTransitionEnd && handleTransitionEnd();
        };

        useLayoutEffect(() => {
            if (show) {
                setIsShow(true);
            }
        }, [show]);

        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */

        return isShow ? (
            <TransitionContext
                show={show}
                enterActive={enterActive}
                leaveActive={leaveActive}
                toEnter={toEnter}
                toLeave={toLeave}
                fromEnter={fromEnter}
                fromLeave={fromLeave}
                animationType={animationType}
                firstAnimation={removeOnHidden || firstAnimation}
                getNodeRect={getNodeRect}
                handleTransitionEnd={handleEnd}
                className={className}
                style={style}
                tabIndex={tabIndex}
                id={id}
                title={title}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                ref={ref}
                {...props}
            >
                {children}
            </TransitionContext>
        ) : (
            <></>
        );
    }
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Transition.displayName = "Transition";
