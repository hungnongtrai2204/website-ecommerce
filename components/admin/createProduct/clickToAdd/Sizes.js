import { useState } from "react";
import styles from "./styles.module.scss";
import { sizesList } from "@/data/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

export default function Sizes({ sizes, product, setProduct }) {
  const [noSize, setNoSize] = useState(false);
  const handleSize = (i, e) => {
    const values = [...sizes];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, sizes: values });
  };
  const handleRemove = (i) => {
    if (sizes.length > 1) {
      const values = [...sizes];
      values.splice(i, 1);
      setProduct({ ...product, sizes: values });
    }
  };
  return (
    <div>
      <div className={styles.header}>Kích thước / Số lượng / Giá</div>
      <button
        type="reset"
        className={styles.click_btn}
        onClick={() => {
          if (!noSize) {
            let data = sizes.map((item) => {
              return {
                qty: item.qty,
                price: item.price,
              };
            });
            setProduct({ ...product, sizes: data });
          } else {
            let data = sizes.map((item) => {
              return {
                size: item.size || "",
                qty: item.qty,
                price: item.price,
              };
            });
            setProduct({ ...product, sizes: data });
          }
          setNoSize((prev) => !prev);
        }}
      >
        {noSize
          ? "Bấm vào nếu sản phẩm có kích thước"
          : "Bấm vào nếu sản phẩm không có kích thước"}
      </button>
      {sizes
        ? sizes.map((size, i) => (
            <div className={styles.clicktoadd} key={i}>
              <select
                name="size"
                value={noSize ? "" : size.size}
                disabled={noSize}
                style={{ display: `${noSize ? "none" : ""}` }}
                onChange={(e) => handleSize(i, e)}
              >
                <option value="">Chọn kích cỡ</option>
                {sizesList.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="qty"
                placeholder={
                  noSize ? "Số Lượng Sản Phẩm" : "Số Lương Kích Thước"
                }
                min={1}
                value={size.qty}
                onChange={(e) => handleSize(i, e)}
              />
              <input
                type="number"
                name="price"
                placeholder={noSize ? "Giá Sản Phẩm" : "Giá Kích Thước"}
                min={1}
                value={size.price}
                onChange={(e) => handleSize(i, e)}
              />
              {!noSize ? (
                <>
                  <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                  <BsFillPatchPlusFill
                    onClick={() => {
                      setProduct({
                        ...product,
                        sizes: [
                          ...sizes,
                          {
                            size: "",
                            qty: "",
                            price: "",
                          },
                        ],
                      });
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
    </div>
  );
}