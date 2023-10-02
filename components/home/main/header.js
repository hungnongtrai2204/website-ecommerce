import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">Thời Trang Nam</Link>
        </li>
        <li>
          <Link href="">Thiết Bị Điện Tử</Link>
        </li>
        <li>
          <Link href="">Đồng Hồ</Link>
        </li>
      </ul>
    </div>
  );
}
