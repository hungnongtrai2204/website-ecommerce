import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { compareArrays } from "@/utils/arrays_utils";

export default function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState();
  useEffect(() => {
    const check = compareArrays(cartItems, selected);
    setActive(check);
  }, [selected]);
  const handleSelect = () => {
    if (selected.length !== cartItems.length) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };
  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Tổng quan sản phẩm({cartItems.length})</h1>
      <div className={styles.flex} onClick={() => handleSelect()}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
        ></div>
        <span>Chọn tất cả các sản phẩm</span>
      </div>
    </div>
  );
}
