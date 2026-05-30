export interface CatchphraseQuestion {
  image: string;
  answer: string;
  suggestion: string;
}

// Dữ liệu mẫu (sử dụng placeholder images hoặc các hình ảnh thực tế nếu có url)
export const catchphraseData: CatchphraseQuestion[] = [
  {
    image: "https://placehold.co/600x400/png?text=Bao+Cấp",
    answer: "bao cấp",
    suggestion: "Một thời kỳ kinh tế ở Việt Nam trước Đổi Mới.",
  },
  {
    image: "https://placehold.co/600x400/png?text=Tư+Bản",
    answer: "tư bản",
    suggestion: "Tên một hình thái kinh tế - xã hội, cũng là tên một cuốn sách nổi tiếng của Karl Marx.",
  },
  {
    image: "https://placehold.co/600x400/png?text=Lạm+Phát",
    answer: "lạm phát",
    suggestion: "Hiện tượng tiền mất giá, giá cả hàng hóa tăng cao.",
  },
  {
    image: "https://placehold.co/600x400/png?text=Cổ+Phiếu",
    answer: "cổ phiếu",
    suggestion: "Giấy chứng nhận số tiền nhà đầu tư đóng góp vào công ty cổ phần.",
  },
  {
    image: "https://placehold.co/600x400/png?text=Độc+Quyền",
    answer: "độc quyền",
    suggestion: "Sự thống trị của một hoặc một vài doanh nghiệp lớn trên thị trường.",
  },
  {
    image: "https://placehold.co/600x400/png?text=Thặng+Dư",
    answer: "thặng dư",
    suggestion: "Phần giá trị dôi ra ngoài giá trị sức lao động do công nhân làm ra.",
  },
  {
    image: "https://placehold.co/600x400/png?text=Ngoại+Tệ",
    answer: "ngoại tệ",
    suggestion: "Đồng tiền của quốc gia khác.",
  },
];
