import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Newsletter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>ĐĂNG KÝ NHẬN BẢN TIN CỦA CHÚNG TÔI</h3>
      <div className={styles.footer__flex}>
        <input type="text" placeholder="Địa Chỉ Email Của Bạn" />
        <button className={styles.btn_primary}>ĐĂNG KÝ</button>
      </div>
      <p>
        Bằng cách nhấp vào nút ĐĂNG KÝ, bạn đồng ý với{" "}
        <Link href="">Chính Sách Quyền Riêng Tư và Cookie của chúng tôi</Link>
      </p>
    </div>
  );
}
