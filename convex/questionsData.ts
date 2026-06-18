export interface RawQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export const rawQuestions: RawQuestion[] = [
  {
    id: 1,
    question: "Kinh tế thị trường đã hình thành trong xã hội nào",
    options: [
      "A. Phong kiến",
      "B. Chiếm hữu nô lệ",
      "C. Tư bản chủ nghĩa",
      "D. Xã hội chủ nghĩa"
    ],
    answer: "A"
  },
  {
    id: 2,
    question: "Sự tuần hoàn của tư bản, nếu xét nó với tư cách là một quá trình định kỳ đổi mới và thường xuyên lặp đi lặp lại được gọi là:",
    options: [
      "A. Chu chuyển tư bản",
      "B. Lưu thông tư bản",
      "C. Vận động tư bản",
      "D. Tái xuất tư bản"
    ],
    answer: "A"
  },
  {
    id: 3,
    question: "Khi nghiên cứu tái sản xuất tư bản xã hội, C.Mác chia nền kinh tế ra thành hai khu vực:",
    options: [
      "A. KV I: Sản xuất công nghiệp; KV II: sản xuất tiêu liệu tiên dùng.",
      "B. KV I: Sản xuất tư liệu sản xuất; KV II: sản xuất hàng hóa nông nghiệp.",
      "C. KV I: Sản xuất tư liệu sản xuất; KV II: sản xuất tư liệu tiêu dùng.",
      "D. KV I: Sản xuất máy móc; KV II: sản xuất tư liệu tiêu dùng."
    ],
    answer: "C"
  },
  {
    id: 4,
    question: "Có 2 hình thức trả tiền công đó là:",
    options: [
      "A. Bằng tiền hay tư liệu sản xuất",
      "B. Bằng tiền hay sản phẩm",
      "C. Bằng tiền hay tư liệu tiêu dùng"
    ],
    answer: "B"
  },
  {
    id: 5,
    question: "Địa tô chênh lệch II thu được trên:",
    options: [
      "A. Ruộng đất đã thâm canh",
      "B. Ruộng đất có độ màu mỡ trung bình",
      "C. Ruộng đất có độ màu mỡ tốt"
    ],
    answer: "A"
  },
  {
    id: 6,
    question: "Nguồn vốn để công nghiệp hóa (CNH) ở các nước tư bản cổ điển lấy từ đâu?",
    options: [
      "A. Cướp bóc thuộc địa",
      "B. Khai thác lao động làm thuê",
      "C. Làm phá sản những người sản xuất nhỏ trong nông nghiệp (NN)",
      "D. Tất cả phương án trên"
    ],
    answer: "D"
  },
  {
    id: 7,
    question: "Tiến hành CNH theo kiểu rút ngắn so với các nước đi trước, đặc biệt như Việt Nam cần thực hiện yêu cầu nào?",
    options: [
      "A. Phát triển kinh tế (PTKT) và Công nghiệp (CN) phải có sự nhảy vọt và ko cần thực hiện tuần tự",
      "B. Coi trọng PT giáo dục và đào tạo (GD và ĐT), KH và CN, xem đây là nền tảng và động lực cho CNH, HĐH",
      "C. PTKT trí thực được dời lại trong gđ sau",
      "D. Ưu tiên PTCN nặng một cách hợp lí trên cơ sở phát triển nông nghiệp (PTNN) và CN nhẹ"
    ],
    answer: "B"
  },
  {
    id: 8,
    question: "Kinh tế thị trường (KTTT) được hiểu là:",
    options: [
      "A. Do CNTB sinh ra",
      "B. Có cùng bản chất với kinh tế hàng hóa (KTHH)",
      "C. Tồn tại chủ quan trong thời kỳ quá độ lên CNXH",
      "D. Là sản phẩm riêng của CNTB"
    ],
    answer: "B"
  },
  {
    id: 9,
    question: "Tăng NSLĐ sẽ dẫn đến:",
    options: [
      "A. GT 1 đơn vị hàng hóa tăng lên",
      "B. GT 1 đơn vị hàng hóa ko đổi",
      "C. GT 1 đơn vị hàng hóa giảm đi",
      "D. GT 1 đơn vị SP giảm đi"
    ],
    answer: "C"
  },
  {
    id: 10,
    question: "Hệ thống lý luận KT-CT đầu tiên nghiên cứu về sản xuất TBCN là:",
    options: [
      "A. Chủ nghĩa trọng thương",
      "B. Chủ nghĩa trọng nông",
      "C. Kinh tế chính trị cổ điển",
      "D. Kinh tế chính trị cổ điển Anh"
    ],
    answer: "A"
  },
  {
    id: 11,
    question: "Mô hình KTTT định hướng XHCN ở nước ta được chính thức nêu ra ở đại hội nào của ĐCSVN?",
    options: [
      "A. VI",
      "B. VIII",
      "C. IX",
      "D. X"
    ],
    answer: "C"
  },
  {
    id: 12,
    question: "Để thực hiện hoàn thiện thể chế kinh tế thị trường định hướng XHCN ở VN cần hoàn thành mấy nhiệm vụ chủ yếu?",
    options: [
      "A. 3 nhiệm vụ",
      "B. 5 nhiệm vụ",
      "C. 6 nhiệm vụ",
      "D. 9 nhiệm vụ"
    ],
    answer: "B"
  },
  {
    id: 13,
    question: "Có mấy nguyên nhân chính dẫn đến sự hình thành độc quyền nhà nước trong CNTB? (Một là, tích tụ và tập trung tư bản. Hai là, sự phát triển của phân công lao động xã hội. Ba là, sự thống trị của độc quyền. Bốn là, xu hướng quốc tế hoá đời sống kinh tế)",
    options: [
      "A. 3 nguyên nhân",
      "B. 4 nguyên nhân",
      "C. 5 nguyên nhân",
      "D. 6 nguyên nhân"
    ],
    answer: "B"
  },
  {
    id: 14,
    question: "Những đóng góp to lớn của KTCT cổ điển Anh vào lý luận KT-CT của nhân loại đó là:",
    options: [
      "A. Rút ra kết luận giá trị do hao phí lao động tạo ra",
      "B. Rút ra được bản chất bóc lột của CNTB",
      "C. Khái quát đúng mục đích của CNTB là lợi nhuận",
      "D. Luận giải về nhiều phạm trù KT như giá trị, sản phẩm, tư bản, tiền lương..."
    ],
    answer: "A"
  },
  {
    id: 15,
    question: "Chọn phương án SAI: vai trò của CMCN đối với sự PT đó là:",
    options: [
      "A. Thúc đẩy sự pt của lực lượng sx",
      "B. Thúc đẩy các quan hệ sản xuất mới ra đời",
      "C. Thúc đẩy hoàn thiện QHSX",
      "D. Thúc đẩy đổi mới phương thức quản trị pt"
    ],
    answer: "B"
  },
  {
    id: 16,
    question: "Nội dung cuộc đại phân công lao động xã hội lần thứ nhất là:",
    options: [
      "A. Đại CN tách khỏi NN.",
      "B. Trồng trọt tách khỏi chăn nuôi.",
      "C. Chăn nuôi tách khỏi trồng trọt",
      "D. Thủ công nghiệp tách khỏi NN."
    ],
    answer: "B"
  },
  {
    id: 17,
    question: "Đại hội nào đã xác định kinh tế thị trường định hướng xã hội chủ nghĩa là một kiểu tổ chức kinh tế vừa tuân theo quy luật của kinh tế thị trường vừa dựa trên cơ sở và chịu sự dẫn dắt chi phối bởi các nguyên tắc và bản chất của chủ nghĩa xã hội?",
    options: [
      "A. Đại hội Đảng toàn quốc lần thứ VI",
      "B. Đại hội Đảng toàn quốc lần thứ VII",
      "C. Đại hội Đảng toàn quốc lần thứ VIII",
      "D. Đại hội Đảng toàn quốc lần thứ IX"
    ],
    answer: "D"
  },
  {
    id: 18,
    question: "Khi đồng thời tăng năng suất lao động và cường độ lao động lên 2 lần thì ý nào dưới đây là đúng",
    options: [
      "A. Giá trị 1 hàng hóa giảm 2 lần, tổng số giá trị hàng hoá tăng 2 lần",
      "B. Tổng số hàng hóa tăng lên 2 lần, giá trị 1 hàng hoá giảm 2 lần",
      "C. Tổng số hàng hoá tăng lên 4 lần, tổng số giá trị hàng hoá tăng lên 4 lần"
    ],
    answer: "A"
  },
  {
    id: 19,
    question: "Con đường CNH của LX thường ưu tiên lĩnh vực nào",
    options: [
      "A. CN nặng",
      "B. CN nhẹ",
      "C. CN khai khoáng",
      "D. CN chế tạo"
    ],
    answer: "A"
  },
  {
    id: 20,
    question: "Yếu tố nào quyết định sự hình thành của CMCN:",
    options: [
      "A. Sự pt vượt bậc của QHSX",
      "B. Phương thức SX mới ra đời",
      "C. Sự pt nhảy vọt về trình độ của TLLĐ",
      "D. Các phát minh sáng chế của các nhà LH trên mọi lĩnh vực"
    ],
    answer: "B"
  },
  {
    id: 21,
    question: "Bản chất khủng hoảng thừa trong nền kinh tế là",
    options: [
      "A. Khủng hoảng sản xuất \"thừa\" so với sức mua có hạn của xã hội.",
      "B. Khủng hoảng sản xuất \"thừa\" so với nhu cầu xã hội.",
      "C. Khủng hoảng sản xuất \"thiếu hụt\" so với sức mua."
    ],
    answer: "A"
  },
  {
    id: 22,
    question: "Nội dung về KTCT của C.Mác và Ph. Ăngghen được trình bày nhiều nhất trong tác phẩm nào?",
    options: [
      "A. Tư bản",
      "B. Hệ tư tưởng Đức",
      "C. Tuyên ngôn của ĐCS",
      "D. Biện chứng của tự nhiên"
    ],
    answer: "A"
  },
  {
    id: 23,
    question: "\"Tư bản tài chính là kết quả của sự hợp nhất giữa tư bản ngân hàng của một số ít ngân hàng độc quyền lớn nhất, với tư bản của những liên minh độc quyền các nhà công nghiệp.\" Câu nói trên của ai?",
    options: [
      "A. C. Mác",
      "B. Ph. Ăngghen",
      "C. V.I. Lênin",
      "D. Hồ Chí Minh"
    ],
    answer: "C"
  },
  {
    id: 24,
    question: "Quan điểm cho rằng lợi nhuận phần thu nhập thặng dư tính bằng hiệu quả giữa giá trị tổng doanh thu trừ đi tổng chi phí và là phần thưởng cho việc gánh chịu rủi ro và cho sự đổi mới là của ai?",
    options: [
      "A. Paul A. Samuelson",
      "B. David Begg",
      "C. Stanley Fischer",
      "D. Rudiger Dornbusch"
    ],
    answer: "A"
  },
  {
    id: 25,
    question: "Tư tưởng kinh tế đầu tiên của giai cấp tư sản trong giai đoạn phương thức sản xuất phong kiến tan rã và chủ nghĩa tư bản ra đời đó là",
    options: [
      "A. Chủ nghĩa trọng thương",
      "B. Chủ nghĩa trọng nông",
      "C. Kinh tế chính trị cổ điển Anh",
      "D. Kinh tế chính trị của Karl Marx"
    ],
    answer: "A"
  },
  {
    id: 26,
    question: "Trong lịch sử PT nền SXXH, tiền đề nào là quan trọng cho sự ra đời và PT của nền KTTT?",
    options: [
      "A. SX",
      "B. Trao đổi hàng hóa (TĐHH)",
      "C. Thị trường",
      "D. SX và TĐHH"
    ],
    answer: "D"
  },
  {
    id: 27,
    question: "Chọn ý đúng khi nói về quan hệ giữa GIÁ TRỊ và GIÁ CẢ",
    options: [
      "A. Giá trị là cơ sở của giá cả, là yếu tố quyết định giá cả, giá cả là hình thức biểu hiện bằng tiền của giá trị",
      "B. Giá cả thị trường còn chịu ảnh hưởng của cung - cầu, giá trị của tiền",
      "C. Tất cả ý trên đúng"
    ],
    answer: "C"
  },
  {
    id: 28,
    question: "Vì sao trong chủ nghĩa tư bản độc quyền cạnh tranh không bị thủ tiêu?",
    options: [
      "A. Vì cạnh tranh là quy luật khách quan của kinh tế hàng hóa",
      "B. Vì tổ chức độc quyền cạnh tranh với các công ty ngoài độc quyền",
      "C. Vì các xí nghiệp trong nội bộ tổ chức độc quyền cạnh tranh với nhau"
    ],
    answer: "A"
  },
  {
    id: 29,
    question: "Chọn ý đúng về tăng CĐLĐ: Khi CĐLĐ tăng lên thì:",
    options: [
      "A. Số lượng HH làm ra trong 1 đơn vị tgian ko đổi.",
      "B. Số lượng lao động hao phí trong thời gian đó ko thay đổi",
      "C. Giá trị 1 đơn vị hàng hóa giảm",
      "D. Tổng số lượng hàng hóa làm ra của 1 người tăng lên"
    ],
    answer: "D"
  },
  {
    id: 30,
    question: "KT-CT Mác - Lênin có những chức nào?",
    options: [
      "A. nhận thức, thực tiễn, tư tưởng, khoa học",
      "B. nhận thức, thực tiễn, khoa học, phương pháp luận",
      "C. thực tiễn, tư tưởng, dự báo, phương pháp luận",
      "D. nhận thức, thực tiễn, tư tưởng, phương pháp luận"
    ],
    answer: "D"
  },
  {
    id: 31,
    question: "Mệnh đề nào sau đây là ý ko đúng về lao động phức tạp?",
    options: [
      "A. LĐPT là lao động trí tuệ của người lao động có trình độ cao",
      "B. LĐPT là lao động trải qua đào tạo, huấn luyện",
      "C. Trong cùng một thời gian lao động, lao động phức tạp tạo ra nhiều giá trị hơn lao động giản đơn"
    ],
    answer: "A"
  },
  {
    id: 32,
    question: "Ai là người đề xuất ba loại thương nghiệp (trao đổi tự nhiên, trao đổi tiền tệ, trao đổi thông qua mục đích làm giàu) và hai loại kinh doanh (kinh tế, sản xuất của cải)",
    options: [
      "A. Aristoleles",
      "B. Platon",
      "C. Xenophon",
      "D. Karl Marx"
    ],
    answer: "A"
  },
  {
    id: 33,
    question: "Những biểu hiện của độc quyền nhà nước trong chủ nghĩa tư bản là",
    options: [
      "A. Sự kết hợp nhân sự giữa tổ chức độc quyền cùng với nhà nước, sự hình thành, phát triển của sở hữu nhà nước",
      "B. Sự kết hợp về nhân sự giữa tổ chức độc quyền cùng với nhà nước; sự hình thành, phát triển của sở hữu nhà nước, sự điều tiết kinh tế của nhà nước từ sản",
      "C. Sự kết hợp về nhân sự qua tổ chức độc quyền cùng với nhà nước, sự hình thành, phát triển của sở hữu nhà nước, sự điều tiết kinh tế đối ngoại của nhà nước tư sản.",
      "D. Sự kết hợp về nhân sự giữa tổ chức độc quyền với nhà nước, sự điều tiết kinh tế của nhà nước tư sản"
    ],
    answer: "B"
  },
  {
    id: 34,
    question: "Kinh tế thị trường đã có mầm mống từ trong xã hội nào?",
    options: [
      "A. Phong kiến",
      "B. Chiếm hữu nô lệ",
      "C. Tư bản chủ nghĩa",
      "D. Xã hội chủ nghĩa"
    ],
    answer: "B"
  },
  {
    id: 35,
    question: "Công nghiệp hoá, hiện đại hoá đất nước phải bảo đảm.",
    options: [
      "A. Xây dựng nền kinh tế khép kín và hướng nội",
      "B. Xây dựng nền kinh tế độc lập tự chủ",
      "C. Xây dựng nền kinh tế phải dựa vào sự giúp đỡ và lệ thuộc vào các nước tư bản",
      "D. Xây dựng nền kinh tế mở nhưng chỉ giao lưu hợp tác với các nước xã hội chủ nghĩa"
    ],
    answer: "B"
  },
  {
    id: 36,
    question: "Đâu không phải đặc trưng của CNTB?",
    options: [
      "A. Quyền sở hữu TLSX thuộc về nhà nước",
      "B. Tích lũy tư bản",
      "C. Trao đổi tự nguyện",
      "D. Một hệ thống giá cả và thị trường cạnh tranh"
    ],
    answer: "A"
  },
  {
    id: 37,
    question: "Thể chế được phân loại theo:",
    options: [
      "A. Cách tiếp cận cấu trúc hệ thống, phương thức phát huy vai trò của chủ thế đối với quá trình phát triển, theo cấu thành các lĩnh vực cốt lõi của xã hội và theo cấu trúc các tổ chức tham gia vào xã hội",
      "B. Cách tiếp cận cấu trúc hệ thống, phương thức phát huy vai trò của doanh nghiệp với quá trình phát triển, theo cấu thành các lĩnh vực cốt lõi của xã hội và theo cấu trúc các tổ chức tham gia vào xã hội",
      "C. Cách tiếp cận sự phân chia bên trong hay bên ngoài, phương thức phát huy vai trò của doanh nghiệp với quá trình phát triển, theo cấu thành các lĩnh vực cốt lõi của xã hội và theo cấu trúc các tổ chức tham gia vào xã hội"
    ],
    answer: "A"
  },
  {
    id: 38,
    question: "V - Tư bản khả biến là",
    options: [
      "A. Bộ phận trực tiếp để tạo ra giá trị sử dụng",
      "B. Bộ phận trực tiếp để tạo ra giá trị thặng dư",
      "C. Bộ phận trực tiếp để tạo ra sản phẩm thặng dư",
      "D. Bộ phận gián tiếp để tạo ra giá trị thặng dư"
    ],
    answer: "B"
  },
  {
    id: 39,
    question: "Nghiên cứu về cách mạng công nghiệp lần thứ nhất, C. Mác đã khái quát tính quy luật của cách mạng công nghiệp qua mấy giai đoạn phát triển?",
    options: [
      "A. Một giai đoạn",
      "B. Hai giai đoạn",
      "C. Ba giai đoạn",
      "D. Bốn giai đoạn"
    ],
    answer: "C"
  },
  {
    id: 40,
    question: "Trên giác độ kinh tế chính trị, lao động trừu tượng là",
    options: [
      "A. Là phạm trù của mọi nền kinh tế hàng hoá",
      "B. Là phạm trù riêng của kinh tế thị trường",
      "C. Là phạm trù chung của mọi nền kinh tế"
    ],
    answer: "A"
  },
  {
    id: 41,
    question: "Cách mạng công nghiệp lần thứ hai diễn ra trong giai đoạn nào?",
    options: [
      "A. Từ nửa cuối thế kỷ XIX đến đầu thế kỷ XX",
      "B. Từ nửa đầu thế kỷ XIX đến cuối thế kỷ XIX",
      "C. Từ nửa đầu thế kỷ XX đế nữa cuối thế kỷ XX",
      "D. Từ nửa cuối thế kỷ XIX đến nửa cuối thế kỷ XX"
    ],
    answer: "A"
  },
  {
    id: 42,
    question: "Cách mạng công nghiệp lần thứ tư sẽ làm mất đi lợi thế của các nước đang phát triển về",
    options: [
      "A. Tài nguyên thiên nhiên, công nhân giá rẻ",
      "B. Khoáng sản, sức lao động",
      "C. Khoa học công nghệ, nhân công chất lượng cao"
    ],
    answer: "A"
  },
  {
    id: 43,
    question: "Phương pháp nghiên cứu kinh tế chính trị Mác - Lênin phù hợp nhất đó là",
    options: [
      "A. Trừu tượng hóa khoa học",
      "B. Phân tích và tổng hợp",
      "C. Quy nạp diễn dịch",
      "D. Khảo sát, tổng kết thực tiễn"
    ],
    answer: "A"
  },
  {
    id: 44,
    question: "Khi nghiên cứu về cách mạng công nghiệp lần thứ nhất, C. Mác đã khái quát tính quy luật của các mạng công nghiệp qua các giai đoạn phát triển đó là",
    options: [
      "A. Hiệp tác đơn giản, lao động thủ công, lao động phức tạp",
      "B. Hiệp tác đơn giản, công trường thủ công, công nghiệp hóa",
      "C. Hiệp tác đơn giản, sản xuất thủ công, sản xuất hiện đại",
      "D. Hiệp tác đơn giản, công trường thủ công, đại công nghiệp"
    ],
    answer: "D"
  },
  {
    id: 45,
    question: "Xét về bản chất, thì lợi ích kinh tế được hiểu là",
    options: [
      "A. Quan hệ kinh tế xã hội",
      "B. Quan hệ xã hội, mang tính lịch sử",
      "C. Quan hệ sản xuất",
      "D. Quan hệ chính trị mang tính lợi ích"
    ],
    answer: "C"
  },
  {
    id: 46,
    question: "Sản xuất hàng hóa ra đời dựa trên",
    options: [
      "A. Một điều kiện",
      "B. Hai điều kiện",
      "C. Ba điều kiện",
      "D. Bốn điều kiện"
    ],
    answer: "B"
  },
  {
    id: 47,
    question: "Các tổ chức độc quyền sử dụng giá cả độc quyền để",
    options: [
      "A. Cùng cố vai trò tổ chức độc quyền",
      "B. Chiếm đoạt giá trị thặng dư của người khác",
      "C. Gây thiệt hại cho các đối thủ cạnh tranh"
    ],
    answer: "B"
  },
  {
    id: 48,
    question: "Sức lao động trở thành hàng hoá một cách phổ biến từ khi nào?",
    options: [
      "A. Từ khi có chủ nghĩa tư bản",
      "B. Từ khi có sản xuất hàng hoá",
      "C. Từ khi có kinh tế thị trường",
      "D. Từ khi lao động ra đời"
    ],
    answer: "A"
  },
  {
    id: 49,
    question: "Cách mạng công nghiệp lần thứ nhất diễn ra trong thời gian nào?",
    options: [
      "A. Từ giữa thế kỷ XV đến giữa thế kỷ XIX",
      "B. Từ giữa thế kỷ XVI đến giữa thế kỷ XVII",
      "C. Từ giữa thế kỷ XVIII đến giữa thế kỷ XIX",
      "D. Từ giữa thế kỷ XIX đến giữa thế kỷ XX"
    ],
    answer: "C"
  },
  {
    id: 50,
    question: "Tiền công thực tế là",
    options: [
      "A. Tiền công được biểu hiện bằng số lượng hàng hóa tiêu dùng và dịch vụ mà công nhân mua được bằng tiền công danh nghĩa của mình",
      "B. Tiền công được biểu hiện bằng số lượng hàng hóa tiêu dùng và dịch vụ mà công nhân mua được bằng tiền công thực tế của mình",
      "C. Tiền công được biểu hiện bằng số tư liệu sản xuất và tiêu dùng và dịch vụ mà công nhân mua được bằng tiền công thực tế của mình"
    ],
    answer: "A"
  },
  {
    id: 51,
    question: "Điền vào chỗ trống: Theo Karl Marx, kinh tế chính trị học tư bản cổ điển Anh bắt đầu từ... và kết thúc ở...",
    options: [
      "A. William Petty...David Ricardo",
      "B. William Petty Adam Smith",
      "C. Adam Smith... David Ricardo",
      "D. Adam Smith. Thomas Malthus."
    ],
    answer: "A"
  },
  {
    id: 52,
    question: "Việt Nam gia nhập tổ chức ASEAN trong khu vực khi nào?",
    options: [
      "A. 1995",
      "B. 1996",
      "C. 1993",
      "D. 1997"
    ],
    answer: "A"
  },
  {
    id: 53,
    question: "Điều kiện để ra đời và tồn tại của sản xuất hàng hóa là",
    options: [
      "A. Phân công lao động xã hội và sự tách biệt về kinh tế giữa các chủ thể sản xuất",
      "B. Phân công lao động trong các gia đình xuất hiện",
      "C. Chế độ tư hữu về tư liệu sản xuất",
      "D. Nhu cầu trao đổi trong xã hội tăng lên"
    ],
    answer: "A"
  },
  {
    id: 54,
    question: "Biểu hiện mới của tích tụ và tập trung tư bản trong giai đoạn hiện nay là",
    options: [
      "A. Sự xuất hiện của các công ty độc quyền xuyên quốc gia",
      "B. Sự bành trướng lãnh thổ",
      "C. Sự tranh giành, xung đột lợi ích về kinh tế",
      "D. Sự xung đột về chính trị"
    ],
    answer: "A"
  }
];