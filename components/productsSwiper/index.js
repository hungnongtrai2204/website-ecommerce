import React from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import Link from "next/link";
export default function ProductsSwiper({ header, products, bg }) {
  return (
    <div className={styles.wrapper}>
      {header && (
        <div
          className={styles.header}
          style={{
            background: `${bg ? bg : ""}`,
          }}
        >
          {header}
        </div>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {products.map((product) => {
          const prices = product.subProducts[0]?.sizes
            .map((s) => s.price)
            .sort((a, b) => a - b);
          return (
            <SwiperSlide>
              <Link href={`/product/${product.slug}?style=${0}`}>
                <div className={styles.product}>
                  <div className={styles.product__img}>
                    <img src={product.subProducts[0].images[0].url} alt="" />
                  </div>
                  <div className={styles.product__infos}>
                    <h1>
                      {product.name.length > 29
                        ? `${product.name.slice(0, 29)}...`
                        : product.name}
                    </h1>
                    <span>
                      {prices.length === 1
                        ? `${prices[0].toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}`
                        : `${prices[0].toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })} - ${prices[prices.length - 1].toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}`}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
