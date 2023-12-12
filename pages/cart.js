import React, { useEffect, useState } from "react";
import styles from "../styles/cart.module.scss";
import Header from "@/components/cart/header";
import Empty from "@/components/cart/empty";
import { useDispatch, useSelector } from "react-redux";
import Product from "@/components/cart/product";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethods";
import ProductsSwiper from "@/components/productsSwiper";
import { women_swiper } from "@/data/home";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "@/requests/user";
import { emptyCart } from "@/store/cartSlice";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
export default function Cart() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));

  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setShippingFee(selected.reduce((a, c) => a + Number(c.shipping), 0));
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0));
    setTotal(
      selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
    );
  }, [selected]);
  const saveCartToDbHandler = async () => {
    if (session) {
      setLoading(true);
      const res = await saveCart(selected);
      dispatch(emptyCart());
      await router.push("/checkout");
      setLoading(false);
    } else {
      signIn();
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        {/* <ProductsSwiper products={women_swiper} /> */}
      </div>
    </>
  );
}
