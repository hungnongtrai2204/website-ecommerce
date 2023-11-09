import Shipping from "@/components/checkout/shipping";
import Layout from "@/components/profile/layout";
import User from "@/models/User";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/profile.module.scss";
export default function index({ user, tab, country }) {
  const [addresses, setAddresses] = useState(user.address.address);
  return (
    <Layout session={user.user} tab={tab} country={country}>
      <div className={styles.header}>
        <h1>ĐỊA CHỈ CỦA TÔI</h1>
      </div>
      <Shipping
        user={user}
        addresses={addresses}
        setAddresses={setAddresses}
        profile
      />
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

  const address = await User.findById(session.user.id).select("address").lean();

  return {
    props: {
      user: {
        user: session.user,
        address: JSON.parse(JSON.stringify(address)),
      },
      tab,
      country: {
        name: data.name,
        flag: data.flag.emojitwo,
      },
    },
  };
}
