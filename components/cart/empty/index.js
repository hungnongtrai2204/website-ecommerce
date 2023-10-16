import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src="../../../images/empty.png" alt="" />
      <h1>Giỏ hàng trống</h1>
      {!session && (
        <button onClick={() => signIn()} className={styles.empty__btn}>
          ĐĂNG NHẬP / ĐĂNG KÝ
        </button>
      )}
      <Link href="/browse">
        <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
          MUA NGAY
        </button>
      </Link>
    </div>
  );
}
