/**
 * @file component
 * @date 2022-02-15
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the  necessary dependence for this tsx file */
import { useState, useRef } from "react";
import { Kite, Transition } from "./main";
import ReactDOM from "react-dom";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [tShow, setTShow] = useState(false);
    const [kShow, setKShow] = useState(false);
    const tRef = useRef<HTMLDivElement | null>(null);
    const kRef = useRef<HTMLDivElement | null>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div>
            <h1>预览界面</h1>
            <button
                onClick={() => {
                    setTShow((preVal) => {
                        return !preVal;
                    });
                }}
            >
                看transition点我
            </button>
            <Transition show={tShow} animationType="fade" ref={tRef}>
                过渡内容
            </Transition>

            <Kite
                handleGlobalClick={(status) => {
                    if (status.isBtn === false && status.isMenu === false) {
                        setKShow(false);
                    }
                }}
                ref={kRef}
                show={kShow}
                root={
                    <button
                        onClick={() => {
                            setKShow((preVal) => {
                                return !preVal;
                            });
                        }}
                    >
                        看kite点我
                    </button>
                }
            >
                Kite 内容
            </Kite>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
// export default Temp;

ReactDOM.render(<Temp />, document.getElementById("root"));
