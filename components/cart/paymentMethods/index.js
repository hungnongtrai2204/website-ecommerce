import styles from "./styles.module.scss";

export default function PaymentMethods() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Phương Thức Thanh Toán</h2>
      <div className={styles.images}>
        <img src="../../../images/payment/visa.webp" alt="" />
        <img src="../../../images/payment/mastercard.webp" alt="" />
        <img src="../../../images/payment/paypal.webp" alt="" />
      </div>
      <h2 className={styles.header}>Bảo Vệ Người Mua</h2>
      <div className={styles.protection}>
        <img src="../../../images/protection.png" alt="" />
        Được hoàn lại tiền đầy đủ nếu mặt hàng không như mô tả hoặc nếu mặt hàng
        không được giao.
      </div>
    </div>
  );
}
