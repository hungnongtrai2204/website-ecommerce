import User from "@/models/User";
import { getSession } from "next-auth/react";
import axios from "axios";
import Layout from "@/components/profile/layout";
import styles from "../../styles/profile.module.scss";
import Product from "@/components/wishlist/product";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { showDialog } from "@/store/DialogSlice";
import DialogModal from "@/components/dialogModal";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export default function WishList({ user, tab, country }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState(user.wishlist); // Initialize state

  const removeProduct = async (id, style) => {
    // let newCart = cart.cartItems.filter((p) => p._uid != id);
    // dispatch(updateCart(newCart));
    console.log(id, style);
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put("/api/user/deleteWishlist", {
        product_id: id,
        style: style,
      });
      const newWishlist = wishlist.filter(
        (product) => !(product.product._id === id && product.style === style)
      );
      setWishlist(newWishlist);
      dispatch(
        showDialog({
          header: "Sản phẩm được xoá khỏi danh sách yêu thích thành công",
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
    <Layout session={user} tab={tab} country={country}>
      <DialogModal />

      <div className={styles.header}>
        <h1>DANH SÁCH YÊU THÍCH CỦA TÔI</h1>
      </div>
      <div className={styles.cart__products}>
        {wishlist.map((product) => (
          <Product
            product={product.product.subProducts[product.style]}
            name={product.product.name}
            style={product.style}
            slug={product.product.slug}
            key={product.product._id}
            id={product.product._id}
            selected={false}
            setSelected={() => {}}
            onRemove={removeProduct}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });

  const user = await User.findById(session.user.id)
    .populate({
      path: "wishlist",
      populate: {
        path: "product", // assuming 'product' is a reference to another schema
      },
    })
    .lean();

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      tab,
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
    },
  };
}
