import React from "react";
import styles from "../styles/page.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
export default function Cart({ country }) {
  return (
    <div className={styles.container}>
      <Header country={country} />
      <p>cart</p>
      <Footer country={country} />
    </div>
  );
}
export const getServerSideProps = async () => {
  let data = await axios
    .get("https://api.ipregistry.co/?key=s6nqi028kbnmc39f")
    .then((response) => response.data.location.country)
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
    },
  };
};
