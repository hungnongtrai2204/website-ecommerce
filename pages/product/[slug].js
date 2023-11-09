import db from "@/utils/db";
import styles from "../../styles/product.module.scss";
import Product from "../../models/Product";
import Head from "next/head";
import Header from "@/components/header";
import axios from "axios";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import MainSwiper from "@/components/productPage/mainSwiper";
import { useState } from "react";
import Infos from "@/components/productPage/infos";
import Reviews from "@/components/productPage/reviews";
import User from "@/models/User";

export default function product({ product, country }) {
  const [activeImg, setActiveImg] = useState("");
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country={country} />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Trang Chủ / {product.category.name}
            {product.subCategories.map((sub) => (
              <span>{sub.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos product={product} setActiveImg={setActiveImg} />
          </div>
          <Reviews product={product} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;
  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });
  db.connectDB();
  //------------

  let product = await Product.findOne({
    slug,
  })
    .populate({
      path: "category",
      model: Category,
    })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({
      path: "reviews.reviewBy",
      model: User,
    })
    .lean();
  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes.map((s) => s.price).sort((a, b) => a - b);
  const newProduct = {
    ...product,
    style,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => p.color),
    priceRange: subProduct.discount
      ? `Từ ${(
          prices[0] -
          (prices[0] * subProduct.discount) / 100
        ).toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })} đến ${(
          prices[prices.length - 1] -
          (prices[prices.length - 1] * subProduct.discount) / 100
        ).toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}`
      : `Từ ${prices[0].toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })} đến ${prices[prices.length - 1].toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}`,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            (subProduct.sizes[size].price * subProduct.discount) / 100
          ).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
        : subProduct.sizes[size].price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          }),
    priceBefore: subProduct.sizes[size].price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    }),
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: calculatePercentage("5"),
      },
      {
        percentage: calculatePercentage("4"),
      },
      {
        percentage: calculatePercentage("3"),
      },
      {
        percentage: calculatePercentage("2"),
      },
      {
        percentage: calculatePercentage("1"),
      },
    ],
    reviews: product.reviews.reverse(),
    allSizes: product.subProducts
      .map((p) => p.sizes)
      .flat()
      .sort((a, b) => a.size - b.size)
      .filter(
        (element, index, array) =>
          array.findIndex((el2) => el2.size === element.size) === index
      ),
  };

  //------------
  function calculatePercentage(num) {
    return (
      (product.reviews.reduce((a, review) => {
        return (
          a +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product.reviews.length
    ).toFixed(1);
  }
  db.disconnectDB();
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
    },
  };
}
