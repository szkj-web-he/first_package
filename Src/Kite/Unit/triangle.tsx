/**
 * @file
 * @date 2021-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo } from "react";
import { splitNum } from "./splitNum";
import { isTrue } from "./isTrue";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TriangleProps {
    width: string;
    height: string;
    color?: string;
    x?: number;
    y?: number;
    reverse?: boolean;
    d: "vertical" | "horizontal";
    placement: "lb" | "rb" | "cb" | "lt" | "rt" | "ct" | "rc" | "lc";
    id: string;
    className: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Triangle: React.VFC<TriangleProps> = ({
    width,
    height,
    color = "#fff",
    x,
    y,
    reverse,
    d,
    placement,
    id,
    className,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const basicStyle = useMemo(() => {
        let style: React.CSSProperties = {};
        let border: { unit: string; value: number } | undefined = undefined;
        switch (d) {
            case "horizontal":
                border = splitNum(height);
                style = {
                    borderTop: `${(border?.value || 0) / 2}${
                        border?.unit || ""
                    } solid transparent`,
                    borderBottom: `${(border?.value || 0) / 2}${
                        border?.unit || ""
                    } solid transparent`,
                };
                if (placement.startsWith("l")) {
                    style.borderLeft = `${width} solid ${color}`;
                    style.filter = "drop-shadow(1px 0 1px rgba(0, 0, 0, 0.2))";
                } else {
                    style.borderRight = `${width} solid ${color}`;
                    style.filter = "drop-shadow(-1px 0 1px rgba(0, 0, 0, 0.2))";
                }

                break;
            case "vertical":
                border = splitNum(width);

                style = {
                    borderLeft: `${(border?.value || 0) / 2}${
                        border?.unit || ""
                    } solid transparent`,
                    borderRight: `${(border?.value || 0) / 2}${
                        border?.unit || ""
                    } solid transparent`,
                };
                if (placement.endsWith("t")) {
                    style.borderTop = `${height} solid ${color}`;
                    style.filter = "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))";
                } else {
                    style.borderBottom = `${height} solid ${color}`;
                    style.filter = "drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.2))";
                }
                break;
        }
        return style;
    }, [color, d, height, placement, width]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const transformVal = () => {
        let str = "";
        if (isTrue(x) && isTrue(y)) {
            str += `translate(${x as number}px,${y as number}px)`;
        }
        if (reverse) {
            str += ` rotate(180deg)`;
        }
        return str;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={className}
            data-id={`triangle${id}`}
            style={Object.assign(
                {},
                basicStyle,
                transformVal() ? { transform: transformVal() } : {}
            )}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Triangle;
