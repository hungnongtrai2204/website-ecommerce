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
import Order from "@/models/Order";
import { getSession } from "next-auth/react";

export default function product({ product, country, isReview, orderId }) {
  const [activeImg, setActiveImg] = useState("");
  console.log(orderId);
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
              <span> / {sub.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos product={product} setActiveImg={setActiveImg} />
          </div>
          <Reviews product={product} isReview={isReview} orderId={orderId} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });

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
    "subProducts.isDisabled": false, // Add this condition to filter out disabled products
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
  product.subProducts = product.subProducts.filter(
    (sub) => sub.isDisabled === false
  );
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
      ? `${(prices[0] - (prices[0] * subProduct.discount) / 100).toLocaleString(
          "it-IT",
          {
            style: "currency",
            currency: "VND",
          }
        )}`
      : `${prices[0].toLocaleString("it-IT", {
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
  let orders = await Order.find({ user: session?.user.id })
    .sort({
      createdAt: -1,
    })
    .lean();
  let isReview = false;
  let orderId;
  for (const order of orders) {
    if (order.status === "Đã Hoàn Thành") {
      for (const product of order.products) {
        // console.log(newProduct._id.toString(), product.product.toString());
        if (newProduct._id.toString() == product.product.toString()) {
          isReview = product.isReview;
          orderId = order._id.toString();
          console.log(orderId);
          break;
        }
      }
    }
  }
  console.log(orderId);
  db.disconnectDB();
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
      isReview: isReview,
      orderId: orderId || null,
    },
  };
}
