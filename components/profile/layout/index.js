import Head from "next/head";
import styles from "./styles.module.scss";
import Header from "@/components/header";
import Sidebar from "../sidebar";
export default function Layout({ country, session, tab, children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{session.name}</title>
      </Head>
      <Header country={country} />
      <div className={styles.layout__container}>
        <Sidebar
          data={{
            ...session,
            tab,
          }}
        />
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}
