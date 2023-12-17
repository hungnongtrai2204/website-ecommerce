import React, { useState } from "react";
import axios from "axios";

import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ActiveComponent from "@/components/active";
export default function Active({ country, user_id }) {
  const router = useRouter();

  const activeHandler = async () => {
    try {
      const { data } = await axios.put("/api/auth/active", {
        user_id,
      });
      router.push("/");
      //   await signIn("credentials", options);
      //   window.location.reload(true);
    } catch (error) {}
  };
  return (
    <>
      <Header country={country} />
      <ActiveComponent onActive={activeHandler} />
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
  const user_id = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);

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
