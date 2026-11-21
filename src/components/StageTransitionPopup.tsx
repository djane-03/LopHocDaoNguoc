import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { PLANT_STAGES, PlantStage } from "../data/lessonData";
import { StageDoodleIcon } from "./DoodleIllustrations";

interface StageTransitionPopupProps {
  stage: PlantStage | null;
  onContinue: () => void;
}

export const StageTransitionPopup: React.FC<StageTransitionPopupProps> = ({
  stage,
  onContinue,
}) => {
  return (
    <AnimatePresence>
      {stage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stage-popup-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="neo-card w-full max-w-lg max-h-[92vh] overflow-y-auto p-5 sm:p-8 bg-[#FAF8F5] text-center relative"
          >
            {/* Kicker */}
            <p className="text-[11px] sm:text-xs font-mono font-bold text-slate-600 tracking-wide">
              TIẾN TRÌNH CÂY TRI THỨC · GIAI ĐOẠN {stage.id}/4
            </p>

            {/* Animated Doodle Stage Illustration */}
            <motion.div
              initial={{ scale: 0.7, rotate: -6 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto my-3.5 sm:my-5 w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center bg-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a]"
            >
              <StageDoodleIcon stageId={stage.id} className="w-14 h-14 sm:w-20 sm:h-20 text-slate-900" />
            </motion.div>

            {/* Stage Name & Emoji */}
            <h3
              id="stage-popup-title"
              className="text-xl sm:text-3xl font-bold text-slate-900 font-serif-display"
            >
              {stage.id}. {stage.name} {stage.emoji}
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm font-bold text-emerald-800">
              {stage.stepLabel}: {stage.sectionTitle}
            </p>

            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
              {stage.growthQuote}
            </p>

            {/* 4-Step Plant Lifecycle Chain Visual */}
            <div className="mt-4 sm:mt-6 p-2.5 sm:p-3.5 bg-white border-2 border-slate-900">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PLANT_STAGES.map((item) => {
                  const isCompleted = item.id < stage.id;
                  const isCurrent = item.id === stage.id;
                  return (
                    <div
                      key={item.id}
                      className={`p-2 border transition-colors text-center ${
                        isCurrent
                          ? "bg-amber-200 border-slate-900 font-bold"
                          : isCompleted
                          ? "bg-emerald-100 border-slate-900 text-emerald-950"
                          : "bg-slate-100 border-slate-300 text-slate-400 opacity-50 grayscale"
                      }`}
                    >
                      <div className="text-base sm:text-lg leading-none">{item.emoji}</div>
                      <div className="mt-1 text-[11px] font-bold truncate">
                        {item.id}. {item.name}
                      </div>
                      <div className="mt-0.5 text-[10px] font-mono">
                        {isCompleted ? "Đã qua ✓" : isCurrent ? "Đang học" : "Chưa mở"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={onContinue}
              className="neo-btn mt-5 sm:mt-6 w-full min-h-[46px] py-3 px-4 sm:px-6 bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="leading-snug">Bắt đầu {stage.stepLabel}: {stage.sectionTitle}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PlantProgressTrackerBarProps {
  currentStage: number;
  highestUnlockedStage: number;
  completedCount?: number;
  onSelectStage: (stageId: number) => void;
  studentName: string;
  studentClass: string;
}

export const PlantProgressTrackerBar: React.FC<PlantProgressTrackerBarProps> = ({
  currentStage,
  highestUnlockedStage,
  completedCount = 0,
  onSelectStage,
  studentName,
  studentClass,
}) => {
  const effectiveCompleted = Math.max(completedCount, Math.max(0, highestUnlockedStage - 1));
  const progressPercent = Math.round((currentStage / PLANT_STAGES.length) * 100);

  return (
    <div className="neo-card p-3.5 sm:p-5 bg-white mb-5 sm:mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 pb-3 sm:pb-4 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-700">
          <span className="font-bold text-slate-900 break-words">Học sinh: {studentName}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono font-semibold text-slate-800">Lớp: {studentClass}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Mô hình Lớp học đảo ngược</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-slate-900 tabular-nums">
          <span className="px-2 py-0.5 bg-emerald-100 border border-slate-900 text-emerald-950">
            Hoàn thành: {Math.min(4, effectiveCompleted)}/4
          </span>
          <span className="px-2 py-0.5 bg-amber-200 border border-slate-900 text-slate-900">
            Chặng {currentStage}/4 ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* 4 Interactive Stage Buttons: 2x2 compact grid on mobile, 4 cols on desktop */}
      <div className="mt-3 sm:mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {PLANT_STAGES.map((stage) => {
          const isUnlocked = stage.id <= highestUnlockedStage;
          const isLocked = !isUnlocked;
          const isCurrent = stage.id === currentStage;
          const isCompleted = stage.id <= effectiveCompleted;

          return (
            <button
              key={stage.id}
              type="button"
              disabled={isLocked}
              aria-disabled={isLocked}
              onClick={() => {
                if (!isLocked) {
                  onSelectStage(stage.id);
                }
              }}
              className={`text-left p-2.5 sm:p-3 border-2 transition-all flex items-center gap-2 sm:gap-3 min-h-[56px] ${
                isLocked
                  ? "bg-slate-100 border-slate-300 text-slate-400 opacity-50 grayscale cursor-not-allowed select-none"
                  : isCurrent
                  ? "bg-amber-200 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] sm:shadow-[3px_3px_0px_0px_#0f172a] cursor-pointer"
                  : "bg-emerald-50 border-slate-900 hover:bg-emerald-100 cursor-pointer"
              }`}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center border-2 text-base sm:text-lg ${
                  isLocked
                    ? "bg-slate-200 border-slate-300 text-slate-400"
                    : "bg-white border-slate-900"
                }`}
              >
                {stage.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-xs font-bold truncate ${
                      isLocked ? "text-slate-400" : "text-slate-900"
                    }`}
                  >
                    {stage.id}. {stage.name}
                  </span>
                  {isLocked ? (
                    <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                  ) : isCompleted ? (
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700 shrink-0" />
                  ) : null}
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] truncate mt-0.5 ${
                    isLocked ? "text-slate-400" : "text-slate-700"
                  }`}
                >
                  {stage.sectionTitle}
                </p>
                <div className="mt-0.5 sm:mt-1 flex items-center gap-1 text-[10px] font-mono font-bold truncate">
                  {isLocked ? (
                    <span className="text-slate-400">Chưa mở</span>
                  ) : isCurrent && isCompleted ? (
                    <span className="text-emerald-900 truncate">Đã xong ✓</span>
                  ) : isCurrent ? (
                    <span className="text-amber-950 truncate">● Đang học</span>
                  ) : isCompleted ? (
                    <span className="text-emerald-800 truncate">Đã xong ✓</span>
                  ) : (
                    <span className="text-amber-900 truncate">● Đang học</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
