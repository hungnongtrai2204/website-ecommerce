import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
export default function Create({ setCoupons }) {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Mã giảm giá là bắt buộc.")
      .min(2, "Mã giảm giá phải có từ 2 đến 30 ký tự.")
      .max(30, "Mã giảm giá phải có từ 2 đến 30 ký tự."),
    discount: Yup.number()
      .required("Giảm giá là bắt buộc.")
      .min(1, "Giảm giá phải ít nhất 1%")
      .max(99, "Giảm giá phải nhiều nhất 99% hoặc thấp hơn"),
  });
  const submitHandler = async () => {
    try {
      if (startDate.toString() === endDate.toString()) {
        return toast.error("Bạn không thể chọn các ngày giống nhau.");
      } else if (endDate.getTime() - startDate.getTime() < 0) {
        return toast.error("Ngày bắt đầu không thể lớn hơn ngày kết thúc.");
      }
      const { data } = await axios.post("/api/admin/coupon", {
        coupon: name,
        discount,
        startDate,
        endDate,
      });
      setCoupons(data.coupons);
      setName("");
      setDiscount(0);
      setStartDate(new Date());
      setEndDate(tomorrow);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, discount }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Tạo Mã Giảm Giá</div>
            <AdminInput
              type="text"
              label="Mã"
              name="name"
              placeholder="Mã Giảm Giá"
              onChange={(e) => setName(e.target.value)}
            />
            <AdminInput
              type="number"
              label="Giảm Giá"
              name="discount"
              placeholder="Phần Trăm Giảm Giá"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <div className={styles.date_picker}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Ngày Bắt Đầu"
                  format="dd/MM/yyyy"
                  value={startDate}
                  onChange={handleStartDate}
                  renderInputs={(params) => <TextField {...params} />}
                  minDate={new Date()}
                />
                <DesktopDatePicker
                  label="Ngày Kết Thúc"
                  format="dd/MM/yyyy"
                  value={endDate}
                  onChange={handleEndDate}
                  renderInputs={(params) => <TextField {...params} />}
                  minDate={tomorrow}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn}`}>
                <span>Thêm Mã Giảm Giá</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
