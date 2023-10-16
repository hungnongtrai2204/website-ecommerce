import { createRouter } from "next-connect";
import db from "@/utils/db";
import User from "@/models/User";

import auth from "@/middleware/auth";

const router = createRouter();

router.use(auth).post(async (req, res) => {
  try {
    db.connectDB();
    const { address } = req.body;
    const user = await User.findById(req.user);
    await user.updateOne(
      {
        $push: {
          address: address,
        },
      },
      {
        new: true,
      }
    );
    db.disconnectDB();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
