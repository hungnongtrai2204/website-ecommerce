import { createRouter } from "next-connect";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import Order from "@/models/Order";
import User from "@/models/User";
import { sendOrderEmail } from "@/utils/sendEmail";
import { orderEmailTemplate } from "@/emails/orderEmailTemplate";
const router = createRouter();

router.use(auth).put(async (req, res) => {
  await db.connectDB();
  const order = await Order.findById(req.query.id).populate({
    path: "user",
    model: User,
    select: "name email image",
  });
  if (order) {
    if (order.paymentMethod === "cash" && req.body.status === "Đã Hoàn Thành") {
      order.isPaid = true;
      order.paidAt = Date.now();
    }
    order.status = req.body.status;
    // order.paymentResult = {
    //   id: req.body.id,
    //   status: req.body.status,
    //   email_address: req.body.email_address,
    // };
    const newOrder = await order.save();

    await db.disconnectDB();
    res.json({
      message: "Order is change status successfully.",
      order: newOrder,
    });
    console.log(newOrder);
    sendOrderEmail(
      newOrder.user.email,
      "",
      "",
      "Đơn Đặt Hàng Tại Hùng Vũ Shop.",
      orderEmailTemplate,
      newOrder
    );
  } else {
    await db.disconnectDB();
    res.status(404).json({ message: "Order is not found." });
  }
});

export default router.handler();
