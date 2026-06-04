export interface ScenarioDisplay {
  id: number;
  title: string;
  image: string; // Đường dẫn ảnh câu đố
  correctAnswer: string; // Đáp án đúng để check
  suggestion: string; // Gợi ý cho người chơi
  description: string; // Giải thích sau khi hiện đáp án
  philosophicalNote: string | null; // Phân tích Triết học
}

export const SCENARIOS: ScenarioDisplay[] = [
  {
    id: 1,
    title: "Câu hỏi 1",
    image: "/cau1.jfif",
    correctAnswer: "Tâm lý xã hội",
    suggestion: "Cụm từ gồm 3 chữ (T... L... X...). Đây là một tầng bậc, một cấp độ của ý thức xã hội. Nó bao gồm toàn bộ những tình cảm, ước muốn, thói quen, nếp sống, nếp nghĩ, phong tục và tập quán của một cộng đồng người.",
    description: "Khác với những học thuyết triết học hay chính trị cao siêu được nghiên cứu bài bản, cấp độ này nảy sinh một cách trực tiếp, tự phát từ điều kiện sống hàng ngày và phản ánh trực tiếp đời sống vật chất của con người.",
    philosophicalNote: "Ở cấp độ này, ý thức thường bảo thủ và có tính 'sức ỳ' rất lớn.",
  },
  {
    id: 2,
    title: "Câu hỏi 2",
    image: "/cau2.jfif",
    correctAnswer: "Ý thức pháp quyền",
    suggestion: "Cụm từ gồm 3 chữ (Ý... T... P...). Đây là một hình thái ý thức xã hội vô cùng quan trọng, thường đi liền như 'hình với bóng' với ý thức chính trị.",
    description: "Nó bao gồm toàn bộ những quan niệm, quan điểm về tính hợp pháp hay không hợp pháp của các hành vi, về sự công bằng hay không công bằng.",
    philosophicalNote: "Trong xã hội có giai cấp, đây chính là 'công cụ' tinh thần sắc bén nhất để giai cấp thống trị thể hiện ý chí của mình và bắt các giai cấp khác phải tuân theo thông qua các đạo luật và bộ máy nhà nước.",
  },
  {
    id: 3,
    title: "Câu hỏi 3",
    image: "/cau3.jfif",
    correctAnswer: "Ý thức tôn giáo",
    suggestion: "Cụm từ gồm 3 chữ (Ý... T... T...). Hình thái ý thức xã hội này là một sự phản ánh hoang đường, hư ảo những sức mạnh của giới tự nhiên và xã hội vào trong đầu óc con người.",
    description: "Theo Triết học Mác - Lênin, nó ra đời khi con người cảm thấy yếu đuối, bất lực trước những thảm họa thiên nhiên hoặc bị áp bức bóc lột trong xã hội mà không tìm được lối thoát thực tế.",
    philosophicalNote: "Vì bế tắc ở thế giới thực, họ phải tìm kiếm sự an ủi, một niềm tin vào thế giới bên kia hoặc các đấng siêu nhiên.",
  },
  {
    id: 4,
    title: "Câu hỏi 4",
    image: "/cau4.jfif",
    correctAnswer: "Tính giai cấp",
    suggestion: "Cụm từ gồm 3 chữ (T... G... C...). Đây là một đặc điểm cốt lõi, chi phối toàn bộ đời sống tinh thần trong những xã hội có sự phân chia kẻ giàu - người nghèo, kẻ bóc lột - người bị bóc lột.",
    description: "Triết học khẳng định rằng, do có hoàn cảnh sống, địa vị và lợi ích kinh tế khác nhau, nên tư tưởng, quan điểm của các tập đoàn người này luôn đối lập và đấu tranh với nhau.",
    philosophicalNote: "Hệ tư tưởng thống trị trong xã hội thực chất luôn là hệ tư tưởng của tập đoàn người đang nắm giữ quyền lực về kinh tế.",
  },
  {
    id: 5,
    title: "Câu hỏi 5",
    image: "/cau5.jfif",
    correctAnswer: "Tác động trở lại",
    suggestion: "Cụm từ gồm 3 chữ (T... Đ... T...). Đây là biểu hiện quan trọng nhất, mang ý nghĩa thực tiễn to lớn nhất khi nói về 'Tính độc lập tương đối của ý thức xã hội'.",
    description: "Dù vật chất sinh ra tinh thần, nhưng một khi các tư tưởng, lý luận khoa học tiên tiến đã thâm nhập vào quần chúng nhân dân, nó sẽ biến thành một sức mạnh vật chất khổng lồ.",
    philosophicalNote: "Nó không cam chịu thụ động mà sẽ quay ngược lại định hướng, cải tạo và thúc đẩy sự phát triển của chính đời sống kinh tế - xã hội đã sinh ra nó.",
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