import { createRouter } from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";
import auth from "@/middleware/auth";
import Coupon from "@/models/Coupon";
const router = createRouter();

router.post(async (req, res) => {
  try {
    db.connectDB();
    const { coupon, startDate, endDate, discount } = req.body;
    const test = await Coupon.findOne({ coupon });
    if (test) {
      return res.status(400).json({
        message: "This Coupon name already exists, try with a different name.",
      });
    }
    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();
    db.disconnectDB();
    return res.json({
      message: "Coupon created successfully !",
      coupons: await Coupon.find({}),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
