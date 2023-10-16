import { createRouter } from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import { createActivationToken, createResetToken } from "../../../utils/tokens";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { sendEmail } from "../../../utils/sendEmail";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDB();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email này không tồn tại.",
      });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;

    sendEmail(email, url, "", "Đặt lại mật khẩu của bạn.", resetEmailTemplate);
    await db.disconnectDB();
    res.json({
      message:
        "Một email đã được gửi cho bạn, hãy sử dụng nó để đặt lại mật khẩu của bạn.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router.handler();
