import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/react";
import AddReview from "./AddReview";
import Table from "./Table";
import { useState } from "react";

export default function Reviews({ product }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(product.reviews);
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        <h1>Đánh Giá Của Khách Hàng ({product.reviews.length})</h1>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Đánh Giá Trung Bình</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                // precision={0.5}
                readOnly
                style={{ color: "#FACF19" }}
              />
              {product.rating == 0 ? "Chưa có đánh giá." : product.rating}
            </div>
          </div>
          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div className={styles.reviews__stats_reviews_review}>
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - i}
                  readOnly
                  style={{ color: "#FACF19" }}
                />
                <div className={styles.bar}>
                  <div
                    className={styles.bar__inner}
                    style={{
                      width: `${rating.percentage}%`,
                    }}
                  ></div>
                </div>
                <span>
                  {rating.percentage && isNaN(rating.percentage)
                    ? 0
                    : rating.percentage}
                  %
                </span>
              </div>
            ))}
          </div>
        </div>
        {session ? (
          <AddReview product={product} setReviews={setReviews} />
        ) : (
          <button className={styles.login_btn} onClick={() => signIn()}>
            Đăng nhập để đánh giá sản phẩm
          </button>
        )}
        <Table
          reviews={reviews}
          allSizes={product.allSizes}
          colors={product.colors}
        />
      </div>
    </div>
  );
}
