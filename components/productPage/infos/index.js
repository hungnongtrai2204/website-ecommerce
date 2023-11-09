import Rating from "@mui/material/Rating";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TbMinus, TbPlus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "./share";
import Accordian from "./Accordian";
import SimillarSwiper from "./SimillarSwiper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "@/store/cartSlice";
import { signIn, useSession } from "next-auth/react";
import { showDialog } from "@/store/DialogSlice";
import DialogModal from "@/components/dialogModal";

export default function Infos({ product, setActiveImg }) {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { cart } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    setSize("");
    setQty(1);
  }, [router.query.style]);
  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [router.query.size]);
  const addToCartHandler = async () => {
    if (!router.query.size) {
      setError("Vui lòng chọn một kích thước");
      return;
    }
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
    );
    if (qty > data.quantity) {
      setError(
        "Số lượng bạn đã chọn còn nhiều hơn số lượng có sẵn. Hãy thử và giảm số lượng"
      );
    } else if (data.quantity < 1) {
      setError("Sản phẩm này đã hết hàng");
      return;
    } else {
      let _uid = `${data._id}_${product.style}_${router.query.size}`;
      let exist = cart.cartItems.find((p) => p._uid === _uid);
      if (exist) {
        let newCart = cart.cartItems.map((p) => {
          if (p._uid == exist._uid) {
            return { ...p, qty: qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(
          addToCart({
            ...data,
            qty,
            size: data.size,
            _uid,
          })
        );
      }
    }
  };
  const handleWishlist = async () => {
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: product._id,
        style: product.style,
      });
      dispatch(
        showDialog({
          header: "Sản phẩm được thêm vào danh sách yêu thích thành công",
          msgs: [
            {
              msg: data.message,
              type: "success",
            },
          ],
        })
      );
    } catch (error) {
      dispatch(
        showDialog({
          header: "Lỗi danh sách yêu thích",
          msgs: [
            {
              msg: error.response.data.message,
              type: "error",
            },
          ],
        })
      );
    }
  };
  return (
    <div className={styles.infos}>
      <DialogModal />
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.name}</h1>
        <h2 className={styles.infos__sku}>{product.sku}</h2>
        <div className={styles.infos__rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.rating}
            // precision={0.5}
            readOnly
            style={{ color: "#FACF19" }}
          />
          ({product.numReviews} đánh giá)
        </div>
        <div className={styles.infos__price}>
          {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price}</h1>}
          {product.discount > 0 ? (
            <h3>
              {size && <span>{product.priceBefore}</span>}
              <span> (-{product.discount}%)</span>
            </h3>
          ) : (
            ""
          )}
        </div>
        <span className={styles.infos__shipping}>
          {product.shipping
            ? `+${product.shipping} Phí Vận Chuyển`
            : "Miễn Phí Vận Chuyển"}
        </span>
        <span>
          {size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          sản phẩm có sẵn.
        </span>
        <div className={styles.infos__sizes}>
          <h4>Chọn kích cỡ : </h4>
          <div className={styles.infos__sizes_wrap}>
            {product.sizes.map((size, i) => (
              <Link
                href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
              >
                <div
                  className={`${styles.infos__sizes_size} ${
                    i == router.query.size && styles.active_size
                  }`}
                  onClick={() => setSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.infos__colors}>
          {product.colors &&
            product.colors.map((color, i) => (
              <span
                className={i == router.query.style ? styles.active_color : ""}
                onMouseOver={() =>
                  setActiveImg(product.subProducts[i].images[0].url)
                }
                onMouseLeave={() => setActiveImg("")}
              >
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <img src={color.image} alt="" />
                </Link>
              </span>
            ))}
        </div>
        <div className={styles.infos__qty}>
          <button onClick={() => qty > 1 && setQty((pre) => pre - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button
            onClick={() => qty < product.quantity && setQty((pre) => pre + 1)}
          >
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button
            disabled={product.quantity < 1}
            style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
            onClick={() => addToCartHandler()}
          >
            <BsHandbagFill />
            <b>THÊM VÀO GIỎ HÀNG</b>
          </button>
          <button onClick={() => handleWishlist()}>
            <BsHeart />
            YÊU THÍCH
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        <Share />
        <Accordian details={[product.description, ...product.details]} />
        <SimillarSwiper />
      </div>
    </div>
  );
}
