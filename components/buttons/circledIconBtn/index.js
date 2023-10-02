import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./styles.module.scss";
export default function CircledIconBtn({ type, text, icon }) {
  return (
    <button type={type} className={styles.button}>
      {text}
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </div>
    </button>
  );
}
