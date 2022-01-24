/**
 * @file mount
 * @date 2022-01-10
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-10
 */
import styles from "../style.module.scss";

export const mountElement = (el?: Element) => {
    if (el) {
        return el;
    } else {
        let node = document.querySelector("body > div[class*=r_portal]");
        if (node) {
            return node;
        } else {
            node = document.createElement("div");
            node.setAttribute("class", styles.r_portal);
            document.body.appendChild(node);
            return node;
        }
    }
};
