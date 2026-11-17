import React from "react";
import { X, Users, Download, RefreshCw, CheckCircle2, Clock } from "lucide-react";

export interface SubmissionRecord {
  id: string;
  mhs?: string;
  submittedAt: string;
  fullName: string;
  className?: string;
  progressStatus?: string;
  quizScore?: string;
  quizResult?: string;
  essayResult1?: string;
  essayResult2?: string;
  essayResult3?: string;
  essayResult?: string;
  homeworkLink?: string;
  completedStages?: number;
  answerContent?: string;
}

interface WebhookCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: SubmissionRecord[];
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function getCompletedStagesCount(item: SubmissionRecord): number {
  const rawStages = Number(item.completedStages);
  if (!Number.isFinite(rawStages) || rawStages <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(4, Math.floor(rawStages)));
}

export const WebhookCodeModal: React.FC<WebhookCodeModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onRefresh,
  isRefreshing = false,
}) => {
  if (!isOpen) return null;

  const handleExportCsv = () => {
    const headers = [
      "MHS",
      "Họ tên",
      "Thời gian nộp gần cuối",
      "Hoàn thành",
      "Kết quả trắc nghiệm",
      "Câu tự luận 1",
      "Câu tự luận 2",
      "Câu tự luận 3",
      "Link bài tập về nhà",
    ];
    const rows = submissions.map((s) => {
      const stages = getCompletedStagesCount(s);
      return [
        `"${(s.mhs || s.id || "").replace(/"/g, '""')}"`,
        `"${(s.fullName || "").replace(/"/g, '""')}"`,
        `"${(s.submittedAt || "").replace(/"/g, '""')}"`,
        `"${stages > 0 ? stages : ""}"`,
        `"${(s.quizResult || "").replace(/"/g, '""')}"`,
        `"${(s.essayResult1 || "").replace(/"/g, '""')}"`,
        `"${(s.essayResult2 || "").replace(/"/g, '""')}"`,
        `"${(s.essayResult3 || "").replace(/"/g, '""')}"`,
        `"${(s.homeworkLink || "").replace(/"/g, '""')}"`,
      ];
    });
    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DSHS-12A1-tien-trinh-bai-hoc.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const completedCount = submissions.filter(
    (s) => getCompletedStagesCount(s) === 4
  ).length;

  const homeworkSubmittedCount = submissions.filter((s) =>
    Boolean(s.homeworkLink?.trim())
  ).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submissions-modal-title"
    >
      <div className="neo-card w-full max-w-4xl max-h-[88vh] flex flex-col bg-[#FAF8F5] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-100 border-b-2 border-slate-900">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-slate-900 shrink-0" />
            <div>
              <h2
                id="submissions-modal-title"
                className="text-lg font-bold text-slate-900 font-serif-display"
              >
                Bảng Google Sheet Lớp 12A1 ({completedCount}/{submissions.length} hoàn thành 4/4 ·{" "}
                {homeworkSubmittedCount} đã nộp BTVN)
              </h2>
              <p className="text-xs text-slate-700">
                Dữ liệu được tải trực tiếp từ bảng Google Sheet (nếu cột Hoàn thành trống sẽ hiển thị 0/4)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="neo-btn p-2 bg-white hover:bg-slate-100 text-slate-900 cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-700">
              Hiển thị: <strong>MHS</strong> · <strong>Họ và tên</strong> ·{" "}
              <strong>Hoàn thành bài học (0/4 → 4/4)</strong> · <strong>Bài tập về nhà</strong>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="neo-btn flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-xs font-bold text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Đang tải từ Sheet..." : "Làm mới từ Sheet"}</span>
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                className="neo-btn flex items-center gap-1.5 px-3.5 py-2 bg-amber-300 hover:bg-amber-400 text-xs font-bold text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải CSV (Excel)</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border-2 border-slate-900 bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-3.5 border-r border-slate-700 whitespace-nowrap w-32">
                    MHS
                  </th>
                  <th className="p-3.5 border-r border-slate-700 whitespace-nowrap">
                    Họ và tên
                  </th>
                  <th className="p-3.5 border-r border-slate-700 whitespace-nowrap w-48">
                    Hoàn thành bài học
                  </th>
                  <th className="p-3.5 whitespace-nowrap w-44">
                    Bài tập về nhà
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {submissions.map((item, idx) => {
                  const stagesDone = getCompletedStagesCount(item);
                  const isFull = stagesDone === 4;
                  const isInProgress = stagesDone > 0 && stagesDone < 4;
                  const hasHomework = Boolean(item.homeworkLink?.trim());

                  return (
                    <tr
                      key={item.mhs || item.id || idx}
                      className="hover:bg-amber-50/50 align-middle"
                    >
                      <td className="p-3.5 font-mono font-bold text-slate-900 whitespace-nowrap border-r border-slate-200">
                        {item.mhs || item.id}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap border-r border-slate-200">
                        {item.fullName}
                      </td>
                      <td className="p-3.5 whitespace-nowrap border-r border-slate-200">
                        <div className="flex items-center gap-2">
                          {isFull ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 border border-emerald-800 text-emerald-950 font-mono font-bold text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>4/4</span>
                            </span>
                          ) : isInProgress ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 border border-amber-800 text-amber-950 font-mono font-bold text-xs">
                              <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                              <span>{stagesDone}/4</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-400 text-slate-700 font-mono font-bold text-xs">
                              <span>0/4</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {hasHomework ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 border border-emerald-800 text-emerald-950 font-bold text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>Đã nộp</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-400 text-slate-600 font-semibold text-xs">
                            <span>Chưa nộp</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
