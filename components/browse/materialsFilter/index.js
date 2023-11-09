import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";

export default function MaterialsFilter({
  materials,
  materialHandler,
  replaceQuery,
}) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  return (
    <div className={styles.filter}>
      <h3>
        Chất Liệu <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {materials.map((material, i) => {
            const check = replaceQuery("material", material);
            return (
              <label
                htmlFor={material}
                className={styles.filter__sizes_size}
                onClick={() => materialHandler(check.result)}
              >
                <input
                  type="checkbox"
                  name="material"
                  id={material}
                  checked={check.active}
                />
                <label htmlFor={material}>
                  {material.length > 12
                    ? `${material.substring(0, 12)}...`
                    : material}
                </label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
