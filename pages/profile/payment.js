import Payment from "@/components/checkout/payment";
import Layout from "@/components/profile/layout";
import User from "@/models/User";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/profile.module.scss";
export default function index({ user, tab, defaultPaymentMethod, country }) {
  const [dbPM, setDbPM] = useState(defaultPaymentMethod);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
  const [error, setError] = useState("");
  const handlePM = async () => {
    try {
      const { data } = await axios.put("/api/user/changePM", {
        paymentMethod,
      });
      setError("");
      setDbPM(data.paymentMethod);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <Layout session={user.user} tab={tab} country={country}>
      <div className={styles.header}>
        <h1>PHƯƠNG THỨC THANH TOÁN CỦA TÔI</h1>
      </div>
      <Payment
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        profile
      />
      <button
        disabled={!paymentMethod || paymentMethod == dbPM}
        className={`${styles.button} ${
          !paymentMethod || paymentMethod == dbPM ? styles.disabled : ""
        }`}
        onClick={() => handlePM()}
      >
        Lưu
      </button>
      {error && <span className={styles.error}>{error}</span>}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  const user = await User.findById(session.user.id).select(
    "defaultPaymentMethod"
  );

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
      defaultPaymentMethod: user.defaultPaymentMethod,
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
    },
  };
}
