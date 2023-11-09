import Layout from "@/components/admin/layout";
import CollapsibleTable from "@/components/admin/orders/table";
import Order from "@/models/Order";
import User from "@/models/User";
import db from "@/utils/db";

export default function orders({ orders }) {
  console.log(orders);
  return (
    <Layout>
      <CollapsibleTable rows={orders} />
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
