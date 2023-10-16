import { createRouter } from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import { createActivationToken } from "../../../utils/tokens";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { sendEmail } from "../../../utils/sendEmail";
import { activateEmailTemplate } from "../../../emails/activateEmailTemplate";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDB();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Please fill in all fields.",
      });
    }
    if (!validateEmail(email)) {
      res.status(400).json({
        message: "Invalid email.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "This email already exsits.",
      });
    }
    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save();
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/active/${activation_token}`;
    await sendEmail(
      email,
      url,
      "",
      "Kích hoạt tài khoản của bạn.",
      activateEmailTemplate
    );
    await db.disconnectDB();
    res.json({
      message: "Register success! Please activate your email to start.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router.handler();
