import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [subProducts, setSubProducts] = useState(
    product.subProducts.filter((sub) => sub.isDisabled === false)
  );

  const disableHandler = async (sku) => {
    try {
      const { data } = await axios.put(`/api/product/${product._id}/disable`, {
        sku: sku,
        isDisabled: true,
      });
      setSubProducts((prevSubProducts) =>
        prevSubProducts
          .map((sub) => (sub.sku === sku ? { ...sub, isDisabled: true } : sub))
          .filter((sub) => sub.isDisabled === false)
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.product}>
      <h1 className={`${styles.product__name} font-bold`}>{product.name}</h1>
      <h2 className={styles.product__category}>#{product.category.name}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        style={{ padding: "5px 0 5px 5px" }}
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
        {subProducts.map((p, i) => (
          <SwiperSlide>
            <div className={styles.product__item}>
              <div className={styles.product__item_img}>
                <img src={p.images[0].url} alt="" />
              </div>
              <div className={styles.product__actions}>
                <Link
                  href={`/admin/dashboard/product/${product._id}?style=${i}`}
                >
                  <TbEdit />
                </Link>
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <AiOutlineEye
                    style={{
                      fill: "#6cc070",
                    }}
                  />
                </Link>
                <div onClick={() => disableHandler(p.sku)}>
                  <RiDeleteBin2Line
                    style={{
                      fill: "#ed4337",
                    }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
