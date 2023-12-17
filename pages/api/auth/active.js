import { createRouter } from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connectDB();
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản này không tồn tại.",
      });
    }
    await user.updateOne({
      emailVerified: true,
    });
    res.json({
      email: user.email,
    });
    await db.disconnectDB();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router.handler();
