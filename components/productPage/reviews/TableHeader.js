import { useState } from "react";
import styles from "./styles.module.scss";
import TableSelect from "./TableSelect";

export default function TableHeader({ reviews, allSizes, colors }) {
  const [rating, setRating] = useState();
  const [size, setSize] = useState();
  const [style, setStyle] = useState();
  const [order, setOrder] = useState();
  return (
    <div className={styles.table__header}>
      <TableSelect
        property={rating}
        text="Đánh Giá"
        data={ratings.filter((x) => x.value !== rating)}
        handleChange={setRating}
      />
      <TableSelect
        property={size}
        text="Kích Thước"
        data={allSizes.filter((x) => x.size !== size)}
        handleChange={setSize}
      />
      <TableSelect
        property={style}
        text="Phong Cách"
        data={colors.filter((x) => x !== style)}
        handleChange={setStyle}
      />
      <TableSelect
        property={order}
        text="Đặt Hàng"
        data={orderOptions.filter((x) => x.value !== order)}
        handleChange={setOrder}
      />
    </div>
  );
}

const ratings = [
  {
    text: "Tất Cả",
    value: "",
  },
  {
    text: "5 sao",
    value: 5,
  },
  {
    text: "4 sao",
    value: 4,
  },
  {
    text: "3 sao",
    value: 3,
  },
  {
    text: "2 sao",
    value: 2,
  },
  {
    text: "1 sao",
    value: 1,
  },
];

const orderOptions = [
  {
    text: "Khuyến khích",
    value: "Khuyến khích",
  },
  {
    text: "Gần nhất đến cũ nhất",
    value: "Gần nhất đến cũ nhất",
  },
  {
    text: "Cũ nhất đến gần nhất",
    value: "Cũ nhất đến gần nhất",
  },
];
