import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { calculateDiff } from "./utils";
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};
export default function CountDown({ date }) {
  const [timeInMs, setTimeMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState();

  useEffect(() => {
    setTimeMs(date.getTime());
  }, [date]);
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeInMs]);
  const updateRemainingTime = () => {
    setRemainingTime(calculateDiff(timeInMs));
  };
  return (
    <div className={styles.countdown}>
      {[...Array(remainingTime?.days.length).keys()].map((d, i) => (
        <span>{remainingTime?.days.slice(i, i + 1)}</span>
      ))}
      <b>:</b>
      <span>{remainingTime?.hours.slice(0, 1)}</span>
      <span>{remainingTime?.hours.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.minutes.slice(0, 1)}</span>
      <span>{remainingTime?.minutes.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.seconds.slice(0, 1)}</span>
      <span>{remainingTime?.seconds.slice(1, 2)}</span>
    </div>
  );
}
