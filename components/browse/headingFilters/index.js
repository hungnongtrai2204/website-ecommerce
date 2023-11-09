import { Tooltip } from "@material-ui/core";
import styles from "./styles.module.scss";
import { AiTwotoneStar } from "react-icons/ai";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/router";
export default function HeadingFilters({
  priceHandler,
  multiPriceHandler,
  shippingHandler,
  replaceQuery,
  ratingHandler,
  sortHandler,
}) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const check = replaceQuery(
    "shipping",
    router.query.shipping == "0" ? false : "0"
  );
  const checkRating = replaceQuery("rating", "4");
  const sortQuery = router.query.sort || "";
  return (
    <div className={styles.filters}>
      <div className={styles.filters__price}>
        <span>Giá :</span>
        <input
          type="number"
          placeholder="thấp nhất"
          min="0"
          value={router.query.price?.split("_")[0] || ""}
          onChange={(e) => priceHandler(e.target.value, "min")}
        />
        <input
          type="number"
          placeholder="tối đa"
          min="0"
          value={router.query.price?.split("_")[1] || ""}
          onChange={(e) => priceHandler(e.target.value, "max")}
        />
      </div>
      <div className={styles.filters__priceBtns}>
        <Tooltip
          title={<h2>Tham khảo sản phẩm dưới 200.000đ</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(0, 200000)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "10%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Tham khảo sản phẩm từ 200.000đ đến 1.000.000đ</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(200000, 1000000)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "25%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Tham khảo sản phẩm từ 1.00.000đ đến 5.000.000đ</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(1000000, 5000000)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "50%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Tham khảo sản phẩm từ 5.00.000đ đến 10.000.000đ</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(5000000, 10000000)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "75%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Tham khảo sản phẩm có giá trên 10.000.000đ</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(10000000, "")}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "100%" }}></span>
          </button>
        </Tooltip>
      </div>
      <div
        className={styles.filters__shipping}
        onClick={() => shippingHandler(check.result)}
      >
        <input
          type="checkbox"
          name="shipping"
          id="shipping"
          checked={router.query.shipping == "0"}
        />
        <label htmlFor="shipping">Miễn Phí Vận Chuyển</label>
      </div>
      <div
        className={styles.filters__rating}
        onClick={() => ratingHandler(checkRating.result)}
      >
        <input
          type="checkbox"
          name="rating"
          id="rating"
          checked={router.query.rating == "4"}
        />
        <label htmlFor="rating">
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar /> & cao hơn
        </label>
      </div>
      <div className={styles.filters__sort}>
        <span>Sắp xếp theo</span>
        <div
          className={styles.filters__sort_list}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button>
            {sortQuery == ""
              ? "Gợi ý"
              : sortingOptions.find((x) => x.value == sortQuery).name}
            <div
              style={{ transform: `${show ? "rotate(180deg)" : "rotate(0)"}` }}
            >
              <IoIosArrowDown />
            </div>
          </button>
          <ul
            style={{
              transform: `${show ? "scale3d(1,1,1)" : "scale3d(1,0,1)"}`,
            }}
          >
            {sortingOptions.map((option, i) => (
              <li key={i} onClick={() => sortHandler(option.value)}>
                <a>
                  {sortQuery == option.value ? (
                    <b>{option.name}</b>
                  ) : (
                    option.name
                  )}{" "}
                  {sortQuery == option.value ? <BsCheckLg /> : ""}
                  {sortQuery !== option.value ? (
                    <div className={styles.check}>
                      <BsCheckLg />
                    </div>
                  ) : (
                    ""
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
const sortingOptions = [
  {
    name: "Gợi ý",
    value: "",
  },
  {
    name: "Phổ Biến Nhất",
    value: "popular",
  },
  {
    name: "Mới Cập Nhập",
    value: "newest",
  },
  {
    name: "Bán Chạy Nhất",
    value: "topSelling",
  },
  {
    name: "Đánh Giá Cao",
    value: "topReviewed",
  },
  {
    name: "Giá (thấp đến cao)",
    value: "priceLowToHigh",
  },
  {
    name: "Giá (cao đến thấp)",
    value: "priceHighToLow",
  },
];
