import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { MdOutlineRemoveCircle } from "react-icons/md";

export default function Images({ images, setImages }) {
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((img, i) => {
      console.log(images.length);
      console.log(i);
      if (images.length == 3 || i == 3) {
        setError("Cho phép tối đa 3 hình ảnh.");
        return;
      }
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp"
      ) {
        setError(
          `${img.name} định dạng không được hỗ trợ! chỉ cho phép JPEG, PNG, WEBP.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} kích thước quá lớn cho phép tối đa 5mb.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };
  const removeImage = (image) => {
    setImages((images) => images.filter((img) => img !== image));
    if (images.length <= 3) {
      setError("");
    }
  };
  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImages}
        multiple
        accept="image/png,image/jpeg,image/webp"
      />
      <button
        className={styles.login_btn}
        style={{ width: "160px" }}
        onClick={() => inputRef.current.click()}
      >
        Thêm hình ảnh
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.imgs_wrap}>
        {images.length > 0 &&
          images.map((img, i) => (
            <span key={i}>
              <MdOutlineRemoveCircle onClick={() => removeImage(img)} />
              <img src={img} alt="" />
            </span>
          ))}
      </div>
    </div>
  );
}
