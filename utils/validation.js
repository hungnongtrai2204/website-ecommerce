export const validateEmail = (email) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let questions = product.questions;
  const checks = [
    {
      msg: "Tên, Mô tả, Thương hiệu được thêm thành công.",
      type: "success",
    },
  ];
  if (images.length < 1) {
    checks.push({
      msg: `Chọn ít nhất 1 hình ảnh (${1 - images.length} còn lại).`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images.length} hình ảnh được chọn.`,
      type: "success",
    });
  }
  if (!product.color.color) {
    checks.push({
      msg: `Chọn màu chính sản phẩm.`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Màu sắc sản phẩm đã được chọn.`,
      type: "success",
    });
  }
  if (!product.color.image) {
    checks.push({
      msg: `Chọn hình ảnh kiểu dáng sản phẩm`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Hình ảnh phong cách sản phẩm đã được chọn.`,
      type: "success",
    });
  }
  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i].qty == "" || sizes[i].price == "" || sizes[i].size == "") {
      checks.push({
        msg: `Vui lòng điền đầy đủ thông tin về kích cỡ.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Ít nhất một kích thước/số lượng/giá được thêm.`,
        type: "success",
      });
    }
  }
  for (var i = 0; i < details.length; i++) {
    if (details[i].name == "" || details[i].value == "") {
      checks.push({
        msg: `Vui lòng điền đầy đủ thông tin về chi tiết.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Ít nhất một chi tiết được thêm.`,
        type: "success",
      });
    }
  }
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].question == "" || questions[i].answer == "") {
      checks.push({
        msg: `Vui lòng điền đầy đủ thông tin về câu hỏi.`,
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: `Ít nhất một câu hỏi được thêm.`,
        type: "success",
      });
    }
  }
  var s_test = checks.find((c) => c.type == "error");
  if (s_test) {
    return checks;
  } else {
    return "valid";
  }
};
