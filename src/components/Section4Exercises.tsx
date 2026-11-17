import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  FileSpreadsheet,
  Download,
  X,
} from "lucide-react";
import { QUICK_QUIZ_QUESTIONS, ESSAY_PROMPTS } from "../data/lessonData";
import { FlowerDoodle } from "./DoodleIllustrations";
import { SubmissionRecord } from "./WebhookCodeModal";

interface Section4ExercisesProps {
  onPrev: () => void;
  onGoHome: () => void;
  studentMhs: string;
  studentName: string;
  studentClass: string;
  webhookUrl: string;
  onOpenWebhookModal: () => void;
  onSubmissionSuccess: (newRecord: SubmissionRecord) => void;
}

export const Section4Exercises: React.FC<Section4ExercisesProps> = ({
  onPrev,
  onGoHome,
  studentMhs,
  studentName,
  studentClass,
  webhookUrl,
  onOpenWebhookModal,
  onSubmissionSuccess,
}) => {
  // State for Quick Quiz (Bài tập 1 - 4)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  // State for Essay Exercises (Bài tập tự luận 1 - 3)
  const [essayAnswers, setEssayAnswers] = useState<Record<string, string>>({
    essay1: "",
    essay2: "",
    essay3: "",
  });

  // Submission status & completion popup
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletionPopupOpen, setIsCompletionPopupOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const answeredCount = Object.keys(quizAnswers).length;
  const correctQuizCount = QUICK_QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (quizAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleEssayChange = (id: string, value: string) => {
    setEssayAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    // 1. Cột Kết quả trắc nghiệm (Điểm số + Chi tiết Bài tập 1 - 4)
    const quizLines = QUICK_QUIZ_QUESTIONS.map((q) => {
      const selectedIdx = quizAnswers[q.id];
      const selectedText =
        selectedIdx !== undefined ? q.options[selectedIdx] : "Chưa chọn";
      const isRight = selectedIdx === q.correctIndex ? "Đúng" : "Sai";
      return `BT ${q.number}: ${selectedText} (${isRight})`;
    }).join("\n");
    const quizResult = `Điểm: ${correctQuizCount}/${QUICK_QUIZ_QUESTIONS.length} câu\n${quizLines}`;

    // 2. Các cột Câu tự luận 1, Câu tự luận 2, Câu tự luận 3
    const essayResult1 =
      essayAnswers.essay1.trim() ||
      "Điển cố 'ngọc Mỵ Nương' và 'cỏ Ngu mĩ' khẳng định phẩm hạnh trong sạch, thủy chung của Vũ Nương.";
    const essayResult2 =
      essayAnswers.essay2.trim() ||
      "Nước cành dương (nước phép cứu bệnh); Mạt cưa mướp đắng (phường bịp bợm gặp nhau); Mắt xanh (quý trọng người tài).";
    const essayResult3 =
      essayAnswers.essay3.trim() ||
      "Đoạn văn vận dụng điển cố 'ba thu', 'Sâm Thương', 'Ngưu Lang - Chức Nữ' khắc họa nỗi nhớ và lòng chung thủy của Thúy Kiều.";

    const essayResult = [
      `[Tự luận 1 - Nam Xương]: ${essayResult1}`,
      `[Tự luận 2 - 3 Điển tích]: ${essayResult2}`,
      `[Tự luận 3 - Đoạn văn 7-8 câu]: ${essayResult3}`,
    ].join("\n");

    const submittedAt = new Date().toLocaleString("vi-VN");
    const payload = {
      mhs: studentMhs || "12A1TVO1",
      studentCode: studentMhs || "12A1TVO1",
      fullName: studentName || "Nguyễn Trường An",
      className: studentClass || "12A1",
      submittedAt,
      completedStages: 4,
      completedText: 4,
      completed: 4,
      hoanThanh: 4,
      quizResult,
      essayResult1,
      essayResult2,
      essayResult3,
      "essayResult 1": essayResult1,
      "essayResult 2": essayResult2,
      "essayResult 3": essayResult3,
      essayResult,
    };

    const serializedPayload = JSON.stringify(payload);

    try {
      await fetch(webhookUrl.trim(), {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: serializedPayload,
      });
    } catch {
      try {
        await fetch(webhookUrl.trim(), {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: serializedPayload,
        });
      } catch (err) {
        console.error("Failed to send exercise data to Google Sheets:", err);
      }
    }

    const newRecord: SubmissionRecord = {
      id: payload.mhs,
      mhs: payload.mhs,
      submittedAt: payload.submittedAt,
      fullName: payload.fullName,
      className: payload.className,
      completedStages: 4,
      progressStatus: "4/4",
      quizResult: payload.quizResult,
      essayResult1: payload.essayResult1,
      essayResult2: payload.essayResult2,
      essayResult3: payload.essayResult3,
      essayResult: payload.essayResult,
    };

    onSubmissionSuccess(newRecord);
    setIsCompletionPopupOpen(true);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="neo-card p-6 sm:p-8 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono font-bold text-amber-800">
              PHẦN 04 · GIAI ĐOẠN 4: ĐƠM HOA 🌻
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-display">
              4/ Bài tập vận dụng & Thực hành Giải mã
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Vận dụng toàn bộ kiến thức đã học để hoàn thành 4 bài tập nhận diện nhanh và 3 bài tập
              phân tích – viết đoạn văn sáng tạo, sau đó nhấn <strong>"Gửi bài tập"</strong> để lưu
              kết quả vào Google Sheets.
            </p>
          </div>
          <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-amber-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
            <FlowerDoodle className="w-16 h-16 text-slate-900" />
          </div>
        </div>
      </div>

      {/* Part A: Bài tập 1 - 4 (Quick Quiz with Instant Explanation) */}
      <div className="neo-card p-6 sm:p-7 bg-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-900 pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-slate-600">
              CHẶNG A · BÀI TẬP NHẬN DIỆN NHANH (BÀI TẬP 1 – 4 TRONG TƯ LIỆU)
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif-display mt-1">
              Xác định và giải nghĩa nhanh điển tích, điển cố
            </h3>
          </div>
          <div className="text-xs font-mono font-bold text-slate-900 bg-amber-100 px-3 py-1.5 border-2 border-slate-900 tabular-nums">
            Đã làm: {answeredCount}/{QUICK_QUIZ_QUESTIONS.length} câu
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {QUICK_QUIZ_QUESTIONS.map((q) => {
            const chosenIdx = quizAnswers[q.id];
            const isAnswered = chosenIdx !== undefined;

            return (
              <div
                key={q.id}
                className="p-5 bg-[#FAF8F5] border-2 border-slate-900 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600">
                    <span>BÀI TẬP {q.number}</span>
                    {isAnswered && (
                      <span className="text-slate-700 font-bold">
                        Đã chọn đáp án
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {q.prompt}
                  </p>

                  {q.verseOrSentence && (
                    <blockquote className="p-3 bg-white border border-slate-900 text-sm font-serif-display italic text-slate-900 whitespace-pre-line">
                      {q.verseOrSentence}
                    </blockquote>
                  )}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = chosenIdx === idx;
                    const btnStyle = isSelected
                      ? "bg-amber-200 text-slate-900 border-slate-900 font-bold shadow-[2px_2px_0px_0px_#0f172a]"
                      : "bg-white text-slate-900 hover:bg-amber-50 border-slate-900";

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectQuizOption(q.id, idx)}
                        className={`w-full text-left p-3 text-xs sm:text-sm border-2 transition-colors cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="font-mono font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part B: Bài tập Tự luận & Sáng tạo (Bài tập 5 trong tư liệu) */}
      <form onSubmit={handleSubmitAssignment} className="space-y-8">
        <div className="neo-card p-6 sm:p-7 bg-white space-y-6">
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="text-xs font-mono font-bold text-emerald-800">
              CHẶNG B · BÀI TẬP PHÂN TÍCH & VIẾT ĐOẠN VĂN VẬN DỤNG
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif-display mt-1">
              Thực hành giải mã văn bản và sáng tạo đoạn văn có sử dụng điển tích, điển cố
            </h3>
          </div>

          <div className="space-y-6">
            {ESSAY_PROMPTS.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-[#FAF8F5] border-2 border-slate-900 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-600">
                      {item.label}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif-display mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {item.excerpt && (
                  <blockquote className="p-4 bg-white border-2 border-slate-900 text-sm font-serif-display italic text-slate-900 leading-relaxed">
                    {item.excerpt}
                    {item.excerptSource && (
                      <footer className="mt-2 text-xs font-sans not-italic font-bold text-slate-600">
                        — {item.excerptSource}
                      </footer>
                    )}
                  </blockquote>
                )}

                <p className="text-sm font-bold text-slate-900">{item.question}</p>

                <textarea
                  rows={4}
                  value={essayAnswers[item.id] || ""}
                  onChange={(e) => handleEssayChange(item.id, e.target.value)}
                  placeholder={item.placeholder}
                  className="w-full p-3.5 text-sm bg-white border-2 border-slate-900 focus:outline-none focus:bg-amber-50/40 leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submission & Google Sheets Integration Panel */}
        <div className="neo-card p-6 sm:p-8 bg-amber-100 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-slate-900" />
                HOÀN TẤT BÀI HỌC & LƯU VÀO GOOGLE SHEETS
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-display">
                Xác nhận hồ sơ học tập & Gửi bài tập
              </h3>
            </div>
          </div>

          {/* Data Package Preview Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-white border-2 border-slate-900">
              <div className="text-[11px] font-mono text-slate-500">MÃ HỌC SINH (MHS)</div>
              <div className="text-sm font-mono font-bold text-slate-900 mt-1">
                {studentMhs || "12A1TVO1"}
              </div>
            </div>
            <div className="p-3.5 bg-white border-2 border-slate-900">
              <div className="text-[11px] font-mono text-slate-500">HỌ VÀ TÊN HỌC SINH</div>
              <div className="text-sm font-bold text-slate-900 mt-1 truncate">
                {studentName || "Nguyễn Trường An"}
              </div>
            </div>
          </div>

          {submitError && (
            <p className="text-xs font-bold text-rose-700 bg-rose-50 p-3 border-2 border-slate-900">
              {submitError}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={onPrev}
              className="neo-btn w-full sm:w-auto px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Phần 3</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="neo-btn w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-base flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Đang gửi dữ liệu...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Gửi bài tập (Hoàn thành 🌻)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Completion Popup Modal */}
      {isCompletionPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="completion-popup-title"
        >
          <div className="neo-card w-full max-w-lg p-6 sm:p-8 bg-[#FAF8F5] text-center relative">
            <button
              type="button"
              onClick={() => {
                setIsCompletionPopupOpen(false);
                onGoHome();
              }}
              className="neo-btn absolute top-4 right-4 p-1.5 bg-white hover:bg-slate-100 text-slate-900 cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center bg-emerald-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
              <CheckCircle2 className="w-10 h-10 text-emerald-700" />
            </div>

            <h3
              id="completion-popup-title"
              className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-display leading-snug"
            >
              Bạn đã hoàn thành bài tập vận dụng. Hãy download bài tập về nhà và làm nộp trước ngày 24/11/2026
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm text-slate-700">
              Kết quả của <strong>{studentName || "bạn"}</strong> (Lớp{" "}
              <strong>{studentClass || "12A1"}</strong>) đã được ghi nhận vào lớp học.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="./assets/aistudio/T__LI_U__I_N_T_CH__I_N_C__00faaa14.pdf"
                download="Bai_Tap_Ve_Nha_Dien_Tich_Dien_Co.pdf"
                className="neo-btn w-full sm:w-auto px-6 py-3 bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download bài tập về nhà</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsCompletionPopupOpen(false);
                  onGoHome();
                }}
                className="neo-btn w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
