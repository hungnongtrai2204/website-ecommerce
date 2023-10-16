import styles from "./styles.module.scss";

export default function Checkout({
  subtotal,
  shippingFee,
  total,
  selected,
  saveCartToDbHandler,
}) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>Tổng Quan Đơn Hàng</h2>
      <div className={styles.cart__checkout_line}>
        <span>Tạm Tính</span>
        <span>
          {subtotal.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Phí Vận Chuyển</span>
        <span>
          +
          {shippingFee.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Tổng Cộng</span>
        <span>
          {total.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={selected.length == 0}
          style={{
            background: `${selected.length == 0 ? "#eee" : ""}`,
            cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
          }}
          onClick={() => saveCartToDbHandler()}
        >
          Tiếp Tục
        </button>
      </div>
    </div>
  );
}
