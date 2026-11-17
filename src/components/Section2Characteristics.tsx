import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Layers, Sparkles } from "lucide-react";
import { CHARACTERISTICS_DATA } from "../data/lessonData";
import { SproutDoodle } from "./DoodleIllustrations";

interface Section2CharacteristicsProps {
  onPrev: () => void;
  onNext: () => void;
}

interface RedThreadVariant {
  id: string;
  term: string;
  verse: string;
  work: string;
  explanation: string;
}

const RED_THREAD_VARIANTS: RedThreadVariant[] = [
  {
    id: "chi-hong",
    term: "Chỉ hồng",
    verse: "“Dù khi lá thắm chỉ hồng”",
    work: "Truyện Kiều — Nguyễn Du",
    explanation:
      "Cách diễn đạt thuần Việt kết hợp hình ảnh 'lá thắm' (lá đỏ题 thơ) và 'chỉ hồng' (sợi chỉ đỏ của Nguyệt Lão buộc duyên).",
  },
  {
    id: "xich-thang",
    term: "Xích thằng",
    verse: "“Nàng rằng hồng diệp xích thằng”",
    work: "Truyện Kiều — Nguyễn Du",
    explanation:
      "Cách dùng từ Hán Việt trang trọng: 'hồng diệp' (lá đỏ) và 'xích thằng' (dây chỉ đỏ buộc chân vợ chồng trong túi Nguyệt Lão).",
  },
  {
    id: "xe-to",
    term: "Xe tơ",
    verse: "“Cùng chàng kết tóc xe tơ những ngày”",
    work: "Truyện Kiều — Nguyễn Du",
    explanation:
      "Chuyển hóa thành động từ hành động 'xe tơ' (se sợi tơ duyên), chỉ việc kết duyên vợ chồng gắn bó thủy chung.",
  },
  {
    id: "to-tham",
    term: "Tơ thắm",
    verse: "“Những tơ nào thắm những cầu nào xanh”",
    work: "Truyện Hoa Tiên — Nguyễn Huy Tự",
    explanation:
      "Biến thể 'tơ thắm' (sợi tơ màu đỏ thắm), vừa giàu tính nhạc vừa giữ nguyên cốt lõi điển cố Ông Tơ se duyên.",
  },
];

export const Section2Characteristics: React.FC<Section2CharacteristicsProps> = ({
  onPrev,
  onNext,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<RedThreadVariant>(RED_THREAD_VARIANTS[0]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="neo-card p-6 sm:p-8 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono font-bold text-emerald-800">
              PHẦN 02 · GIAI ĐOẠN 2: NẢY MẦM 🌿
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-display">
              2/ Đặc tính của Điển cố
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Khám phá 4 đặc tính nghệ thuật làm nên sức gợi cảm và chiều sâu tư tưởng của điển cố
              trong thơ văn cổ điển: Tính liên tưởng, Tính hình tượng & cô đọng hàm súc, Tính đa
              dạng & linh động, và Sự tinh tế trong biểu đạt cảm xúc.
            </p>
          </div>
          <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-emerald-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
            <SproutDoodle className="w-16 h-16 text-slate-900" />
          </div>
        </div>
      </div>

      {/* 4 Characteristics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {CHARACTERISTICS_DATA.map((item) => (
          <article
            key={item.id}
            className="neo-card p-6 bg-white flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-display">
                  {item.code}/ {item.title}
                </h3>
                <span className="text-xs font-mono font-bold text-slate-500">
                  ĐẶC TÍNH 0{item.code.charCodeAt(0) - 96}
                </span>
              </div>

              <p className="text-sm text-slate-800 leading-relaxed">{item.summary}</p>
            </div>

            <div className="space-y-4">
              {item.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FAF8F5] border-2 border-slate-900 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                    <span className="font-bold text-slate-900">{ex.work}</span>
                    <span>·</span>
                    <span>{ex.author}</span>
                  </div>

                  <blockquote className="text-sm sm:text-base font-serif-display italic text-slate-900 whitespace-pre-line bg-white p-3 border border-slate-300">
                    {ex.quote}
                  </blockquote>

                  <div className="text-xs text-slate-800 space-y-1.5 pt-1">
                    <p>
                      <strong className="text-slate-900">Điển cố trọng tâm:</strong>{" "}
                      <span className="font-mono font-bold underline decoration-amber-400 decoration-2">
                        {ex.highlightedTerm}
                      </span>
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-slate-900">Tích gốc:</strong> {ex.originStory}
                    </p>
                    <p className="leading-relaxed text-emerald-900 font-medium">
                      <strong className="text-slate-900">Giá trị biểu đạt:</strong> {ex.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Spotlight: Tính đa dạng và linh động của điển cố Ông Tơ / Nguyệt Lão */}
      <div className="neo-card p-6 sm:p-7 bg-white space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-900 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-amber-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              MÔ HÌNH TƯƠNG TÁC · TÍNH ĐA DẠNG VÀ LINH ĐỘNG (MỤC 2C)
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-display">
              Một điển cố "Ông Tơ / Nguyệt Lão" — Bốn hình thức biểu đạt linh hoạt
            </h3>
          </div>
          <span className="text-xs text-slate-600">
            Nhấn vào từng biến thể từ ngữ để xem sự uyển chuyển trong thơ cổ
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {RED_THREAD_VARIANTS.map((v) => {
            const isSelected = selectedVariant.id === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`p-3.5 text-left border-2 border-slate-900 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-200 shadow-[3px_3px_0px_0px_#0f172a]"
                    : "bg-[#FAF8F5] hover:bg-amber-50"
                }`}
              >
                <div className="text-xs font-mono text-slate-600">Biến thể từ ngữ</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">“{v.term}”</div>
              </button>
            );
          })}
        </div>

        <div className="p-5 bg-[#FAF8F5] border-2 border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          <div className="md:col-span-1 p-4 bg-white border-2 border-slate-900">
            <div className="text-xs font-mono text-slate-500">{selectedVariant.work}</div>
            <div className="mt-1.5 text-lg font-serif-display italic font-bold text-slate-900">
              {selectedVariant.verse}
            </div>
          </div>
          <div className="md:col-span-2 space-y-2 text-sm text-slate-800">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Giải thích sự biến hóa của “{selectedVariant.term}”:
            </div>
            <p className="leading-relaxed">{selectedVariant.explanation}</p>
            <p className="text-xs text-slate-600 pt-1 border-t border-slate-200">
              Điểm chung cốt lõi: Cả 4 chữ <strong>"chỉ hồng"</strong>, <strong>"xích thằng"</strong>,{" "}
              <strong>"xe tơ"</strong>, <strong>"tơ thắm"</strong> đều quy chiếu về điển cố{" "}
              <strong>Ông Tơ (Nguyệt Lão)</strong> buộc sợi chỉ đỏ se duyên cho đôi lứa.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 neo-card bg-emerald-100">
        <button
          type="button"
          onClick={onPrev}
          className="neo-btn w-full sm:w-auto px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Phần 1</span>
        </button>

        <div className="text-xs sm:text-sm text-slate-800 text-center">
          <span className="font-bold text-slate-900">Hoàn tất Phần 2 (Nảy mầm 🌿)!</span> Tiếp
          tục sang <strong>Phần 3: Giá trị văn hóa & Nhận diện</strong>.
        </div>

        <button
          type="button"
          onClick={onNext}
          className="neo-btn w-full sm:w-auto px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Next · Phần 3 (Ra lá 🍀)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
