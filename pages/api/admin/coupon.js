import admin from "@/middleware/admin";
import auth from "@/middleware/auth";
import Category from "@/models/Category";
import Coupon from "@/models/Coupon";
import db from "@/utils/db";
import { createRouter } from "next-connect";
import slugify from "slugify";
const router = createRouter().use(auth).use(admin);

router.post(async (req, res) => {
  try {
    const { coupon, discount, startDate, endDate } = req.body;
    db.connectDB();
    const test = await Coupon.findOne({ coupon });
    if (test) {
      return res
        .status(400)
        .json({ message: "Coupon already exist, Try a different coupon" });
    }
    await new Coupon({ coupon, discount, startDate, endDate }).save();

    db.disconnectDB();
    res.json({
      message: `Mã giảm giá ${coupon} đã được tạo thành công.`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDB();
    return res.status(500).json({ message: error.message });
  }
});

router.delete(async (req, res) => {
  try {
    const { id } = req.body;
    db.connectDB();
    await Coupon.findByIdAndRemove(id);
    db.disconnectDB();
    return res.json({
      message: "Mã giảm giá đã được xoá thành công",
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put(async (req, res) => {
  try {
    const { id, coupon, discount, startDate, endDate } = req.body;
    db.connectDB();
    await Coupon.findByIdAndUpdate(id, {
      coupon,
      discount,
      startDate,
      endDate,
    });
    db.disconnectDB();
    return res.json({
      message: "Mã giảm giá đã được cập nhập thành công",
      coupons: await Coupon.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router.handler();
