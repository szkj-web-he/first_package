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
     * 是否可见
     */
    show: boolean;
    /**
     * 进入时候的 className
     */
    enterActive?: string;
    /**
     *  离开时候的 className
     */
    leaveActive?: string;
    /**
     * 进入结束的时候的className
     */
    toEnter?: string;
    /**
     * 离开结束的时候的className
     */
    toLeave?: string;
    /**
     * 开始进入时候的className
     */
    fromEnter?: string;
    /**
     * 开始离开时候的className
     */
    fromLeave?: string;
    /**
     * 要执行过渡的主体
     */
    children: React.ReactNode;
    /**
     * 首次加载的时候是否要动画
     */
    firstAnimation?: boolean;
    /**
     * 这是已经集成了一部分的过渡效果
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
     * 获取当前节点的 DOMRect
     */
    getNodeRect?: (res: DOMRect) => void;
    /**
     * 过渡结束的时候的回调函数
     */
    handleTransitionEnd?: () => void;
    /**
     * 这个组件的className
     */
    className?: string;
    /**
     * 这个组件的style
     */
    style?: React.CSSProperties;
    /**
     * 这个组件的tabIndex
     */
    tabIndex?: number;
    /**
     * 这个组件的id
     */
    id?: string;
    /**
     * 这个组件的title
     */
    title?: string;
    /**
     * 这个组件的mouseOver事件回调
     */
    onMouseOver?: () => void;
    /**
     * 这个组件的onMouseOut事件回调
     */
    onMouseOut?: () => void;
    /**
     * 这个组件的onClick事件回调
     */
    onClick?: () => void;
    /**
     * 这个组件的onMouseDown事件回调
     */
    onMouseDown?: () => void;
    /**
     * 这个组件的onMouseUp事件回调
     */
    onMouseUp?: () => void;
    /**
     * 当Transition离开后是否删除节点
     */
    removeOnHidden?: boolean;
    /**
     * 是否缓存节点。
     * 这个属性和removeOnHidden联动才有效。
     * 当cache=true,removeOnHidden=true时,只要渲染过一次,就不会被remove掉
     */
    cache?: boolean;
    /**
     * 这个组件的onFocus事件回调
     */
    onFocus?: () => void;
    /**
     * 这个组件的onBlur事件回调
     */
    onBlur?: () => void;
    /**
     * 这个组件的onMouseLeave事件回调
     */
    onMouseLeave?: () => void;
    /**
     * 这个组件的onMouseEnter事件回调
     */
    onMouseEnter?: () => void;
    /**
     * 当过渡动画开始执行时的回调函数
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
