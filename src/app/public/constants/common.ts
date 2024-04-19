export const BACKGROUND_IMAGE_SLIDE = [
  "/assets/images/banners/13-418004996-1357155059.webp",
  "/assets/images/banners/13-418004996-1357155059.webp",
];

export const CART_TABLE_HEADER = [
  "Hình ảnh",
  "Tên sản phẩm",
  "Giá tiền",
  "Số lượng",
  "Tổng tiền",
  "Hành động",
];

export const OUR_PARTNERS = [
  "/assets/images/partners/BU.jpg",
  "/assets/images/partners/CK.jpg",
  "/assets/images/partners/CS.jpg",
  "/assets/images/partners/fc.jpg",
  "/assets/images/partners/FL.jpg",
  "/assets/images/partners/GK.jpg",
  "/assets/images/partners/HB.jpg",
  "/assets/images/partners/logo-SRWatch.jpg",
  "/assets/images/partners/logo-Tissot.jpg",
  "/assets/images/partners/MD.jpg",
  "/assets/images/partners/OG.jpg",
  "/assets/images/partners/OM.jpg",
  "/assets/images/partners/LG.jpg",
  "/assets/images/partners/CT.jpg",
  "/assets/images/partners/ML.jpg",
  "/assets/images/partners/MV.jpg",
  "/assets/images/partners/CA.jpg",
  "/assets/images/partners/OV.jpg",
];

export const PARTNERS = [
  "/assets/images/about/partner-5.jpg",
  "/assets/images/about/partner-1.webp",
  "/assets/images/about/partner-2.webp",
  "/assets/images/about/partner-3.webp",
  "/assets/images/about/partner-4.webp",
];

export const ACCOUNT_TAB = [
  {
    label: "Đơn mua",
    link: "orders",
  },
  {
    label: "Hồ sơ",
    link: "user-info",
  },
  {
    label: "Mật khẩu",
    link: "change-password",
  },
];

export const PURCHASE_ORDER_HEADER = [
  "STT",
  "Thời gian",
  "Tổng tiền",
  "Thanh toán",
  "Trạng thái",
  "Hành động",
];

export const PRODUCT_SORT = [
  {
    text: "Nổi bật",
    key: "highRating",
  },
  {
    text: "Mới nhất",
    key: "newest",
  },
  {
    text: "Bán chạy",
    key: "highPopular",
  },
];

export const BRANCH_HA_NOI = [
  {
    address: "97 Trần Đại Nghĩa, P. Bách Khoa, HBT, Hà Nội",
    time: "8h30 - 22h45",
    map: "https://www.google.com/maps/place/WatchStore/@21.0040538,105.8454841,15z/data=!4m6!3m5!1s0x3135ad3069755481:0x3a32977628b17570!8m2!3d21.0040538!4d105.8454841!16s%2Fg%2F11k4xt3kvc?coh=178572&entry=tt&shorturl=1",
  },
  {
    address: "58 Trần Đăng Ninh, Cầu Giấy, Hà Nội",
    time: "8h30 - 22h00",
    map: "https://www.google.com/maps/place/WatchStore/@21.0366373,105.7942268,15z/data=!4m6!3m5!1s0x3135ab8240f68067:0x1a7efdd84f63ac8a!8m2!3d21.0366373!4d105.7942268!16s%2Fg%2F11kj8qfqbc?coh=178572&entry=tt&shorturl=1",
  },
];

export const BRANCH_HO_CHI_MINH = [
  {
    address: "90 Lê Văn Sỹ, P11, Quận Phú Nhuận, HCM",
    time: "8h30 - 22h00",
    map: "https://www.google.com/maps/place/Watchstore.vn/@10.7912455,106.6725224,15z/data=!4m6!3m5!1s0x317529d0425fcf4d:0xcc044f35741f7f05!8m2!3d10.7912455!4d106.6725224!16s%2Fg%2F11krmsv_42?hl=vi&entry=tts&shorturl=1",
  },
  {
    address: "61 Quang Trung, P10, Gò Vấp, HCM",
    time: "8h30 - 22h00",
    map: "https://www.google.com/maps/place/WatchStore/@10.8274153,106.6768045,19z/data=!4m6!3m5!1s0x317529675a34e6c3:0x54bf994612a03bf3!8m2!3d10.8274409!4d106.6767972!16s%2Fg%2F11txv96ycx?coh=178572&entry=tt&shorturl=1",
  },
  {
    address: "193 Lê Quang Định, P7, Bình Thạnh, HCM",
    time: "8h30 - 22h00",
    map: "https://www.google.com/maps/place/WatchStore/@10.8087259,106.6940025,15z/data=!4m6!3m5!1s0x317529b8b560631b:0x1be9856b4fed50f7!8m2!3d10.8087397!4d106.6940116!16s%2Fg%2F11v69s_qkr?hl=vi&entry=tts&shorturl=1",
  },
];

export enum ORDER_STATUS {
  WAIT_VERIFY = "waitVerify",
  VERIFY = "verified",
  WAIT_RECEIVE = "waitReceive",
  RECEIVED = "received",
  CANCELLED = "cancelled",
}

export enum PAYMENT_STATUS {
  PAID = "paid",
  NOT_PAID = "not-paid",
}

export const PRICE_FILTER = [
  {
    label: "0 - 2Tr",
    id: "0 - 2",
    from: "0",
    to: "2000000",
  },
  {
    label: "2Tr - 4Tr",
    id: "2 - 4",
    from: "2000000",
    to: "4000000",
  },
  {
    label: "4Tr - 6Tr",
    id: "4 - 6",
    from: "4000000",
    to: "6000000",
  },
  {
    label: "6Tr - 8Tr",
    id: "6 - 8",
    from: "6000000",
    to: "8000000",
  },
  {
    label: "10Tr - 20Tr",
    id: "10 - 20",
    from: "10000000",
    to: "20000000",
  },
  {
    label: "20Tr - 40Tr",
    id: "20 - 40",
    from: "20000000",
    to: "40000000",
  },
  {
    label: "40Tr - 100Tr",
    id: "40 - 100",
    from: "40000000",
    to: "100000000",
  },
  {
    label: "+100Tr",
    id: "100+",
    from: "100000000",
    to: "999999999",
  },
];

export const GLASS_SURFACE_MATERIAL_FILTER = [
  {
    label: "Kính Sapphire",
    key: "sapphire",
  },
  {
    label: "Kính Nhựa",
    key: "plastic",
  },
  {
    label: "Kính Khoáng",
    key: "mineral",
  },
  {
    label: "Hardlex Crystal",
    key: "hardlex",
  },
  {
    label: "Kính Cong",
    key: "curved",
  },
];

export const FACE_SHAPE_FILTER = [
  {
    label: "Mặt tròn",
    key: "round",
  },
  {
    label: "Mặt chữ nhật",
    key: "rectangular",
  },
  {
    label: "Mặt vuông",
    key: "square",
  },
];

export const WATER_RESISTANCE_FILTER = [
  {
    label: "3atm",
    key: "3atm",
  },
  {
    label: "5atm",
    key: "5atm",
  },
  {
    label: "10atm",
    key: "10atm",
  },
  {
    label: "20atm",
    key: "20atm",
  },
  {
    label: "30atm",
    key: "30atm",
  },
];

export enum FACE_SHAPE {
  ROUND = "round",
  RECTANGULAR = "rectangular",
}

export enum GLASS_SURFACE_MATERIAL {
  MINERAL = "mineral",
  PLASTIC = "plastic",
  SAPPHIRE = "sapphire",
  HARDLEX = "hardlex",
}
