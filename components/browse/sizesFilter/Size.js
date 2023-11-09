import styles from "../styles.module.scss";
import { useState } from "react";
export default function Size({ size }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.filter__sizes_size}>
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </div>
  );
}
