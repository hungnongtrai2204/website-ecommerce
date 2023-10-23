import Create from "@/components/admin/categories/Create";
import List from "@/components/admin/categories/List";
import Layout from "@/components/admin/layout";
import Category from "@/models/Category";
import db from "@/utils/db";
import { useState } from "react";
export default function Categories({ categories }) {
  const [data, setData] = useState(categories);
  console.log(data);
  return (
    <Layout>
      <div>
        <Create setCategories={setData} />
        <List categories={data} setCategories={setData} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  db.connectDB();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
