import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
export default function Create({ setCategories }) {
  const [name, setName] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("Tên danh mục là bắt buộc.")
      .min(2, "Tên danh mục phải có từ 2 đến 30 ký tự.")
      .max(30, "Tên danh mục phải có từ 2 đến 30 ký tự."),
    // .matches(
    //   /^[a-zA-Z\s]*$/,
    //   "Không được phép sử dụng số và ký tự đặc biệt."
    // ),
  });
  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/category", { name });
      setCategories(data.categories);
      setName("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Tạo Danh Mục</div>
            <AdminInput
              type="text"
              label="Tên"
              name="name"
              placeholder="Tên Danh Mục"
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn}`}>
                <span>Thêm Danh Mục</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
