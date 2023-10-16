import { useState } from "react";
import styles from "./styles.module.scss";
import { IoArrowDown } from "react-icons/io5";
export default function Select({ property, text, data, handleChange }) {
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
            text == "Phong Cách" && property.color && `${property.color}`
          }`,
        }}
      >
        <span
          className={`${styles.flex} ${styles.select__header_wrap}`}
          style={{ padding: "0 5px" }}
        >
          {text == "Kích Thước" ? (
            property || `Lựa Chọn ${text}`
          ) : text == "Phong Cách" && property.image ? (
            <img src={property.image} alt="" />
          ) : text == "Sản Phẩm phù hợp như thế nào" && property ? (
            property
          ) : !property && text == "Sản Phẩm phù hợp như thế nào" ? (
            "Sản Phẩm phù hợp như thế nào"
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
          >
            {data.map((item, i) => {
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
                      <img src={item.image} alt="" />
                    </span>
                  </li>
                );
              }
              if (text == "Sản Phẩm phù hợp như thế nào") {
                return (
                  <li key={i} onClick={() => handleChange(item)}>
                    <span>{item}</span>
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
