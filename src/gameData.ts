export type ScenarioType = "catchphrase" | "choice";

export interface ScenarioDisplay {
  id: number;
  type: ScenarioType;
  title: string;
  question: string;
  image?: string | string[]; // Đường dẫn ảnh gợi ý (dành cho câu đuổi hình bắt chữ)
  options?: string[]; // Danh sách 4 đáp án (A, B, C, D) cho câu trắc nghiệm
  correctAnswer: string; // Đáp án đúng ("B" hoặc "Nhân dân", v.v.)
  suggestion?: string; // Gợi ý cho người chơi
  description: string; // Giải thích học thuật sau khi hiện kết quả
  philosophicalNote?: string | null;
}

export const SCENARIOS: ScenarioDisplay[] = [
  {
    id: 1,
    type: "choice",
    title: "Câu 1: Chế độ chính trị",
    question: "Theo Hồ Chí Minh, mục tiêu cao nhất về chế độ chính trị của chủ nghĩa xã hội là gì?",
    options: [
      "A. Xây dựng một chính phủ mạnh mẽ và tập quyền.",
      "B. Xây dựng chế độ dân chủ, trong đó nhân dân làm chủ.",
      "C. Thiết lập hệ thống quản lý dựa trên các chuyên gia kỹ thuật.",
      "D. Xây dựng nền chính trị tách biệt hoàn toàn với kinh tế."
    ],
    correctAnswer: "B",
    suggestion: "Nhân dân làm chủ là bản chất cốt lõi của nền dân chủ XHCN.",
    description: "Hồ Chí Minh khẳng định: 'Chế độ ta là chế độ dân chủ. Tức là nhân dân làm chủ'. Toàn bộ quyền lực và lợi ích tối cao đều thuộc về nhân dân.",
    philosophicalNote: "Quyền lực không thuộc về thiểu số bóc lột mà là sự phát triển vượt bậc của truyền thống 'lấy dân làm gốc'.",
  },
  {
    id: 2,
    type: "catchphrase",
    title: "Câu 2: Đuổi hình bắt chữ",
    question: "Hồ Chí Minh ví Đảng Cộng sản giữ vai trò gì trong sự nghiệp xây dựng xã hội mới và chèo lái con thuyền cách mạng?",
    image: "/images/game_cam_lai.svg",
    correctAnswer: "Người cầm lái",
    suggestion: "Cụm từ gồm 3 chữ (N... C... L...). Người đứng ở đầu sóng ngọn gió, điều khiển con tàu vượt qua mọi thác ghềnh.",
    description: "Đảng Cộng sản giữ vai trò như 'người cầm lái' cho con thuyền cách mạng, dẫn dắt toàn dân tộc vượt qua phong ba bão táp tới bến bờ thắng lợi.",
    philosophicalNote: "Chỉ có sự lãnh đạo sáng suốt, trong sạch của Đảng mới quy tụ được sức mạnh tổng hợp của toàn dân tộc.",
  },
  {
    id: 3,
    type: "choice",
    title: "Câu 3: Mục tiêu kinh tế",
    question: "Mục tiêu về kinh tế của chủ nghĩa xã hội ở Việt Nam được Hồ Chí Minh xác định như thế nào?",
    options: [
      "A. Là nền kinh tế tập trung vào nông nghiệp truyền thống.",
      "B. Là nền kinh tế phát triển cao với công nghiệp, nông nghiệp hiện đại và khoa học kỹ thuật tiên tiến.",
      "C. Là nền kinh tế thị trường tự do hoàn toàn không có sự quản lý của nhà nước.",
      "D. Là nền kinh tế dựa trên việc khai thác tài nguyên thiên nhiên là chính."
    ],
    correctAnswer: "B",
    suggestion: "Gắn liền với công nghiệp hóa, hiện đại hóa và ứng dụng khoa học kỹ thuật.",
    description: "Mục tiêu kinh tế XHCN là xây dựng nền kinh tế phát triển cao gắn liền với công nghiệp và nông nghiệp hiện đại, khoa học kỹ thuật tiên tiến trên nền tảng sở hữu toàn dân và tập thể.",
    philosophicalNote: "Lực lượng sản xuất hiện đại kết hợp với quan hệ sản xuất tiến bộ là cơ sở nâng cao đời sống nhân dân.",
  },
  {
    id: 4,
    type: "catchphrase",
    title: "Câu 4: Đuổi hình bắt chữ",
    question: "Hồ Chí Minh dùng câu tục ngữ dân gian nào để nhấn mạnh kinh tế phải đi trước một bước làm tiền đề vật chất cho văn hóa?",
    image: "/images/game_co_thuc.svg",
    correctAnswer: "Có thực mới vực được đạo",
    suggestion: "Câu tục ngữ gồm 6 chữ (C... T... M... V... Đ... Đ...). Có ăn no ấm bụng thì mới thực hiện được đạo lý, học hành và xây dựng đời sống văn hóa.",
    description: "Người mượn câu 'Có thực mới vực được đạo' để chỉ rõ: kinh tế là nền tảng vật chất, phải đi trước một bước thì văn hóa, giáo dục và đạo đức mới có điều kiện thăng hoa.",
    philosophicalNote: "Văn hóa và kinh tế có quan hệ biện chứng: kinh tế quyết định tiền đề, còn văn hóa đóng vai trò động lực thúc đẩy kinh tế.",
  },
  {
    id: 5,
    type: "choice",
    title: "Câu 5: Văn hóa XHCN",
    question: "Để phục vụ đắc lực cho sự nghiệp cách mạng, nền văn hóa xã hội chủ nghĩa phải có nội dung và hình thức như thế nào?",
    options: [
      "A. Nội dung dân tộc và hình thức xã hội chủ nghĩa.",
      "B. Nội dung xã hội chủ nghĩa và hình thức dân tộc.",
      "C. Nội dung khoa học và hình thức quốc tế.",
      "D. Nội dung đại chúng và hình thức thuộc địa."
    ],
    correctAnswer: "B",
    suggestion: "Nội dung mang bản chất tiến bộ của XHCN, hình thức mang đậm đà bản sắc dân tộc Việt Nam.",
    description: "Văn hóa mới phải 'xã hội chủ nghĩa về nội dung và dân tộc về hình thức' - vừa mang tính khoa học, đại chúng, vừa kế thừa tinh hoa truyền thống ngàn đời của dân tộc.",
    philosophicalNote: "Văn hóa soi đường cho quốc dân đi, nâng cao dân trí để phục vụ sự nghiệp khôi phục kinh tế và củng cố dân chủ.",
  },
  {
    id: 6,
    type: "catchphrase",
    title: "Câu 6: Đuổi hình bắt chữ",
    question: "Hồ Chí Minh khẳng định 'địa vị cao nhất' trong nước ta thuộc về ai?",
    image: "/images/game_nhan_dan.svg",
    correctAnswer: "Nhân dân",
    suggestion: "Cụm từ gồm 2 chữ (N... D...). Lực lượng đông đảo nhất, người chủ nhân đích thực của non sông đất nước.",
    description: "Bác khẳng định: 'Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ'. Mọi chủ trương, đường lối đều phải xuất phát từ lợi ích của nhân dân.",
    philosophicalNote: "'Dân như nước, chở thuyền là dân mà lật thuyền cũng là dân'. Nhân dân là cội nguồn sức mạnh vô địch.",
  },
  {
    id: 7,
    type: "choice",
    title: "Câu 7: Động lực lợi ích",
    question: "Câu dạy của Hồ Chí Minh: 'Việc gì có lợi cho dân phải hết sức làm, việc gì có hại cho dân phải hết sức tránh' nói về động lực nào?",
    options: [
      "A. Động lực dân chủ.",
      "B. Động lực lợi ích của dân.",
      "C. Động lực đại đoàn kết.",
      "D. Động lực văn hóa."
    ],
    correctAnswer: "B",
    suggestion: "Lợi ích thiết thực, ấm no, hạnh phúc của người dân là mục tiêu hàng đầu.",
    description: "Hồ Chí Minh coi trọng động lực lợi ích thiết thực của nhân dân, kết hợp hài hòa lợi ích cá nhân với lợi ích tập thể và toàn xã hội.",
    philosophicalNote: "Động lực vật chất chính đáng kết hợp với giáo dục tinh thần sẽ tạo ra sức mạnh thúc đẩy xã hội phát triển.",
  },
  {
    id: 8,
    type: "catchphrase",
    title: "Câu 8: Đuổi hình bắt chữ",
    question: "Theo Hồ Chí Minh: 'Muốn xây dựng chủ nghĩa xã hội, trước hết cần có...' nhân tố trung tâm nào?",
    image: "/images/game_con_nguoi.svg",
    correctAnswer: "Con người xã hội chủ nghĩa",
    suggestion: "Cụm từ gồm 6 chữ (C... N... X... H... C... N...). Vừa có tài vừa có đức, vừa 'hồng' vừa 'chuyên'.",
    description: "Con người vừa là mục tiêu vừa là động lực chính. Muốn xây dựng thành công CNXH, trước hết phải đào tạo, bồi dưỡng những con người mới có giác ngộ XHCN và đạo đức cách mạng.",
    philosophicalNote: "Con người XHCN cần có ý thức làm chủ, cần kiệm liêm chính, quét sạch chủ nghĩa cá nhân và thói quan liêu.",
  },
  {
    id: 9,
    type: "choice",
    title: "Câu 9: Chống giặc nội xâm",
    question: "'Kẻ địch bên trong' vô cùng nguy hiểm mà Hồ Chí Minh nhắc nhở phải quyết liệt chống lại là gì?",
    options: [
      "A. Sự phát triển của các ngành công nghiệp.",
      "B. Chủ nghĩa cá nhân, quan liêu, tham ô, lãng phí.",
      "C. Tinh thần học hỏi tinh hoa văn hóa nhân loại.",
      "D. Các hoạt động sản xuất kinh doanh của nhân dân."
    ],
    correctAnswer: "B",
    suggestion: "Là 'giặc nội xâm' đục khoét làm suy yếu tổ chức từ bên trong.",
    description: "Chủ nghĩa cá nhân, quan liêu, tham ô, lãng phí được Bác coi là 'giặc ở trong lòng', là kẻ thù nguy hiểm của chủ nghĩa xã hội cần phải triệt để bài trừ.",
    philosophicalNote: "Chống giặc nội xâm là nhiệm vụ sống còn để giữ gìn sự trong sạch, vững mạnh của Đảng và Nhà nước.",
  },
  {
    id: 10,
    type: "catchphrase",
    title: "Câu 10: Đuổi hình bắt chữ",
    question: "Phương châm hành động mang tính quy luật phát triển được coi là nét đặc sắc xuyên suốt tư tưởng Hồ Chí Minh là gì?",
    image: "/images/game_xay_chong.svg",
    correctAnswer: "Xây đi đôi với chống",
    suggestion: "Cụm từ gồm 5 chữ (X... Đ... Đ... V... C...). Xây dựng những giá trị mới tốt đẹp song hành cùng việc kiên quyết loại bỏ những thói hư tật xấu.",
    description: "Xây dựng các yếu tố mới XHCN là nhiệm vụ cơ bản, lâu dài; đồng thời phải kiên quyết chống lại các tàn dư lạc hậu để bảo vệ vững chắc thành quả cách mạng.",
    philosophicalNote: "Phương châm 'Xây đi đôi với chống' thể hiện sâu sắc quy luật phủ định biện chứng và thực tiễn cách mạng Việt Nam.",
  },
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