import fs from "fs";
export const imgMiddleware = async (req, res, next) => {
  try {
    if (!req.files) {
      return res
        .status(400)
        .json({ message: "Không có tập tin nào được chọn." });
    }
    let files = Object.values(req.files).flat();
    for (const file of files) {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: "Định dạng tệp không chính xác, chỉ cho phép JPEG/PNG/WEBP.",
        });
      }
      if (file.size > 1024 * 1024 * 10) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: "Kích thước tệp quá lớn cho phép tối đa 10 mb.",
        });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
