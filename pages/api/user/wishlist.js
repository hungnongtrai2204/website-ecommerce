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
    if (exist) {
      return res.status(400).json({
        message: "Sản phẩm đã tồn tại trong danh sách mong muốn của bạn.",
      });
    }
    await user.updateOne({
      $push: {
        wishlist: {
          product: product_id,
          style,
        },
      },
    });
    db.disconnectDB();
    return res.status(200).json({
      message:
        "Sản phẩm đã được thêm thành công vào danh sách yêu thích của bạn.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
