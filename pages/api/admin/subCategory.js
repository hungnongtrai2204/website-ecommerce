import admin from "@/middleware/admin";
import auth from "@/middleware/auth";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import db from "@/utils/db";
import { createRouter } from "next-connect";
import slugify from "slugify";
const router = createRouter().use(auth).use(admin);

router.post(async (req, res) => {
  try {
    const { name, parent } = req.body;
    db.connectDB();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }
    await new SubCategory({ name, parent, slug: slugify(name) }).save();

    db.disconnectDB();
    res.json({
      message: `Danh mục Phụ ${name} đã được tạo thành công.`,
      subCategories: await SubCategory.find({})
        .populate({ path: "parent", model: Category })
        .sort({ updatedAt: -1 }),
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
    await SubCategory.findByIdAndRemove(id);
    db.disconnectDB();
    return res.json({
      message: "Danh mục phụ đã được xoá thành công",
      subCategories: await SubCategory.find({})
        .populate({ path: "parent", model: Category })
        .sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;
    db.connectDB();
    await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name),
    });
    db.disconnectDB();
    return res.json({
      message: "Danh mục phụ đã được cập nhập thành công",
      subCategories: await SubCategory.find({})
        .populate({ path: "parent", model: Category })
        .sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get(async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.json([]);
    }
    db.connectDB();
    const results = await SubCategory.find({ parent: category }).select("name");
    db.disconnectDB();
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router.handler();
