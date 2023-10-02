import React, { use, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/inputs/loginInput";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import DotLoaderSpinner from "../components/loaders/dotLoader";
import Router from "next/router";
const initialvalues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};
export default function signin({ country, providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preValue) => ({ ...preValue, [name]: value }));
  };
  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Địa chỉ email là bắt buộc.")
      .email("Vui lòng nhập địa chỉ email hợp lệ."),
    login_password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Bạn tên là gì ?")
      .min(2, "Tên phải có từ 2 đến 16 ký tự")
      .max(16, "Tên phải có từ 2 đến 16 ký tự")
      .matches(/^[aA-zZ]/, "Không được phép sử dụng số và ký tự đặc biệt."),
    email: Yup.string()
      .required(
        "Bạn sẽ cần điều này khi đăng nhập và nếu bạn cần đặt mật khẩu của mình."
      )
      .email("Nhập địa chỉ email hợp lệ"),
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
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser((preValue) => ({
        ...preValue,
        error: "",
        success: data.message,
      }));
      setLoading(false);
      setTimeout(async () => {
        const options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser((preValue) => ({
        ...preValue,
        error: error.response.data.message,
        success: "",
      }));
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    const options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser((preValue) => ({ ...preValue, success: "", error: "" }));
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser((preValue) => ({ ...preValue, login_error: res?.error }));
    } else {
      return Router.push(callbackUrl || "/");
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country={country} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Chúng tôi rất vui khi bạn tham gia cùng chúng tôi !{" "}
              <Link href="/">Đi Đến Cửa Hàng</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Đăng nhập</h1>
            <p>
              Được tiếp cận với một trong những dịch vụ mua sắm trực tuyến tốt
              nhất trên thế giới.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => signInHandler()}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Địa Chỉ Email"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Mật Khẩu"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Đăng nhập" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Quên mật khẩu ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Hoặc tiếp tục với</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Đăng nhập bằng {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Đăng ký</h1>
            <p>
              Được tiếp cận với một trong những dịch vụ mua sắm trực tuyến tốt
              nhất trên thế giới.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Họ Và Tên"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Địa Chỉ Email"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Mật Khẩu"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Nhập Lại Mật Khẩu"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Đăng ký" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const providers = Object.values(await getProviders());
  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });

  const { req, query } = context;
  const { callbackUrl } = query;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
      providers,
      csrfToken,
      callbackUrl,
    },
  };
};
