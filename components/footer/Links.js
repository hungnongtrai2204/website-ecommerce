import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul key={i}>
          {i === 0 ? (
            <img src="../../../logo.png" alt="" />
          ) : (
            <b>{link.heading}</b>
          )}
          {link.links.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

const links = [
  {
    heading: "SHOP",
    links: [
      {
        name: "Về chúng tôi",
        link: "",
      },
      {
        name: "Liên hệ chúng tôi",
        link: "",
      },
      {
        name: "Trách nhiệm xã hội",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "TRỢ GIÚP & HỖ TRỢ",
    links: [
      {
        name: "Thông tin vận chuyển",
        link: "",
      },
      {
        name: "Trả lại",
        link: "",
      },
      {
        name: "Đặt hàng như thế nào",
        link: "",
      },
      {
        name: "Cách theo dõi",
        link: "",
      },
      {
        name: "Hướng dẫn chọn kích thước",
        link: "",
      },
    ],
  },
  {
    heading: "Dịch vụ khách hàng",
    links: [
      {
        name: "Dịch vụ khách hàng",
        link: "",
      },
      {
        name: "Các điều khoản và điều kiện",
        link: "",
      },
      {
        name: "Người tiêu dùng (Giao dịch)",
        link: "",
      },
      {
        name: "Tham gia khảo sát phản hồi của chúng tôi",
        link: "",
      },
    ],
  },
];
