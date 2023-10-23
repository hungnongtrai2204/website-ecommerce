import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { toggleSidebar } from "@/store/expandSlice";
import {
  MdArrowForwardIos,
  MdOutlineCategory,
  MdSpaceDashboard,
} from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { ImUsers } from "react-icons/im";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { BsPatchPlus } from "react-icons/bs";
import {
  RiCoupon3Fill,
  RiLogoutCircleFill,
  RiSettingsLine,
} from "react-icons/ri";
export default function Sidebar() {
  const router = useRouter();
  const route = router.pathname.split("/admin/dashboard/")[1];
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const handleExpand = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div className={`${styles.sidebar} ${expand ? styles.opened : ""}`}>
      <div className={styles.sidebar__toggle} onClick={() => handleExpand()}>
        <div
          style={{
            transform: `${expand ? "rotate(180deg)" : ""}`,
            transition: "all .2s",
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.sidebar__user}>
          <img src={session?.user?.image} alt="" />
          <div className={styles.show}>
            <span>Chào mừng trở lại 👋</span>
            <span>{session?.user?.name}</span>
          </div>
        </div>
        <ul className={styles.sidebar__list}>
          <li className={route == undefined ? styles.active : ""}>
            <Link href="/admin/dashboard">
              <MdSpaceDashboard />
              <span className={styles.show}>Bảng Điều Khiển</span>
            </Link>
          </li>
          <li className={route == "sales" ? styles.active : ""}>
            <Link href="/admin/dashboard/sales">
              <FcSalesPerformance />
              <span className={styles.show}>Doanh Thu</span>
            </Link>
          </li>
          <li className={route == "orders" ? styles.active : ""}>
            <Link href="/admin/dashboard/roders">
              <IoListCircleSharp />
              <span className={styles.show}>Đơn Đặt Hàng</span>
            </Link>
          </li>
          <li className={route == "users" ? styles.active : ""}>
            <Link href="/admin/dashboard/users">
              <ImUsers />
              <span className={styles.show}>Người Dùng</span>
            </Link>
          </li>
          <li className={route == "messages" ? styles.active : ""}>
            <Link href="/admin/dashboard/messages">
              <AiFillMessage />
              <span className={styles.show}>Tin Nhắn</span>
            </Link>
          </li>
        </ul>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Sản Phẩm</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "product/all" ? styles.active : ""}>
              <Link href="/admin/dashboard/product/all">
                <FaThList />
                <span className={styles.show}>Tất Cả Sản Phẩm</span>
              </Link>
            </li>
            <li className={route == "product/create" ? styles.active : ""}>
              <Link href="/admin/dashboard/product/create">
                <BsPatchPlus />
                <span className={styles.show}>Tạo Sản Phẩm</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Danh Mục / Danh Mục Phụ</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "categories" ? styles.active : ""}>
              <Link href="/admin/dashboard/categories">
                <MdOutlineCategory />
                <span className={styles.show}>Danh Mục</span>
              </Link>
            </li>
            <li className={route == "subCategories" ? styles.active : ""}>
              <Link href="/admin/dashboard/subCategories">
                <div style={{ transform: "rotate(180deg)" }}>
                  <MdOutlineCategory />
                </div>
                <span className={styles.show}>Danh Mục Phụ</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Mã Giảm Giá</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "coupons" ? styles.active : ""}>
              <Link href="/admin/dashboard/coupons">
                <RiCoupon3Fill />
                <span className={styles.show}>Mã Giảm Giá</span>
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <ul
            className={`${styles.sidebar__list} ${
              expand ? styles.nav_flex : ""
            }`}
          >
            <li>
              <Link href="">
                <RiSettingsLine />
              </Link>
            </li>
            <li>
              <Link href="">
                <IoNotificationsSharp />
              </Link>
            </li>
            <li>
              <Link href="">
                <AiFillMessage />
              </Link>
            </li>
            <li>
              <Link href="">
                <RiLogoutCircleFill />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
