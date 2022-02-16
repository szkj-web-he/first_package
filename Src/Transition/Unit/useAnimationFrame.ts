/**
 * @file useAnimationFrame
 * @date 2021-06-24
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-24
 */

/**
 *
 * @param { () => void } fn
 * @param {{ current: number | null }} timer
 * @param { number } delay
 * @returns {Promise<void> }
 */
export const nextFrame = (
    fn: () => void,
    timer: { current: number | null },
    delay = 1
): Promise<void> => {
    let count = 0;
    const clock = (frameFn: typeof fn) => {
        timer.current && window.cancelAnimationFrame(timer.current);
        timer.current = window.requestAnimationFrame(() => {
            ++count;
            if (count >= delay) {
                frameFn();
            } else {
                clock(frameFn);
            }
        });
    };
    return new Promise<void>((resolve) => {
        clock(() => {
            fn();
            resolve();
        });
    });
};

export const delayFn = (
    fn: () => void,
    timer: { current: number | null },
    ms = 1
): Promise<void> => {
    const clock = (frameFn: typeof fn) => {
        timer.current && window.clearTimeout(timer.current);
        timer.current = window.setTimeout(frameFn, ms);
    };

    return new Promise<void>((resolve) => {
        clock(() => {
            fn();
            resolve();
        });
    });
};
