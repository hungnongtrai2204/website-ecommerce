import admin from "@/middleware/admin";
import auth from "@/middleware/auth";
import Category from "@/models/Category";
import db from "@/utils/db";
import { createRouter } from "next-connect";
import slugify from "slugify";
const router = createRouter().use(auth).use(admin);

router.post(async (req, res) => {
  try {
    const { name } = req.body;
    db.connectDB();
    const test = await Category.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Category already exist, Try a different name" });
    }
    await new Category({ name, slug: slugify(name) }).save();

    db.disconnectDB();
    res.json({
      message: `Danh mục ${name} đã được tạo thành công.`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
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
    await Category.findByIdAndRemove(id);
    db.disconnectDB();
    return res.json({
      message: "Danh mục đã được xoá thành công",
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    db.connectDB();
    await Category.findByIdAndUpdate(id, { name });
    db.disconnectDB();
    return res.json({
      message: "Danh mục đã được cập nhập thành công",
      categories: await Category.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router.handler();
