import Layout from "@/components/admin/layout";
import styles from "../../../../styles/products.module.scss";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SingularSelect from "@/components/selects/SingularSelect";
import MultipleSelect from "@/components/selects/MultipleSelect";
import AdminInput from "@/components/inputs/adminInput";
import { useDispatch } from "react-redux";
import { showDialog } from "@/store/DialogSlice";
import Images from "@/components/admin/createProduct/images";
import Colors from "@/components/admin/createProduct/colors";
import Style from "@/components/admin/createProduct/style";
import Sizes from "@/components/admin/createProduct/clickToAdd/Sizes";
import Details from "@/components/admin/createProduct/clickToAdd/Details";
import Questions from "@/components/admin/createProduct/clickToAdd/Questions";
import { validateCreateProduct } from "@/utils/validation";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadImages } from "@/requests/upload";
import { toast } from "react-toastify";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};
export default function create({ parents, categories }) {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getParentData = async () => {
      const { data } = await axios.get(
        `/api/product/${product.parent || "unkwon"}`
      );
      if (data) {
        setProduct({
          ...product,
          name: data.name,
          description: data.description,
          brand: data.brand,
          category: data.category,
          subCategories: data.subCategories || [],
          questions: [],
          details: [],
        });
      }
    };
    getParentData();
  }, [product.parent]);
  useEffect(() => {
    async function getSubs() {
      const { data } = await axios.get("/api/admin/subCategory", {
        params: {
          category: product.category,
        },
      });
      setSubs(data);
    }
    getSubs();
  }, [product.category]);
  const validate = Yup.object({
    name: Yup.string()
      .required("Vui lòng thêm tên sản phẩm")
      .min(10, "Tên sản phẩm phải từ 10 đến 300 ký tự.")
      .max(300, "Tên sản phẩm phải từ 10 đến 300 ký tự."),
    brand: Yup.string().required("Vui lòng thêm thương hiệu"),
    category: Yup.string().required("Hãy chọn một danh mục."),
    // subCategories: Yup.array().min(
    //   1,
    //   "Vui lòng chọn ít nhất một danh mục phụ."
    // ),
    sku: Yup.string().required("Vui lòng thêm mã hàng"),
    color: Yup.string().required("Vui lòng thêm một màu"),
    description: Yup.string().required("Vui lòng thêm mô tả"),
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    // setProduct({ ...product, [name]: value });
    setProduct((preProduct) => ({ ...preProduct, [name]: value }));
    console.log("Product Change", product);
  };
  console.log("Product", product);
  const createProduct = async () => {
    let test = validateCreateProduct(product, images);
    if (test == "valid") {
      createProductHandler();
    } else {
      console.log("PRODUCT", product);
      dispatch(
        showDialog({
          header: "Hãy làm theo hướng dẫn của chúng tôi.",
          msgs: test,
        })
      );
    }
  };
  let uploaded_images = [];
  let style_img = "";
  const createProductHandler = async () => {
    setLoading(true);
    if (images) {
      let temp = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = "product images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((image) => {
        formData.append("file", image);
      });
      uploaded_images = await uploadImages(formData);
    }
    if (product.color.image) {
      let temp = dataURItoBlob(product.color.image);
      let path = "product style images";
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", temp);
      let cloudinary_style_img = await uploadImages(formData);
      style_img = cloudinary_style_img[0].url;
    }
    try {
      const { data } = await axios.post("/api/admin/product", {
        ...product,
        images: uploaded_images,
        color: {
          image: style_img,
          color: product.color.color,
        },
      });
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.reponse.data.message);
    }
  };
  return (
    <Layout>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className={styles.header}>Tạo Sản Phẩm</div>
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color.color,
          imageInputFile: "",
          styleInout: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            <Images
              name="imageInputFile"
              header="Hình Ảnh Sản Phẩm"
              text="Thêm Hình Ảnh"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            />
            <div className={styles.flex}>
              {product.color.image && (
                <img
                  src={product.color.image}
                  className={styles.image_span}
                  alt=""
                />
              )}
              {product.color.color && (
                <span
                  className={styles.color_span}
                  style={{ background: `${product.color.color}` }}
                ></span>
              )}
            </div>
            <Colors
              name="color"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />
            <Style
              name="styleInput"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />
            <SingularSelect
              name="parent"
              value={product.parent}
              placeholder="Sản phẩm gốc"
              data={parents}
              header="Thêm vào sản phẩm hiện có"
              handleChange={handleChange}
            />
            <SingularSelect
              name="category"
              value={product.category}
              placeholder="Danh mục"
              data={categories}
              header="Lựa chọn một danh mục"
              handleChange={handleChange}
              disabled={product.parent}
            />
            {product.category && (
              <MultipleSelect
                value={product.subCategories}
                data={subs}
                header="Chọn Danh Mục Phụ"
                name="subCategories"
                disabled={product.parent}
                handleChange={handleChange}
              />
            )}
            <div className={styles.header}>Basic Infos</div>
            <AdminInput
              type="text"
              label="Tên"
              name="name"
              placeholder="Tên của sản phẩm"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Mô tả"
              name="description"
              placeholder="Mô tả của sản phẩm"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Brand"
              name="brand"
              placeholder="Thương hiệu của sản phẩm"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Mã"
              name="sku"
              placeholder="Mã của sản phẩm"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Giảm Giá"
              name="discount"
              placeholder="Phần trăm giảm giá của sản phẩm"
              onChange={handleChange}
            />
            <Sizes
              sizes={product.sizes}
              product={product}
              setProduct={setProduct}
            />
            <Details
              details={product.details}
              product={product}
              setProduct={setProduct}
            />
            <Questions
              questions={product.questions}
              product={product}
              setProduct={setProduct}
            />
            {/* <Images
              name="imageDescInputFile"
              header="Hình Ảnh Mô Tả Sản Phẩm"
              text="Thêm Hình Ảnh"
              images={description_images}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            /> */}
            <button
              className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
              type="submit"
            >
              Tạo Sản Phẩm
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  db.connectDB();
  const results = await Product.find().select("name subProducts").lean();
  const categories = await Category.find().lean();
  db.disconnectDB();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
