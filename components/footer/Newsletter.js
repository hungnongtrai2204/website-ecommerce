import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import axios from "axios";
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const subscribe = async () => {
    setSuccess("");
    setError("");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/newsletter", { email });
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className={styles.footer__newsletter}>
      <h3>ĐĂNG KÝ NHẬN BẢN TIN CỦA CHÚNG TÔI</h3>
      <div className={styles.footer__flex}>
        <input
          type="text"
          placeholder="Địa Chỉ Email Của Bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={styles.btn_primary}
          disabled={loading === true}
          style={{ cursor: `${loading ? "not-allowed" : ""}` }}
          onClick={() => subscribe()}
        >
          ĐĂNG KÝ
        </button>
      </div>
      {loading && <div className="">loading...</div>}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <p>
        Bằng cách nhấp vào nút ĐĂNG KÝ, bạn đồng ý với{" "}
        <Link href="">Chính Sách Quyền Riêng Tư và Cookie của chúng tôi</Link>
      </p>
    </div>
  );
}
