import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";

const router = createRouter();

router.put(async (req, res) => {
  try {
    db.connectDB();

    const productId = req.query.id;
    const sku = req.body.sku; // Assuming you send sku in the request body
    const isDisabled = req.body.isDisabled; // Assuming you send isDisabled in the request body

    // Find the product by ID
    const product = await Product.findById(productId);
    console.log(productId, sku);
    // Find the subProduct with the specified SKU
    const subProduct = product.subProducts.find((sub) => sub.sku === sku);

    // Update the isDisabled field for the specific subProduct
    if (subProduct) {
      subProduct.isDisabled = isDisabled;
    } else {
      return res.status(404).json({ message: "SubProduct not found" });
    }

    // Save the updated product to the database
    await product.save();

    db.disconnectDB();

    return res.json({
      message: "Xóa sản phẩm thành công",
      productId: product._id,
      sku,
      isDisabled,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
