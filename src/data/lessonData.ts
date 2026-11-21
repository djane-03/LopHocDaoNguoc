export const DEFAULT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycby8IJhBKKFEgqLgC7yDBSmbFbWnAzN8VK1alRpHHKsaEctYjgVjZccU13Ha1XT9SpuRAA/exec";

export interface PlantStage {
  id: number;
  stepLabel: string;
  name: string;
  emoji: string;
  sectionTitle: string;
  subtitle: string;
  growthQuote: string;
  accentColor: string;
  bgTint: string;
}

export const PLANT_STAGES: PlantStage[] = [
  {
    id: 1,
    stepLabel: "Phần 01",
    name: "Gieo hạt",
    emoji: "🌱",
    sectionTitle: "Khái niệm Điển tích & Điển cố",
    subtitle: "Đặt những hạt mầm tri thức đầu tiên về chuyện xưa tích cũ trong văn chương",
    growthQuote: "Hạt mầm tri thức đã được gieo xuống đất ẩm! Bạn đã sẵn sàng khám phá gốc rễ của điển tích và điển cố.",
    accentColor: "#15803D",
    bgTint: "#F0FDF4",
  },
  {
    id: 2,
    stepLabel: "Phần 02",
    name: "Nảy mầm",
    emoji: "🌿",
    sectionTitle: "Đặc tính của Điển cố",
    subtitle: "Vươn mầm tìm hiểu 4 đặc tính nghệ thuật làm nên sức sống của điển cố",
    growthQuote: "Mầm xanh đã vươn lên đón nắng! Bạn đã nắm vững khái niệm và tiến bước vào chiều sâu nghệ thuật của điển cố.",
    accentColor: "#047857",
    bgTint: "#ECFDF5",
  },
  {
    id: 3,
    stepLabel: "Phần 03",
    name: "Ra lá",
    emoji: "🍀",
    sectionTitle: "Giá trị văn hóa & Nhận diện",
    subtitle: "Đâm chồi nảy lộc cùng kỹ năng giải mã các lớp trầm tích văn hóa trong văn bản",
    growthQuote: "Những chiếc lá xanh tươi đã xòe rộng! Giờ đây bạn có thể nhận diện và giải mã các lớp trầm tích văn hóa cổ xưa.",
    accentColor: "#0F766E",
    bgTint: "#F0FDFA",
  },
  {
    id: 4,
    stepLabel: "Phần 04",
    name: "Đơm hoa",
    emoji: "🌻",
    sectionTitle: "Bài tập vận dụng",
    subtitle: "Kết tinh tri thức qua thực hành nhận diện, phân tích và sáng tạo văn học",
    growthQuote: "Bông hoa tri thức đã nở rộ rực rỡ! Hãy vận dụng toàn bộ kiến thức để hoàn thành thử thách cuối cùng.",
    accentColor: "#B45309",
    bgTint: "#FFFBEB",
  },
];

export interface ComparisonCriterion {
  criterion: string;
  dienTich: string;
  dienCo: string;
  examplePair: {
    dienTichEx: string;
    dienCoEx: string;
  };
}

export const COMPARISON_TABLE: ComparisonCriterion[] = [
  {
    criterion: "Bản chất",
    dienTich: "Là những tích truyện xưa",
    dienCo: "Là sự việc, hình ảnh, lời nói hoặc quy chế, luật lệ cũ",
    examplePair: {
      dienTichEx: "",
      dienCoEx: "",
    },
  },
  {
    criterion: "Cấu trúc",
    dienTich: "Thường là một câu chuyện kể (có nhân vật, diễn biến, sự kiện hoàn chỉnh nhưng được tóm tắt ngắn gọn khi đưa vào tác phẩm).",
    dienCo: "Thường là một từ ngữ, hình ảnh hoặc biểu tượng cô đọng, hàm súc (có khi gợi ra cả một câu chuyện dài).",
    examplePair: {
      dienTichEx: "Tích 'Giấc mộng Nam Kha' kể về người ngủ dưới gốc cây hòe mơ làm thái thú.",
      dienCoEx: "Chỉ 2 chữ 'Sâm Thương' hoặc 'Chỉ hồng' cô đọng thành biểu tượng.",
    },
  },
];

export interface CharacteristicItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  examples: {
    work: string;
    author: string;
    quote: string;
    highlightedTerm: string;
    originStory: string;
    meaning: string;
  }[];
}

export const CHARACTERISTICS_DATA: CharacteristicItem[] = [
  {
    id: "lien-tuong",
    code: "a",
    title: "Tính liên tưởng",
    summary:
      "Thể hiện qua mối liên hệ chặt chẽ giữa nghĩa trực tiếp của điển cố với hiện thực văn cảnh trong tác phẩm. Người đọc từ một từ ngữ ngắn gọn có thể liên tưởng ngay đến hoàn cảnh, tâm trạng tương đồng của nhân vật.",
    examples: [
      {
        work: "Truyện Kiều (Đoạn Thúy Kiều báo ân)",
        author: "Nguyễn Du",
        quote: "Nghìn vàng gọi chút lễ thường,\nMà lòng Phiếu Mẫu, mấy vàng cho cân.",
        highlightedTerm: "Phiếu Mẫu",
        originStory:
          "Xuất phát từ chuyện Ngũ Tử Tư khi trốn khỏi nước Sở đã được một người đàn bà giặt quần áo bên sông (Phiếu Mẫu) cho ăn và cứu giúp. Sau này khi công thành danh toại, Ngũ Tử Tư lấy ngàn vàng để đền đáp báo ơn.",
        meaning:
          "Thể hiện tấm lòng biết ơn sâu nặng của Thúy Kiều đối với ân nhân cứu giúp mình lúc hoạn nạn: ân tình ấy quý giá không bao nhiêu vàng bạc nào cân đong hết được.",
      },
    ],
  },
  {
    id: "hinh-tuong-ham-suc",
    code: "b",
    title: "Tính hình tượng và cô đọng hàm súc",
    summary:
      "Nội dung ý nghĩa của điển cố đôi khi hàm chứa những diễn giải, tích truyện rất dài nhưng được khái quát ngắn gọn chỉ bằng một hoặc một vài hình tượng, câu chữ súc tích.",
    examples: [
      {
        work: "Bạch Đằng giang phú",
        author: "Trương Hán Siêu",
        quote: "Những tưởng gieo roi một lần,\nQuét sạch Nam bang bốn cõi.",
        highlightedTerm: "gieo roi",
        originStory:
          "Xuất phát từ chuyện Bồ Kiên nước Tần khi dẫn quân vào đánh nước Tấn đã huênh hoang tuyên bố: 'Cứ như số quân của ta thì chỉ ném roi ngựa xuống sông cũng ngăn dòng nước lại được'.",
        meaning:
          "Chỉ bằng 2 chữ 'gieo roi' đã khắc họa trọn vẹn sự hung hăng, kiêu ngạo và tham vọng ngông cuồng của đạo quân xâm lược.",
      },
      {
        work: "Truyện Kiều (Chị em Thúy Kiều)",
        author: "Nguyễn Du",
        quote: "Một hai nghiêng nước nghiêng thành,\nSắc đành đòi một, tài đành họa hai.",
        highlightedTerm: "nghiêng nước nghiêng thành",
        originStory:
          "Lấy ý từ câu chữ cổ 'nhất cố khuynh nhân thành, tái cố khuynh nhân quốc' (ngoảnh lại nhìn một lần làm nghiêng thành người, ngoảnh lại lần nữa làm nghiêng nước người).",
        meaning:
          "Miêu tả vẻ đẹp tuyệt sắc, có sức quyến rũ làm say đắm lòng người của hai chị em Thúy Kiều.",
      },
    ],
  },
  {
    id: "da-dang-linh-dong",
    code: "c",
    title: "Tính đa dạng và linh động",
    summary:
      "Cùng một nội dung điển cố nguyên gốc nhưng khi đi vào sáng tác, các nhà thơ có thể biến hóa linh hoạt qua nhiều hình thức từ ngữ khác nhau (Việt hóa hoặc Hán Việt).",
    examples: [
      {
        work: "Truyện Kiều & Truyện Hoa Tiên",
        author: "Nguyễn Du & Nguyễn Huy Tự",
        quote:
          "• 'Dù khi lá thắm chỉ hồng'\n• 'Nàng rằng hồng diệp xích thằng'\n• 'Cùng chàng kết tóc xe tơ những ngày'\n• 'Những tơ nào thắm những cầu nào xanh'",
        highlightedTerm: "chỉ hồng / xích thằng / xe tơ / tơ thắm",
        originStory:
          "Tất cả các cách gọi trên đều quy về chung một điển cố trong truyện dân gian Trung Quốc: Ông Tơ (hay còn gọi là Nguyệt Lão) se duyên cho các cặp đôi nam nữ bằng cách buộc chân họ lại với nhau bằng một sợi chỉ màu đỏ.",
        meaning:
          "Biểu trưng cho mối nhân duyên tiền định, tình yêu đôi lứa và lời hẹn ước gắn bó trăm năm.",
      },
    ],
  },
  {
    id: "tinh-te-cam-xuc",
    code: "d",
    title: "Biểu đạt tư tưởng và cảm xúc tinh tế",
    summary:
      "Giúp tác giả thể hiện những rung động nội tâm sâu kín như nỗi nhớ, sự tiếc nuối, lòng chung thủy hay khát vọng hạnh phúc thông qua các điển quen thuộc mà không cần bộc lộ trực tiếp. Nhờ vậy, cảm xúc trong tác phẩm vừa sâu sắc vừa giàu tính nghệ thuật.",
    examples: [
      {
        work: "Truyện Kiều",
        author: "Nguyễn Du",
        quote: "Sầu đong càng lắc càng đầy,\nBa thu dọn lại một ngày dài ghê.",
        highlightedTerm: "Ba thu",
        originStory:
          "Lấy ý từ Kinh Thi: 'Nhất nhật bất kiến như tam thu hề' (Một ngày không trông thấy mặt lâu bằng ba mùa thu).",
        meaning:
          "Không cần diễn giải dài dòng, hai chữ 'ba thu' vừa gợi khoảng cách thời gian tâm lý kéo dài đằng đẵng, vừa đo đếm được cường độ nỗi nhớ nhung da diết của Kim Trọng.",
      },
    ],
  },
];

export interface RecognitionSign {
  step: string;
  title: string;
  description: string;
  keyTip: string;
  illustrationExample: string;
}

export const RECOGNITION_SIGNS: RecognitionSign[] = [
  {
    step: "Dấu hiệu 01",
    title: "Gắn với nhân vật, sự kiện lịch sử & truyền thuyết cổ",
    description:
      "Điển tích và điển cố thường gắn với những nhân vật, câu chuyện hoặc sự kiện nổi tiếng trong lịch sử, truyền thuyết và văn học cổ.",
    keyTip:
      "Khi bắt gặp những tên riêng, địa danh, hình ảnh có nguồn gốc xa lạ hoặc không thể hiểu đầy đủ theo nghĩa thông thường, hãy tra cứu xuất xứ của chúng.",
    illustrationExample: "Ví dụ: 'Phiếu Mẫu', 'Sâm Thương', 'cỏ Ngu Mỹ', 'ngọc Mị Nương', 'liễu Chương Đài'.",
  },
  {
    step: "Dấu hiệu 02",
    title: "Mang tính hàm xúc",
    description:
      "Các điển luôn mang tính hàm súc cao. Chỉ một vài từ ngữ nhưng gợi ra cả một hệ thống liên tưởng văn hóa rộng lớn.",
    keyTip:
      "Hãy đối chiếu nghĩa đen với văn cảnh. Nhận ra sự khác biệt giữa nghĩa bề mặt và nghĩa văn hóa hàm ẩn là cách hiệu quả nhất để xác định điển cố.",
    illustrationExample:
      "Ví dụ: 'Ba thu' theo nghĩa đen là 3 mùa thu trong năm, nhưng trong văn cảnh Truyện Kiều lại chỉ khoảng thời gian xa cách kéo dài và nỗi nhớ nhung da diết.",
  },
  {
    step: "Dấu hiệu 03",
    title: "Đòi hỏi quá trình giải mã từ người đọc",
    description:
      "Khác với hình ảnh miêu tả thông thường, ý nghĩa của điển không nằm hoàn toàn trên mặt chữ mà phụ thuộc vào vốn hiểu biết văn hóa của người tiếp nhận.",
    keyTip:
      "Nếu không biết xuất xứ của điển, người đọc chỉ hiểu được nghĩa bề mặt mà bỏ lỡ tầng nghĩa sâu sắc, trang nhã mà tác giả gửi gắm.",
    illustrationExample:
      "Ví dụ: Hiểu tích Nguyễn Tịch thời Ngụy – Tấn mới hiểu vì sao 'mắt xanh' lại mang nghĩa là sự yêu mến, quý trọng.",
  },
];

export interface AllusionGlossaryItem {
  id: string;
  term: string;
  historicalOrigin: string;
  symbolicMeaning: string;
}

export const ALLUSION_GLOSSARY: AllusionGlossaryItem[] = [

  {
    id: "ba-thu",
    term: "Ba thu",
    historicalOrigin:
      "Xuất phát từ quan niệm cổ cho rằng một ngày không gặp nhau dài như ba mùa thu.",
    symbolicMeaning: "Thường được dùng để diễn tả nỗi nhớ nhung sâu sắc hoặc cảm giác thời gian xa cách kéo dài.",
  },
  {
    id: "sam-thuong",
    term: "Sâm Thương",
    historicalOrigin:
      "Bắt nguồn từ tên hai ngôi sao Sâm và Thương trong thiên văn học cổ. Hai ngôi sao này không bao giờ xuất hiện cùng lúc trên bầu trời.",
    symbolicMeaning: "Tượng trưng cho sự xa cách, chia lìa hoặc khó có cơ hội gặp gỡ.",
  },
  {
    id: "mat-xanh",
    term: "Mắt xanh",
    historicalOrigin:
      "Liên quan đến câu chuyện về Nguyễn Tịch thời Ngụy – Tấn. Ông dùng ánh mắt thiện cảm để nhìn những người mình quý trọng.",
    symbolicMeaning: "Dùng để chỉ việc được yêu mến, đánh giá cao hoặc có thiện cảm.",
  },
  {
    id: "lieu-chuong-dai",
    term: "Liễu Chương Đài",
    historicalOrigin:
      "Xuất phát từ một điển cố nổi tiếng trong văn học Trung Hoa. Hình ảnh cây liễu ở Chương Đài thường gắn với người phụ nữ hoặc mối tình đã xa cách.",
    symbolicMeaning: "Trong văn học trung đại, điển cố này thường được sử dụng để gợi nỗi nhớ, sự chia ly hoặc những đổi thay của số phận.",
  },
  {
    id: "co-ngu-my",
    term: "Cỏ Ngu Mỹ",
    historicalOrigin:
      "Cỏ Ngu Mỹ gắn với câu chuyện Ngu Cơ – ái thiếp của Hạng Vũ. Sau khi nàng qua đời, tương truyền nơi đó mọc lên loài hoa mang tên Ngu Mỹ.",
    symbolicMeaning: "Tượng trưng cho tình yêu thủy chung, sự hy sinh và vẻ đẹp bi thương.",
  },
];

export interface QuickQuizQuestion {
  id: string;
  number: number;
  prompt: string;
  verseOrSentence?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUICK_QUIZ_QUESTIONS: QuickQuizQuestion[] = [
  {
    id: "bt1",
    number: 1,
    prompt: "Đọc câu thơ sau và xác định điển cố được sử dụng:",
    verseOrSentence:
      "\"Người lên ngựa, kẻ chia bào\nRừng phong thu đã nhuốm màu quan san.\"\n(Truyện Kiều — Nguyễn Du)",
    options: ["Chia bào", "Rừng phong thu", "Quan san", "Người lên ngựa"],
    correctIndex: 2,
    explanation:
      "Đáp án: 'Quan san'. Giải thích: 'Quan san' là điển cố chỉ vùng biên ải xa xôi, thường gợi sự cách trở, chia ly và hành trình dài đầy khó khăn.",
  },
  {
    id: "bt2",
    number: 2,
    prompt: "Cho cụm từ 'ba thu' trong Truyện Kiều. Ý nghĩa văn hóa hàm ẩn của điển cố này là gì?",
    options: [
      "Chỉ thời tiết mát mẻ của ba mùa thu liên tiếp trong năm",
      "Chỉ nỗi nhớ nhung da diết và cảm giác thời gian xa cách kéo dài",
      "Chỉ mùa thu hoạch mùa màng bội thu của người nông dân xưa",
      "Chỉ ba năm học tập đèn sách để chuẩn bị đi thi hội",
    ],
    correctIndex: 1,
    explanation:
      "Đáp án: Chỉ nỗi nhớ nhung da diết và cảm giác thời gian xa cách kéo dài (dẫn từ Kinh Thi: 'Nhất nhật bất kiến như tam thu hề' — Một ngày không gặp dài như ba mùa thu).",
  },
  {
    id: "bt3",
    number: 3,
    prompt: "Trong câu văn: 'Anh ấy thực sự lọt vào mắt xanh của ban giám khảo', cụm từ nào là điển cố và mang ý nghĩa gì?",
    options: [
      "'Ban giám khảo' — Chỉ những người cầm cân nảy mực công tâm",
      "'Lọt vào' — Chỉ sự may mắn vượt qua thử thách",
      "'Mắt xanh' — Biểu thị sự yêu mến, đánh giá cao hoặc có thiện cảm đối với một người",
      "'Thực sự' — Nhấn mạnh phẩm chất chân thật của nhân vật",
    ],
    correctIndex: 2,
    explanation:
      "Đáp án: 'Mắt xanh'. Giải thích: Điển cố này lấy từ tích Nguyễn Tịch thời Ngụy – Tấn, biểu thị sự yêu mến, đánh giá cao hoặc có thiện cảm đối với một người.",
  },
  {
    id: "bt4",
    number: 4,
    prompt: "Vì sao các tác giả văn học trung đại thường sử dụng điển tích, điển cố trong tác phẩm?",
    options: [
      "Để diễn đạt ý nghĩa một cách cô đọng, tăng sức gợi cảm, thể hiện chiều sâu văn hóa và nâng cao giá trị nghệ thuật cho tác phẩm",
      "Để làm cho câu văn dài hơn và chỉ dành riêng cho giới quý tộc đọc hiểu",
      "Vì ngôn ngữ tiếng Việt thời trung đại không có các tính từ chỉ cảm xúc",
      "Để thay thế hoàn toàn cho các biện pháp tu từ như ẩn dụ hay hoán dụ",
    ],
    correctIndex: 0,
    explanation:
      "Đáp án: Để diễn đạt ý nghĩa một cách cô đọng, tăng sức gợi cảm, thể hiện chiều sâu văn hóa và nâng cao giá trị nghệ thuật cho tác phẩm.",
  },
];

export interface EssayExercisePrompt {
  id: string;
  label: string;
  title: string;
  excerpt?: string;
  excerptSource?: string;
  question: string;
  placeholder: string;
  referenceSample: string;
}

export const ESSAY_PROMPTS: EssayExercisePrompt[] = [
  {
    id: "essay1",
    label: "Bài tập tự luận 1 · Nhận diện & Nêu tác dụng",
    title: "Giải mã điển tích, điển cố trong Chuyện người con gái Nam Xương & Truyện Kiều",
    excerpt:
      "\"Thiếp nếu đoan trang giữ tiết, trinh bạch gìn lòng, vào nước xin làm ngọc Mỵ Nương, xuống đất xin làm cỏ Ngu mĩ. Nhược bằng lòng chim dạ cá, lừa chồng dối con, dưới xin làm mồi cho cá tôm, trên xin làm cơm cho diều quạ và xin chịu khắp mọi người phỉ nhổ.\"",
    excerptSource: "Nguyễn Dữ — Chuyện người con gái Nam Xương",
    question:
      "Hãy xác định các điển tích, điển cố được Vũ Nương sử dụng trong lời nguyền trên và nêu tác dụng nghệ thuật của việc sử dụng các điển đó.",
    placeholder:
      "Gợi ý: Chỉ rõ các điển cố (ngọc Mỵ Nương, cỏ Ngu mĩ) và phân tích tác dụng khẳng định phẩm hạnh trong sạch, thủy chung và nỗi oan khuất bi thương của Vũ Nương...",
    referenceSample:
      "Các điển cố được sử dụng: 'ngọc Mỵ Nương' (tích Mị Châu bị oan, máu chảy xuống biển trai ăn thành ngọc sáng) và 'cỏ Ngu mĩ' (tích Ngu Cơ tự vẫn giữ trọn tình nghĩa với Hạng Vũ, trên mộ mọc cỏ Ngu mỹ nhân). Tác dụng: Giúp lời than của Vũ Nương trở nên trang trọng, thống thiết; khẳng định đanh thép tấm lòng trinh bạch, thủy chung son sắt và làm nổi bật bi kịch oan khuất của người phụ nữ trong xã hội phong kiến.",
  },
  {
    id: "essay2",
    label: "Bài tập tự luận 2 · Phân tích tính lịch sử & tính biểu trưng",
    title: "Phân tích bộ ba điển tích: 'Nước cành dương', 'Mạt cưa mướp đắng', 'Mắt xanh'",
    question:
      "Hãy phân tích ngắn gọn tính lịch sử (nguồn gốc tích truyện) và tính biểu trưng (ý nghĩa khái quát) của một hoặc cả ba điển tích: nước cành dương, mạt cưa mướp đắng, mắt xanh.",
    placeholder:
      "Nhập phân tích của bạn về nguồn gốc lịch sử và ý nghĩa biểu trưng của các điển tích trên...",
    referenceSample:
      "1. Nước cành dương: [Tính lịch sử] Phật Đồ Trừng nước Thiên Trúc lấy cành dương nhúng nước trong rẩy cứu sống con của Thạch Lộc đang ốm nặng. [Tính biểu trưng] Chỉ nước phép nhiệm màu chữa lành bệnh tật.\n2. Mạt cưa mướp đắng: [Tính lịch sử] Kẻ lấy mạt cưa giả làm cám đem bán gặp kẻ lấy mướp đắng giả làm dưa chuột, hai bên mua bán cho nhau. [Tính biểu trưng] Chỉ phường bịp bợm gặp nhau.\n3. Mắt xanh: [Tính lịch sử] Nguyễn Tịch đời Tấn quý ai thì tiếp bằng mắt xanh (lòng đen), ghét ai thì tiếp bằng mắt trắng. [Tính biểu trưng] Thể hiện lòng quý trọng, biệt đãi đối với người tài.",
  },
  {
    id: "essay3",
    label: "Bài tập tự luận 3 · Viết đoạn văn sáng tạo (7–8 câu)",
    title: "Viết đoạn văn có sử dụng điển tích, điển cố và chú thích rõ",
    question:
      "Viết một đoạn văn (khoảng 7–8 câu) kể lại một câu chuyện đã đọc hoặc nêu cảm nhận về một nhân vật văn học, trong đó có sử dụng ít nhất 01 điển tích hoặc điển cố. Hãy chú thích rõ điển mà bạn đã dùng.",
    placeholder:
      "Viết đoạn văn 7–8 câu của bạn tại đây và ghi chú rõ điển tích/điển cố đã sử dụng ở cuối đoạn...",
    referenceSample:
      "Một buổi chiều mùa thu, khi ánh nắng dịu dàng chiếu qua những tán lá, cô gái Thúy Kiều ngồi bên dòng sông Tiền Đường, nhớ về người yêu cũ là Kim Trọng. Tình yêu của họ đẹp đẽ biết bao, nhưng số phận éo le đã khiến Kiều phải chịu cảnh lưu lạc, xa cách người thương. Như câu chuyện 'Ngưu Lang - Chức Nữ' hay cảnh chia lìa 'Sâm Thương', họ tưởng chừng không bao giờ gặp lại, nhưng lòng thủy chung của Kiều vẫn luôn hướng về chàng Kim với nỗi nhớ 'ba thu' vời vợi. Dù trải qua bao sóng gió vùi dập, tấm lòng trong trắng của nàng vẫn sáng trong như 'ngọc Mị Nương'. Khép lại trang sách, vẻ đẹp tâm hồn và sự hy sinh của Kiều mãi để lại niềm cảm thương sâu sắc trong lòng người đọc.\n— Chú thích điển tích/điển cố: Ngưu Lang - Chức Nữ, Sâm Thương, Ba thu, Ngọc Mị Nương.",
  },
];

export interface StudentRosterItem {
  mhs: string;
  fullName: string;
}

export const STUDENT_ROSTER_12A1: StudentRosterItem[] = [
  { mhs: "12A1TVO1", fullName: "Nguyễn Trường An" },
  { mhs: "12A1TVO2", fullName: "Lương Thị Vân Anh" },
  { mhs: "12A1TVO3", fullName: "Nguyễn Trần Thái Anh" },
  { mhs: "12A1TVO4", fullName: "Đặng Hồng Ân" },
  { mhs: "12A1TVO5", fullName: "Nguyễn Trung Dũng" },
  { mhs: "12A1TVO6", fullName: "Bùi Ngọc Thùy Dương" },
  { mhs: "12A1TVO7", fullName: "Nguyễn Phong Đạt" },
  { mhs: "12A1TVO8", fullName: "Lê Đỗ Minh Hiển" },
  { mhs: "12A1TVO9", fullName: "Ngô Hoàng Huân" },
  { mhs: "12A1TVO10", fullName: "Phạm Tuấn Hưng" },
  { mhs: "12A1TVO11", fullName: "Võ Trần Hoàng Khải" },
  { mhs: "12A1TVO12", fullName: "Lê Nguyễn Duy Khang" },
  { mhs: "12A1TVO13", fullName: "Trịnh Nguyễn Kim Khánh" },
  { mhs: "12A1TVO14", fullName: "Phạm Đăng Khôi" },
  { mhs: "12A1TVO15", fullName: "Lê Thành Lễ" },
  { mhs: "12A1TVO16", fullName: "Trần Phúc Ngân" },
  { mhs: "12A1TVO17", fullName: "Trần Thị Kim Ngân" },
  { mhs: "12A1TVO18", fullName: "Huỳnh Thị Bảo Ngọc" },
  { mhs: "12A1TVO19", fullName: "Nguyễn Bích Ngọc" },
  { mhs: "12A1TVO20", fullName: "Lê Ngọc Thảo Nguyên" },
  { mhs: "12A1TVO21", fullName: "Lưu Trần Huỳnh Như" },
  { mhs: "12A1TVO22", fullName: "Võ Ngọc Quỳnh Như" },
  { mhs: "12A1TVO23", fullName: "Trần Thanh Thu Nhựt" },
  { mhs: "12A1TVO24", fullName: "Phạm Ngọc Yến Phi" },
  { mhs: "12A1TVO25", fullName: "Nguyễn Nhật Phong" },
  { mhs: "12A1TVO26", fullName: "Lê Hoàng Phúc" },
  { mhs: "12A1TVO27", fullName: "Nguyễn Xuân Phúc" },
  { mhs: "12A1TVO28", fullName: "Trần Thị Nhã Phụng" },
  { mhs: "12A1TVO29", fullName: "Trần Ngọc Lan Phương" },
  { mhs: "12A1TVO30", fullName: "Thân Nhã Quyên" },
  { mhs: "12A1TVO31", fullName: "Nguyễn Thanh Sang" },
  { mhs: "12A1TVO32", fullName: "Nguyễn Phát Tài" },
  { mhs: "12A1TVO33", fullName: "Phạm Hoàng Thạch Thảo" },
  { mhs: "12A1TVO34", fullName: "Nguyễn Minh Thư" },
  { mhs: "12A1TVO35", fullName: "Nguyễn Ngọc Hương Uyên" },
  { mhs: "12A1TVO36", fullName: "Phan Thị Phương Uyên" },
  { mhs: "12A1TVO37", fullName: "Nguyễn Hoàng Lê Vi" },
  { mhs: "12A1TVO38", fullName: "Trần Thiên Vương" },
  { mhs: "12A1TVO39", fullName: "Nguyễn Thanh Tuyết Vy" },
  { mhs: "12A1TVO40", fullName: "Nguyễn Thảo Vy" },
  { mhs: "12A1TVO41", fullName: "Phạm Hoàng Phương Vy" },
  { mhs: "12A1TVO42", fullName: "Võ Tường Vy" },
  { mhs: "12A1TVO43", fullName: "Nguyễn Ngọc Như Ý" },
  { mhs: "12A1TVO44", fullName: "Trần Ngọc Như Ý" },
];

export function normalizeMhs(raw: string): string {
  const cleaned = (raw || "").trim().toUpperCase().replace(/\s+/g, "");
  // Cho phép học sinh gõ 12A1TV01 (số 0) tự động khớp với 12A1TVO1 (chữ O)
  return cleaned.replace(/^12A1TV0(\d+)$/, "12A1TVO$1");
}

export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * GOOGLE APPS SCRIPT (Code.gs)
 * Đọc & cập nhật trực tiếp theo đúng danh sách hiện có trên Google Sheets (không tự chèn thêm danh sách cứng)
 * Cấu trúc các cột trên Google Sheets:
 * Cột A (1): MHS
 * Cột B (2): Họ tên
 * Cột C (3): Thời gian nộp gần cuối
 * Cột D (4): Hoàn thành (chỉ ghi 1, 2, 3, 4)
 * Cột E (5): Kết quả trắc nghiệm (lưu trữ kết quả trường quizResult)
 * Cột F (6): Câu tự luận 1 (lưu trữ thông tin trường essayResult1 / essayResult 1)
 * Cột G (7): Câu tự luận 2 (lưu trữ thông tin trường essayResult2 / essayResult 2)
 * Cột H (8): Câu tự luận 3 (lưu trữ thông tin trường essayResult3 / essayResult 3)
 * Cột I (9): Link bài tập về nhà (lưu trữ thông tin trường homeworkLink)
 */

function normalizeMhs(code) {
  var cleaned = String(code || "").trim().toUpperCase().replace(/\\s+/g, "");
  return cleaned.replace(/^12A1TV0(\\d+)$/, "12A1TVO$1");
}

function parseStageCount(val) {
  if (typeof val === "number") return Math.max(0, Math.min(4, val));
  var str = String(val || "").trim();
  var match = str.match(/(\\d+)/);
  if (match) {
    return Math.max(0, Math.min(4, parseInt(match[1], 10)));
  }
  return 0;
}

function ensureSheetHeaders(sheet) {
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }

  if (sheet.getLastRow() === 0) {
    var headers = [
      "MHS",
      "Họ tên",
      "Thời gian nộp gần cuối",
      "Hoàn thành",
      "Kết quả trắc nghiệm",
      "Câu tự luận 1",
      "Câu tự luận 2",
      "Câu tự luận 3",
      "Link bài tập về nhà"
    ];
    sheet.getRange(1, 1, 1, 9).setValues([headers]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#FEF3C7");
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureSheetHeaders(sheet);

    var rawContents = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawContents);

    var targetMhs = normalizeMhs(data.mhs || data.studentCode || "");
    var timestamp = data.submittedAt || new Date().toLocaleString("vi-VN");

    var lastRow = sheet.getLastRow();
    var matchedRowIndex = -1;
    var existingRow = null;

    if (lastRow > 1) {
      var values = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
      for (var i = 0; i < values.length; i++) {
        if (normalizeMhs(values[i][0]) === targetMhs) {
          matchedRowIndex = i + 2;
          existingRow = values[i];
          break;
        }
      }
    }

    if (matchedRowIndex === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "error",
          message: "Không tìm thấy Mã " + targetMhs + " trong danh sách hiện có trên Google Sheet."
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var currentCompletedCount = parseStageCount(existingRow[3]);
    var currentQuiz = existingRow[4] || "";
    var currentEssay1 = existingRow[5] || "";
    var currentEssay2 = existingRow[6] || "";
    var currentEssay3 = existingRow[7] || "";
    var currentHomework = existingRow[8] || "";

    var incomingEssay1 = data.essayResult1 !== undefined ? data.essayResult1 : data["essayResult 1"];
    var incomingEssay2 = data.essayResult2 !== undefined ? data.essayResult2 : data["essayResult 2"];
    var incomingEssay3 = data.essayResult3 !== undefined ? data.essayResult3 : data["essayResult 3"];

    var nextQuiz = data.quizResult !== undefined ? data.quizResult : currentQuiz;
    var nextEssay1 = incomingEssay1 !== undefined ? incomingEssay1 : currentEssay1;
    var nextEssay2 = incomingEssay2 !== undefined ? incomingEssay2 : currentEssay2;
    var nextEssay3 = incomingEssay3 !== undefined ? incomingEssay3 : currentEssay3;
    var nextHomework = data.homeworkLink !== undefined ? data.homeworkLink : currentHomework;

    var hasExercisesDone = Boolean(nextQuiz || nextEssay1 || nextEssay2 || nextEssay3);
    var rawIncomingStage = data.completedStages !== undefined
      ? data.completedStages
      : data.completed !== undefined
      ? data.completed
      : data.hoanThanh !== undefined
      ? data.hoanThanh
      : data.completedText;
    var incomingStages = rawIncomingStage !== undefined
      ? parseStageCount(rawIncomingStage)
      : (hasExercisesDone ? 4 : currentCompletedCount);

    var finalStages = Math.max(
      currentCompletedCount,
      incomingStages,
      hasExercisesDone ? 4 : 0
    );
    // Cột Hoàn thành trên Sheet chỉ ghi số (1, 2, 3, 4); nếu làm xong bài tập kết quả là 4
    var nextCompletedValue = finalStages > 0 ? finalStages : "";

    // Ghi vào đúng dòng của Mã học sinh tại Cột C..I (cột 3 đến cột 9):
    sheet.getRange(matchedRowIndex, 3, 1, 7).setValues([[
      timestamp,
      nextCompletedValue,
      nextQuiz,
      nextEssay1,
      nextEssay2,
      nextEssay3,
      nextHomework
    ]]);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        row: matchedRowIndex,
        mhs: targetMhs,
        completed: nextCompletedValue,
        message: "Đã cập nhật kết quả vào đúng vị trí MHS " + targetMhs + " trên Google Sheets!"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureSheetHeaders(sheet);

    var lastRow = sheet.getLastRow();
    var students = [];

    if (lastRow > 1) {
      var values = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
      for (var i = 0; i < values.length; i++) {
        var row = values[i];
        var rawMhs = String(row[0] || "").trim();
        var mhs = normalizeMhs(rawMhs);
        if (rawMhs && mhs) {
          var completedStr = row[3] !== undefined && row[3] !== null ? String(row[3]).trim() : "";
          var quizVal = row[4] ? String(row[4]).trim() : "";
          var essay1Val = row[5] ? String(row[5]).trim() : "";
          var essay2Val = row[6] ? String(row[6]).trim() : "";
          var essay3Val = row[7] ? String(row[7]).trim() : "";
          var homeworkVal = row[8] ? String(row[8]).trim() : "";
          // Chỉ đọc trực tiếp từ cột Hoàn thành (row[3]); nếu cột Hoàn thành không có nội dung thì trả về 0
          var stagesCount = completedStr ? parseStageCount(completedStr) : 0;

          students.push({
            id: mhs,
            mhs: mhs,
            fullName: String(row[1] || ""),
            submittedAt: row[2] ? String(row[2]) : "",
            completed: completedStr,
            completedText: stagesCount + "/4",
            completedStages: stagesCount,
            quizResult: quizVal,
            essayResult1: essay1Val,
            essayResult2: essay2Val,
            essayResult3: essay3Val,
            homeworkLink: homeworkVal
          });
        }
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "ok",
        students: students,
        submissions: students
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: err.toString(),
        students: []
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

