import { useState } from "react";
import styles from "./styles.module.scss";
import { IoArrowDown } from "react-icons/io5";
export default function TableSelect({ property, text, data, handleChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.select}>
      {text}:
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          background: `${
            text == "Phong Cách" && property?.color && `${property?.color}`
          }`,
        }}
      >
        <span
          className={`${styles.flex} ${styles.select__header_wrap}`}
          style={{ padding: "0 5px" }}
        >
          {text == "Đánh Giá" || text == "Kích Thước" || text == "Đặt Hàng" ? (
            property || `Lựa Chọn ${text}`
          ) : text == "Phong Cách" && property?.image ? (
            <img src={property?.image} alt="" />
          ) : (
            "Lựa Chọn Phong Cách"
          )}
          <IoArrowDown />
        </span>
        {visible && (
          <ul
            className={styles.select__header_menu}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{ width: text == "Đặt Hàng" && "200px" }}
          >
            {data.map((item, i) => {
              if (text == "Đánh Giá") {
                return (
                  <li key={i} onClick={() => handleChange(item.value)}>
                    <span>{item.text}</span>
                  </li>
                );
              }
              if (text == "Kích Thước") {
                return (
                  <li key={i} onClick={() => handleChange(item.size)}>
                    <span>{item.size}</span>
                  </li>
                );
              }
              if (text == "Phong Cách") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item)}
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    <span>
                      {item.image ? (
                        <img src={item.image} alt="" />
                      ) : (
                        "Tất Cả Phong Cách"
                      )}
                    </span>
                  </li>
                );
              }
              if (text == "Đặt Hàng") {
                return (
                  <li
                    style={{ width: text == "Đặt Hàng" && "200px" }}
                    key={i}
                    onClick={() => handleChange(item.value)}
                  >
                    <span>{item.text}</span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
