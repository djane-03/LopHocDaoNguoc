import React, { useState } from "react";
import { ArrowRight, BookOpen, Sparkles, CheckCircle2, HelpCircle } from "lucide-react";
import { COMPARISON_TABLE } from "../data/lessonData";
import { SeedDoodle } from "./DoodleIllustrations";

interface Section1ConceptProps {
  onNext: () => void;
}

interface MiniCheckItem {
  id: string;
  phrase: string;
  context: string;
  correctType: "Điển tích" | "Điển cố";
  explanation: string;
}

const MINI_CLASSIFY_ITEMS: MiniCheckItem[] = [
  {
    id: "mc1",
    phrase: "\"Hòa nước sông chén rượu ngọt ngào\"",
    context: "Bình Ngô đại cáo — Nguyễn Trãi",
    correctType: "Điển tích",
    explanation:
      "Chính xác! Đây là Điển tích vì gợi lại câu chuyện kể hoàn chỉnh về vị tướng xưa đổ rượu xuống sông cùng quân sĩ uống để đồng lòng đánh giặc.",
  },
  {
    id: "mc2",
    phrase: "\"Ba thu dọn lại một ngày dài ghê\"",
    context: "Truyện Kiều — Nguyễn Du",
    correctType: "Điển cố",
    explanation:
      "Chính xác! 'Ba thu' là Điển cố cô đọng từ câu 'Nhất nhật bất kiến như tam thu hề' trong Kinh Thi, trở thành biểu tượng cho nỗi nhớ da diết.",
  },
  {
    id: "mc3",
    phrase: "Chuyện người ngủ dưới gốc cây hòe mơ làm thái thú ('Giấc mộng Nam Kha')",
    context: "Nam Kha Thái thú truyện",
    correctType: "Điển tích",
    explanation:
      "Chính xác! Đây là tích truyện xưa có nhân vật, diễn biến và sự kiện kể về giấc mơ vinh hiển hư ảo.",
  },
];

export const Section1Concept: React.FC<Section1ConceptProps> = ({ onNext }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, "Điển tích" | "Điển cố">>({});

  return (
    <div className="space-y-8">
      {/* Section Banner */}
      <div className="neo-card p-6 sm:p-8 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono font-bold text-emerald-800">
              PHẦN 01 · GIAI ĐOẠN 1: GIEO HẠT 🌱
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-display">
              1/ Khái niệm Điển tích và Điển cố
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Tìm hiểu nguồn gốc, định nghĩa, ví dụ kinh điển trong <em>Bình Ngô đại cáo</em>,{" "}
              <em>Truyện Kiều</em> và bảng tiêu chí phân biệt Điển tích – Điển cố.
            </p>
          </div>
          <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-amber-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
            <SeedDoodle className="w-16 h-16 text-slate-900" />
          </div>
        </div>
      </div>

      {/* Two-Column Concept Cards: a. Điển tích & b. Điển cố */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Card A: Điển tích */}
        <article className="neo-card p-6 sm:p-7 bg-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <h3 className="text-xl font-bold text-slate-900 font-serif-display">
                a. Điển tích
              </h3>
              <span className="text-xs font-mono font-bold text-slate-600">
                Tích truyện xưa · Câu chuyện kể
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono font-bold text-slate-500">KHÁI NIỆM</p>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                Là những <strong>tích truyện xưa</strong>, đây thường là những câu chuyện kể về
                những người anh hùng, những tấm gương hiếu thảo, chính trực, đạo đức hoặc những
                truyện có tính triết lý nhân văn trong lịch sử; những câu thơ, câu văn cổ xưa kinh
                điển xuất hiện trong các tác phẩm...
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border-2 border-slate-900 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-bold text-slate-900">VÍ DỤ ĐIỂN HÌNH</span>
                <span>Bình Ngô đại cáo — Nguyễn Trãi</span>
              </div>
              <blockquote className="text-base font-serif-display italic text-slate-900 leading-relaxed">
                “Tướng sĩ một lòng phụ tử,{" "}
                <strong className="bg-amber-200 px-1 not-italic font-bold">
                  hoà nước sông chén rượu ngọt ngào
                </strong>
                ”
              </blockquote>
              <div className="pt-2 border-t border-slate-300 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Giải mã xuất xứ:</strong> Điển tích (in đậm) lấy
                ý từ một truyện xưa bên Trung Quốc:{" "}
                <em>
                  “Có một vị chỉ huy khéo dùng binh. Nhân có người dâng một vò rượu ngon, ông liền
                  cho hoà vò rượu đó vào nước sông để mọi người cùng uống khiến quân sĩ cảm động,
                  đồng lòng đánh giặc.”
                </em>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-900 shrink-0" />
            <span>Trọng tâm: Gắn với một câu chuyện kể có nhân vật và sự kiện cụ thể.</span>
          </div>
        </article>

        {/* Card B: Điển cố */}
        <article className="neo-card p-6 sm:p-7 bg-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <h3 className="text-xl font-bold text-slate-900 font-serif-display">
                b. Điển cố
              </h3>
              <span className="text-xs font-mono font-bold text-slate-600">
                Từ ngữ · Hình ảnh biểu tượng
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono font-bold text-slate-500">KHÁI NIỆM</p>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                Là những <strong>chuyện xưa tích cũ</strong> lấy trong văn hóa xưa nay của nhân
                loại. Đó có thể là tên một câu chuyện, tên một vùng đất hay tên nhân vật, hoặc một
                hình tượng văn học đầy chất thơ hay đậm chất bi, chất hài chứa đựng bao triết lý sâu
                xa về cuộc sống muôn màu muôn vẻ...
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border-2 border-slate-900 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-bold text-slate-900">VÍ DỤ ĐIỂN HÌNH</span>
                <span>Truyện Kiều — Nguyễn Du</span>
              </div>
              <blockquote className="text-base font-serif-display italic text-slate-900 leading-relaxed">
                “Sầu đong càng lắc càng đầy
                <br />
                <strong className="bg-amber-200 px-1 not-italic font-bold">
                  Ba thu dọn lại một ngày dài ghê.
                </strong>
                ”
              </blockquote>
              <div className="pt-2 border-t border-slate-300 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Giải mã xuất xứ:</strong> Điển cố (in đậm) được
                dẫn lại từ <em>Kinh thi</em> (ca dao cổ Trung Quốc):{" "}
                <em>“Nhất nhật bất kiến như tam thu hề”</em> (Một ngày không trông thấy mặt lâu bằng
                ba mùa thu – ba năm).
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-900 shrink-0" />
            <span>
              Giúp tác phẩm văn học trở nên giàu hình tượng, hàm súc và có chiều sâu tư tưởng.
            </span>
          </div>
        </article>
      </div>

      {/* Cultural Reference Standard Note */}
      <div className="neo-card p-6 bg-amber-50">
        <h3 className="text-base font-bold text-slate-900">
          Chuẩn mực tham chiếu trong văn hóa truyền thống
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-800 leading-relaxed">
          Điển cố thường liên quan đến tên người, địa danh, câu nói, hoặc hình ảnh đã trở thành biểu
          tượng trong văn hóa hoặc văn học cổ. Trong văn hoá truyền thống, người ta cho rằng{" "}
          <strong>nhìn người chính là một cách để tự soi xét mình</strong>, rằng lấy những điển tích
          kinh điển trong lịch sử làm tham chiếu để luận giải là một cách rất tốt để làm sáng tỏ cái
          ý mà mình muốn biểu đạt. Do vậy, việc nhắc đến điển cố trong thơ và văn được sử dụng
          nhiều, cũng được xem như một chuẩn mực.
        </p>
      </div>

      {/* Comparison Table: Điển tích vs Điển cố */}
      <div className="neo-card overflow-hidden bg-white">
        <div className="p-5 sm:p-6 bg-slate-900 text-white">
          <h3 className="text-lg sm:text-xl font-bold font-serif-display">
            Bảng đối chiếu phân biệt Điển tích và Điển cố
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            So sánh theo 2 tiêu chí cốt lõi: Bản chất và Cấu trúc biểu đạt
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b-2 border-slate-900 text-xs font-mono font-bold text-slate-800">
                <th className="p-4 border-r-2 border-slate-900 w-36">Tiêu chí</th>
                <th className="p-4 border-r-2 border-slate-900 w-1/2">Điển tích</th>
                <th className="p-4 w-1/2">Điển cố</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-900 text-sm">
              {COMPARISON_TABLE.map((row) => (
                <tr key={row.criterion} className="align-top">
                  <td className="p-4 font-bold text-slate-900 bg-amber-50/60 border-r-2 border-slate-900">
                    {row.criterion}
                  </td>
                  <td className="p-4 border-r-2 border-slate-900 space-y-2">
                    <p className="text-slate-800 leading-relaxed">{row.dienTich}</p>
                    {row.examplePair.dienTichEx && (
                      <p className="text-xs text-slate-600 font-mono pt-2 border-t border-slate-200">
                        VD: {row.examplePair.dienTichEx}
                      </p>
                    )}
                  </td>
                  <td className="p-4 space-y-2">
                    <p className="text-slate-800 leading-relaxed">{row.dienCo}</p>
                    {row.examplePair.dienCoEx && (
                      <p className="text-xs text-slate-600 font-mono pt-2 border-t border-slate-200">
                        VD: {row.examplePair.dienCoEx}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Micro-Activity: Quick Distinguish Check */}
      <div className="neo-card p-6 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-900" />
              Góc tương tác nhanh: Phân biệt Điển tích hay Điển cố?
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Chọn phân loại phù hợp cho 3 trường hợp dưới đây để kiểm tra nhanh trước khi qua Phần 2
            </p>
          </div>
          <span className="text-xs font-mono text-slate-600">
            Đã trả lời: {Object.keys(selectedAnswers).length}/{MINI_CLASSIFY_ITEMS.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MINI_CLASSIFY_ITEMS.map((item) => {
            const chosen = selectedAnswers[item.id];
            const isCorrect = chosen === item.correctType;
            return (
              <div
                key={item.id}
                className="p-4 bg-[#FAF8F5] border-2 border-slate-900 flex flex-col justify-between gap-3"
              >
                <div>
                  <p className="text-xs font-mono text-slate-500">{item.context}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{item.phrase}</p>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {(["Điển tích", "Điển cố"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setSelectedAnswers((prev) => ({ ...prev, [item.id]: option }))
                        }
                        className={`py-2 px-3 text-xs font-bold border-2 border-slate-900 transition-colors cursor-pointer ${
                          chosen === option
                            ? option === item.correctType
                              ? "bg-emerald-600 text-white"
                              : "bg-rose-600 text-white"
                            : "bg-white text-slate-900 hover:bg-amber-100"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {chosen && (
                    <div
                      className={`p-2.5 text-xs border border-slate-900 ${
                        isCorrect
                          ? "bg-emerald-50 text-emerald-950"
                          : "bg-amber-100 text-slate-900"
                      }`}
                    >
                      <p className="font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        {isCorrect ? "Chính xác!" : `Gợi ý: Đáp án đúng là ${item.correctType}`}
                      </p>
                      <p className="mt-1 leading-relaxed">{item.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Next Action Bar */}
      <div className="flex items-center justify-between p-5 neo-card bg-amber-100">
        <div className="text-xs sm:text-sm text-slate-800">
          <span className="font-bold text-slate-900">Hoàn tất Phần 1 (Gieo hạt 🌱)!</span> Tiếp
          tục khám phá <strong>Phần 2: Đặc tính của điển cố</strong> để giúp hạt mầm nảy chồi.
        </div>
        <button
          type="button"
          onClick={onNext}
          className="neo-btn px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Next · Phần 2 (Nảy mầm 🌿)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
