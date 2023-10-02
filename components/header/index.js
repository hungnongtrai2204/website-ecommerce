import React from "react";
import styles from "./styles.module.scss";
import Ad from "./ad";
import Top from "./Top";
import Main from "./Main";
export default function Header({ country }) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main />
    </header>
  );
}
