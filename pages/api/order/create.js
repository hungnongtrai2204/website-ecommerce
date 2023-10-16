import { createRouter } from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";
import auth from "@/middleware/auth";
import Order from "@/models/Order";
const router = createRouter();

router.use(auth).post(async (req, res) => {
  try {
    db.connectDB();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const user = await User.findById(req.user);
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();
    db.disconnectDB();
    return res.json({
      order_id: newOrder._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
