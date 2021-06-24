import React, { useCallback, useEffect, useRef } from "react"
import styles from "../Grid.module.scss"
import classNames from "classnames";

const UngroupArea: React.FC<{ cellId: string }> = ({ cellId }) => {

  const ref = useRef<HTMLDivElement>(null);

  const handleMouseClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    console.log('clicked for ungroup');
  }, []);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    ref.current.addEventListener("mousedown", handleMouseClick);

  }, [ ref, ref.current ]);

  return (<div className={classNames(styles.ungroupElement, styles.onTop)} ref={ref}></div>)
};

export default UngroupArea;