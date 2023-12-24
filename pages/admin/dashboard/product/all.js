import Layout from "@/components/admin/layout";
import styles from "../../../../styles/products.module.scss";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductCard from "@/components/admin/products/productCard";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function All({ products, categories }) {
  const [category, setCategory] = useState("0");
  console.log("Category", products);

  const filterProduct =
    category === "0"
      ? products
      : products.filter((product) => product.category._id === category);
  return (
    <Layout>
      <div>
        <div className={styles.header}>Tất Cả Sản Phẩm</div>
      </div>
      <div className="flex justify-end mt-5">
        <label>Danh Mục: </label>
        <Select
          sx={{
            width: "300px",
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          // label="Danh Mục"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <MenuItem value="0">Tất cả</MenuItem>
          {categories.map((category) => (
            <MenuItem value={category._id} key={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {filterProduct.map((product) => (
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
  const categories = await Category.find().lean();

  await db.disconnectDB();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
