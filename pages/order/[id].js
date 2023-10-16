import Header from "@/components/header";
import styles from "../../styles/order.module.scss";
import axios from "axios";
import Order from "../../models/Order";
import { IoIosArrowForward } from "react-icons/io";
export default function order({ country, order }) {
  return (
    <>
      <Header country={country} />
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Trang Chủ <IoIosArrowForward /> Đơn Đặt Hàng{" "}
                <IoIosArrowForward /> Mã {order._id}
              </div>
              <div className={styles.order__header_status}>
                Tình Trạng Thanh Toán:{" "}
                {order.isPaid ? (
                  <img src="../../../images/verified.png" alt="" />
                ) : (
                  <img src="../../../images/unverified.png" alt="" />
                )}
              </div>
              <div className={styles.order__header_status}>
                Tình Trạng Đơn Hàng:{" "}
                <span
                  className={
                    order.status == "Chưa Được Xử Lý"
                      ? styles.not_processed
                      : order.status == "Đang Xử Lý"
                      ? styles.processing
                      : order.status == "Đã Gửi"
                      ? styles.dispatched
                      : order.status == "Đã Hủy"
                      ? styles.cancelled
                      : order.status == "Đã Hoàn Thành"
                      ? styles.completed
                      : ""
                  }
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {order.products.map((product) => (
                <div className={styles.product} key={product._id}>
                  <div className={styles.product__img}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.product__infos}>
                    <h1 className={styles.product__infos_name}>
                      {product.name.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name}
                    </h1>
                    <div className={styles.product__infos_style}>
                      <img src={product.color.image} alt="" /> / {product.size}
                    </div>
                    <div className={styles.product__infos_priceQty}>
                      {product.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                      x {product.qty}
                    </div>
                    <div className={styles.product__infos_total}>
                      {(product.price * product.qty).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.order__products_total}>
                {order.couponApplied ? (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Tạm Tính</span>
                      <span>
                        {order.totalBeforeDiscount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                        Mã Giảm Giá Đã Áp Dụng <em>({order.couponApplied})</em>{" "}
                      </span>
                      <span>
                        -
                        {(
                          order.totalBeforeDiscount - order.total
                        ).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>Thuế</span>
                      <span>
                        +
                        {order.taxPrice.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TỔNG SỐ PHẢI TRẢ</span>
                      <b>
                        {order.total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </b>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Thuế</span>
                      <span>
                        +
                        {order.taxPrice.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TỔNG SỐ PHẢI TRẢ</span>
                      <b>
                        {order.total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </b>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h1>Đơn Đặt Hàng Của Khách Hàng</h1>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_infos}>
                  <img src={order.user.image} alt="" />
                  <div>
                    <span>{order.user.name}</span>
                    <span>{order.user.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Địa Chỉ Giao Hàng</h2>
                <span>
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </span>
                <span>{order.shippingAddress.address1}</span>
                <span>{order.shippingAddress.address2}</span>
                <span>
                  {order.shippingAddress.state},{order.shippingAddress.city}
                </span>
                <span>{order.shippingAddress.zipCode}</span>
                <span>{order.shippingAddress.country}</span>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Địa Chỉ Thanh Toán</h2>
                <span>
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </span>
                <span>{order.shippingAddress.address1}</span>
                <span>{order.shippingAddress.address2}</span>
                <span>
                  {order.shippingAddress.state},{order.shippingAddress.city}
                </span>
                <span>{order.shippingAddress.zipCode}</span>
                <span>{order.shippingAddress.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { query } = context;
  const id = query.id;
  const order = await Order.findById(id).populate("user").lean();

  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};
