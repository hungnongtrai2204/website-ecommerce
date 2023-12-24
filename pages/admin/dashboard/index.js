import Layout from "@/components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";
import User from "@/models/User";
import Order from "@/models/Order";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Product from "@/models/Product";
import Dropdown from "@/components/admin/dashboard/dropdown";
import Notifications from "@/components/admin/dashboard/notifications";
import { TbUsers } from "react-icons/tb";
import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";
import { io } from "socket.io-client";
import { useEffect } from "react";
export default function Dashboard({ users, orders, products }) {
  const { data: session } = useSession();
  useEffect(() => {
    const socket = io("http://localhost:5000");
    console.log(socket);
  }, []);
  return (
    <div>
      <Head>
        <title>Shop - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Tìm kiếm ở đây..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{users.length}</h4>
              <span>Người Dùng</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Đơn Đặt Hàng</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Sản Phẩm</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              <h4>
                +
                {orders
                  .reduce((a, val) => a + val.total, 0)
                  .toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
              </h4>
              <h5>
                -
                {orders
                  .filter((o) => !o.isPaid)
                  .reduce((a, val) => a + val.total, 0)
                  .toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                Chưa thanh toán.
              </h5>
              <span>Tổng Thu Nhập</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Những Đơn Đặt Hàng Gần Đây</h2>
              <Link href="/admin/dashboard/orders">Xem Tất Cả</Link>
            </div>
            <table>
              <thead>
                <td>Tên</td>
                <td>Tổng Cộng</td>
                <td>Thanh Toán</td>
                <td>Trạng Thái</td>
                <td>Xem</td>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order.user.name}</td>
                    <td>
                      {order.total.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      {order.isPaid ? (
                        <img src="../../../images/verified.webp" alt="" />
                      ) : (
                        <img src="../../../images/unverified1.png" alt="" />
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.status} ${
                          order.status == "Chưa Được Xử Lý"
                            ? styles.not_processed
                            : order.status == "Đang Xử Lý"
                            ? styles.processing
                            : order.status == "Đang Vận Chuyển"
                            ? styles.dispatched
                            : order.status == "Đã Hủy"
                            ? styles.cancelled
                            : order.status == "Đã Hoàn Thành"
                            ? styles.completed
                            : ""
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Người Dùng Gần Đây</h2>
              <Link href="/admin/dashboard/users">Xem Tất Cả</Link>
            </div>
            <table>
              <tbody>
                {users.map((user) => (
                  <tr>
                    <td className={styles.user}>
                      <div className={styles.user__img}>
                        <img src={user.image} alt="" />
                      </div>
                      <td>
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  const orders = await Order.find()
    .populate({ path: "user", model: User })
    .sort({ createdAt: -1 })
    .lean();
  const products = await Product.find().lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
