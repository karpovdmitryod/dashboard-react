import React from "react"
import styles from "../Grid.module.scss"
import { useDispatch } from "react-redux";
import { changePosition } from "../slices/gridSlice";

const ChangeOrderElement: React.FC<{ cellId: string, onTop: boolean }> = ({
                                                            cellId, onTop
                                                          }) => {
  const dispatch = useDispatch();

  return (<div className={styles.changeOrderElement} onMouseUp={() => {
    console.log('change order')
    dispatch(changePosition({ cellId }));
  }}></div>)
};

export default ChangeOrderElement;