import { BsHeart } from "react-icons/bs";
import styles from "./styles.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Product({
  product,
  selected,
  setSelected,
  name,
  style,
  slug,
  id,
  onRemove,
}) {
  // const { cart } = useSelector((state) => ({ ...state }));

  const [active, setActive] = useState();
  console.log(product);
  // useEffect(() => {
  //   const check = selected.find((p) => p._uid == product._uid);
  //   setActive(check);
  // }, [selected]);

  const removeProduct = async () => {
    onRemove(id, style);
  };
  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((p) => p._uid !== product._uid));
    } else {
      setSelected([...selected, product]);
    }
  };
  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src="../../../images/store.webp" alt="" />
        Shop Cửa Hàng Chính Hãng
      </div>
      <div className={styles.product__image}>
        <div
          // className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={() => handleSelect()}
        ></div>
        <Link href={`/product/${slug}?style=${style}`}>
          <img src={product.images[0].url} alt="" />
        </Link>
        <div className={styles.col}>
          <div className={styles.grid}>
            <Link href={`/product/${slug}?style=${style}`}>
              <h1>{name > 30 ? `${name.substring(0, 30)}` : name}</h1>
            </Link>

            {/* <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div> */}
            <div style={{ zIndex: "2" }} onClick={removeProduct}>
              <AiOutlineDelete />
            </div>
          </div>
          <div className={styles.product__style}>
            <img src={product.color.image} alt="" />
            {product.size && <span>{product.size}</span>}
            {product.price && (
              <span>
                {product.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            )}
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                {product.sizes[style].price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  {product.priceBefore.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              )}
              {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )}
            </div>
            <div className={styles.product__priceQty_qty}>
              {/* <button
                disabled={product.qty < 2}
                onClick={() => updateQty("minus")}
              >
                -
              </button>
              <span>{product.qty}</span>
              <button
                disabled={product.qty == product.quantity}
                onClick={() => updateQty("plus")}
              >
                +
              </button> */}
            </div>
          </div>
          <div className={styles.product__shipping}>
            {product.shipping
              ? `+${product.shipping} phí vận chuyển`
              : "Miễn phí vận chuyển"}
          </div>
          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              Sản phẩm này đã hết hàng, hãy thêm vào danh sách yêu thích của
              bạn, sản phẩm này có thể sẽ được bổ sung thêm.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
