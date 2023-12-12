import styles from "../styles/page.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "../components/home/main";
import FlashDeals from "../components/home/flashDeals";
import Category from "../components/home/category";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "../data/home";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "../components/productsSwiper";
import db from "@/utils/db";
import Product from "@/models/Product";
import ProductCard from "@/components/productCard";

export default function Home({ country, products, productMenFashion }) {
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width: 850px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  console.log(productMenFashion);
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />

          <ProductsSwiper
            products={productMenFashion}
            header="Thời Trang Nam"
            bg="#2f82ff"
          />
          <div className={styles.home__category}>
            <Category
              header="Váy Đầm"
              products={women_dresses}
              background="#2f82ff"
            />
            {!isMedium && (
              <Category
                header="Giày / Giày Cao Gót"
                products={women_shoes}
                background="#2f82ff"
              />
            )}
            {isMobile && (
              <Category
                header="Giày / Giày Cao Gót"
                products={women_shoes}
                background="#2f82ff"
              />
            )}
            <Category
              header="Phụ Kiện"
              products={women_accessories}
              background="#2f82ff"
            />
          </div>
          {/* <ProductsSwiper
            products={gamingSwiper}
            header="Dành Cho Game Thủ"
            bg="#2f82ff"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="Cải Tạo Nhà"
            bg="#5a31f4"
          /> */}
          {/* <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div> */}
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export const getServerSideProps = async () => {
  db.connectDB();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let productMenFashion = await Product.find({
    category: "62cfeb1e119f0cd432b478d6",
  });
  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
      products: JSON.parse(JSON.stringify(products)),
      productMenFashion: JSON.parse(JSON.stringify(productMenFashion)),
    },
  };
};
