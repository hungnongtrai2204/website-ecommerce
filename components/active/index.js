import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function ActiveComponent({ onActive }) {
  return (
    <div className={styles.empty}>
      <img src="../../../images/empty.png" alt="" />
      <h1 className="font-bold text-3xl">XÁC THỰC TÀI KHOẢN</h1>
      <p className="text-sm">Vui lòng bấm nút xác nhận để xác thực tài khoản</p>
      <button
        className={`${styles.empty__btn} ${styles.empty__btn_v2}`}
        onClick={onActive}
      >
        XÁC NHẬN
      </button>
    </div>
  );
}
