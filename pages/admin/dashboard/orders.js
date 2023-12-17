import Layout from "@/components/admin/layout";
import CollapsibleTable from "@/components/admin/orders/table";
import Order from "@/models/Order";
import User from "@/models/User";
import db from "@/utils/db";
import axios from "axios";
import { toast } from "react-toastify";

export default function orders({ orders }) {
  const changeStatusHandler = async (id, status) => {
    try {
      const res = await axios.put(`/api/order/${id}/changeStatus`, {
        status: status,
      });

      if (res.data.message === "Order is change status successfully.") {
        toast.success(
          `Cập nhập đơn hàng ${id} sang trạng thái ${status} thành công.`
        );
      }
    } catch (error) {}
  };
  return (
    <Layout>
      <CollapsibleTable rows={orders} onChangeStatus={changeStatusHandler} />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDB();
  const orders = await Order.find({})
    .populate({ path: "user", model: User, select: "name email image" })
    .sort({ createdAt: -1 })
    .lean();
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
