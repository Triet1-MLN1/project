export interface RawQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export const rawQuestions: RawQuestion[] = [
  {
    id: 1,
    question: "\u0110\u1ed1i t\u01b0\u1ee3ng nghi\u00ean c\u1ee9u c\u1ee7a Kinh t\u1ebf ch\u00ednh tr\u1ecb M\u00e1c - L\u00eanin l\u00e0 g\u00ec?",
    options: ["A. L\u1ef1c l\u01b0\u1ee3ng s\u1ea3n xu\u1ea5t", "B. Quan h\u1ec7 s\u1ea3n xu\u1ea5t trong m\u1ed1i li\u00ean h\u1ec7 v\u1edbi l\u1ef1c l\u01b0\u1ee3ng s\u1ea3n xu\u1ea5t v\u00e0 ki\u1ebfn tr\u00fac th\u01b0\u1ee3ng t\u1ea7ng", "C. Qu\u00e1 tr\u00ecnh s\u1ea3n xu\u1ea5t v\u1eadt ch\u1ea5t", "D. C\u00e1c hi\u1ec7n t\u01b0\u1ee3ng kinh t\u1ebf r\u1eddi r\u1ea1c"],
    answer: "B"
  },
  {
    id: 2,
    question: "Thu\u1eadt ng\u1eef \"Kinh t\u1ebf ch\u00ednh tr\u1ecb\" \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng l\u1ea7n \u0111\u1ea7u ti\u00ean v\u00e0o n\u0103m n\u00e0o?",
    options: ["A. 1612", "B. 1615", "C. 1776", "D. 1867"],
    answer: "B"
  },
  {
    id: 3,
    question: "Ai l\u00e0 ng\u01b0\u1eddi \u0111\u1ea7u ti\u00ean \u0111\u01b0a ra thu\u1eadt ng\u1eef \"Kinh t\u1ebf ch\u00ednh tr\u1ecb\"?",
    options: ["A. Adam Smith", "B. Francois Quesnay", "C. Antoine de Montchretien", "D. Karl Marx"],
    answer: "C"
  },
  {
    id: 4,
    question: "\u0110i\u1ec1u ki\u1ec7n ra \u0111\u1eddi c\u1ee7a s\u1ea3n xu\u1ea5t h\u00e0ng h\u00f3a l\u00e0 g\u00ec?",
    options: ["A. Ph\u00e2n c\u00f4ng lao \u0111\u1ed9ng x\u00e3 h\u1ed9i v\u00e0 s\u1ef1 t\u00e1ch bi\u1ec7t v\u1ec1 m\u1eb7t kinh t\u1ebf c\u1ee7a c\u00e1c ch\u1ee7 th\u1ec3 s\u1ea3n xu\u1ea5t", "B. S\u1ef1 xu\u1ea5t hi\u1ec7n c\u1ee7a ti\u1ec1n t\u1ec7", "C. Nhu c\u1ea7u ti\u00eau d\u00f9ng t\u0103ng cao", "D. S\u1ef1 ph\u00e1t tri\u1ec3n c\u1ee7a m\u00e1y m\u00f3c"],
    answer: "A"
  },
  {
    id: 5,
    question: "H\u00e0ng h\u00f3a l\u00e0 g\u00ec?",
    options: ["A. S\u1ea3n ph\u1ea9m c\u1ee7a lao \u0111\u1ed9ng", "B. S\u1ea3n ph\u1ea9m c\u00f3 th\u1ec3 th\u1ecfa m\u00e3n nhu c\u1ea7u n\u00e0o \u0111\u00f3 c\u1ee7a con ng\u01b0\u1eddi", "C. S\u1ea3n ph\u1ea9m c\u1ee7a lao \u0111\u1ed9ng, th\u1ecfa m\u00e3n nhu c\u1ea7u con ng\u01b0\u1eddi v\u00e0 th\u00f4ng qua trao \u0111\u1edbi, mua b\u00e1n", "D. V\u1eadt ph\u1ea9m c\u00f3 s\u1eb5n trong t\u1ef1 nhi\u00ean"],
    answer: "C"
  },
  {
    id: 6,
    question: "Hai thu\u1ed9c t\u00ednh c\u1ee7a h\u00e0ng h\u00f3a l\u00e0:",
    options: ["A. Gi\u00e1 tr\u1ecb trao \u0111\u1edbi v\u00e0 gi\u00e1 tr\u1ecb", "B. Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng v\u00e0 gi\u00e1 tr\u1ecb trao \u0111\u1edbi", "C. Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng v\u00e0 gi\u00e1 tr\u1ecb", "D. Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng v\u00e0 gi\u00e1 c\u1ea3"],
    answer: "C"
  },
  {
    id: 7,
    question: "Gi\u00e1 tr\u1ecb c\u1ee7a h\u00e0ng h\u00f3a \u0111\u01b0\u1ee3c quy\u1ebft \u0111\u1ecbnh b\u1edfi:",
    options: ["A. S\u1ef1 khan hi\u1ebfm c\u1ee7a h\u00e0ng h\u00f3a", "B. Hao ph\u00ed lao \u0111\u1ed9ng x\u00e3 h\u1ed9i c\u1ea7n thi\u1ebft", "C. C\u00f4ng d\u1ee5ng c\u1ee7a h\u00e0ng h\u00f3a", "D. Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng c\u1ee7a h\u00e0ng h\u00f3a"],
    answer: "B"
  },
  {
    id: 8,
    question: "T\u00ednh ch\u1ea5t hai m\u1eb7t c\u1ee7a lao \u0111\u1ed9ng s\u1ea3n xu\u1ea5t h\u00e0ng h\u00f3a l\u00e0:",
    options: ["A. Lao \u0111\u1ed9ng t\u01b0 nh\u00e2n v\u00e0 lao \u0111\u1ed9ng x\u00e3 h\u1ed9i", "B. Lao \u0111\u1ed9ng gi\u1ea3n \u0111\u01a1n v\u00e0 lao \u0111\u1ed9ng ph\u1ee9c t\u1ea1p", "C. Lao \u0111\u1ed9ng c\u1ee5 th\u1ec3 v\u00e0 lao \u0111\u1ed9ng tr\u1eeb t\u01b0\u1ee3ng", "D. Lao \u0111\u1ed9ng qu\u00e1 kh\u1ee9 v\u00e0 lao \u0111\u1ed9ng s\u1ed1ng"],
    answer: "C"
  },
  {
    id: 9,
    question: "Lao \u0111\u1ed9ng c\u1ee5 th\u1ec3 t\u1ea1o ra thu\u1ed9c t\u00ednh n\u00e0o c\u1ee7a h\u00e0ng h\u00f3a?",
    options: ["A. Gi\u00e1 tr\u1ecb trao \u0111\u1edbi", "B. Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng", "C. Gi\u00e1 tr\u1ecb", "D. Gi\u00e1 c\u1ea3"],
    answer: "B"
  },
  {
    id: 10,
    question: "Lao \u0111\u1ed9ng tr\u1eeb t\u01b0\u1ee3ng t\u1ea1o ra thu\u1ed9c t\u00ednh n\u00e0o c\u1ee7a h\u00e0ng h\u00f3a?",
    options: ["A. Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng", "B. Gi\u00e1 tr\u1ecb", "C. C\u00f4ng d\u1ee5ng", "D. M\u1eabu m\u00e3"],
    answer: "B"
  },
  {
    id: 11,
    question: "L\u01b0\u1ee3ng gi\u00e1 tr\u1ecb c\u1ee7a h\u00e0ng h\u00f3a \u0111\u01b0\u1ee3c \u0111o l\u01b0\u1eddng b\u1eb1ng th\u1eddi gian lao \u0111\u1ed9ng n\u00e0o?",
    options: ["A. Th\u1eddi gian lao \u0111\u1ed9ng c\u00e1 bi\u1ec7t", "B. Th\u1eddi gian lao \u0111\u1ed9ng x\u00e3 h\u1ed9i c\u1ea7n thi\u1ebft", "C. Th\u1eddi gian lao \u0111\u1ed9ng trung b\u00ecnh c\u1ee7a th\u1ebf gi\u1edbi", "D. Th\u1eddi gian lao \u0111\u1ed9ng c\u1ee7a ng\u01b0\u1eddi s\u1ea3n xu\u1ea5t gi\u1ecfi nh\u1ea5t"],
    answer: "B"
  },
  {
    id: 12,
    question: "Nh\u00e2n t\u1ed1 n\u00e0o sau \u0111\u00e2y \u1ea3nh h\u01b0\u1edbng \u0111\u1ebfn l\u01b0\u1ee3ng gi\u00e1 tr\u1ecb c\u1ee7a h\u00e0ng h\u00f3a?",
    options: ["A. N\u0103ng su\u1ea5t lao \u0111\u1ed9ng", "B. C\u01b0\u1eddng \u0111\u1ed9 lao \u0111\u1ed9ng", "C. T\u00ednh ch\u1ea5t ph\u1ee9c t\u1ea1p c\u1ee7a lao \u0111\u1ed9ng", "D. T\u1ea5t c\u1ea3 c\u00e1c \u0111\u00e1p \u00e1n tr\u00ean"],
    answer: "D"
  },
  {
    id: 13,
    question: "Khi n\u0103ng su\u1ea5t lao \u0111\u1ed9ng t\u0103ng l\u00ean, l\u01b0\u1ee3ng gi\u00e1 tr\u1ecb c\u1ee7a m\u1ed9t \u0111\u01a1n v\u1ecb h\u00e0ng h\u00f3a s\u1ebd:",
    options: ["A. T\u0103ng l\u00ean", "B. Gi\u1ea3m xu\u1ed1ng", "C. Kh\u00f4ng \u0111\u1ed5i", "D. T\u0103ng g\u1ea5p \u0111\u00f4i"],
    answer: "B"
  },
  {
    id: 14,
    question: "Ti\u1ec1n t\u1ec7 ra \u0111\u1eddi l\u00e0 k\u1ebft qu\u1ea3 c\u1ee7a qu\u00e1 tr\u00ecnh n\u00e0o?",
    options: ["A. S\u1ef1 tho\u1ea3 thu\u1eadn gi\u1eefa nh\u1eefng ng\u01b0\u1eddi s\u1ea3n xu\u1ea5t", "B. Qu\u00e1 tr\u00ecnh ph\u00e1t tri\u1ec3n l\u00e2u d\u00e0i c\u1ee7a s\u1ea3n xu\u1ea5t v\u00e0 trao \u0111\u1edbi h\u00e0ng h\u00f3a", "C. Quy \u0111\u1ecbnh c\u1ee7a nh\u00e0 n\u01b0\u1edbc", "D. S\u1ef1 xu\u1ea5t hi\u1ec7n c\u1ee7a v\u00e0ng v\u00e0 b\u1ea1c"],
    answer: "B"
  },
  {
    id: 15,
    question: "Quy lu\u1eadt gi\u00e1 tr\u1ecb y\u00eau c\u1ea7u vi\u1ec7c trao \u0111\u1edbi h\u00e0ng h\u00f3a ph\u1ea3i d\u1ef1a tr\u00ean nguy\u00ean t\u1eafc n\u00e0o?",
    options: ["A. Ngang gi\u00e1", "B. B\u00e1n cao h\u01a1n gi\u00e1 tr\u1ecb", "C. Theo \u00fd mu\u1ed1n ng\u01b0\u1eddi b\u00e1n", "D. \u01afu ti\u00ean ng\u01b0\u1eddi ngh\u00e8o"],
    answer: "A"
  },
  {
    id: 16,
    question: "Th\u1ecb tr\u01b0\u1eddng c\u00f3 vai tr\u00f2 c\u01a1 b\u1ea3n n\u00e0o?",
    options: ["A. Th\u1eeba nh\u1eadn gi\u00e1 tr\u1ecb h\u00e0ng h\u00f3a", "B. Cung c\u1ea5p th\u00f4ng tin cho c\u00e1c ch\u1ee7 th\u1ec3 kinh t\u1ebf", "C. K\u00edch th\u00edch s\u1ef1 s\u00e1ng t\u1ea1o", "D. T\u1ea5t c\u1ea3 c\u00e1c vai tr\u00f2 tr\u00ean"],
    answer: "D"
  },
  {
    id: 17,
    question: "C\u00f4ng th\u1ee9c chung c\u1ee7a t\u01b0 b\u1ea3n l\u00e0:",
    options: ["A. H - T - H", "B. T - H - T'", "C. T - H - T", "D. H - T - H'"],
    answer: "B"
  },
  {
    id: 18,
    question: "S\u1ee9c lao \u0111\u1ed9ng tr\u1edf th\u00e0nh h\u00e0ng h\u00f3a khi n\u00e0o?",
    options: ["A. Khi con ng\u01b0\u1eddi c\u00f3 nhu c\u1ea7u l\u00e0m vi\u1ec7c", "B. Khi ng\u01b0\u1eddi lao \u0111\u1ed9ng \u0111\u01b0\u1ee3c t\u1ef1 do v\u00e0 kh\u00f4ng c\u00f3 t\u01b0 li\u1ec7u s\u1ea3n xu\u1ea5t", "C. Khi m\u00e1y m\u00f3c thay th\u1ebf con ng\u01b0\u1eddi", "D. Trong ch\u1ebf \u0111\u1ed9 phong ki\u1ebfn"],
    answer: "B"
  },
  {
    id: 19,
    question: "Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng c\u1ee7a h\u00e0ng h\u00f3a sức lao \u0111\u1ed9ng c\u00f3 \u0111\u1eb7c \u0111i\u1ec3m g\u00ec?",
    options: ["A. B\u1ecbi hao m\u00f2n theo th\u1eddi gian", "B. Khi s\u1eed d\u1ee5ng n\u00f3 t\u1ea1o ra gi\u00e1 tr\u1ecb m\u1edbi l\u1edbn h\u01a1n gi\u00e1 tr\u1ecb b\u1ea3n th\u00e2n n\u00f3", "C. Kh\u00f4ng th\u1ec3 x\u00e1c \u0111\u1ecbnh \u0111\u01b0\u1ee3c", "D. Gi\u1edbi h\u1ea1n trong m\u1ed9t ng\u00e0y"],
    answer: "B"
  },
  {
    id: 20,
    question: "Gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 (m) l\u00e0 g\u00ec?",
    options: ["A. L\u1ee3i nhu\u1eadn nh\u00e0 t\u01b0 b\u1ea3n thu \u0111\u01b0\u1ee3c", "B. Ph\u1ea7n gi\u00e1 tr\u1ecb m\u1edbi d\u00f4i ra ngo\u00e0i gi\u00e1 tr\u1ecb s\u1ee9c lao \u0111\u1ed9ng", "C. Ti\u1ec1n th\u01b0\u1edfng cho c\u00f4ng nh\u00e2n", "D. Chi ph\u00ed kh\u1ea5u hao m\u00e1y m\u00f3c"],
    answer: "B"
  },
  {
    id: 21,
    question: "T\u01b0 b\u1ea3n b\u1ea5t bi\u1ebfn (c) l\u00e0 g\u00ec?",
    options: ["A. B\u1ed9 ph\u1eadn t\u01b0 b\u1ea3n d\u01b0\u1edbi h\u00ecnh th\u1ee9c t\u01b0 li\u1ec7u s\u1ea3n xu\u1ea5t", "B. B\u1ed9 ph\u1eadn t\u01b0 b\u1ea3n d\u00f9ng \u0111\u1ec3 thuê c\u00f4ng nh\u00e2n", "C. Ti\u1ec1n v\u1ed1n lu\u00f4n thay \u0111\u1edbi", "D. C\u1ee7a c\u1ea3i v\u1eadt ch\u1ea5t nh\u00e0 n\u01b0\u1edbc"],
    answer: "A"
  },
  {
    id: 22,
    question: "T\u01b0 b\u1ea3n kh\u1ea3 bi\u1ebfn (v) l\u00e0 b\u1ed9 ph\u1eadn t\u01b0 b\u1ea3n d\u00f9ng \u0111\u1ec3 mua:",
    options: ["A. M\u1ea1y m\u00f3c", "B. Nguy\u00ean li\u1ec7u", "C. S\u1ee9c lao \u0111\u1ed9ng", "D. Nh\u00e0 x\u01b0\u1edfng"],
    answer: "C"
  },
  {
    id: 23,
    question: "T\u1ef7 su\u1ea5t gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 (m') ph\u1ea3n \u00e1nh \u0111i\u1ec1u g\u00ec?",
    options: ["A. Tr\u00ecnh \u0111\u1ed9 b\u00f3c l\u1ed9t c\u1ee7a nh\u00e0 t\u01b0 b\u1ea3n", "B. Quy m\u00f4 s\u1ea3n xu\u1ea5t", "C. Kh\u1ea3 n\u0103ng sinh l\u1eddi", "D. Hi\u1ec7u qu\u1ea3 s\u1eed d\u1ee5ng v\u1ed1n"],
    answer: "A"
  },
  {
    id: 24,
    question: "Ph\u01b0\u01a1ng ph\u00e1p s\u1ea3n xu\u1ea5t gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 t\u01b0\u01a1ng \u0111\u1edbi l\u00e0:",
    options: ["A. K\u00e9o d\u00e0i ng\u00e0y lao \u0111\u1ed9ng", "B. T\u0103ng c\u01b0\u1eddng \u0111\u1ed9 lao \u0111\u1ed9ng", "C. R\u00fat ng\u1eafn th\u1eddi gian lao \u0111\u1ed9ng t\u1ea5t y\u1ebfu", "D. Gi\u1ea3m l\u01b0\u01a1ng c\u00f4ng nh\u00e2n"],
    answer: "C"
  },
  {
    id: 25,
    question: "Gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 si\u00eau ng\u1ea1ch l\u00e0 h\u00ecnh th\u1ee9c bi\u1ebfn t\u01b0\u1edbng c\u1ee7a:",
    options: ["A. Gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 tuy\u1ec7t \u0111\u1ed1i", "B. Gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 t\u01b0\u01a1ng \u0111\u1edbi", "C. L\u1ee3i nhu\u1eadn b\u00ecnh qu\u00e2n", "D. Ti\u1ec1n th\u01b0\u1edfng"],
    answer: "B"
  },
  {
    id: 26,
    question: "B\u1ea3n ch\u1ea5t c\u1ee7a t\u00edch lu\u1ef9 t\u01b0 b\u1ea3n l\u00e0:",
    options: ["A. Ti\u1ebft ki\u1ec7m ti\u1ec1n b\u1ea1c", "B. Chuy\u1ec3n h\u00f3a m\u1ed9t ph\u1ea7n gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 th\u00e0nh t\u01b0 b\u1ea3n", "C. M\u1edf r\u1ed9ng nh\u00e0 x\u01b0\u1edfng", "D. Mua th\u00eam sức lao \u0111\u1ed9ng m\u1edbi"],
    answer: "B"
  },
  {
    id: 27,
    question: "Nh\u00e2n t\u1ed1 n\u00e0o quy\u1ebft \u0111\u1ecbnh quy m\u00f4 c\u1ee7a t\u00edch lu\u1ef9 t\u01b0 b\u1ea3n?",
    options: ["A. T\u1ef7 su\u1ea5t gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0", "B. Tr\u00ecnh \u0111\u1ed9 n\u0103ng su\u1ea5t lao \u0111\u1ed9ng", "C. Ch\u00eanh l\u1ec7ch gi\u1eefa t\u01b0 b\u1ea3n s\u1eed d\u1ee5ng v\u00e0 ti\u00eau d\u00f9ng", "D. T\u1ea5t c\u1ea3 c\u00e1c \u0111\u00e1p \u00e1n tr\u00ean"],
    answer: "D"
  },
  {
    id: 28,
    question: "C\u1ea5u t\u1ea1o h\u1eefu c\u01a1 c\u1ee7a t\u01b0 b\u1ea3n (c/v) c\u00f3 xu h\u01b0\u1edbng n\u00e0o?",
    options: ["A. Gi\u1ea3m xu\u1ed1ng", "B. Kh\u00f4ng \u0111\u1ed5i", "C. T\u0103ng l\u00ean", "D. Bi\u1ebfn \u0111\u1ed9ng kh\u00f4ng quy lu\u1eadt"],
    answer: "C"
  },
  {
    id: 29,
    question: "Tu\u1ea7n ho\u00e0n c\u1ee7a t\u01b0 b\u1ea3n c\u00f4ng nghi\u1ec7p tr\u1ea3i qua m\u1ea5y giai \u0111o\u1ea1n?",
    options: ["A. 1", "B. 2", "C. 3", "D. 4"],
    answer: "C"
  },
  {
    id: 30,
    question: "Ba h\u00ecnh th\u1ee9c c\u1ee7a t\u01b0 b\u1ea3n trong qu\u00e1 tr\u00ecnh tu\u1ea7n ho\u00e0n l\u00e0:",
    options: ["A. Tư bản tiền tệ, sản xuất, hàng hóa", "B. Tư bản bất biến, khả biến, thặng dư", "C. Tư bản cố định, lưu động, sản xuất", "D. Tư bản cho vay, ngân hàng, thương nghiệp"],
    answer: "A"
  },
  {
    id: 31,
    question: "Chu chuy\u1ec3n c\u1ee7a t\u01b0 b\u1ea3n l\u00e0:",
    options: ["A. S\u1ef1 l\u1eb7p \u0111i l\u1eb7p l\u1ea1i c\u1ee7a tu\u1ea7n ho\u00e0n t\u01b0 b\u1ea3n", "B. S\u1ef1 mua b\u00e1n h\u00e0ng h\u00f3a", "C. S\u1ef1 v\u1eadn \u0111\u1ed9ng c\u1ee7a m\u00e1y m\u00f3c", "D. S\u1ef1 thay \u0111\u1ed5i ch\u1ee7 s\u1edf h\u1eefu"],
    answer: "A"
  },
  {
    id: 32,
    question: "T\u01b0 b\u1ea3n c\u1ed1 \u0111\u1ecbnh l\u00e0 b\u1ed9 ph\u1eadn t\u01b0 b\u1ea3n chuy\u1ec3n gi\u00e1 tr\u1ecb v\u00e0o s\u1ea3n ph\u1ea9m:",
    options: ["A. M\u1ed9t l\u1ea7n duy nh\u1ea5t", "B. T\u1eebng ph\u1ea7n theo m\u1ee9c \u0111\u1ed9 hao m\u00f2n", "C. Kh\u00f4ng chuy\u1ec3n v\u00e0o", "D. Theo \u00fd mu\u1ed1n ch\u1ee7 doanh nghi\u1ec7p"],
    answer: "B"
  },
  {
    id: 33,
    question: "T\u01b0 b\u1ea3n l\u01b0u \u0111\u1ed9ng bao g\u1ed3m:",
    options: ["A. M\u1ea1y m\u00f3c, thi\u1ebft b\u1ecb", "B. Nh\u00e0 x\u01b0\u1edfng, kho b\u00e3i", "C. Nguy\u00ean nhi\u00ean v\u1eadt li\u1ec7u v\u00e0 s\u1ee9c lao \u0111\u1ed9ng", "D. Ch\u1ec9 c\u00f3 ti\u1ec1n m\u1eb7t"],
    answer: "C"
  },
  {
    id: 34,
    question: "Chi ph\u00ed s\u1ea3n xu\u1ea5t t\u01b0 b\u1ea3n ch\u1ee7 ngh\u0129a (k) bằng:",
    options: ["A. k = c + v", "B. k = c + m", "C. k = v + m", "D. k = c + v + m"],
    answer: "A"
  },
  {
    id: 35,
    question: "L\u1ee3i nhu\u1eadn (p) b\u1ea3n ch\u1ea5t l\u00e0 h\u00ecnh th\u1ee9c bi\u1ebfn t\u01b0\u1edbng c\u1ee7a:",
    options: ["A. Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng", "B. Gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0", "C. Ti\u1ec1n c\u00f4ng", "D. Chi ph\u00ed s\u1ea3n xu\u1ea5t"],
    answer: "B"
  },
  {
    id: 36,
    question: "T\u1ef7 su\u1ea5t l\u1ee3i nhu\u1eadn (p') lu\u00f4n lu\u00f4n:",
    options: ["A. L\u1edbn h\u01a1n t\u1ef7 su\u1ea5t gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0", "B. Nh\u1ecf h\u01a1n t\u1ef7 su\u1ea5t gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0", "C. B\u1eb1ng t\u1ef7 su\u1ea5t gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0", "D. Kh\u00f4ng c\u00f3 m\u1ed1i li\u00ean h\u1ec7"],
    answer: "B"
  },
  {
    id: 37,
    question: "C\u1ea1nh tranh gi\u1eefa c\u00e1c ng\u00e0nh d\u1eabn \u0111\u1ebfn s\u1ef1 h\u00ecnh th\u00e0nh:",
    options: ["A. Gi\u00e1 tr\u1ecb th\u1ecb tr\u01b0\u1eddng", "B. L\u1ee3i nhu\u1eadn b\u00ecnh qu\u00e2n", "C. Gi\u00e1 c\u1ea3 \u0111\u1ed9c quy\u1ec1n", "D. \u0110\u1ed9c quy\u1ec1n nh\u00f3m"],
    answer: "B"
  },
  {
    id: 38,
    question: "L\u1ee3i nhu\u1eadn th\u01b0\u01a1ng nghi\u1ec7p l\u00e0 m\u1ed9t ph\u1ea7n c\u1ee7a:",
    options: ["A. Gi\u00e1 tr\u1ecb s\u1eed d\u1ee5ng", "B. Gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 trong s\u1ea3n xu\u1ea5t", "C. Ti\u1ec1n ng\u01b0\u1eddi d\u00d9ng tr\u1ea3 th\u00eam", "D. C\u00f4ng ng\u01b0\u1eddi b\u00e1n h\u00e0ng"],
    answer: "B"
  },
  {
    id: 39,
    question: "T\u01b0 b\u1ea3n cho vay c\u00f3 \u0111\u1eb7c \u0111i\u1ec3m g\u00ec?",
    options: ["A. Quy\u1ec1n s\u1edf h\u1eefu t\u00e1ch r\u1eddi quy\u1ec1n s\u1eed d\u1ee5ng", "B. L\u00e0 t\u01b0 b\u1ea3n l\u01b0\u1eddi bi\u1ebfng", "C. C\u00f4ng th\u1ee9c T - T'", "D. T\u1ea5t c\u1ea3 \u0111\u00e1p \u00e1n tr\u00ean"],
    answer: "D"
  },
  {
    id: 40,
    question: "L\u1ee3i t\u1ee9c (z) l\u00e0 g\u00ec?",
    options: ["A. Ph\u1ea7n l\u1ee3i nhu\u1eadn m\u00e0 nh\u00e0 t\u01b0 b\u1ea3n \u0111i vay tr\u1ea3 cho ng\u01b0\u1eddi cho vay", "B. To\u00e0n b\u1ed9 l\u1ee3i nhu\u1eadn", "C. Ti\u1ec1n ph\u1ea1t", "D. Ti\u1ec1n c\u00f4ng th\u1ee7 kho"],
    answer: "A"
  },
  {
    id: 41,
    question: "\u0110\u1ecba t\u00f4 t\u01b0 b\u1ea3n ch\u1ee7 ngh\u0129a l\u00e0 ph\u1ea7n gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 c\u00f2n l\u1ea1i sau khi kh\u1ea5u tr\u1ee3:",
    options: ["A. L\u1ee3i nhu\u1eadn b\u00ecnh qu\u00e2n", "B. Chi ph\u00ed s\u1ea3n xu\u1ea5t", "C. Ti\u1ec1n th\u01b0\u1edfng", "D. Thu\u1ebf nh\u00e0 n\u01b0\u1edbc"],
    answer: "A"
  },
  {
    id: 42,
    question: "Nguy\u00ean nh\u00e2n h\u00ecnh th\u00e0nh \u0111\u1ed9c quy\u1ec1n l\u00e0 do:",
    options: ["A. Ph\u00e1t tri\u1ec3n l\u1ef1c l\u01b0\u1ee3ng s\u1ea3n xu\u1ea5t", "B. T\u1ef1 t\u1eadp trung t\u01b0 b\u1ea3n", "C. Can thi\u1ec7p c\u1ee7a nh\u00e0 n\u01b0\u1edbc", "D. T\u1ea5t c\u1ea3 c\u00e1c \u0111\u00e1p \u00e1n tr\u00ean"],
    answer: "D"
  },
  {
    id: 43,
    question: "L\u1ee3i nhu\u1eadn \u0111\u1ed9c quy\u1ec1n lu\u00f4n nh\u01b0 th\u1ebf n\u00e0o so v\u1edbi l\u1ee3i nhu\u1eadn b\u00ecnh qu\u00e2n?",
    options: ["A. Th\u1ea5t h\u01a1n", "B. B\u1eb1ng nhau", "C. Cao h\u01a1n", "D. Kh\u00f4ng so s\u00e1nh \u0111\u01b0\u1ee3c"],
    answer: "C"
  },
  {
    id: 44,
    question: "Gi\u00e1 c\u1ea3 \u0111\u1ed9c quy\u1ec1n bao g\u1ed3m:",
    options: ["A. Chi ph\u00ed s\u1ea3n xu\u1ea5t c\u1ed9ng l\u1ee3i nhu\u1eadn \u0111\u1ed9c quy\u1ec1n", "B. Gi\u00e1 tr\u1ecb hàng hóa c\u1ed9ng thu\u1ebf", "C. Chi ph\u00ed sản xuất c\u1ed9ng l\u1ee3i nhu\u1eadn b\u00ecnh qu\u00e2n", "D. Gi\u00e1 th\u00e0nh s\u1ea3n ph\u1ea9m"],
    answer: "A"
  },
  {
    id: 45,
    question: "Xu th\u1ebf t\u1ea5t y\u1ebfu c\u1ee7a ch\u1ee7 ngh\u0129a \u0111\u1ed9c quy\u1ec1n l\u00e0 chuy\u1ec3n sang:",
    options: ["A. Ch\u1ee7 ngh\u0129a \u0111\u1ed9c quy\u1ec1n nh\u00e0 n\u01b0\u1edbc", "B. Ch\u1ee7 ngh\u0129a x\u00e3 h\u1ed9i", "C. T\u1ef1 do c\u1ea1nh tranh", "D. Kinh t\u1ebf h\u1ed9 gia \u0111\u00ecnh"],
    answer: "A"
  },
  {
    id: 46,
    question: "B\u1ea3n ch\u1ea5t c\u1ee7a ch\u1ee7 ngh\u0129a \u0111\u1ed9c quy\u1ec1n nh\u00e0 n\u01b0\u1edbc l\u00e0 s\u1ef1 k\u1ebft h\u1ee3p gi\u1eefa:",
    options: ["A. S\u1ee9c m\u1ea1nh \u0111\u1ed9c quy\u1ec1n v\u00e0 s\u1ee9c m\u1ea1nh nh\u00e0 n\u01b0\u1edbc", "B. Lao \u0111\u1ed9ng v\u00e0 tư bản", "C. Ng\u00e2n h\u00e0ng v\u00e0 c\u00f4ng nghi\u1ec7p", "D. Qu\u1ed1c gia v\u00e0 ng\u01b0\u1eddi d\u00e2n"],
    answer: "A"
  },
  {
    id: 47,
    question: "Xu\u1ea5t kh\u1ea9u t\u01b0 b\u1ea3n nh\u1eb1m m\u1ee5c \u0111\u00edch:",
    options: ["A. Gi\u00fap \u0111\u1ee1 n\u01b0\u1edbc ngh\u00e8o", "B. Chi\u1ebfm \u0111o\u1ea1t gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 n\u01b0\u1edbc ngo\u00e0i", "C. Giao l\u01b0u v\u0103n h\u00f3a", "D. Gi\u1ea3m th\u1ea5t nghi\u1ec7p"],
    answer: "B"
  },
  {
    id: 48,
    question: "T\u01b0 b\u1ea3n t\u00e0i ch\u00ednh l\u00e0 k\u1ebft qu\u1ea3 c\u1ee7a s\u1ef1 k\u1ebft h\u1ee3p gi\u1eefa:",
    options: ["A. \u0110\u1ed9c quy\u1ec1n ng\u00e2n h\u00e0ng v\u00e0 \u0111\u1ed9c quy\u1ec1n c\u00f4ng nghi\u1ec7p", "B. Th\u01b0\u01a1ng nghi\u1ec7p v\u00e0 cho vay", "C. N\u00f4ng nghi\u1ec7p v\u00e0 d\u1ecbt may", "D. Ch\u00ednh ph\u1ee7 v\u00e0 ng\u01b0\u1eddi d\u00e2n"],
    answer: "A"
  },
  {
    id: 49,
    question: "Kinh t\u1ebf th\u1ecb tr\u01b0\u1eddng \u0111\u1ecbnh h\u01b0\u1edbng XHCN \u1edf Vi\u1ec7t Nam c\u00f3 m\u1ea5y th\u00e0nh ph\u1ea7n?",
    options: ["A. 2", "B. 3", "C. 4", "D. 5"],
    answer: "C"
  },
  {
    id: 50,
    question: "Th\u00e0nh ph\u1ea7n kinh t\u1ebf n\u00e0o gi\u1eef vai tr\u00f2 ch\u1ee7 \u0111\u1ea1o \u1edf Vi\u1ec7t Nam?",
    options: ["A. Kinh t\u1ebf t\u01b0 nh\u00e2n", "B. Kinh t\u1ebf nh\u00e0 n\u01b0\u1edbc", "C. Kinh t\u1ebf t\u1eadp th\u1ec3", "D. Kinh t\u1ebf FDI"],
    answer: "B"
  },
  {
    id: 51,
    question: "M\u1ee5c ti\u00eau c\u1ee7a kinh t\u1ebf th\u1ecb tr\u01b0\u1eddng \u0111\u1ecbnh h\u01b0\u1edbng XHCN l\u00e0:",
    options: ["A. D\u00e2n gi\u00e0u, n\u01b0\u1edbc m\u1ea1nh, d\u00e2n ch\u1ee7, c\u00f4ng b\u1eb1ng, v\u0103n minh", "B. T\u1ed1i \u0111a nhu\u1eadn c\u00e1 nh\u00e2n", "C. Duy tr\u00ec bao c\u1ea5p", "D. Ch\u1ec9 ph\u00e1t tri\u1ec3n c\u00f4ng nghi\u1ec7p n\u1eb7ng"],
    answer: "A"
  },
  {
    id: 52,
    question: "Trong kinh t\u1ebf th\u1ecb tr\u01b0\u1eddng, h\u00e0ng h\u00f3a sức lao \u0111\u1ed9ng \u0111\u01b0\u1ee3c mua b\u00e1n theo:",
    options: ["A. Gi\u00e1 tr\u1ecb c\u1ee7a n\u00f3", "B. Tho\u1ea3 thu\u1eadn", "C. Quy \u0111\u1ecbnh l\u01b0\u01a1ng t\u1ed1i thi\u1ec3u", "D. T\u1ea5t c\u1ea3 \u0111\u00e1p \u00e1n tr\u00ean"],
    answer: "D"
  },
  {
    id: 53,
    question: "C\u00f4ng nghi\u1ec7p h\u00f3a, hi\u1ec7n \u0111\u1ea1i h\u00f3a l\u00e0 qu\u00e1 tr\u00ecnh chuy\u1ec3n \u0111\u1edbi t\u1eeb:",
    options: ["A. Lao \u0111\u1ed9ng th\u1ee7 c\u00f4ng sang m\u00e1y m\u00f3c hi\u1ec7n \u0111\u1ea1i", "B. N\u00f4ng nghi\u1ec7p sang d\u1ecbt may", "C. N\u01b0\u1edbc ngh\u00e8o sang n\u01b0\u1edbc gi\u00e0u", "D. S\u1ea3n xu\u1ea5t nh\u1ecf sang lớn"],
    answer: "A"
  },
  {
    id: 54,
    question: "M\u00f4 h\u00ecnh CNH, H\u0110H Vi\u1ec7t Nam \u0111ang th\u1ef1c hi\u1ec7n l\u00e0:",
    options: ["A. CNH r\u00fat ng\u1eafn", "B. CNH cổ \u0111i\u1ec3n", "C. CNH ki\u1ec3u Li\u00ean X\u00f4", "D. Ch\u1ec9 n\u00f4ng nghi\u1ec7p"],
    answer: "A"
  },
  {
    id: 55,
    question: "H\u1ed9i nh\u1eadp kinh t\u1ebf qu\u1ed1c t\u1ebf gi\u00fap Vi\u1ec7t Nam:",
    options: ["A. M\u1edf r\u1ed9ng th\u1ecb tr\u01b0\u1eddng", "B. Thu h\u00fat v\u1ed1n FDI", "C. Ti\u1ebfp c\u1eadn c\u00f4ng ngh\u1ec7", "D. T\u1ea5t c\u1ea3 \u0111\u00e1p \u00e1n tr\u00ean"],
    answer: "D"
  },
  {
    id: 56,
    question: "L\u1ee3i \u00edch kinh t\u1ebf l\u00e0 h\u00ecnh th\u1ee9c bi\u1ec3u hi\u1ec7n c\u1ee7a:",
    options: ["A. Quan h\u1ec7 s\u1ea3n xu\u1ea5t", "B. L\u1ef1c l\u01b0\u1ee3ng s\u1ea3n xu\u1ea5t", "C. \u00dd ch\u00ed con ng\u01b0\u1eddi", "D. Ch\u00ednh s\u00e1ch nh\u00e0 n\u01b0\u1edbc"],
    answer: "A"
  },
  {
    id: 57,
    question: "H\u1ec7 th\u1ed1ng l\u1ee3i \u00edch kinh t\u1ebf bao g\u1ed3m:",
    options: ["A. L\u1ee3i \u00edch c\u00e1 nh\u00e2n, t\u1eadp th\u1ec3, x\u00e3 h\u1ed9i", "B. Gi\u00e0 v\u00e0 tr\u1ebb", "C. Trong n\u01b0\u1edbc v\u00e0 ngo\u00e0i n\u01b0\u1edbc", "D. V\u1eadt ch\u1ea5t v\u00e0 tinh th\u1ea7n"],
    answer: "A"
  },
  {
    id: 58,
    question: "Quan h\u1ec7 ph\u00e2n ph\u1ed1i \u1edf Vi\u1ec7t Nam hi\u1ec7n nay l\u00e0:",
    options: ["A. Ph\u00e2n ph\u1ed1i theo lao \u0111\u1ed9ng", "B. Theo m\u1ee9c g\u00f3p v\u1ed1n", "C. Qua ph\u00fac l\u1ee3i", "D. T\u1ea5t c\u1ea3 h\u00ecnh th\u1ee9c tr\u00ean"],
    answer: "D"
  },
  {
    id: 59,
    question: "C\u1ea1nh tranh \u0111\u1ed9c quy\u1ec1n c\u00f3 \u0111\u1eb7c \u0111i\u1ec3m:",
    options: ["A. Kh\u1ed1c li\u1ec7t h\u01a1n", "B. B\u1ecbi tri\u1ec7t ti\u00eau", "C. Ch\u1ec9 cho h\u1ed9 nh\u1ecf", "D. Ch\u1ec9 trong n\u01b0\u1edbc"],
    answer: "A"
  },
  {
    id: 60,
    question: "Gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 bi\u1ebfn t\u01b0\u1edbng th\u00e0nh:",
    options: ["A. L\u1ee3i nhu\u1eadn", "B. Ti\u1ec1n l\u01b0\u01a1ng", "C. Thu\u1ebf", "D. Gi\u00e1 c\u1ea3"],
    answer: "A"
  },
  {
    id: 61,
    question: "Chu chuy\u1ec3n t\u01b0 b\u1ea3n ph\u1ea3n \u00e1nh:",
    options: ["A. T\u1ed1c \u0111\u1ed9 v\u1eadn \u0111\u1ed9ng tư bản", "B. Số máy móc", "C. Số công nhân", "D. Chất lượng hàng"],
    answer: "A"
  },
  {
    id: 62,
    question: "Hao m\u00f2n v\u00f4 h\u00ecnh do:",
    options: ["A. Thiên nhiên", "B. Ph\u00e1t tri\u1ec3n KH-KT", "C. Qu\u00e1 t\u1ea3i", "D. Kh\u00f4ng b\u1ea3o tr\u00ec"],
    answer: "B"
  },
  {
    id: 63,
    question: "T\u01b0 b\u1ea3n th\u01b0\u01a1ng nghi\u1ec7p t\u00e1ch ra t\u1eeb:",
    options: ["A. T\u01b0 b\u1ea3n c\u00f4ng nghi\u1ec7p", "B. Ng\u00e2n h\u00e0ng", "C. Nh\u00e0 n\u01b0\u1edbc", "D. Hộ gia \u0111\u00ecnh"],
    answer: "A"
  },
  {
    id: 64,
    question: "C\u00f4ng th\u1ee9c th\u01b0\u01a1ng nghi\u1ec7p l\u00e0:",
    options: ["A. T - H - T'", "B. H - T - H'", "C. T - T'", "D. H - H'"],
    answer: "A"
  },
  {
    id: 65,
    question: "T\u01b0 b\u1ea3n gi\u1ea3 l\u00e0:",
    options: ["A. C\u1ed5 phi\u1ebfu, tr\u00e1i phi\u1ebfu", "B. Ti\u1ec1n giả", "C. Máy hỏng", "D. Hàng kém"],
    answer: "A"
  },
  {
    id: 66,
    question: "C\u1ea5u t\u1ea1o h\u1eefu c\u01a1 t\u0103ng l\u00e0m:",
    options: ["A. Gi\u1ea3m t\u1ef7 su\u1ea5t l\u1ee3i nhu\u1eadn", "B. T\u0103ng chu chuy\u1ec3n", "C. Ti\u1ebft ki\u1ec7m c", "D. T\u0103ng m'"],
    answer: "A"
  },
  {
    id: 67,
    question: "\u0110\u1ed9c quy\u1ec1n h\u00ecnh th\u00e0nh dựa tr\u00ean:",
    options: ["A. T\u00edch t\u1ee5 v\u00e0 t\u1eadp trung s\u1ea3n xu\u1ea5t", "B. Ph\u00e2n t\u00e1n", "C. X\u00f3a c\u1ea1nh tranh", "D. Gi\u1ea3m n\u0103ng su\u1ea5t"],
    answer: "A"
  },
  {
    id: 68,
    question: "H\u00ecnh th\u1ee9c \u0111\u1ed9c quy\u1ec1n cao nh\u1ea5t:",
    options: ["A. Cartel", "B. Syndicate", "C. Trust", "D. Consortium"],
    answer: "D"
  },
  {
    id: 69,
    question: "\u0110\u1ed9c quy\u1ec1n qu\u1ed1c t\u1ebf chia nhau:",
    options: ["A. Th\u1ebf gi\u1edbi v\u1ec1 kinh t\u1ebf", "B. M\u00f4i tr\u01b0\u1eddng", "C. Bi\u00ean gi\u1edbi", "D. V\u0103n h\u00f3a"],
    answer: "A"
  },
  {
    id: 70,
    question: "Vai tr\u00f2 lịch sử c\u1ee7a CNTB:",
    options: ["A. Ph\u00e1t tri\u1ec3n LLSX", "B. X\u00e3 h\u1ed9i h\u00f3a s\u1ea3n xu\u1ea5t", "C. Ti\u1ec1n \u0111\u1ec1 cho CNXH", "D. T\u1ea5t c\u1ea3 \u0111\u00e1p \u00e1n tr\u00ean"],
    answer: "D"
  },
  {
    id: 71,
    question: "Kinh t\u1ebf th\u1ecb tr\u01b0\u1eddng XHCN tu\u00e2n theo:",
    options: ["A. Quy lu\u1eadt th\u1ecb tr\u01b0\u1eddng v\u00e0 nguy\u00ean t\u1eafc CNXH", "B. Ch\u1ec9 cung c\u1ea7u", "C. Ch\u1ec9 m\u1ec7nh l\u1ec7nh", "D. Ch\u1ec9 t\u01b0 nh\u00e2n"],
    answer: "A"
  },
  {
    id: 72,
    question: "Kinh t\u1ebf nh\u00e0 n\u01b0\u1edbc gi\u1eef vai tr\u00f2:",
    options: ["A. \u0110\u1ed9ng l\u1ef1c", "B. Ch\u1ee7 \u0111\u1ea1o", "C. Ph\u1ee5 thu\u1ed9c", "D. Trung gian"],
    answer: "B"
  },
  {
    id: 73,
    question: "Kinh t\u1ebf t\u01b0 nh\u00e2n l\u00e0:",
    options: ["A. \u0110\u1ed9ng l\u1ef1c quan tr\u1ecdng", "B. L\u1ed7i th\u1eddi", "C. C\u01a1 s\u1edf t\u1eadp th\u1ec3", "D. Kinh t\u1ebf FDI"],
    answer: "A"
  },
  {
    id: 74,
    question: "Ph\u00e2n ph\u1ed1i theo lao \u0111\u1ed9ng d\u1ef1a tr\u00ean:",
    options: ["A. S\u1ed1 l\u01b0\u1ee3ng, ch\u1ea5t l\u01b0\u1ee3ng lao \u0111\u1ed9ng", "B. Nhu c\u1ea7u", "C. Th\u00e2m ni\u00ean", "D. B\u1eb1ng c\u1ea5p"],
    answer: "A"
  },
  {
    id: 75,
    question: "C\u00f4ng h\u1eefu l\u00e0 \u0111\u1eb7c tr\u01b0ng c\u1ee7a:",
    options: ["A. CNTB", "B. CNXH", "C. Phong ki\u1ebfn", "D. S\u1ea3n xu\u1ea5t nh\u1ecf"],
    answer: "B"
  },
  {
    id: 76,
    question: "Nh\u00e0 n\u01b0\u1edbc qu\u1ea3n l\u00fd qua:",
    options: ["A. Ph\u00e1p lu\u1eadt, quy ho\u1ea1ch", "B. M\u1ec7nh l\u1ec7nh", "C. \u1ea4n \u0111\u1ecbnh gi\u00e1", "D. Bao c\u1ea5p"],
    answer: "A"
  },
  {
    id: 77,
    question: "L\u1ee3i \u00edch ch\u1ee7 doanh nghi\u1ec7p:",
    options: ["A. L\u1ee3i nhu\u1eadn", "B. Doanh thu", "C. Uy t\u00edn", "D. Nhân viên"],
    answer: "A"
  },
  {
    id: 78,
    question: "CNH \u1edf VN g\u1eafn v\u1edbi:",
    options: ["A. Hi\u1ec7n \u0111\u1ea1i h\u00f3a", "B. Kinh t\u1ebf tri th\u1ee9c", "C. M\u00f4i tr\u01b0\u1eddng", "D. T\u1ea5t c\u1ea3 \u0111\u00e1p \u00e1n"],
    answer: "D"
  },
  {
    id: 79,
    question: "C\u01a1 c\u1ea5u kinh t\u1ebf quan tr\u1ecdng nh\u1ea5t:",
    options: ["A. C\u01a1 c\u1ea5u ng\u00e0nh", "B. V\u00f9ng", "C. Th\u00e0nh ph\u1ea7n", "D. L\u00e3nh th\u1ed5"],
    answer: "A"
  },
  {
    id: 80,
    question: "H\u1ed9i nh\u1eadp qu\u1ed1c t\u1ebf l\u00e0:",
    options: ["A. G\u1eafn k\u1ebft kinh t\u1ebf th\u1ebf gi\u1edbi", "B. Ch\u1ec9 mua h\u00e0ng ngo\u00e0i", "C. X\u00f3a bi\u00ean gi\u1edbi", "D. Bỏ s\u1ea3n xu\u1ea5t nội"],
    answer: "A"
  },
  {
    id: 81,
    question: "WTO l\u00e0:",
    options: ["A. T\u1ed5 ch\u1ee9c th\u01b0\u01a1ng m\u1ea1i th\u1ebf gi\u1edbi", "B. IMF", "C. World Bank", "D. WEF"],
    answer: "A"
  },
  {
    id: 82,
    question: "CMCN 4.0 \u0111\u1eb7c tr\u01b0ng b\u1edfi:",
    options: ["A. AI, IoT, Big Data", "B. H\u01a1i n\u01b0\u1edbc", "C. \u0110i\u1ec7n n\u0103ng", "D. T\u1ef1 \u0111\u1ed9ng s\u01a1 khai"],
    answer: "A"
  },
  {
    id: 83,
    question: "VN t\u1eadn d\u1ee5ng l\u1ee3i th\u1ebf:",
    options: ["A. So s\u00e1nh", "B. \u0110i sau", "C. Nh\u00e2n l\u1ef1c", "D. T\u1ea5t c\u1ea3 \u0111\u00e1p \u00e1n"],
    answer: "D"
  },
  {
    id: 84,
    question: "H\u1ed9i nh\u1eadp ch\u00ednh tr\u1ecb l\u00e0:",
    options: ["A. Li\u00ean minh qu\u00e2n s\u1ef1", "B. Ngoại giao, hiệp \u0111\u1ecbnh", "C. Nhập v\u0103n h\u00f3a", "D. Bỏ ch\u1ee7 quy\u1ec1n"],
    answer: "B"
  },
  {
    id: 85,
    question: "Gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 \u1edf VN:",
    options: ["A. T\u00edch lu\u1ef9 v\u00e0 ph\u00e2n ph\u1ed1i l\u1ea1i", "B. Ch\u1ec9 cho ch\u1ee7", "C. Chuy\u1ec3n ra ngo\u00e0i", "D. Thu h\u1ebft"],
    answer: "A"
  },
  {
    id: 86,
    question: "Quy lu\u1eadt th\u1eb7ng d\u01b0 l\u00e0:",
    options: ["A. Quy lu\u1eadt tuy\u1ec7t \u0111\u1ed1i CNTB", "B. M\u1ecdi th\u1eddi \u0111\u1ea1i", "C. Ch\u1ec9 n\u00f4ng nghi\u1ec7p", "D. Do nh\u00e0 n\u01b0\u1edbc \u0111\u1eb7t"],
    answer: "A"
  },
  {
    id: 87,
    question: "m' = 200% ngh\u0129a l\u00e0:",
    options: ["A. m g\u1ea5p 2 l\u1ea7n v", "B. L\u1ed7 200%", "C. Th\u01b0\u1edfng 200%", "D. N\u0103ng su\u1ea5t gi\u1ea3m"],
    answer: "A"
  },
  {
    id: 88,
    question: "Th\u1eddi gian chu chuy\u1ec3n gồm:",
    options: ["A. S\u1ea3n xu\u1ea5t v\u00e0 l\u01b0u th\u00f4ng", "B. L\u00e0m v\u00e0 nghỉ", "C. Mua v\u00e0 b\u00e1n", "D. Kh\u1ea5u hao"],
    answer: "A"
  },
  {
    id: 89,
    question: "Ti\u1ec1n v\u00e0 t\u01b0 b\u1ea3n kh\u00e1c nhau \u1edf:",
    options: ["A. Mục \u0111\u00edch v\u1eadn \u0111\u1ed9ng", "B. M\u1ec7nh gi\u00e1", "C. Ch\u1ea5t li\u1ec7u", "D. Kh\u00f4ng kh\u00e1c"],
    answer: "A"
  },
  {
    id: 90,
    question: "B\u00f3c l\u1ed9t tư bản dựa tr\u00ean:",
    options: ["A. C\u01b0\u1ee1ng b\u1ee9c", "B. N\u00f4 l\u1ec7", "C. Mua b\u00e1n sức lao \u0111\u1ed9ng", "D. S\u00e1t ph\u1ea1t"],
    answer: "C"
  },
  {
    id: 91,
    question: "C\u1ea5u t\u1ea1o kỹ thu\u1eadt:",
    options: ["A. T\u1ef7 l\u1ec7 TLSX v\u00e0 số lao \u0111\u1ed9ng", "B. Gi\u00e1 trị m\u00e1y", "C. Ti\u1ec1n v\u1ed1n", "D. Học vấn"],
    answer: "A"
  },
  {
    id: 92,
    question: "Tập trung tư bản l\u00e0:",
    options: ["A. Hợp nhất tư bản nhỏ", "B. Tiết kiệm", "C. Cất giữ", "D. Xuất khẩu"],
    answer: "A"
  },
  {
    id: 93,
    question: "Tư bản hàng hóa dùng \u0111\u1ec3:",
    options: ["A. Thực hiện m", "B. Sản xuất", "C. Chuẩn bị", "D. Cho vay"],
    answer: "A"
  },
  {
    id: 94,
    question: "Chu chuy\u1ec3n nhanh th\u00ec:",
    options: ["A. Khối lượng m t\u0103ng", "B. m' gi\u1ea3m", "C. Máy hỏng nhanh", "D. \u0110\u1ecdng v\u1ed1n"],
    answer: "A"
  },
  {
    id: 95,
    question: "Lợi nhuận b\u00ecnh qu\u00e2n do:",
    options: ["A. Cạnh tranh giữa c\u00e1c ng\u00e0nh", "B. Nh\u00e0 n\u01b0\u1edbc", "C. \u0110o\u00e1n k\u1ebft", "D. Hảo t\u00e2m"],
    answer: "A"
  },
  {
    id: 96,
    question: "Gi\u00e1 c\u1ea3 s\u1ea3n xu\u1ea5t:",
    options: ["A. k + p b\u00ecnh qu\u00e2n", "B. Gi\u00e1 trị + thu\u1ebf", "C. k + p \u0111\u1ed9c quy\u1ec1n", "D. Gi\u00e1 b\u00e1n l\u1ebb"],
    answer: "A"
  },
  {
    id: 97,
    question: "Tư bản cho vay G-G' l\u00e0:",
    options: ["A. Ti\u1ec1n \u0111\u1ebb ra ti\u1ec1n", "B. Ngang gi\u00e1", "C. S\u1ea3n xu\u1ea5t", "D. B\u00e1n hàng"],
    answer: "A"
  },
  {
    id: 98,
    question: "C\u1ed5 t\u1ee9c l\u00e0 g\u00ec?",
    options: [
      "A. Thu nh\u1eadp t\u1eeb c\u1ed5 phi\u1ebfu",
      "B. Ti\u1ec1n l\u01b0\u01a1ng",
      "C. Ti\u1ec1n ph\u1ea1t vi ph\u1ea1m",
      "D. Kh\u1ea5u hao t\u01b0 b\u1ea3n"
    ],
    answer: "A"
  },
  {
    id: 99,
    question: "\u0110\u1ecba t\u00f4 tuyệt \u0111\u1ed1i thu tr\u00ean:",
    options: ["A. M\u1ecdi loại \u0111\u1ea5t", "B. \u0110\u1ea5t tốt", "C. \u0110\u1ea5t \u0111\u00f4 thị", "D. \u0110\u1ea5t c\u00f4ng"],
    answer: "A"
  },
  {
    id: 100,
    question: "Tư bản t\u00e0i ch\u00ednh ng\u00e0y nay:",
    options: ["A. \u0110a d\u1ea1ng, quốc tế, số h\u00f3a", "B. \u0110\u1ed5i v\u1eadt", "C. N\u1ed9i bộ", "D. X\u00f3a ngân hàng"],
    answer: "A"
  },
  {
    id: 101,
    question: "T\u00edch t\u1ee5 tư bản l\u00e0 qu\u00e1 tr\u00ecnh t\u0103ng quy m\u00f4 tư bản bằng c\u00e1ch:",
    options: ["A. Tư bản h\u00f3a gi\u00e1 trị th\u1eb7ng d\u01b0", "B. Hợp nhất doanh nghiệp", "C. Vay vốn", "D. Ph\u00e1t h\u00e0nh cổ phiếu"],
    answer: "A"
  },
  {
    id: 102,
    question: "L\u1ee3i nhu\u1eadn si\u00eau ng\u1ea1ch thu \u0111\u01b0\u1ee3c do:",
    options: [
      "A. N\u0103ng su\u1ea5t c\u00e1 bi\u1ec7t cao h\u01a1n n\u0103ng su\u1ea5t x\u00e3 h\u1ed9i",
      "B. B\u00e1n h\u00e0ng gi\u1ea3",
      "C. Gi\u1ea3m l\u01b0\u01a1ng c\u00f4ng nh\u00e2n",
      "D. May m\u1eafn trong kinh doanh"
    ],
    answer: "A"
  },
  {
    id: 103,
    question: "H\u00e0ng h\u00f3a sức lao \u0111\u1ed9ng kh\u00e1c h\u00e0ng h\u00f3a thường \u1edf:",
    options: ["A. Nguồn gốc gi\u00e1 trị", "B. Cách bảo quản", "C. Trọng lượng", "D. M\u00e0u sắc"],
    answer: "A"
  },
  {
    id: 104,
    question: "Tiền tệ có mấy chức năng theo M\u00e1c?",
    options: ["A. 5", "B. 3", "C. 4", "D. 2"],
    answer: "A"
  },
  {
    id: 105,
    question: "Gi\u00e1 trị thặng dư \u0111\u1ed9c quyền thu \u0111\u01b0\u1ee3c bằng c\u00e1ch:",
    options: ["A. \u00c1p \u0111\u1eb7t gi\u00e1 c\u1ea3 \u0111\u1ed9c quyền", "B. N\u00e2ng cao kỹ thuật", "C. Tiết kiệm", "D. T\u0103ng giờ l\u00e0m"],
    answer: "A"
  },
  {
    id: 106,
    question: "Kinh tế tri thức dựa tr\u00ean:",
    options: ["A. Tri thức v\u00e0 k\u1ef9 n\u0103ng", "B. Cơ bắp", "C. Đất đai", "D. Vàng bạc"],
    answer: "A"
  },
  {
    id: 107,
    question: "Th\u00e0nh ph\u1ea7n kinh tế t\u1eadp th\u1ec3 n\u00f2ng c\u1ed1t l\u00e0:",
    options: ["A. Hợp t\u00e1c x\u00e3", "B. Doanh nghiệp tư nhân", "C. Tập đoàn nh\u00e0 n\u01b0\u1edbc", "D. Hộ kinh doanh"],
    answer: "A"
  },
  {
    id: 108,
    question: "CNH, H\u0110H hướng tới:",
    options: ["A. X\u00e2y dựng cơ sở vật chất kỹ thuật CNXH", "B. Xuất khẩu th\u00f4", "C. Nhập khẩu m\u00e1y cũ", "D. Giảm lao \u0111\u1ed9ng"],
    answer: "A"
  },
  {
    id: 109,
    question: "Kinh tế th\u1ecb tr\u01b0\u1eddng c\u00f3 quy luật c\u01a1 b\u1ea3n l\u00e0:",
    options: ["A. Quy luật gi\u00e1 trị", "B. Quy luật t\u00ecnh cảm", "C. Quy luật \u0111ạo \u0111\u1ee9c", "D. Quy luật th\u1eddi tiết"],
    answer: "A"
  },
  {
    id: 110,
    question: "Trong b\u00f3c l\u1ed9t m, nh\u00e0 tư bản chiếm \u0111o\u1ea1t:",
    options: ["A. Hao ph\u00ed lao \u0111\u1ed9ng thặng dư", "B. To\u00e0n bộ lao \u0111\u1ed9ng", "C. Tiền riêng của công nhân", "D. Quần \u00e1o công nhân"],
    answer: "A"
  },
  {
    id: 111,
    question: "Tư bản cố \u0111\u1ecbnh hao m\u00f2n hữu h\u00ecnh do:",
    options: ["A. Sử dụng v\u00e0 t\u00e1c \u0111\u1ed9ng tự nhi\u00ean", "B. L\u1ed7i m\u1ed1t", "C. Gi\u00e1 máy gi\u1ea3m", "D. Quản lý kém"],
    answer: "A"
  },
  {
    id: 112,
    question: "Lao \u0111\u1ed9ng phức tạp l\u00e0:",
    options: ["A. Lao \u0111\u1ed9ng qua \u0111\u00e0o tạo", "B. Lao \u0111\u1ed9ng chân tay", "C. Lao \u0111\u1ed9ng d\u1ec5", "D. Lao \u0111\u1ed9ng ngắn hạn"],
    answer: "A"
  },
  {
    id: 113,
    question: "V\u00e0ng trở th\u00e0nh vật ngang gi\u00e1 chung do:",
    options: ["A. Thuộc t\u00ednh tự nhi\u00ean ph\u00f9 hợp", "B. Nh\u00e0 nước chọn đại", "C. May mắn", "D. Do n\u1ebdu l\u1edbn"],
    answer: "A"
  },
  {
    id: 114,
    question: "Lạm ph\u00e1t xảy ra khi:",
    options: ["A. Tiền giấy vượt qu\u00e1 nhu cầu thực tế", "B. Thiếu tiền", "C. Hàng hóa qu\u00e1 nhiều", "D. D\u00f9ng v\u00e0ng"],
    answer: "A"
  },
  {
    id: 115,
    question: "Quy luật lưu thông tiền tệ quy \u0111\u1ecbnh:",
    options: ["A. Lượng tiền cần thiết trong lưu thông", "B. M\u00e0u sắc tiền", "C. Chữ ký tr\u00ean tiền", "D. Độ bền của tiền"],
    answer: "A"
  },
  {
    id: 116,
    question: "Cạnh tranh nội bộ ng\u00e0nh dẫn \u0111\u1ebfn hình th\u00e0nh:",
    options: ["A. Gi\u00e1 trị thị trường", "B. Lợi nhuận b\u00ecnh qu\u00e2n", "C. Gi\u00e1 c\u1ea3 sản xuất", "D. Địa t\u00f4"],
    answer: "A"
  },
  {
    id: 117,
    question: "Lợi nhuận ngân h\u00e0ng bằng:",
    options: ["A. Ch\u00eanh l\u1ec7ch z cho vay v\u00e0 z nhận gửi", "B. Tiền gửi khách h\u00e0ng", "C. Vốn điều lệ", "D. Nh\u00e0 nước cấp"],
    answer: "A"
  },
  {
    id: 118,
    question: "Tư bản c\u00f4ng ty cổ phần l\u00e0:",
    options: ["A. Tư bản tập thể", "B. Tư bản nh\u00e0 nước", "C. Tư bản cá thể", "D. Tư bản ảo"],
    answer: "A"
  },
  {
    id: 119,
    question: "Địa t\u00f4 ch\u00eanh l\u1ec7ch I thu tr\u00ean:",
    options: ["A. Đất tốt v\u00e0 vị tr\u00ed thuận lợi", "B. Đất xấu", "C. Do th\u00e2m canh", "D. Đất bỏ hoang"],
    answer: "A"
  },
  {
    id: 120,
    question: "Chủ nghĩa tư bản \u0111\u1ed9c quyền nh\u00e0 nước l\u00e0:",
    options: ["A. Nấc thang mới của CNTB", "B. Sự diệt vong của CNTB", "C. Sự quay lại phong kiến", "D. Kinh tế bao cấp"],
    answer: "A"
  },
  {
    id: 121,
    question: "Vai trò quản lý của nh\u00e0 nước ở VN nhằm:",
    options: ["A. Sửa chữa thất bại thị trường v\u00e0 giữ \u0111\u1ecbnh hướng XHCN", "B. Ngăn cản kinh doanh", "C. Làm thay doanh nghiệp", "D. Chỉ thu thuế"],
    answer: "A"
  },
  {
    id: 122,
    question: "Hội nhập kinh tế l\u00e0:",
    options: ["A. Phương thức phát triển tất yếu", "B. Lựa chọn tạm thời", "C. Sai lầm", "D. Chỉ cho nước l\u00f3n"],
    answer: "A"
  },
  {
    id: 123,
    question: "Th\u1ebf giới h\u00f3a l\u00e0:",
    options: ["A. Sự gia t\u0103ng liên kết quốc tế", "B. Chia nhỏ th\u1ebf giới", "C. Đóng cửa biên giới", "D. Xóa bỏ bản sắc"],
    answer: "A"
  },
  {
    id: 124,
    question: "Cách mạng 4.0 thúc \u0111\u1ea9y:",
    options: ["A. T\u0103ng trưởng chiều s\u00e2u", "B. T\u0103ng trưởng chiều rộng", "C. Ph\u00e1 hủy môi trường", "D. Lao \u0111\u1ed9ng chân tay"],
    answer: "A"
  },
  {
    id: 125,
    question: "Lợi \u00edch nh\u00e0 nước hướng tới:",
    options: ["A. Sự phát triển bền vững của quốc gia", "B. Lợi nhuận doanh nghiệp", "C. Thu nhập cá nhân", "D. Lợi \u00edch nước ngoài"],
    answer: "A"
  },
  {
    id: 126,
    question: "Lao \u0111\u1ed9ng thặng dư l\u00e0:",
    options: ["A. Nguồn gốc của m", "B. Lao \u0111\u1ed9ng l\u00e3ng ph\u00ed", "C. Lao \u0111\u1ed9ng của trẻ em", "D. Lao \u0111\u1ed9ng bị lỗi"],
    answer: "A"
  },
  {
    id: 127,
    question: "S\u1ea3n xu\u1ea5t gi\u00e1 tr\u1ecb th\u1eb7ng d\u01b0 tuy\u1ec7t \u0111\u1ed1i th\u1ef1c hi\u1ec7n b\u1eb1ng c\u00e1ch:",
    options: [
      "A. T\u0103ng c\u01b0\u1eddng \u0111\u1ed9 v\u00e0 k\u00e9o d\u00e0i th\u1eddi gian lao \u0111\u1ed9ng",
      "B. T\u0103ng m\u00e1y m\u00f3c",
      "C. T\u0103ng ti\u1ec1n l\u01b0\u01a1ng",
      "D. Gi\u1ea3m ti\u1ec1n l\u01b0\u01a1ng"
    ],
    answer: "A"
  },
  {
    id: 128,
    question: "Chu kỳ khủng hoảng kinh tế CNTB gồm mấy giai \u0111o\u1ea1n?",
    options: ["A. 4", "B. 3", "C. 2", "D. 5"],
    answer: "A"
  },
  {
    id: 129,
    question: "Th\u00e0nh phần kinh tế FDI l\u00e0:",
    options: ["A. Có vốn \u0111\u1ea7u tư nước ngoài", "B. Kinh tế nh\u00e0 nước", "C. Kinh tế tư nhân nội", "D. Hợp tác x\u00e3"],
    answer: "A"
  },
  {
    id: 130,
    question: "CNH ở VN cần gắn với:",
    options: ["A. Bảo vệ môi trường", "B. Ph\u00e1 rừng", "C. Xả thải", "D. Chỉ lo sản xuất"],
    answer: "A"
  },
  {
    id: 131,
    question: "Th\u1ecb trường sức lao \u0111\u1ed9ng \u1edf VN hiện nay:",
    options: ["A. Đang hình th\u00e0nh v\u00e0 ph\u00e1t triển", "B. Đã ho\u00e0n thiện", "C. Kh\u00f4ng tồn tại", "D. Bị cấm"],
    answer: "A"
  }
];