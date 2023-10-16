import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ShippingInput from "@/components/inputs/shippingInput";
import { applyCoupon } from "../../../requests/user";
import axios from "axios";
import { useRouter } from "next/router";
export default function Summary({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
}) {
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [order_error, setOrder_Error] = useState("");
  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Vui lòng nhập mã giảm giá trước!"),
  });
  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon);
    if (res.message) {
      setError(res.message);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError("");
    }
  };
  const placeOrderHanlder = async () => {
    try {
      if (paymentMethod == "") {
        setOrder_Error("Vui lòng chọn phương thức thanh toán.");
        return;
      } else if (!selectedAddress) {
        setOrder_Error("Vui lòng chọn địa chỉ giao hàng.");
        return;
      }
      const { data } = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
      });
      // Router.push(`/order/${data.order_id}`);
      router.push(`/order/${data.order_id}`);
    } catch (error) {
      setOrder_Error(error.response.data.message);
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Tổng Quan Đơn Hàng</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => {
            applyCouponHandler();
          }}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder="*Mã Giảm Giá"
                onChange={(e) => setCoupon(e.target.value)}
              />
              {error && <span className={styles.error}>{error}</span>}
              <button className={styles.apply_btn} type="submit">
                Áp Dụng
              </button>
              <div className={styles.infos}>
                <span>
                  Tổng cộng:{" "}
                  <b>
                    {cart.cartTotal.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </b>{" "}
                </span>
                {discount > 0 && (
                  <span className={styles.coupon_span}>
                    Mã giảm giá đã áp dụng : <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount < cart.cartTotal &&
                  totalAfterDiscount != "" && (
                    <span>
                      Giá mới :{" "}
                      <b>
                        {totalAfterDiscount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </b>
                    </span>
                  )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button className={styles.submit_btn} onClick={() => placeOrderHanlder()}>
        Đặt Hàng
      </button>
      {order_error && <span className={styles.error}>{order_error}</span>}
    </div>
  );
}
