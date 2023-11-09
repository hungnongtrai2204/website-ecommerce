import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";

export default function BrandsFilter({ brands, brandHandler, replaceQuery }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  return (
    <div className={styles.filter}>
      <h3>
        Thương Hiệu <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => {
            const check = replaceQuery("brand", brand);
            return (
              <button
                className={`${styles.filter__brand} ${
                  check.active ? styles.activeFilter : ""
                }`}
                onClick={() => brandHandler(check.result)}
              >
                <img
                  src={`../../../images/brands/${brand.toLowerCase()}.png`}
                  alt=""
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
