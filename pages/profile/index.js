import Layout from "@/components/profile/layout";
import axios from "axios";
import { getSession } from "next-auth/react";

export default function index({ user, tab, country }) {
  return (
    <Layout session={user.user} tab={tab} country={country}>
      index
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
