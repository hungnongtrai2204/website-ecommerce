import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";

const router = createRouter();

router.get(async (req, res) => {
  try {
    db.connectDB();
    const id = req.query.id;
    if (id === "unkwon") {
      return res.json({});
    }
    const style = req.query.style || 0;
    const size = req.query.size || 0;
    const product = await Product.findById(id).lean();
    let discount = product.subProducts[style].discount;
    let priceBefore = product.subProducts[style].sizes[size].price;
    let price = discount
      ? priceBefore - (priceBefore * discount) / 100
      : priceBefore;
    db.disconnectDB();
    return res.json({
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProducts[style].sku,
      brand: product.brand,
      category: product.category,
      subCategories: product.subCategories,
      shipping: product.shipping,
      images: product.subProducts[style].images,
      color: product.subProducts[style].color,
      size: product.subProducts[style].sizes[size].size,
      price,
      priceBefore,
      quantity: product.subProducts[style].sizes[size].qty,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function updateQty(productId, sku, size, updateQty) {
  try {
    const result = await Product.updateOne(
      {
        _id: productId,
        "subProducts.sku": sku,
        "subProducts.sizes.size": size,
      },
      {
        $inc: {
          "subProducts.$.sizes.$[size].qty": -updateQty,
        },
      },
      {
        arrayFilters: [{ "size.size": size }],
      }
    );

    if (result.nModified === 0) {
      throw new Error("Product, SKU, or size not found");
    }

    console.log(`Qty updated successfully for SKU: ${sku} and size: ${size}`);
  } catch (error) {
    console.error(`Error updating qty: ${error.message}`);
    throw error;
  }
}

router.post(async (req, res) => {
  try {
    db.connectDB();
    const productId = req.query.id;

    const { sku, sizeToUpdate, updateQtyValue } = req.body;

    await updateQty(productId, sku, sizeToUpdate, updateQtyValue);

    db.disconnectDB();
    return res.json({
      message: "Update successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
