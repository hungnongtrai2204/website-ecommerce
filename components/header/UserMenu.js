import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Chào mừng đến với SHOP !</h4>
      {session ? (
        <div className={styles.flex}>
          <img src={session.user.image} alt="" className={styles.menu__img} />
          <div className={styles.col}>
            <span>Chào Mừng Trở Lại,</span>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>Đăng xuất</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Đăng kí</button>
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Đăng nhập
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Tài Khoản</Link>
        </li>
        <li>
          <Link href="/profile/orders">Đơn Hàng Của Bạn</Link>
        </li>
        <li>
          <Link href="/profile/messages">Trung Tâm Tin Nhắn</Link>
        </li>
        <li>
          <Link href="/profile/address">Địa Chỉ</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Danh Sách Yêu Thích</Link>
        </li>
      </ul>
    </div>
  );
}
