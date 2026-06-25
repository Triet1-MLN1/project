export interface ScenarioDisplay {
  id: number;
  title: string;
  image: string | string[]; // Đường dẫn ảnh câu đố (hỗ trợ ảnh đơn hoặc mảng 2 ảnh)
  correctAnswer: string; // Đáp án đúng để check
  suggestion: string; // Gợi ý cho người chơi
  description: string; // Giải thích sau khi hiện đáp án
  philosophicalNote: string | null; // Phân tích Triết học
}

export const SCENARIOS: ScenarioDisplay[] = [
  {
    id: 1,
    title: "Câu hỏi 1",
    image: "/images/image4.png",
    correctAnswer: "Khoa học công nghệ",
    suggestion: "Cụm từ gồm 4 chữ (K... H... C... N...). Đây là nhân tố cực kỳ quan trọng thúc đẩy lực lượng sản xuất phát triển nhanh chóng.",
    description: "Thúc đẩy sự phát triển của khoa học và công nghệ, chuyển lao động thủ công sang cơ khí hóa, tự động hóa và tin học hóa.",
    philosophicalNote: "Khoa học ngày nay đã trở thành lực lượng sản xuất trực tiếp.",
  },
  {
    id: 2,
    title: "Câu hỏi 2",
    image: "/images/image15.png",
    correctAnswer: "Sản xuất xã hội",
    suggestion: "Cụm từ gồm 4 chữ (S... X... X... H...). Việc liên kết các doanh nghiệp, ngành kinh tế và quốc gia giúp thực hiện quá trình này.",
    description: "Thực hiện xã hội hóa sản xuất, thúc đẩy phân công lao động xã hội, tăng cường chuyên môn hóa và hợp tác lao động.",
    philosophicalNote: "Mâu thuẫn cơ bản của CNTB là mâu thuẫn giữa tính chất xã hội hóa của lực lượng sản xuất với chế độ chiếm hữu tư nhân tư bản chủ nghĩa.",
  },
  {
    id: 3,
    title: "Câu hỏi 3",
    image: "/images/surplus_value.png",
    correctAnswer: "Giá trị thặng dư",
    suggestion: "Cụm từ gồm 4 chữ (G... T... T... D...). Đây là mục đích sản xuất tối cao của giai cấp tư sản và là bản chất của sự bóc lột tư bản chủ nghĩa.",
    description: "Người lao động phải bán sức lao động cho nhà tư bản và bị bóc lột phần giá trị dôi ra ngoài giá trị sức lao động.",
    philosophicalNote: "Quy luật giá trị thặng dư là quy luật kinh tế tuyệt đối của chủ nghĩa tư bản.",
  },
  {
    id: 4,
    title: "Câu hỏi 4",
    image: "/images/monopoly.png",
    correctAnswer: "Độc quyền",
    suggestion: "Cụm từ gồm 2 chữ (Đ... Q...). Đây là một giới hạn lớn của chủ nghĩa tư bản khi tư liệu sản xuất tập trung vào tay một số ít tập đoàn lớn.",
    description: "Monopoly (Độc quyền) có khả năng cản trở sự tiến bộ kỹ thuật, áp đặt giá bán cao, ép giá mua thấp và hạn chế sản lượng.",
    philosophicalNote: "Độc quyền sinh ra từ tự do cạnh tranh nhưng lại phủ định tự do cạnh tranh, tạo nên các mâu thuẫn sâu sắc.",
  },
  {
    id: 5,
    title: "Câu hỏi 5",
    image: ["/images/image1.jpg", "/images/image14.jpg"],
    correctAnswer: "Tư sản",
    suggestion: "Đuổi hình bắt chữ: Số 4 (Tư) + Khay nướng thịt/Hải sản (Sản). Giai cấp thống trị nắm giữ tư liệu sản xuất.",
    description: "Mục đích sản xuất của chủ nghĩa tư bản suy cho cùng là vì lợi ích của giai cấp tư sản.",
    philosophicalNote: "Giai cấp tư sản tích lũy của cải dựa trên việc chiếm đoạt lao động thặng dư của giai cấp vô sản.",
  },
  {
    id: 6,
    title: "Câu hỏi 6",
    image: ["/images/image8.jpg", "/images/image17.jpg"],
    correctAnswer: "Công nghệ",
    suggestion: "Đuổi hình bắt chữ: Con chim công (Công) + Món ăn ướp nghệ (Nghệ). Yếu tố cốt lõi trong các cuộc cách mạng công nghiệp.",
    description: "Chủ nghĩa tư bản thúc đẩy sự phát triển của khoa học công nghệ, nâng cao hiệu quả và năng suất lao động.",
    philosophicalNote: "Sự phát triển công nghệ thúc đẩy sự thay đổi của toàn bộ lực lượng sản xuất.",
  },
  {
    id: 7,
    title: "Câu hỏi 7",
    image: ["/images/image16.jpg", "/images/image5.jpg"],
    correctAnswer: "Lợi ích",
    suggestion: "Đuổi hình bắt chữ: Phần nướu răng (Lợi) + Chữ X màu đen (Ích). Mục đích sản xuất của giai cấp tư sản là vì...",
    description: "Sản xuất trong chủ nghĩa tư bản hướng tới lợi ích của giai cấp thống trị chứ không vì lợi ích của số đông người lao động.",
    philosophicalNote: "Lợi ích kinh tế là động lực trực tiếp dẫn dắt hành vi của các nhà tư bản.",
  },
  {
    id: 8,
    title: "Câu hỏi 8",
    image: ["/images/image10.jpg", "/images/image11.jpg"],
    correctAnswer: "Quy mô",
    suggestion: "Đuổi hình bắt chữ: Con rùa (Quy) + Mô hình Zoro (Mô). Việc chuyển sang sản xuất lớn giúp mở rộng...",
    description: "Mở rộng quy mô sản xuất giúp tăng năng suất lao động, tạo ra lượng hàng hóa lớn và đa dạng.",
    philosophicalNote: "Quy mô sản xuất lớn phản ánh trình độ xã hội hóa cao của lực lượng sản xuất.",
  },
  {
    id: 9,
    title: "Câu hỏi 9",
    image: ["/images/image2.jpg", "/images/image13.jpg"],
    correctAnswer: "Ép giá",
    suggestion: "Đuổi hình bắt chữ: Máy ép hoa quả (Ép) + Bát giá đỗ (Giá). Hành vi của tập đoàn độc quyền đối với các nhà sản xuất nhỏ.",
    description: "Các tổ chức độc quyền áp đặt giá bán cao và ép giá mua thấp đối với các đối thủ nhỏ hơn và người tiêu dùng.",
    philosophicalNote: "Giá cả độc quyền là biểu hiện của sự thống trị kinh tế của các tập đoàn độc quyền.",
  }
];

export interface RandomEventDisplay {
  id: string;
  name: string;
  description: string;
  icon: string;
  effects: { money: number; alienation: number; freedom: number };
}

export const RANDOM_EVENTS_DISPLAY: Record<string, RandomEventDisplay> = {
  global_crisis: {
    id: "global_crisis",
    name: "Khủng hoảng niềm tin",
    description: "Tâm lý hoang mang lan rộng làm giảm điểm tích lũy của các đơn vị.",
    icon: "📉",
    effects: { money: -50, alienation: 0, freedom: 0 },
  },
};