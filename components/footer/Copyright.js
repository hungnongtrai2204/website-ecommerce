import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";

export default function Copyright({ country }) {
  return (
    <div className={styles.footer__copyright}>
      <section>@2023 Bản quyền của Vũ Quốc Hùng.</section>
      <section>
        <ul>
          {data.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> {country.name}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

const data = [
  {
    name: "Trung Tâm Bảo Mật",
    link: "",
  },
  {
    name: "Chính Sách Quyền Riêng Tư & Cookie",
    link: "",
  },
  {
    name: "Quản Lý Cookies",
    link: "",
  },
  {
    name: "Điều Khoản Và Điều Kiện",
    link: "",
  },
  {
    name: "Thông Báo Bản Quyền",
    link: "",
  },
];
