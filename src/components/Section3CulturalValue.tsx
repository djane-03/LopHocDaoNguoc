import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Compass, BookMarked } from "lucide-react";
import { RECOGNITION_SIGNS, ALLUSION_GLOSSARY } from "../data/lessonData";
import { LeafyDoodle } from "./DoodleIllustrations";

interface Section3CulturalValueProps {
  onPrev: () => void;
  onNext: () => void;
}

export const Section3CulturalValue: React.FC<Section3CulturalValueProps> = ({
  onPrev,
  onNext,
}) => {
  const [filterCategory, setFilterCategory] = useState<"ALL" | "Điển tích" | "Điển cố">("ALL");

  const filteredGlossary = ALLUSION_GLOSSARY.filter((item) => {
    return filterCategory === "ALL" || item.category === filterCategory;
  });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="neo-card p-6 sm:p-8 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono font-bold text-teal-800">
              PHẦN 03 · GIAI ĐOẠN 3: RA LÁ 🍀
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-display">
              3/ Giá trị văn hóa & Nhận diện Điển tích, Điển cố
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Khám phá chiều sâu "trầm tích văn hóa" lưu giữ ký ức cộng đồng, nắm vững 3 dấu hiệu
              nhận diện điển cố trong văn bản và tra cứu cẩm nang các điển tích, điển cố trọng tâm.
            </p>
          </div>
          <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-teal-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
            <LeafyDoodle className="w-16 h-16 text-slate-900" />
          </div>
        </div>
      </div>

      {/* 3/ Giá trị văn hóa của điển tích, điển cố */}
      <div className="neo-card p-6 sm:p-7 bg-white space-y-5">
        <div className="border-b-2 border-slate-900 pb-4 space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-display">
            3/ GIÁ TRỊ VĂN HÓA CỦA ĐIỂN TÍCH, ĐIỂN CỐ
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            Trong thực tế, ranh giới giữa điển tích và điển cố đôi khi không hoàn toàn tách biệt.
            Nhiều điển tích sau quá trình sử dụng lâu dài đã trở thành những{" "}
            <strong>điển cố mang tính biểu tượng</strong> trong văn học. Điểm giống nhau giữa hai
            khái niệm là đều có nguồn gốc từ kho tàng văn hóa, lịch sử hoặc văn học cổ.
            Chúng giúp người viết truyền tải ý nghĩa sâu sắc bằng một hình thức ngắn gọn, hàm súc.
            Tuy nhiên, điển tích thường gắn với một câu chuyện nhân vật cụ thể, còn điển cố thiên về ý nghĩa biểu
            tượng đã được cộng đồng công nhận. Chẳng hạn, cụm từ {" "}
            <strong>&quot;ba thu&quot;</strong> trong Truyện Kiều không được hiểu đơn thuần là ba mùa thu trong năm
            mà gợi đến quan niệm <strong>&quot;một ngày không gặp dài như ba mùa thu&quot;</strong>, qua đó diễn tả nỗi nhớ nhung
            da diết giữa những người yêu thương nhau. Chỉ bằng hai từ ngắn gọn, Nguyễn Du đã truyền tải được cảm xúc sâu sắc mà
            không cần diễn giải dài dòng. 
          </p>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            Từ góc độ văn hóa, điển tích và điển cố còn được xem là{" "}
            <strong>nơi lưu giữ ký ức của cộng đồng</strong>. Mỗi điển đều gắn với một câu chuyện,
            một nhân vật hoặc một quan niệm đã được nhiều thế hệ tiếp nhận và truyền lại. Vì vậy,
            việc giải mã điển tích, điển cố cũng là quá trình{" "}
            <strong className="bg-amber-200 px-1">
              khám phá những lớp trầm tích văn hóa ẩn sau văn bản văn học
            </strong>
            .
          </p>

          <div className="p-4 bg-[#FAF8F5] border-2 border-slate-900 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900">Kết luận:</strong> Điển tích và điển cố
            góp phần tạo nên bản sắc trang nhã, cổ điển của văn học trung đại Việt Nam, phản ánh vốn
            tri thức uyên bác và tư duy nghệ thuật hàm súc của người xưa.
          </div>
        </div>
      </div>

      {/* 4/ 3 Dấu hiệu nhận diện điển tích, điển cố trong văn bản văn học */}
      <div className="neo-card p-6 sm:p-7 bg-white space-y-5">
        <div className="border-b-2 border-slate-900 pb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-display mt-1">
            4/ Các dấu hiệu nhận diện điển tích, điển cố
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
           Đối với học sinh, việc nhận diện điển tích và điển cố không phải lúc nào cũng dễ dàng bởi chúng thường xuất hiện
           dưới dạng những từ ngữ rất ngắn gọn. Tuy nhiên, người đọc có thể dựa vào một số dấu hiệu phổ biến: 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RECOGNITION_SIGNS.map((sign) => (
            <div
              key={sign.step}
              className="p-5 bg-[#FAF8F5] border-2 border-slate-900 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-bold text-slate-900 underline decoration-amber-400 decoration-2">
                  {sign.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 font-serif-display">
                  {sign.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {sign.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-300 text-xs">
                <p className="text-slate-900 font-medium">
                  <strong>Bí quyết nhận biết:</strong> {sign.keyTip}
                </p>
                <p className="font-mono text-emerald-900 bg-white p-2 border border-slate-300">
                  {sign.illustrationExample}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            Những hình ảnh này không chỉ làm cho ngôn ngữ thơ trở nên trang nhã,
            cổ điển mà còn giúp tác giả diễn đạt những cung bậc cảm xúc phức tạp bằng một hình thức ngắn gọn. 
          </p>
        </div>
      </div>

      {/* Interactive Dictionary of 12 Allusions from the PDF */}
      <div className="neo-card p-6 sm:p-7 bg-white space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-slate-600 flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-slate-900" />
              CẨM NANG GIẢI MÃ TƯ LIỆU NGỮ VĂN
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif-display mt-1">
              Từ điển Điển tích & Điển cố trọng tâm trong chương trình ({filteredGlossary.length})
            </h3>
            
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              Trong quá trình học Ngữ văn, học sinh thường bắt gặp nhiều điển tích, điển cố quen thuộc.
              Việc hiểu được nguồn gốc và ý nghĩa của chúng sẽ giúp quá trình đọc hiểu tác phẩm trở nên dễ dàng hơn.
            </p>
       
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center border-2 border-slate-900 bg-[#FAF8F5]">
              {(["ALL", "Điển tích", "Điển cố"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    filterCategory === cat
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat === "ALL" ? "Tất cả" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGlossary.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-[#FAF8F5] border-2 border-slate-900 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-300 pb-1.5">
                  <span className="font-mono font-bold text-slate-900">{item.category}</span>
                  <span className="truncate max-w-[180px]" title={item.sourceWork}>
                    {item.sourceWork}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 font-serif-display">
                  “{item.term}”
                </h4>

                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Tính lịch sử / Xuất xứ:</strong>{" "}
                  {item.historicalOrigin}
                </p>
              </div>

              <div className="p-2.5 bg-white border border-slate-900 text-xs text-emerald-950">
                <strong className="text-slate-900">Tính biểu trưng / Ý nghĩa:</strong>{" "}
                {item.symbolicMeaning}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 neo-card bg-teal-100">
        <button
          type="button"
          onClick={onPrev}
          className="neo-btn w-full sm:w-auto px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Phần 2</span>
        </button>

        <div className="text-xs sm:text-sm text-slate-800 text-center">
          <span className="font-bold text-slate-900">Hoàn tất Phần 3 (Ra lá 🍀)!</span> Sẵn sàng
          bước vào <strong>Phần 4: Bài tập vận dụng (Đơm hoa 🌻)</strong>.
        </div>

        <button
          type="button"
          onClick={onNext}
          className="neo-btn w-full sm:w-auto px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Next · Phần 4 (Đơm hoa 🌻)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
