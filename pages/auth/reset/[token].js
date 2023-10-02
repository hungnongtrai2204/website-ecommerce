import React, { useState } from "react";
import styles from "../../../styles/forgot.module.scss";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import axios from "axios";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "../../../components/buttons/circledIconBtn";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import LoginInput from "../../../components/inputs/loginInput";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import jwt from "jsonwebtoken";
import { Router } from "next/router";
import { getSession, signIn } from "next-auth/react";
export default function Reset({ country, user_id }) {
  console.log("user_id", user_id);
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu mới của bạn.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(36, "Mật khẩu không được dài hơn 36 ký tự"),
    conf_password: Yup.string()
      .required("Xác nhận mật khẩu của bạn.")
      .oneOf([Yup.ref("password")], "Mật khẩu phải khớp."),
  });
  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      console.log(data);
      const options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country={country} />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Đặt lại mật khẩu của bạn ?{" "}
              <Link href="/">Đăng nhập thay thế</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => resetHandler()}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Mật Khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder="Xác nhận mật khẩu"
                  onChange={(e) => setConf_password(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Xác Nhận" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });

  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

  return {
    props: {
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
      user_id: user_id.id,
    },
  };
};
