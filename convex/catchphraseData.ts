export interface CatchphraseQuestion {
  image: string;
  answer: string;
  suggestion: string;
}

export const catchphraseData: CatchphraseQuestion[] = [
  {
    image: "https://placehold.co/600x400/311B92/FFFFFF/png?text=Tồn+Tại",
    answer: "tồn tại",
    suggestion: "Toàn bộ sinh hoạt vật chất và những điều kiện sinh hoạt vật chất của xã hội.",
  },
  {
    image: "https://placehold.co/600x400/4A148C/FFFFFF/png?text=Ý+Thức",
    answer: "ý thức",
    suggestion: "Mặt tinh thần của đời sống xã hội, bao gồm tình cảm, tâm trạng, tư tưởng...",
  },
  {
    image: "https://placehold.co/600x400/6A1B9A/FFFFFF/png?text=Tâm+Lý",
    answer: "tâm lý",
    suggestion: "Cấp độ phản ánh trực tiếp, tự phát của ý thức xã hội (ví dụ: ... xã hội).",
  },
  {
    image: "https://placehold.co/600x400/880E4F/FFFFFF/png?text=Tư+Tưởng",
    answer: "tư tưởng",
    suggestion: "Cấp độ phản ánh gián tiếp, tự giác của ý thức xã hội, được hệ thống hóa thành lý luận (Hệ ...).",
  },
  {
    image: "https://placehold.co/600x400/b71c1c/FFFFFF/png?text=Vật+Chất",
    answer: "vật chất",
    suggestion: "Phương thức sản xuất ... là yếu tố quyết định nhất của tồn tại xã hội.",
  },
  {
    image: "https://placehold.co/600x400/004D40/FFFFFF/png?text=Biện+Chứng",
    answer: "biện chứng",
    suggestion: "Mối quan hệ qua lại giữa Tồn tại xã hội và Ý thức xã hội là mối quan hệ ...",
  },
  {
    image: "https://placehold.co/600x400/1B5E20/FFFFFF/png?text=Sản+Xuất",
    answer: "sản xuất",
    suggestion: "Quá trình con người sử dụng công cụ lao động tác động vào tự nhiên.",
  },
];
