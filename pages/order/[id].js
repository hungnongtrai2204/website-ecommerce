import Header from "@/components/header";
import styles from "../../styles/order.module.scss";
import axios from "axios";
import Order from "../../models/Order";
import User from "../../models/User";
import { IoIosArrowForward } from "react-icons/io";
import db from "@/utils/db";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useReducer } from "react";
import StripePayment from "@/components/stripePayment";
function reducer(state, action) {
  switch (action.type) {
    case "PAY_REQUEST":
      return { ...state, loading: true };
    case "PAY_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PAY_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_RESET":
      return { ...state, loading: false, success: false, error: false };
  }
}
export default function order({
  country,
  orderData,
  paypal_client_id,
  stripe_public_key,
}) {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [{ loading, error, success }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    if (!orderData._id || success) {
      if (success) {
        dispatch({
          type: "PAY_RESET",
        });
      }
    } else {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal_client_id,
          currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    }
  }, [order, success]);
  function createOrderHandler(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: (orderData.total / 24000).toFixed(2),
            },
          },
        ],
      })
      .then((order_id) => {
        return order_id;
      });
  }
  function onApproveHandler(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/order/${orderData._id}/pay`,
          details
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        window.location.reload(false);
      } catch (error) {
        dispatch({ type: "PAY_ERROR", payload: error });
      }
    });
  }
  function onErrorHandler(error) {
    console.log(error);
  }
  return (
    <>
      <Header country={country} />
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Trang Chủ <IoIosArrowForward /> Đơn Đặt Hàng{" "}
                <IoIosArrowForward /> Mã {orderData._id}
              </div>
              <div className={styles.order__header_status}>
                Tình Trạng Thanh Toán:{" "}
                {orderData.isPaid ? (
                  <img src="../../../images/verified.png" alt="" />
                ) : (
                  <img src="../../../images/unverified.png" alt="" />
                )}
              </div>
              <div className={styles.order__header_status}>
                Tình Trạng Đơn Hàng:{" "}
                <span
                  className={
                    orderData.status == "Chưa Được Xử Lý"
                      ? styles.not_processed
                      : orderData.status == "Đang Xử Lý"
                      ? styles.processing
                      : orderData.status == "Đã Gửi"
                      ? styles.dispatched
                      : orderData.status == "Đã Hủy"
                      ? styles.cancelled
                      : orderData.status == "Đã Hoàn Thành"
                      ? styles.completed
                      : ""
                  }
                >
                  {orderData.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {orderData.products.map((product) => (
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
                {orderData.couponApplied ? (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Tạm Tính</span>
                      <span>
                        {orderData.totalBeforeDiscount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                        Mã Giảm Giá Đã Áp Dụng{" "}
                        <em>({orderData.couponApplied})</em>{" "}
                      </span>
                      <span>
                        -
                        {(
                          orderData.totalBeforeDiscount - orderData.total
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
                        {orderData.taxPrice.toLocaleString("it-IT", {
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
                        {orderData.total.toLocaleString("it-IT", {
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
                        {orderData.taxPrice.toLocaleString("it-IT", {
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
                        {orderData.total.toLocaleString("it-IT", {
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
                  <img src={orderData.user.image} alt="" />
                  <div>
                    <span>{orderData.user.name}</span>
                    <span>{orderData.user.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Địa Chỉ Giao Hàng</h2>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Địa Chỉ Thanh Toán</h2>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div>
            </div>
            {!orderData.isPaid && (
              <div className={styles.order__payment}>
                {orderData.paymentMethod == "paypal" && (
                  <div>
                    {isPending ? (
                      <span>loading...</span>
                    ) : (
                      <PayPalButtons
                        createOrder={createOrderHandler}
                        onApprove={onApproveHandler}
                        onError={onErrorHandler}
                      ></PayPalButtons>
                    )}
                  </div>
                )}
                {orderData.paymentMethod == "credit_card" && (
                  <StripePayment
                    total={orderData.total}
                    order_id={orderData._id}
                    stripe_public_key={stripe_public_key}
                  />
                )}
                {/* {orderData.paymentMethod == "cash" && (
                  <div className={styles.cash}>cash</div>
                )} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  db.connectDB();
  const { query } = context;
  const id = query.id;
  const order = await Order.findById(id)
    .populate({ path: "user", model: User })
    .lean();
  let paypal_client_id = process.env.PAYPAL_CLIENT_ID;
  let stripe_public_key = process.env.STRIPE_PUBLIC_KEY;
  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });
  db.disconnectDB();
  return {
    props: {
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
      orderData: JSON.parse(JSON.stringify(order)),
      paypal_client_id,
      stripe_public_key,
    },
  };
};
