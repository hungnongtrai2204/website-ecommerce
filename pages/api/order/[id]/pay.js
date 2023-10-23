import { createRouter } from "next-connect";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import Order from "@/models/Order";
const router = createRouter();

router.use(auth).put(async (req, res) => {
  console.log("hello from api");
  await db.connectDB();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const newOrder = await order.save();
    await db.disconnectDB();
    res.json({ message: "Order is paid.", order: newOrder });
  } else {
    await db.disconnectDB();
    res.status(404).json({ message: "Order is not found." });
  }
});

export default router.handler();
