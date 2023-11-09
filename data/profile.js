export const sidebarData = [
  {
    heading: "Tài Khoản Của Tôi",
    links: [
      {
        name: "Thông Tin Của Tôi",
        value: "My Profile",
        link: "/profile",
      },
      {
        name: "Địa chỉ",
        value: "Addresses",
        link: "/profile/address",
      },
      {
        name: "Tùy chọn Thanh Toán Của Tôi",
        value: "My Payment Options",
        link: "/profile/payment",
      },
      {
        name: "Bảo Mật Tài Khoản",
        value: "Account Security",
        link: "/profile/security",
      },
    ],
  },
  {
    heading: "Đơn Hàng Của Tôi",
    links: [
      {
        name: "Tất Cả",
        value: "All Orders",
        link: "/profile/orders",
        filter: "",
      },
      {
        name: "Đã Thanh Toán",
        value: "Paid Orders",
        link: "/profile/orders",
        filter: "paid",
      },
      {
        name: "Chưa Thanh Toán",
        value: "Unpaid Orders",
        link: "/profile/orders",
        filter: "unpaid",
      },

      {
        name: "Đang Được Xử Lý",
        value: "Processing Orders",
        link: "/profile/orders",
        filter: "Đang Xử Lý",
      },
      {
        name: "Chưa Được Xử Lý",
        value: "Unprocessed Orders",
        link: "/profile/orders",
        filter: "Chưa Được Xử Lý",
      },
      {
        name: "Đã Gửi",
        value: "Dispatched Orders",
        link: "/profile/orders",
        filter: "Đã Gửi",
      },
      {
        name: "Đã Giao",
        value: "Delievered Orders",
        link: "/profile/orders",
        filter: "Đã Hoàn Thành",
      },
      {
        name: "Đã Hủy",
        value: "Cancelled Orders",
        link: "/profile/orders",
        filter: "Đã Hủy",
      },
    ],
  },
  {
    heading: "Danh Sách Của Tôi",
    links: [
      {
        name: "Danh Sách Yêu Thích",
        value: "Whishlist",
        link: "/profile/wishlist",
      },
      {
        name: "Đã Xem Gần Đây",
        value: "Recently Viewed",
        link: "/profile/recent",
      },
    ],
  },
  {
    heading: "Dịch Vụ Khách Hàng",
    links: [
      {
        name: "Tin Nhắn Của Tôi",
        value: "My Message",
        link: "/profile/messages",
      },
      {
        name: "Hồ Sơ Dịch Vụ",
        value: "Service Records",
        link: "/profile/services",
      },
    ],
  },
  {
    heading: "Các Dịch Vụ Khác",
    links: [
      {
        name: "Trung Tâm Khảo Sát",
        value: "Survey Center",
        link: "",
      },
      {
        name: "Tùy Chọn Liên Hệ",
        value: "Contact Preferences",
        link: "",
      },
    ],
  },
  {
    heading: "Chính Sách",
    links: [
      {
        name: "Thông Tin Vận Chuyển",
        value: "Shipping Info",
        link: "",
      },
      {
        name: "Chính Sách Hoàn Trả",
        value: "Return Policy",
        link: "",
      },
      {
        name: "Chính Sách Quyền Riêng Tư & Cookie",
        value: "Privacy & Cookie Policy",
        link: "",
      },
    ],
  },
  {
    heading: "Đăng xuất",
    link: [],
  },
];

export const ordersLinks = [
  {
    name: "Tất Cả",
    value: "All Orders",
    filter: "",
  },
  {
    name: "Đã Thanh Toán",
    value: "Paid Orders",
    filter: "paid",
  },
  {
    name: "Chưa Thanh Toán",
    value: "Unpaid Orders",
    filter: "unpaid",
  },
  {
    name: "Đang Xử Lý",
    value: "Processing Orders",
    filter: "Đang Xử Lý",
  },
  {
    name: "Chưa Được Xử Lý",
    value: "Unprocessed Orders",
    filter: "Chưa Được Xử Lý",
  },
  {
    name: "Đã Gửi",
    value: "Dispatched Orders",
    filter: "Đã Gửi",
  },
  {
    name: "Đã Giao",
    value: "Delievered Orders",
    filter: "Đã Hoàn Thành",
  },
  {
    name: "Đã Hủy",
    value: "Cancelled Orders",
    filter: "Đã Hủy",
  },
];
