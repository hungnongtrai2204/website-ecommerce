import { createRouter } from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import { createActivationToken, createResetToken } from "../../../utils/tokens";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { sendEmail } from "../../../utils/sendEmail";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";
const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connectDB();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản này không tồn tại.",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
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
