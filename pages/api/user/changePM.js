import { createRouter } from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";

import auth from "@/middleware/auth";

const router = createRouter();

router.use(auth).put(async (req, res) => {
  try {
    db.connectDB();
    const { paymentMethod } = req.body;
    const user = await User.findById(req.user);
    await user.updateOne(
      {
        defaultPaymentMethod: paymentMethod,
      },
      {
        returnOriginal: false,
      }
    );
    db.disconnectDB();
    return res.json({ paymentMethod: paymentMethod });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
