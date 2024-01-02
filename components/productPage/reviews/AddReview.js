import { useEffect, useState } from "react";
import Select from "./Select";
import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import Images from "./Images";
import { useDispatch } from "react-redux";
import { hideDialog, showDialog } from "@/store/DialogSlice";
import DialogModal from "@/components/dialogModal";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadImages } from "@/requests/upload";
import axios from "axios";
import { ClipLoader } from "react-spinners";
export default function AddReview({ product, setReviews, orderId }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(hideDialog());
  // }, [dispatch]);
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [images, setImages] = useState([]);
  let uploaded_images = [];
  const handleSubmit = async () => {
    setLoading(true);
    let msgs = [];

    if (!size) {
      msgs.push({
        msg: "Vui lòng chọn một kích thước!",
        type: "error",
      });
    }
    if (!style) {
      msgs.push({
        msg: "Vui lòng chọn một phong cách!",
        type: "error",
      });
    }
    if (!fit) {
      msgs.push({
        msg: "Vui lòng chọn một phù hợp!",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Vui lòng thêm một đánh giá!",
        type: "error",
      });
    }
    if (!rating) {
      msgs.push({
        msg: "Vui lòng chọn một xếp hạng!",
        type: "error",
      });
    }
    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: "Lỗi thêm đánh giá!",
          msgs,
        })
      );
    } else {
      if (images.length > 0) {
        let temp = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = "reviews images";
        let formData = new FormData();
        formData.append("path", path);
        temp.forEach((img) => {
          formData.append("file", img);
        });
        uploaded_images = await uploadImages(formData);
      }
      const { data } = await axios.put(`/api/product/${product._id}/review`, {
        size,
        style,
        fit,
        rating,
        review,
        images: uploaded_images,
      });
      setReviews(data.reviews);
      setStyle("");
      setSize("");
      setFit("");
      setImages([]);
      setRating(0);
      setReview("");
      const res = await axios.put(`/api/order/${orderId}/changeIsReview`, {
        productId: product._id.toString(),
      });
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div className={styles.reviews__add}>
      <DialogModal />
      <div className={styles.reviews__add_wrap}>
        <div className={styles.flex} style={{ gap: "10px" }}>
          <Select
            property={size}
            text="Kích Thước"
            data={product.allSizes.filter((x) => x.size !== size)}
            handleChange={setSize}
          />
          <Select
            property={style}
            text="Phong Cách"
            data={product.colors.filter((x) => x !== style)}
            handleChange={setStyle}
          />
          <Select
            property={fit}
            text="Sản Phẩm phù hợp như thế nào"
            data={fits.filter((x) => x !== fit)}
            handleChange={setFit}
          />
        </div>
        <Images images={images} setImages={setImages} />
        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Viết đánh giá của bạn ở đây"
        />
        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          // precision={0.5}
          style={{ color: "#facf19", fontSize: "3rem" }}
        />
        <button
          disabled={loading}
          onClick={() => handleSubmit()}
          className={`${styles.login_btn} ${loading ? styles.disabled : ""}`}
        >
          Gửi Đánh Giá{" "}
          {loading && <ClipLoader loading={loading} color="#fff" />}
        </button>
      </div>
    </div>
  );
}
let fits = ["Bé", "Vừa Vặn", "Lớn"];
