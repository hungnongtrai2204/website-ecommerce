import Layout from "@/components/admin/layout";
import Button from "@/components/buttons/button";
import Area from "@/components/chart/Area";
import Line from "@/components/chart/Line";
import SparkLine from "@/components/chart/SparkLine";
import Stacked from "@/components/chart/Stacked";
import { SparklineAreaData } from "@/data/dummy";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "@/utils/db";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdOutlineSupervisorAccount } from "react-icons/md";

export default function sales({
  orders,
  totalOfMonth,
  totalUserOfMonth,
  percentUser,
  totalProductOfMonth,
  percentProduct,
  totalOrderOfMonth,
  percentOrder,
  totalOrderRefundOfMonth,
  percentOrderRefund,
  totalOrder,
}) {
  console.log(orders);
  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: totalUserOfMonth,
      percentage: percentUser,
      title: "Khách Hàng",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <BsBoxSeam />,
      amount: totalProductOfMonth,
      percentage: percentProduct,
      title: "Sản Phẩm",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <FiBarChart />,
      amount: totalOrderOfMonth,
      percentage: percentOrder,
      title: "Bán Hàng",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
    {
      icon: <HiOutlineRefresh />,
      amount: totalOrderRefundOfMonth,
      percentage: percentOrderRefund,
      title: "Hoàn Hàng",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
  ];
  return (
    <Layout>
      <div className="bg-main-bg">
        <div className="mt-12">
          <div className="flex flex-wrap lg:flex-nowrap justify-center">
            <div className="bg-white h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-400">Doanh Thu Tháng này</p>
                  <p className="text-2xl">
                    {totalOfMonth.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  color="white"
                  bgColor="#2f82ff"
                  text="Tải Xuống"
                  borderRadius="10px"
                  size="md"
                />
              </div>
            </div>
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
              {earningData.map((item) => (
                <div
                  key={item.title}
                  className="bg-white md:w-56 p-4 pt-9 rounded-2xl"
                >
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <p className="mt-3">
                    <span className="text-lg font-semibold">{item.amount}</span>
                    <span
                      className={`text-sm ${
                        item.percentage > 0 ? "text-green-600" : "text-red-600"
                      } ml-2`}
                    >
                      {item.percentage > 0 && "+"}
                      {item.percentage}%
                    </span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-10 flex-wrap justify-center">
            <div className="bg-white m-3 p-4 rounded-2xl md:w-780">
              <div className="flex justify-between">
                <p className="font-semibold text-xl">Cập Nhật Doanh Thu</p>
                <div className="flex items-center gap-4">
                  <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                    <span>
                      <GoDotFill />
                    </span>
                    <span>Chi Tiêu</span>
                  </p>
                  <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                    <span>
                      <GoDotFill />
                    </span>
                    <span>Ngân Sách</span>
                  </p>
                </div>
              </div>
              <div className="mt-10 flex gap-10 flex-wrap justify-center">
                <div className="border-r-1 border-color m-4 pr-10">
                  <div>
                    <p>
                      <span className="text-3xl font-semibold">
                        {totalOrder.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                        23%
                      </span>
                    </p>
                    <p className="text-gray-500 mt-1">Ngân Sách</p>
                  </div>
                  <div className="mt-8">
                    <p>
                      <span className="text-3xl font-semibold">$48,438</span>
                    </p>
                    <p className="text-gray-500 mt-1">Chi Tiêu</p>
                  </div>
                  <div className="mt-5">
                    <SparkLine
                      currentColor="#2f82ff"
                      id="line-sparkline"
                      type="Line"
                      height="80px"
                      width="250px"
                      data={SparklineAreaData}
                      color="#2f82ff"
                    />
                  </div>
                  <div className="mt-10">
                    <Button
                      color="white"
                      bgColor="#2f82ff"
                      text="Tải Xuống Báo Cáo"
                      borderRadius="10px"
                    />
                  </div>
                </div>
                <div>
                  <Stacked width="320px" height="360px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Line />
          <Area />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  db.connectDB();
  let orders = await Order.find().lean();
  let users = await User.find().lean();
  let products = await Product.find().lean();
  const today = new Date();
  let totalOfMonth = 0;
  let totalOrderOfMonth = 0;
  let totalOrderOfPreMonth = 0;
  let totalOrderRefundOfMonth = 0;
  let totalOrderRefundOfPreMonth = 0;
  let totalOrder = 0;
  for (const order of orders) {
    totalOrder += order.total;
    if (new Date(order.createdAt).getMonth() === today.getMonth()) {
      totalOfMonth += order.total;
      totalOrderOfMonth += 1;
      if (order.status == "Đã Hủy") {
        totalOrderRefundOfMonth += 1;
      }
    }
    if (new Date(order.createdAt).getMonth() === today.getMonth() - 1) {
      totalOrderOfPreMonth += 1;
      if (order.status == "Đã Hủy") {
        totalOrderRefundOfPreMonth += 1;
      }
    }
  }
  const percentOrder = (totalOrderOfMonth / totalOrderOfPreMonth) * 100 - 100;
  const percentOrderRefund =
    (totalOrderRefundOfMonth / totalOrderRefundOfPreMonth) * 100 - 100;
  let totalUserOfMonth = 0;
  let totalUserOfPreMonth = 0;
  for (const user of users) {
    if (
      new Date(user.createdAt).getMonth() === today.getMonth() &&
      user.role !== "admin"
    ) {
      totalUserOfMonth += 1;
    }
    if (
      new Date(user.createdAt).getMonth() === today.getMonth() - 1 &&
      user.role !== "admin"
    ) {
      totalUserOfPreMonth += 1;
    }
  }

  const percentUser = (totalUserOfMonth / totalUserOfPreMonth) * 100 - 100;

  let totalProductOfMonth = 0;
  let totalProductOfPreMonth = 0;
  for (const product of products) {
    if (new Date(product.createdAt).getMonth() === today.getMonth()) {
      totalProductOfMonth += 1;
    }
    if (new Date(product.createdAt).getMonth() === today.getMonth() - 1) {
      totalProductOfPreMonth += 1;
    }
  }
  const percentProduct =
    (totalProductOfMonth / totalProductOfPreMonth) * 100 - 100;

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      totalOfMonth,
      totalUserOfMonth,
      percentUser: isNaN(percentUser) ? 0 : percentUser.toFixed(0),
      totalProductOfMonth,
      percentProduct: isNaN(percentProduct) ? 0 : percentProduct.toFixed(0),
      totalOrderOfMonth,
      percentOrder: isNaN(percentOrder) ? 0 : percentOrder.toFixed(0),
      totalOrderRefundOfMonth,
      percentOrderRefund: isNaN(percentOrderRefund)
        ? 0
        : percentOrderRefund.toFixed(0),
      totalOrder,
    },
  };
};
