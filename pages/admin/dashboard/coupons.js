import Create from "@/components/admin/coupons/Create";
import List from "@/components/admin/coupons/List";
import Layout from "@/components/admin/layout";
import Coupon from "@/models/Coupon";
import db from "@/utils/db";
import { useState } from "react";
export default function Coupons({ coupons }) {
  const [data, setData] = useState(coupons);
  console.log(data);
  return (
    <Layout>
      <div>
        <Create setCoupons={setData} />
        <List coupons={data} setCoupons={setData} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  db.connectDB();
  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}
