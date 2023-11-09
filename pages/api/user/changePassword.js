import { createRouter } from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";
import auth from "@/middleware/auth";
import bcrypt from "bcrypt";
const router = createRouter();

router.use(auth).put(async (req, res) => {
  try {
    db.connectDB();
    const { current_password, password } = req.body;
    const user = await User.findById(req.user);
    const crypted_password = await bcrypt.hash(password, 12);
    if (!user.password) {
      await user.updateOne({
        password: crypted_password,
      });
      return res.status(200).json({
        message:
          "Chúng tôi nhận thấy rằng bạn đang sử dụng thông tin đăng nhập xã hội nên chúng tôi đã thêm mật khẩu để đăng nhập trong tương lai.",
      });
    }
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu hiện tại sai!",
      });
    }
    await user.updateOne({
      password: crypted_password,
    });
    db.disconnectDB();
    return res.json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
