import c1Img from "./public/c1.png";
import c2Img from "./public/c2.png";
import c3Img from "./public/c3.png";
import c4Img from "./public/c4.png";
import c5Img from "./public/c5.png";
import c6Img from "./public/c6.png";
import c7Img from "./public/c7.png";

export interface ScenarioDisplay {
  id: number;
  title: string;
  image: string; // Đường dẫn ảnh câu đố
  correctAnswer: string; // Đáp án đúng để check
  suggestion: string; // Gợi ý cho người chơi
  description: string; // Giải thích sau khi hiện đáp án
  philosophicalNote: string; // Phân tích Kinh tế chính trị
}

export const SCENARIOS: ScenarioDisplay[] = [
  {
    id: 1,
    title: "Câu hỏi 1",
    image: c1Img,
    correctAnswer: "Độc lập tự chủ",
    suggestion: "Nền kinh tế không phụ thuộc bên ngoài (15 chữ cái)",
    description:
      "Độc lập tự chủ là mục tiêu cốt lõi trong hội nhập, giúp Việt Nam không bị chi phối về chính sách và định hướng phát triển.",
    philosophicalNote: null,
  },
  {
    id: 2,
    title: "Câu hỏi 2",
    image: c2Img,
    correctAnswer: "Chủ quyền quốc gia",
    suggestion: "Quyền tối cao của một quốc gia (17 chữ cái)",
    description:
      "Chủ quyền quốc gia là nền tảng đảm bảo sự ổn định chính trị, kinh tế và bảo vệ lợi ích quốc gia trong hội nhập.",
    philosophicalNote: null,
  },
  {
    id: 3,
    title: "Câu hỏi 3",
    image: c3Img,
    correctAnswer: "Công nghiệp hóa hiện đại hóa",
    suggestion: "Quá trình phát triển kinh tế bằng công nghệ và sản xuất (30 chữ cái)",
    description:
      "Công nghiệp hóa, hiện đại hóa giúp nâng cao trình độ sản xuất và là con đường tất yếu để phát triển đất nước.",
    philosophicalNote: null,
  },
  {
    id: 4,
    title: "Câu hỏi 4",
    image: c4Img,
    correctAnswer: "Năng lực cạnh tranh",
    suggestion: "Yếu tố quyết định thắng thua trên thị trường (18 chữ cái)",
    description:
      "Nâng cao năng lực cạnh tranh giúp doanh nghiệp và quốc gia đứng vững trong môi trường toàn cầu hóa.",
    philosophicalNote: null,
  },
  {
    id: 5,
    title: "Câu hỏi 5",
    image: c5Img,
    correctAnswer: "Hội nhập kinh tế quốc tế",
    suggestion: "Quá trình gắn kết nền kinh tế với thế giới (27 chữ cái)",
    description:
      "Hội nhập kinh tế quốc tế mở ra cơ hội phát triển nhưng cũng đặt ra nhiều thách thức cần vượt qua.",
    philosophicalNote: null,
  },
  {
    id: 6,
    title: "Câu hỏi 6",
    image: c6Img,
    correctAnswer: "Thu hút đầu tư nước ngoài",
    suggestion: "Dòng vốn từ bên ngoài vào trong nước (27 chữ cái)",
    description:
      "Thu hút đầu tư nước ngoài giúp bổ sung vốn, công nghệ và kinh nghiệm quản lý cho nền kinh tế.",
    philosophicalNote:
      "Trong hội nhập kinh tế quốc tế, việc thu hút đầu tư nước ngoài là tất yếu để phát triển lực lượng sản xuất, nhưng cần kiểm soát để tránh phụ thuộc.",
  },
  {
    id: 7,
    title: "Câu hỏi 7",
    image: c7Img,
    correctAnswer: "Mở rộng thị trường",
    suggestion: "Tăng phạm vi tiêu thụ hàng hóa ra thế giới (20 chữ cái)",
    description:
      "Mở rộng thị trường giúp doanh nghiệp tăng doanh thu và nâng cao vị thế cạnh tranh quốc tế.",
    philosophicalNote:
      "Hội nhập kinh tế giúp phá bỏ rào cản thương mại, tạo điều kiện mở rộng thị trường, nhưng cũng làm gia tăng áp lực cạnh tranh.",
  }
];

// Giữ lại cấu trúc này để tránh lỗi hệ thống, nhưng trong game Đuổi hình bắt chữ 
// chúng ta có thể ít dùng đến các sự kiện trừ điểm này hơn.
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
    name: "Khủng hoảng tài chính",
    description: "Thị trường thế giới biến động mạnh làm giảm điểm tích lũy của các đơn vị.",
    icon: "📉",
    effects: { money: -50, alienation: 0, freedom: 0 },
  },
};