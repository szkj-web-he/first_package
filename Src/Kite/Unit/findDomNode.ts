/**
 * @file abc
 * @date 2021-12-10
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-10
 */

export type WorkTag =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24;

export interface Fiber {
    tag: WorkTag;
    key: null | string;
    elementType: unknown;
    type: unknown;
    stateNode: unknown;
    return: Fiber | null;
    child: Fiber | null;
    sibling: Fiber | null;
    index: number;
    ref: unknown;
    pendingProps: unknown;
    memoizedProps: unknown;
    updateQueue: number;
    memoizedState: unknown;
    dependencies: unknown | null;
    mode: number;
    flags: number;
    subtreeFlags: number;
    deletions: Array<Fiber> | null;
    nextEffect: Fiber | null;
    firstEffect: Fiber | null;
    lastEffect: Fiber | null;
    lanes: number;
    childLanes: number;
    alternate: Fiber | null;
    actualDuration?: number;
    actualStartTime?: number;
    selfBaseDuration?: number;
    treeBaseDuration?: number;
}

/**
 *
 * @param { ReactElement} component
 * @param {string} id
 * @param {string} displayName
 * @returns { HTMLElement[] | undefined}
 */
export const fiberKey = "__reactFiber$";

export const findDomFn = (
    node: HTMLElement,
    id: string,
    displayName: string
): boolean => {
    const keys = Object.keys(node);
    const key = keys.find((item) => item.includes(fiberKey));

    if (key) {
        let fiber: Fiber | null = ((node as unknown) as Record<string, Fiber>)[
            key
        ];
        let status = false;

        while (fiber && !status) {
            const fnc = fiber.type as { displayName?: string; name?: string };
            const name = fnc?.displayName || fnc?.name;

            if (
                fiber.type &&
                name === displayName &&
                ((fiber.pendingProps as { id?: string }).id === id ||
                    (fiber.memoizedProps as { id?: string }).id === id)
            ) {
                status = true;
            } else {
                fiber = fiber.return;
            }
        }
        return status;
    } else {
        return false;
    }
};
