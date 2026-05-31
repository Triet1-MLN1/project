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
    image: "https://placehold.co/600x400/311B92/FFFFFF/png?text=Tồn+Tại",
    correctAnswer: "Tồn tại xã hội",
    suggestion: "Toàn bộ sinh hoạt vật chất của xã hội (12 chữ cái)",
    description:
      "Tồn tại xã hội là toàn bộ sinh hoạt vật chất và những điều kiện sinh hoạt vật chất của xã hội.",
    philosophicalNote: "Bao gồm phương thức sản xuất, điều kiện tự nhiên và dân số.",
  },
  {
    id: 2,
    title: "Câu hỏi 2",
    image: "https://placehold.co/600x400/4A148C/FFFFFF/png?text=Ý+Thức",
    correctAnswer: "Ý thức xã hội",
    suggestion: "Mặt tinh thần của đời sống xã hội (11 chữ cái)",
    description:
      "Ý thức xã hội nảy sinh từ tồn tại xã hội, bao gồm tình cảm, tâm trạng, tư tưởng...",
    philosophicalNote: "Tồn tại xã hội quyết định ý thức xã hội, nhưng ý thức xã hội có tính độc lập tương đối.",
  },
  {
    id: 3,
    title: "Câu hỏi 3",
    image: "https://placehold.co/600x400/6A1B9A/FFFFFF/png?text=Tâm+Lý",
    correctAnswer: "Tâm lý xã hội",
    suggestion: "Cấp độ phản ánh trực tiếp, tự phát (11 chữ cái)",
    description:
      "Tâm lý xã hội là bộ phận của ý thức xã hội phản ánh một cách trực tiếp những điều kiện sinh hoạt hằng ngày.",
    philosophicalNote: null,
  },
  {
    id: 4,
    title: "Câu hỏi 4",
    image: "https://placehold.co/600x400/880E4F/FFFFFF/png?text=Tư+Tưởng",
    correctAnswer: "Hệ tư tưởng",
    suggestion: "Cấp độ phản ánh gián tiếp, tự giác, lý luận (10 chữ cái)",
    description:
      "Hệ tư tưởng là sự phản ánh tự giác, được hệ thống hóa thành lý luận về tồn tại xã hội.",
    philosophicalNote: null,
  },
  {
    id: 5,
    title: "Câu hỏi 5",
    image: "https://placehold.co/600x400/b71c1c/FFFFFF/png?text=Biện+Chứng",
    correctAnswer: "Độc lập tương đối",
    suggestion: "Tính chất của Ý thức xã hội so với Tồn tại xã hội (15 chữ cái)",
    description:
      "Ý thức xã hội thường lạc hậu hơn, nhưng đôi khi có thể vượt trước Tồn tại xã hội.",
    philosophicalNote: "Sự tác động trở lại của ý thức xã hội đối với tồn tại xã hội là biểu hiện rõ nhất của tính độc lập tương đối.",
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