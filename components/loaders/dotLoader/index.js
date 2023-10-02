import styles from "./styles.module.scss";
import React from "react";
import { DotLoader } from "react-spinners";
export default function DotLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
}
