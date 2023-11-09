import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import ShippingInput from "@/components/inputs/shippingInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "@/data/countries";
import SingularSelect from "@/components/selects/SingularSelect";
import {
  changeActiveAddress,
  deleteAddress,
  saveAddress,
} from "@/requests/user";
import { FaIdCard, FaMapMarkedAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};
export default function Shipping({ user, addresses, setAddresses, profile }) {
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address.length ? false : true);
  const [loading, setLoading] = useState(false);
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("Tên là bắt buộc.")
      .min(3, "Tên phải dài ít nhất 3 ký tự.")
      .max(20, "Tên phải dài ít hơn 20 ký tự."),
    lastName: Yup.string()
      .required("Họ là bắt buộc.")
      .min(2, "Họ phải dài ít nhất 2 ký tự.")
      .max(20, "Họ phải dài ít hơn 20 ký tự."),
    phoneNumber: Yup.string()
      .phone("VN", "Xin vui lòng nhập một số điện thoại hợp lệ")
      .required("Số điện thoại là bắt buộc.")
      .min(3, "Số điện thoại phải dài ít nhất 3 ký tự.")
      .max(30, "Số điện thoại phải dài ít hơn 30 ký tự."),
    state: Yup.string()
      .required("Tên tỉnh thành là bắt buộc.")
      .min(2, "Tên tỉnh thành phải chứa 2-60 ký tự.")
      .max(60, "Tên tỉnh thành phải chứa 2-60 ký tự."),
    city: Yup.string()
      .required("Tên thành phố là bắt buộc.")
      .min(2, "Tên thành phố phải chứa 2-60 ký tự.")
      .max(60, "Tên thành phố phải chứa 2-60 ký tự."),
    zipCode: Yup.string()
      .required("Mã bưu chính là bắt buộc.")
      .min(2, "Mã bưu chính phải chứa 2-30 ký tự.")
      .max(30, "Mã bưu chính phải chứa 2-30 ký tự."),
    address1: Yup.string()
      .required("Địa chỉ 1 là bắt buộc.")
      .min(5, "Địa chỉ 1 phải chứa 5-100 ký tự.")
      .max(100, "Địa chỉ 1 phải chứa 5-100 ký tự."),
    address2: Yup.string()
      .min(5, "Địa chỉ 2 phải chứa 5-100 ký tự.")
      .max(100, "Địa chỉ 2 phải chứa 5-100 ký tự."),
    country: Yup.string().required("Tên quốc gia là bắt buộc."),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const saveShippingHandler = async () => {
    setLoading(true);
    const res = await saveAddress(shipping);
    setAddresses([...res.addresses, shipping]);
    setLoading(false);
  };
  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);
  };
  const deleteHandler = async (id) => {
    console.log("Delete");
    const res = await deleteAddress(id);
    setAddresses(res.addresses);
  };
  return (
    <div className={styles.shipping}>
      {loading && <DotLoaderSpinner loading={loading} />}
      {!profile && (
        <div className={styles.header}>
          <h3>Thông Tin Vận Chuyển</h3>
        </div>
      )}
      <div className={styles.addresses}>
        {addresses.map((address) => (
          <div style={{ position: "relative" }}>
            <div
              className={styles.address__delete}
              onClick={() => deleteHandler(address._id)}
            >
              <IoIosRemoveCircleOutline />
            </div>
            <div
              className={`${styles.address} ${address.active && styles.active}`}
              key={address._id}
              onClick={() => changeActiveHandler(address._id)}
            >
              <div className={styles.address__side}>
                <img src={profile ? user.user.image : user.image} alt="" />
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaIdCard />
                  {address.firstName.toUpperCase()}
                  {address.lastName.toUpperCase()}
                </span>
                <span>
                  <GiPhone />
                  {address.phoneNumber}
                </span>
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaMapMarkedAlt />
                  {address.address1}
                </span>
                <span>{address.address2}</span>
                <span>
                  {address.city},{address.state},{address.country}
                </span>
                <span>{address.zipCode}</span>
              </div>
              <span
                className={styles.active__text}
                style={{
                  display: `${!address.active ? "none" : "inline"}`,
                }}
              >
                Kích Hoạt
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        className={styles.hide_show}
        onClick={() => setVisible((pre) => !pre)}
      >
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            THÊM ĐỊA CHỈ MỚI <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            phoneNumber,
            state,
            city,
            zipCode,
            address1,
            address2,
            country,
          }}
          validationSchema={validate}
          onSubmit={() => {
            saveShippingHandler();
          }}
        >
          {(formik) => (
            <Form>
              <SingularSelect
                name="country"
                value={country}
                placeholder="*Quốc Gia"
                handleChange={handleChange}
                data={countries}
              />
              <div className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder="*Tên"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="lastName"
                  placeholder="*Họ"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.col}>
                <ShippingInput
                  name="state"
                  placeholder="*Tỉnh Thành"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="city"
                  placeholder="*Thành Phố"
                  onChange={handleChange}
                />
              </div>
              <ShippingInput
                name="phoneNumber"
                placeholder="*Số Điện Thoại"
                onChange={handleChange}
              />
              <ShippingInput
                name="zipCode"
                placeholder="*Mã Bưu Điện"
                onChange={handleChange}
              />
              <ShippingInput
                name="address1"
                placeholder="Địa Chỉ 1"
                onChange={handleChange}
              />
              <ShippingInput
                name="address2"
                placeholder="Địa Chỉ 2"
                onChange={handleChange}
              />
              <button type="submit">Lưu Địa Chỉ</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
