import Layout from "@/components/admin/layout";
import styles from "../../../../styles/products.module.scss";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductCard from "@/components/admin/products/productCard";
export default function All({ products }) {
  console.log(products);
  return (
    <Layout>
      <div className={styles.header}>Tất Cả Sản Phẩm</div>
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDB();
  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDB();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
