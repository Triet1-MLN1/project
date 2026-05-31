export interface RawQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export const rawQuestions: RawQuestion[] = [
  {
    id: 1,
    question: "Sản xuất là hoạt động có ... và không ngừng ... nhằm thỏa mãn ... tồn tại và phát triển của con người. Từ còn thiếu là?",
    options: [
      "A. Mục đích/sáng tạo/nhu cầu",
      "B. Sáng tạo/lao động/nhu cầu",
      "C. Nhu cầu/sáng tạo/mục đích",
      "D. Mục đích/lao động/đòi hỏi"
    ],
    answer: "A"
  },
  {
    id: 2,
    question: "Sự sản xuất xã hội bao gồm:",
    options: [
      "A. Sản xuất vật chất; sản xuất tinh thần và sản xuất ra chính bản thân con người",
      "B. Sản xuất vật chất và sản xuất ra chính bản thân con người",
      "C. Sản xuất công nghiệp và sản xuất nông nghiệp",
      "D. Sản xuất hàng hóa và dịch vụ"
    ],
    answer: "A"
  },
  {
    id: 3,
    question: "Sản xuất vật chất là quá trình mà trong đó con người sử dụng ... tác động ..., từ còn thiếu là?",
    options: [
      "A. Công cụ lao động/trực tiếp hay gián tiếp vào tự nhiên",
      "B. Sức của mình/trực tiếp hay gián tiếp vào tự nhiên",
      "C. Trí tuệ/trực tiếp vào xã hội",
      "D. Khoa học/vào môi trường"
    ],
    answer: "A"
  },
  {
    id: 4,
    question: "Phương thức sản xuất là:",
    options: [
      "A. Cách thức con người sản xuất vật chất ở mỗi giai đoạn lịch sử nhất định",
      "B. Cách thức con người quan hệ với nhau trong sản xuất",
      "C. Cách thức phân phối của cải trong xã hội",
      "D. Quá trình lao động tạo ra của cải"
    ],
    answer: "A"
  },
  {
    id: 5,
    question: "Lịch sử xã hội loài người đã và đang trải qua mấy phương thức sản xuất?",
    options: [
      "A. 5 phương thức sản xuất",
      "B. 4 phương thức sản xuất",
      "C. 6 phương thức sản xuất",
      "D. 3 phương thức sản xuất"
    ],
    answer: "A"
  },
  {
    id: 6,
    question: "Lực lượng sản xuất bao gồm:",
    options: [
      "A. Người lao động và tư liệu sản xuất",
      "B. Tư liệu lao động và đối tượng lao động",
      "C. Tư liệu sản xuất và đối tượng sản xuất",
      "D. Công cụ lao động và người lao động"
    ],
    answer: "A"
  },
  {
    id: 7,
    question: "Quan hệ sản xuất bao gồm:",
    options: [
      "A. Quan hệ sở hữu về tư liệu sản xuất",
      "B. Quan hệ tổ chức quản lý sản xuất",
      "C. Quan hệ phân phối sản phẩm",
      "D. Ba nhận định trên đúng"
    ],
    answer: "D"
  },
  {
    id: 8,
    question: "Sự thống nhất giữa lực lượng sản xuất ở một trình độ nhất định và quan hệ sản xuất tương ứng tạo thành:",
    options: [
      "A. Phương thức sản xuất",
      "B. Cơ sở hạ tầng",
      "C. Kiến trúc thượng tầng",
      "D. Hình thái kinh tế - xã hội"
    ],
    answer: "A"
  },
  {
    id: 9,
    question: "Yếu tố nào là yếu tố thường xuyên biến đổi nhất trong lực lượng sản xuất?",
    options: [
      "A. Người lao động",
      "B. Công cụ lao động",
      "C. Đối tượng lao động",
      "D. Trình độ kỹ thuật"
    ],
    answer: "B"
  },
  {
    id: 10,
    question: "Yếu tố chủ thể hàng đầu của lực lượng sản xuất là:",
    options: [
      "A. Người lao động",
      "B. Tư liệu lao động",
      "C. Công cụ lao động",
      "D. Phương tiện lao động"
    ],
    answer: "A"
  },
  {
    id: 11,
    question: "Trong 3 mặt của quan hệ sản xuất thì mặt quan hệ nào là cơ bản?",
    options: [
      "A. Quan hệ sở hữu tư liệu sản xuất",
      "B. Quan hệ tổ chức quản lý",
      "C. Quan hệ phân phối sản phẩm",
      "D. Quan hệ tiêu dùng"
    ],
    answer: "A"
  },
  {
    id: 12,
    question: "Cơ sở hạ tầng của xã hội bao gồm?",
    options: [
      "A. Quan hệ sản xuất thống trị",
      "B. Quan hệ tàn dư của xã hội cũ",
      "C. Quan hệ sản xuất mầm mống",
      "D. Ba nhận định trên đúng"
    ],
    answer: "D"
  },
  {
    id: 13,
    question: "Kiến trúc thượng tầng là?",
    options: [
      "A. Những quan điểm, tư tưởng và các thiết chế xã hội được hình thành trên cơ sở hạ tầng",
      "B. Các quan hệ sản xuất có trong xã hội",
      "C. Các hệ tư tưởng của giai cấp thống trị",
      "D. Hệ thống pháp luật và nhà nước"
    ],
    answer: "A"
  },
  {
    id: 14,
    question: "Yếu tố cơ bản nào tạo thành tồn tại xã hội?",
    options: [
      "A. Điều kiện tự nhiên, hoàn cảnh địa lý",
      "B. Dân số và mật độ dân số",
      "C. Phương thức sản xuất vật chất",
      "D. Ba nhận định trên đúng"
    ],
    answer: "D"
  },
  {
    id: 15,
    question: "Ý thức xã hội là gì?",
    options: [
      "A. Chỉ toàn bộ sinh hoạt tinh thần của xã hội",
      "B. Chỉ toàn bộ sinh hoạt vật chất của xã hội",
      "C. Là những tập tục truyền thống",
      "D. Là khoa học và triết học"
    ],
    answer: "A"
  },
  {
    id: 16,
    question: "Dựa vào trình độ và phương thức phản ánh tồn tại xã hội thì ý thức xã hội được chia thành:",
    options: [
      "A. Tâm lý xã hội và hệ tư tưởng xã hội",
      "B. Ý thức cá nhân và ý thức cộng đồng",
      "C. Ý thức kinh nghiệm và ý thức lý luận",
      "D. Ý thức thông thường và khoa học"
    ],
    answer: "A"
  },
  {
    id: 17,
    question: "Con người là:",
    options: [
      "A. Thực thể sinh học và thực thể xã hội",
      "B. Tổng hòa các mối quan hệ xã hội",
      "C. Thực thể tự nhiên",
      "D. Sản phẩm của thượng đế"
    ],
    answer: "A"
  },
  {
    id: 18,
    question: "Bản chất con người là:",
    options: [
      "A. Tổng hòa những quan hệ xã hội",
      "B. Kết quả quá trình tiến hóa của giới tự nhiên",
      "C. Sự tác động vào giới tự nhiên",
      "D. Khát vọng tự do"
    ],
    answer: "A"
  },
  {
    id: 19,
    question: "Khi cơ sở kinh tế thay đổi thì toàn bộ cái kiến trúc thượng tầng đồ sộ cũng bị đảo lộn ít nhiều nhanh chóng. Ai đã nói?",
    options: [
      "A. Mác",
      "B. Lênin",
      "C. Ăng ghen",
      "D. Hồ Chí Minh"
    ],
    answer: "A"
  },
  {
    id: 20,
    question: "Ý thức thông thường là toàn bộ những tri thức, quan niệm của con người trong cộng đồng người được hình thành ... từ hoạt động ... chưa được hệ thống hóa, khái quát hóa thành lý luận. Từ còn thiếu là?",
    options: [
      "A. Trực tiếp/thực tiễn",
      "B. Thực tiễn/trực tiếp",
      "C. Tự phát/sản xuất",
      "D. Khách quan/xã hội"
    ],
    answer: "A"
  }
];