import Layout from "@/components/profile/layout";
import Order from "@/models/Order";
import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/profile.module.scss";
import { ordersLinks } from "@/data/profile";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import slugify from "slugify";
export default function index({ user, tab, country, orders }) {
  const router = useRouter();
  return (
    <Layout session={user.user} tab={tab} country={country}>
      <Head>
        <title>Đơn Đặt Hàng</title>
      </Head>
      <div className={styles.orders}>
        <div className={styles.header}>
          <h1>ĐƠN HÀNG CỦA TÔI</h1>
        </div>
        <nav>
          <ul>
            {ordersLinks.map((link, i) => (
              <li
                key={i}
                className={
                  slugify(link.value, { lower: true }) ==
                  router.query.q?.split("__")[0]
                    ? styles.active
                    : ""
                }
              >
                <Link
                  href={`/profile/orders?tab=${tab}&q=${slugify(link.value, {
                    lower: true,
                  })}__${link.filter}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <table>
          <thead>
            <tr>
              <td>Mã Đơn Hàng</td>
              <td>Sản Phẩm</td>
              <td>Phương Thức Thanh Toán</td>
              <td>Tổng Cộng</td>
              <td>Thanh Toán</td>
              <td>Trạng Thái</td>
              <td>Xem</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td className={styles.orders__images}>
                  {order.products.map((p) => (
                    <img src={p.image} key={p._id} alt="" />
                  ))}
                </td>
                <td>
                  {order.paymentMethod == "paypal"
                    ? "Paypal"
                    : order.paymentMethod == "credit_card"
                    ? "Thẻ Tín Dụng"
                    : "COD"}
                </td>
                <td>
                  {order.total.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className={styles.orders__paid}>
                  {order.isPaid ? (
                    <img src="../../../images/verified.png" alt="" />
                  ) : (
                    <img src="../../../images/unverified.png" alt="" />
                  )}
                </td>
                <td>{order.status}</td>
                <td>
                  <Link href={`/order/${order._id}`}>
                    <FiExternalLink />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  const filter = query.q.split("__")[1];
  let orders = [];
  if (!filter) {
    orders = await Order.find({ user: session?.user.id })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter == "paid") {
    orders = await Order.find({ user: session?.user.id, isPaid: true })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter == "unpaid") {
    orders = await Order.find({ user: session?.user.id, isPaid: false })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else {
    orders = await Order.find({ user: session?.user.id, status: filter })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      user: session,
      tab,
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
