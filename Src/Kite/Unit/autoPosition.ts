/**
 * @file auto Position
 * @date 2022-01-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-14
 */

import { getScrollValue } from "./getScrollValue";

type Outset = [number, number];
interface Boundary {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export type OffsetWidthFn = (
    val: number,
    width: { triangle: number; root: number; kite: number }
) => number;

export type OffsetHeightFn = (
    val: number,
    height: { triangle: number; root: number; kite: number }
) => number;

export type OffsetProps = {
    x?: number | OffsetWidthFn;
    y?: number | OffsetHeightFn;
};

interface StaticProps extends AutoPositionProps {
    scrollX: number;
    scrollY: number;
    boundary: Boundary;
}

let staticData: StaticProps | null = null;

const getOffset = (
    val: number,
    d: "x" | "y",
    m: "menu" | "triangle"
): number => {
    const data = staticData as StaticProps;
    let offset: typeof data.offset.menu = undefined;
    switch (m) {
        case "menu":
            offset = data.offset.menu;
            break;
        case "triangle":
            offset = data.offset.triangle;
            break;
    }

    if (offset) {
        switch (d) {
            case "x":
                if (typeof offset.x === "number") {
                    val += offset.x;
                } else if (offset.x) {
                    val = offset.x(val, {
                        triangle: data.triangleSize[0],
                        root: data.btnRect.width,
                        kite: data.menuSize.width,
                    });
                }
                break;
            case "y":
                if (typeof offset.y === "number") {
                    val += offset.y;
                } else if (offset.y) {
                    val = offset.y(val, {
                        triangle: data.triangleSize[1],
                        root: data.btnRect.height,
                        kite: data.menuSize.height,
                    });
                }
                break;
        }
    }
    return val;
};

const getTrianglePosition = (): { x: number; y: number } => {
    const data = staticData as StaticProps;
    let x = 0,
        y = 0;

    switch (data.direction) {
        case "horizontal":
            y =
                data.btnRect.height / 2 +
                data.btnRect.top +
                data.scrollY -
                data.triangleSize[1] / 2;
            break;
        case "vertical":
            x =
                data.btnRect.width / 2 +
                data.btnRect.left +
                data.scrollX -
                data.triangleSize[0] / 2;
            break;
    }

    return {
        x,
        y,
    };
};

const isBtnVisible = (): boolean => {
    const data = staticData as StaticProps;

    if (data.btnRect.top + data.scrollY > data.boundary.bottom) {
        return false;
    } else if (data.btnRect.bottom + data.scrollY < data.boundary.top) {
        return false;
    } else if (data.btnRect.left + data.scrollX > data.boundary.right) {
        return false;
    } else if (data.btnRect.right + data.scrollX < data.boundary.left) {
        return false;
    } else {
        return true;
    }
};

const defaultHorizontalY = (): number => {
    let val = 0;
    const data = staticData as StaticProps;
    const t = data.btnRect.top + data.scrollY;
    const c =
        data.btnRect.top +
        data.scrollY -
        data.menuSize.height / 2 +
        data.btnRect.height / 2;
    const b = data.btnRect.bottom + data.scrollY - data.menuSize.height;

    switch (data.placement) {
        case "lt":
            val = t;
            break;
        case "lc":
            val = c;
            break;
        case "lb":
            val = b;
            break;
        case "rt":
            val = t;
            break;
        case "rc":
            val = c;
            break;
        case "rb":
            val = b;
            break;
        default:
            console.warn(
                `Horizontal cannot have placement = ${data.placement}`
            );
    }
    val = getOffset(val, "y", "menu");

    if (isBtnVisible()) {
        if (val < data.boundary.top) {
            val = data.boundary.top;
        } else if (val + data.menuSize.height > data.boundary.bottom) {
            val = data.boundary.bottom - data.menuSize.height;
        }
    }
    return val;
};

const defaultVerticalX = (): number => {
    const data = staticData as StaticProps;
    let val = 0;
    const l = data.btnRect.left + data.scrollX;
    const c =
        data.btnRect.left +
        data.scrollX +
        data.btnRect.width / 2 -
        data.menuSize.width / 2;
    const r = data.btnRect.right + data.scrollX - data.menuSize.width;

    switch (data.placement) {
        case "lt":
            val = l;
            break;
        case "ct":
            val = c;
            break;
        case "rt":
            val = r;
            break;
        case "lb":
            val = l;
            break;
        case "cb":
            val = c;
            break;
        case "rb":
            val = r;
            break;
        default:
            console.error(`Vertical cannot have placement = ${data.placement}`);
    }

    val = getOffset(val, "x", "menu");

    if (isBtnVisible()) {
        if (val < data.boundary.left) {
            val = data.boundary.left;
        } else if (val + data.menuSize.width > data.boundary.right) {
            val = data.boundary.right - data.menuSize.width;
        }
    }
    return val;
};

const getPoint = (): {
    x: number;
    y: number;
    reverse: boolean;
} => {
    let reverse = false,
        x = 0,
        y = 0;
    const data = staticData as StaticProps;
    switch (data.direction) {
        case "horizontal":
            y = defaultHorizontalY();

            if (data.placement.startsWith("l")) {
                // default left
                x = data.btnRect.left + data.scrollX - data.menuSize.width;
                x = getOffset(x, "x", "menu");

                //btn visible
                if (isBtnVisible() && x < data.boundary.left) {
                    if (
                        data.boundary.right -
                            (data.btnRect.right + data.scrollX) >=
                        data.menuSize.width
                    ) {
                        x = data.btnRect.right + data.scrollX;
                        reverse = true;
                    } else {
                        x += data.boundary.left - x;
                    }
                }
            } else {
                // default right
                x = data.btnRect.right + data.scrollX;
                x = getOffset(x, "x", "menu");
                //btn visible
                if (
                    isBtnVisible() &&
                    x + data.menuSize.width > data.boundary.right
                ) {
                    if (data.btnRect.left >= data.menuSize.width) {
                        x =
                            data.btnRect.left +
                            data.scrollX -
                            data.menuSize.width;
                        reverse = true;
                    } else {
                        x -= x + data.menuSize.width - data.boundary.right;
                    }
                }
            }
            break;
        case "vertical":
            x = defaultVerticalX();

            if (data.placement.endsWith("b")) {
                // default bottom
                y = data.btnRect.bottom + data.scrollY;
                y = getOffset(y, "y", "menu");
                //btn visible
                if (
                    isBtnVisible() &&
                    y + data.menuSize.height > data.boundary.bottom
                ) {
                    if (data.btnRect.top >= data.menuSize.height) {
                        y =
                            data.btnRect.top +
                            data.scrollY -
                            data.menuSize.height;
                        reverse = true;
                    } else {
                        y -= y + data.menuSize.height - data.boundary.bottom;
                    }
                }
            } else {
                // default top
                y = data.btnRect.top + data.scrollY - data.menuSize.height;
                y = getOffset(y, "y", "menu");

                //btn visible
                if (isBtnVisible() && y < data.boundary.top) {
                    if (
                        data.boundary.bottom -
                            (data.btnRect.bottom + data.scrollY) >=
                        data.menuSize.height
                    ) {
                        y = data.btnRect.bottom + data.scrollY;
                        reverse = true;
                    } else {
                        y += data.boundary.top - y;
                    }
                }
            }
            break;
    }

    return {
        x,
        y,
        reverse,
    };
};

const getRelativePoint = (tx: number, ty: number) => {
    const data = staticData as StaticProps;
    let reverse = false,
        marginTop = 0,
        marginBottom = 0,
        marginLeft = 0,
        marginRight = 0,
        x = 0,
        y = 0;
    switch (data.direction) {
        case "horizontal":
            y = defaultHorizontalY();
            marginTop = y - ty;

            if (marginTop > 0) {
                if (y - data.boundary.top >= marginTop) {
                    if (y - data.boundary.top > marginTop + 5) {
                        y -= marginTop + 5;
                    } else {
                        y = data.boundary.top;
                    }
                } else {
                    // 这里的逻辑暂定
                    ty = y + 5;
                }
            }

            marginBottom =
                ty + data.triangleSize[1] - (y + data.menuSize.height);
            if (marginBottom > 0) {
                if (
                    data.boundary.bottom - (y + data.menuSize.height) >=
                    marginBottom
                ) {
                    if (
                        data.boundary.bottom - (y + data.menuSize.height) >
                        marginBottom + 5
                    ) {
                        y += marginBottom + 5;
                    } else {
                        y = data.boundary.bottom - data.menuSize.height;
                    }
                } else {
                    // 这里的逻辑暂定
                    ty = y + data.menuSize.height - data.triangleSize[1] - 5;
                }
            }

            if (data.placement.startsWith("l")) {
                // default left
                x = data.btnRect.left + data.scrollX - data.menuSize.width;
                x = getOffset(x, "x", "menu");

                //btn visible
                if (isBtnVisible() && x < data.boundary.left) {
                    if (
                        data.boundary.right -
                            (data.btnRect.right + data.scrollX) >=
                        data.menuSize.width
                    ) {
                        x = data.btnRect.right + data.scrollX;
                        reverse = true;
                    } else {
                        x += data.boundary.left - x;
                    }
                }

                tx = -1;
            } else {
                tx = 0;
                // default right
                x = data.btnRect.right + data.scrollX;
                x = getOffset(x, "x", "menu");

                //btn visible
                if (
                    isBtnVisible() &&
                    x + data.menuSize.width > data.boundary.right
                ) {
                    if (data.btnRect.left >= data.menuSize.width) {
                        x =
                            data.btnRect.left +
                            data.scrollX -
                            data.menuSize.width;
                        reverse = true;
                    } else {
                        x -= x + data.menuSize.width - data.boundary.right;
                    }
                }
            }
            ty -= y;
            break;
        case "vertical":
            x = defaultVerticalX();

            marginLeft = x - tx;

            if (marginLeft > 0) {
                if (x - data.boundary.left >= marginLeft) {
                    if (x - data.boundary.left >= marginLeft + 5) {
                        x -= marginLeft + 5;
                    } else {
                        x -= marginLeft;
                    }
                } else {
                    // 这里的逻辑暂定
                    tx = x + 5;
                }
            }

            marginRight = tx + data.triangleSize[0] - (x + data.menuSize.width);

            if (marginRight > 0) {
                if (
                    data.boundary.right - (x + data.menuSize.width) >=
                    marginRight
                ) {
                    if (
                        data.boundary.right - (x + data.menuSize.width) >=
                        marginRight + 5
                    ) {
                        x += marginRight + 5;
                    } else {
                        x += marginRight;
                    }
                } else {
                    // 这里的逻辑暂定
                    tx = x + data.menuSize.width - data.triangleSize[0] - 5;
                }
            }

            if (data.placement.endsWith("b")) {
                ty = 0;
                // default bottom
                y = data.btnRect.bottom + data.scrollY;
                y = getOffset(y, "y", "menu");
                //btn visible
                if (
                    isBtnVisible() &&
                    y + data.menuSize.height > data.boundary.bottom
                ) {
                    if (data.btnRect.top >= data.menuSize.height) {
                        y =
                            data.btnRect.top +
                            data.scrollY -
                            data.menuSize.height;
                        reverse = true;
                    } else {
                        y -= y + data.menuSize.height - data.boundary.bottom;
                    }
                }
            } else {
                ty = 0;
                // default top
                y = data.btnRect.top + data.scrollY - data.menuSize.height;
                y = getOffset(y, "y", "menu");
                //btn visible
                if (isBtnVisible() && y < data.boundary.top) {
                    if (
                        data.boundary.bottom -
                            (data.btnRect.bottom + data.scrollY) >=
                        data.menuSize.height
                    ) {
                        y = data.btnRect.bottom + data.scrollY;
                        reverse = true;
                    } else {
                        y += data.boundary.top - y;
                    }
                }
            }
            tx -= x;
            break;
    }
    tx = getOffset(tx, "x", "triangle");
    ty = getOffset(ty, "y", "triangle");

    return {
        x,
        y,
        tx,
        ty,
        reverse,
    };
};

export interface AutoPositionProps {
    btnRect: DOMRect;
    triangleSize: Outset;
    menuSize: { width: number; height: number };
    direction: "horizontal" | "vertical";
    placement: "lb" | "rb" | "cb" | "lt" | "rt" | "ct" | "rc" | "lc";
    offset: {
        menu?: OffsetProps;
        triangle?: OffsetProps;
    };
}

export function autoPosition({
    btnRect,
    triangleSize,
    menuSize,
    direction,
    placement,
    offset,
}: AutoPositionProps): {
    triangle: Outset;
    menu: Outset;
    reverse: boolean;
} {
    const hashScroll = {
        x: document.body.scrollWidth > document.body.offsetWidth,
        y: document.body.scrollHeight > document.body.offsetHeight,
    };
    const scrollData = getScrollValue();
    const boundary = {
        top: scrollData.y,
        right:
            scrollData.x +
            (hashScroll.y ? document.body.offsetWidth : window.innerWidth),
        bottom:
            scrollData.y +
            (hashScroll.x ? document.body.offsetHeight : window.innerHeight),
        left: scrollData.x,
    };

    staticData = {
        btnRect,
        triangleSize,
        menuSize,
        direction,
        placement,
        offset,
        scrollX: scrollData.x,
        scrollY: scrollData.y,
        boundary,
    };

    let tx = 0,
        ty = 0,
        mx = 0,
        my = 0,
        reverse = false;

    if (triangleSize[0] + triangleSize[1] > 0) {
        const trianglePosition = getTrianglePosition();
        tx = trianglePosition.x;
        ty = trianglePosition.y;

        const data = getRelativePoint(tx, ty);

        tx = data.tx;
        ty = data.ty;
        mx = data.x;
        my = data.y;
        reverse = data.reverse;
    } else {
        const data = getPoint();

        mx = data.x;
        my = data.y;
        reverse = data.reverse;
    }

    return {
        triangle: [tx, ty],
        menu: [mx, my],
        reverse: reverse,
    };
}
