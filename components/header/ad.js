import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
export default function Ad() {
  return (
    <Link href="/browse">
      <div className={styles.ad}></div>
    </Link>
  );
}
