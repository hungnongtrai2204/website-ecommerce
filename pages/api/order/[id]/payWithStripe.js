import { createRouter } from "next-connect";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import Order from "@/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = createRouter();

router.use(auth).post(async (req, res) => {
  try {
    await db.connectDB();
    const { amount, id } = req.body;
    const order_id = req.query.id;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "VND",
      description: "Shop Store",
      payment_method: id,
      payment_method_types: ["card"],
      confirm: true,
    });
    const order = await Order.findById(order_id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: payment.id,
        status: payment.status,
        email_address: payment.email_address,
      };
      await order.save();
      res.json({
        success: true,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
    db.disconnectDB();
  } catch (error) {
    db.disconnectDB();
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
