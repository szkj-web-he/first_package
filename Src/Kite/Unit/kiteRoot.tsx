/**
 * @file
 * @date 2021-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { cloneElement, useState } from "react";
import { findDomFn } from "./findDomNode";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface KiteRootProps {
    children: React.ReactElement | Element;
    id: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const KiteRoot: React.VFC<KiteRootProps> = ({ children, id }) => {
    KiteRoot.displayName = "KiteRoot";

    const [hasI, setHasI] = useState(() => {
        if (children instanceof Element) {
            return false;
        } else {
            if (typeof children.type === "string") {
                return false;
            } else {
                return true;
            }
        }
    });

    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const findCurrentChildren = (el: HTMLElement) => {
        const node = el?.parentElement;
        if (hasI) {
            setHasI(false);
        }

        const childrenList = node?.children;

        if (childrenList) {
            for (let i = 0; i < childrenList.length; i++) {
                if (childrenList[i] !== el) {
                    const element = childrenList[i] as HTMLElement;
                    const status = findDomFn(element, id, "KiteRoot");
                    if (status) {
                        element.setAttribute("data-i", `kiteRoot${id}`);
                    }
                }
            }
        }
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    if (children instanceof Element) {
        const oldRoot = document.querySelector(`[data-i=kiteRoot${id}]`);
        if (oldRoot) {
            oldRoot.removeAttribute("data-i");
        }
        children.setAttribute("data-i", `kiteRoot${id}`);
        return <></>;
    } else {
        if (typeof children.type === "string") {
            return cloneElement(children, {
                "data-i": `kiteRoot${id}`,
            });
        } else {
            return (
                <>
                    {children}

                    {hasI && <i ref={findCurrentChildren}></i>}
                </>
            );
        }
    }
};
KiteRoot.displayName = "KiteRoot";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default KiteRoot;
