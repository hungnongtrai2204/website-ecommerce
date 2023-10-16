import styles from "./styles.module.scss";

export default function Products({ cart }) {
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h1>Giỏ Hàng</h1>
        <span>{cart.products.length} sản phẩm</span>
      </div>
      <div className={styles.products__wrap}>
        {cart.products.map((product) => (
          <div className={styles.product}>
            <div className={styles.product__img}>
              <img src={product.image} alt="" />
              <div className={styles.product__infos}>
                <img src={product.color.image} alt="" />
                <span>{product.size}</span>
                <span>x{product.qty}</span>
              </div>
            </div>
            <div className={styles.product__name}>
              {product.name.length > 18
                ? `${product.name.substring(0, 18)}...`
                : product.name}
            </div>
            <div className={styles.product__price}>
              {(product.price * product.qty).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.products__total}>
        Tổng Cộng :{" "}
        <b>
          {cart.cartTotal.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </b>
      </div>
    </div>
  );
}
