import CircledIconBtn from "@/components/buttons/circledIconBtn";
import LoginInput from "@/components/inputs/loginInput";
import Layout from "@/components/profile/layout";
import axios from "axios";
import { Form, Formik } from "formik";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import * as Yup from "yup";
import styles from "../../styles/profile.module.scss";
export default function index({ user, tab, country }) {
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const validate = Yup.object({
    current_password: Yup.string()
      .required(
        "Nhập tổ hợp của ít nhất sáu số, chữ cái và dấu chấm câu (chẳng hạn như ! và &)."
      )
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(36, "Mật khẩu không được dài hơn 36 ký tự"),
    password: Yup.string()
      .required(
        "Nhập tổ hợp của ít nhất sáu số, chữ cái và dấu chấm câu (chẳng hạn như ! và &)."
      )
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(36, "Mật khẩu không được dài hơn 36 ký tự"),
    conf_password: Yup.string()
      .required("Xác nhận mật khẩu của bạn.")
      .oneOf([Yup.ref("password")], "Mật khẩu phải khớp."),
  });
  const changePasswordHandler = async () => {
    try {
      const { data } = await axios.put("/api/user/changePassword", {
        current_password,
        password,
      });
      setError("");
      setSuccess(data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <Layout session={user.user} tab={tab} country={country}>
      <Head>
        <titlte>Hồ Sơ - Bảo Mật</titlte>
      </Head>
      <Formik
        enableReinitialize
        initialValues={{
          current_password,
          password,
          conf_password,
        }}
        validationSchema={validate}
        onSubmit={() => changePasswordHandler()}
      >
        {(form) => (
          <Form>
            <LoginInput
              type="password"
              name="current_password"
              icon="password"
              placeholder="Mật Khẩu Hiện Tại"
              onChange={(e) => setCurrent_password(e.target.value)}
            />
            <LoginInput
              type="password"
              name="password"
              icon="password"
              placeholder="Mật Khẩu Mới"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInput
              type="password"
              name="conf_password"
              icon="password"
              placeholder="Xác Nhận Mật Khẩu"
              onChange={(e) => setConf_password(e.target.value)}
            />
            <CircledIconBtn type="submit" text="Thay Đổi" />
            <br />
            {error && <span className={styles.error}>{error}</span>}
            {success && <span className={styles.success}>{success}</span>}
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      user: session,
      tab,
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
    },
  };
}
