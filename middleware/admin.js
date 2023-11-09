import User from "@/models/User";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";
export default async (req, res, next) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  db.connectDB();
  let user = await User.findById(token.sub);
  db.disconnectDB();
  if (user.role == "admin") {
    next();
  } else {
    res.status(401).json({
      message: "Quyền truy cập bị từ chối, tài nguyên của quản trị viên.",
    });
  }
};
