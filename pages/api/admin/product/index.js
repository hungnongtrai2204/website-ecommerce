import admin from "@/middleware/admin";
import auth from "@/middleware/auth";
import Product from "@/models/Product";
import db from "@/utils/db";
import { createRouter } from "next-connect";
import slugify from "slugify";
const router = createRouter().use(auth).use(admin);

router.post(async (req, res) => {
  try {
    db.connectDB();

    if (req.body.parent) {
      const parent = await Product.findById(req.body.parent);
      if (!parent) {
        return res.status(400).json({
          message: "Parent product not found !",
        });
      } else {
        const newParent = await parent.updateOne(
          {
            $push: {
              subProducts: {
                sku: req.body.sku,
                color: req.body.color,
                images: req.body.images,
                sizes: req.body.sizes,
                discount: req.body.discount,
              },
            },
          },
          { new: true }
        );
        res.status(200).json({ message: "Sản phẩm con được tạo thành công." });
      }
    } else {
      const tempColor = req.body.color.image;
      req.body.slug = slugify(req.body.name);
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        details: req.body.details,
        questions: req.body.questions,
        slug: req.body.slug,
        category: req.body.category,
        subCategories: req.body.subCategories,
        subProducts: [
          {
            sku: req.body.sku,
            color: {
              image: tempColor,
              color: req.body.color.color,
            },
            images: req.body.images,
            sizes: req.body.sizes,
            discount: req.body.discount,
          },
        ],
      });
      await newProduct.save();
      res.status(200).json({ message: "Sản phẩm được tạo thành công." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put(async (req, res) => {
  try {
    const { id, style } = req.body;
    console.log(req.body);
    db.connectDB();
    const product = await Product.findById(id); // Find the product by ID
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.brand) product.brand = req.body.brand;
    if (req.body.sku) {
      product.subProducts[style].sku = req.body.sku;
    }
    if (req.body.discount) {
      product.subProducts[style].discount = req.body.discount;
    }
    if (req.body.images) {
      product.subProducts[style].images = req.body.images;
    }
    if (req.body.description_images) {
      product.subProducts[style].description_images =
        req.body.description_images;
    }
    if (req.body.category) product.category = req.body.category;
    if (req.body.subCategories) product.subCategories = req.body.subCategories;
    if (req.body.color) {
      product.subProducts[style].color = req.body.color;
    }
    if (req.body.sizes) {
      product.subProducts[style].sizes = req.body.sizes;
    }
    if (req.body.details) product.details = req.body.details;
    if (req.body.questions) product.questions = req.body.questions;
    await product.save();

    db.disconnectDB();
    res.status(200).json({ message: "Sản phẩm được cập nhập thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router.handler();
