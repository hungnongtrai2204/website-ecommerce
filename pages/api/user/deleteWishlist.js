import auth from "@/middleware/auth";
import User from "@/models/User";
import db from "@/utils/db";
import { createRouter } from "next-connect";

const router = createRouter().use(auth);

router.put(async (req, res) => {
  try {
    db.connectDB();
    const { product_id, style } = req.body;
    const user = await User.findById(req.user);

    const exist = user.wishlist.find(
      (x) => x.product == product_id && x.style == style
    );

    if (!exist) {
      return res.status(404).json({
        message: "Product not found in your wishlist.",
      });
    }

    await user.updateOne({
      $pull: {
        wishlist: {
          product: product_id,
          style,
        },
      },
    });

    db.disconnectDB();
    return res.status(200).json({
      message:
        "Sản phẩm đã được xóa thành công khỏi danh sách yêu thích của bạn.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
