import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
import SingularSelect from "@/components/selects/SingularSelect";
export default function Create({ categories, setSubCategories }) {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("Tên danh mục phụ là bắt buộc.")
      .min(2, "Tên danh mục phụ phải có từ 2 đến 30 ký tự.")
      .max(30, "Tên danh mục phụ phải có từ 2 đến 30 ký tự."),
    // .matches(
    //   /^[a-zA-Z\s]*$/,
    //   "Không được phép sử dụng số và ký tự đặc biệt."
    // ),
    parent: Yup.string().required("Vui lòng chọn một danh mục cha."),
  });
  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/subCategory", {
        name,
        parent,
      });
      setSubCategories(data.subCategories);
      setName("");
      setParent("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, parent }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Tạo Danh Mục Phụ</div>
            <AdminInput
              type="text"
              label="Tên"
              name="name"
              placeholder="Tên Danh Mục Phụ"
              onChange={(e) => setName(e.target.value)}
            />
            <SingularSelect
              name="Danh Mục Cha"
              value={parent}
              data={categories}
              placeholder="Chọn Danh Mục"
              handleChange={(e) => setParent(e.target.value)}
            />
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn}`}>
                <span>Thêm Danh Mục Phụ</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
