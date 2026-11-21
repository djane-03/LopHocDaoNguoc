import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  BookOpen,
  UserCheck,
  X,
  KeyRound,
  CheckCircle2,
  TableProperties,
  Link2,
  Send,
  Lock,
  AlertCircle,
  LogOut,
} from "lucide-react";
import {
  PLANT_STAGES,
  PlantStage,
  DEFAULT_WEBHOOK_URL,
  normalizeMhs,
} from "./data/lessonData";
import { LiteraryHeroDoodle } from "./components/DoodleIllustrations";
import {
  StageTransitionPopup,
  PlantProgressTrackerBar,
} from "./components/StageTransitionPopup";
import { Section1Concept } from "./components/Section1Concept";
import { Section2Characteristics } from "./components/Section2Characteristics";
import { Section3CulturalValue } from "./components/Section3CulturalValue";
import { Section4Exercises } from "./components/Section4Exercises";
import { WebhookCodeModal, SubmissionRecord } from "./components/WebhookCodeModal";

const ACTIVE_STUDENT_UI_STORAGE_KEY = "active_student_ui_state_12a1_v2";

interface PersistedStudentUIState {
  studentMhs: string;
  studentName: string;
  studentClass: string;
  viewMode: "home" | "lesson";
  currentStage: number;
  highestUnlockedStage: number;
  completedCount: number;
}

function loadPersistedStudentUIState(): PersistedStudentUIState | null {
  try {
    const raw = localStorage.getItem(ACTIVE_STUDENT_UI_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    const savedMhs = String(parsed.studentMhs || "").trim();
    if (!savedMhs) return null;

    const savedName = String(parsed.studentName || "").trim();
    const completedCount = Math.max(0, Math.min(4, Number(parsed.completedCount) || 0));
    const highestUnlockedStage = Math.max(
      1,
      Math.min(4, Math.max(Number(parsed.highestUnlockedStage) || 1, completedCount + 1))
    );
    const currentStage = Math.max(
      1,
      Math.min(highestUnlockedStage, Number(parsed.currentStage) || highestUnlockedStage)
    );
    const viewMode = parsed.viewMode === "lesson" ? "lesson" : "home";

    return {
      studentMhs: savedMhs,
      studentName: savedName,
      studentClass: String(parsed.studentClass || "12A1").trim() || "12A1",
      viewMode,
      currentStage,
      highestUnlockedStage,
      completedCount,
    };
  } catch {
    return null;
  }
}

export default function App() {
  const initialPersisted = useMemo(() => loadPersistedStudentUIState(), []);

  // View mode: 'home' (Landing Screen) or 'lesson' (4-stage Flipped Classroom)
  const [viewMode, setViewMode] = useState<"home" | "lesson">(
    initialPersisted?.viewMode ?? "home"
  );

  // Student MHS login popup state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [mhsModalTarget, setMhsModalTarget] = useState<"lesson" | "homework">("lesson");
  const [mhsInput, setMhsInput] = useState(initialPersisted?.studentMhs ?? "");
  const [studentMhs, setStudentMhs] = useState(initialPersisted?.studentMhs ?? "");
  const [studentName, setStudentName] = useState(initialPersisted?.studentName ?? "");
  const [studentClass, setStudentClass] = useState(initialPersisted?.studentClass ?? "12A1");
  const [formError, setFormError] = useState("");

  // Homework link submission state on Home screen
  const [homeworkLinkInput, setHomeworkLinkInput] = useState("");
  const [isSubmittingHomework, setIsSubmittingHomework] = useState(false);
  const [homeworkError, setHomeworkError] = useState("");
  const [homeworkSuccess, setHomeworkSuccess] = useState<{
    mhs: string;
    fullName: string;
    submittedAt: string;
    link: string;
  } | null>(null);

  // Lesson stage state (1..4) & completed stages count (0..4)
  const [completedCount, setCompletedCount] = useState<number>(
    initialPersisted?.completedCount ?? 0
  );
  const [currentStage, setCurrentStage] = useState<number>(
    initialPersisted?.currentStage ?? 1
  );
  const [highestUnlockedStage, setHighestUnlockedStage] = useState<number>(
    initialPersisted?.highestUnlockedStage ?? 1
  );
  const [transitionPopupStage, setTransitionPopupStage] = useState<PlantStage | null>(null);

  // Google Sheets URL & Table modal (chỉ lưu đúng danh sách tải trực tiếp từ Google Sheet)
  const webhookUrl = DEFAULT_WEBHOOK_URL;
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [hasLoadedSheet, setHasLoadedSheet] = useState(false);
  const [isRefreshingList, setIsRefreshingList] = useState(false);
  const [isVerifyingMhs, setIsVerifyingMhs] = useState(false);

  // Strictly parse the Hoàn thành column value from Google Sheet (empty -> 0)
  const parseSheetCompletedColumn = (val: any): number => {
    if (val === undefined || val === null) return 0;
    const str = String(val).trim();
    if (!str) return 0;
    const match = str.match(/^(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return Math.max(0, Math.min(4, num));
    }
    return 0;
  };

  // Chỉ map đúng số lượng và dữ liệu các hàng hiện có trên Google Sheet (không thêm bớt từ danh sách cố định)
  const mapSheetRowsToRoster = (rawRows: any[]): SubmissionRecord[] => {
    if (!Array.isArray(rawRows) || rawRows.length === 0) {
      return [];
    }

    const mapped: SubmissionRecord[] = [];
    const seenMhs = new Set<string>();

    rawRows.forEach((row) => {
      if (!row || typeof row !== "object") return;
      const rawCode = String(
        row.mhs ?? row.studentCode ?? row.MHS ?? row.code ?? row.id ?? ""
      ).trim();
      const normalizedCode = normalizeMhs(rawCode);
      if (!rawCode || !normalizedCode || normalizedCode === "MHS") return;
      if (seenMhs.has(normalizedCode)) return;
      seenMhs.add(normalizedCode);

      // Chỉ lấy giá trị cột Hoàn thành từ Google Sheet; nếu cột Hoàn thành trống thì hiển thị 0/4
      const rawCompletedField =
        row.completed !== undefined
          ? row.completed
          : row.hoanThanh !== undefined
          ? row.hoanThanh
          : row["Hoàn thành"] !== undefined
          ? row["Hoàn thành"]
          : row.completedStages !== undefined
          ? row.completedStages
          : row.completedText !== undefined
          ? row.completedText
          : "";

      const sheetStage = parseSheetCompletedColumn(rawCompletedField);
      const homeworkLink = String(
        row.homeworkLink ?? row["Link bài tập về nhà"] ?? ""
      ).trim();

      mapped.push({
        id: rawCode,
        mhs: rawCode,
        fullName: String(
          row.fullName ?? row.hoTen ?? row.name ?? row["Họ tên"] ?? ""
        ).trim(),
        submittedAt: String(
          row.submittedAt ?? row.timestamp ?? row["Thời gian nộp gần cuối"] ?? ""
        ).trim(),
        quizResult: String(
          row.quizResult ?? row["Kết quả trắc nghiệm"] ?? ""
        ).trim(),
        essayResult1: String(
          row.essayResult1 ?? row["essayResult 1"] ?? row["Câu tự luận 1"] ?? ""
        ).trim(),
        essayResult2: String(
          row.essayResult2 ?? row["essayResult 2"] ?? row["Câu tự luận 2"] ?? ""
        ).trim(),
        essayResult3: String(
          row.essayResult3 ?? row["essayResult 3"] ?? row["Câu tự luận 3"] ?? ""
        ).trim(),
        essayResult: String(row.essayResult ?? "").trim(),
        homeworkLink,
        completedStages: sheetStage,
        progressStatus: `${sheetStage}/4`,
      });
    });

    return mapped;
  };

  const syncStudentsFromSheet = async (): Promise<SubmissionRecord[] | null> => {
    setIsRefreshingList(true);
    try {
      const separator = webhookUrl.includes("?") ? "&" : "?";
      const res = await fetch(`${webhookUrl}${separator}t=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      const remoteList = Array.isArray(data?.students)
        ? data.students
        : Array.isArray(data?.submissions)
        ? data.submissions
        : Array.isArray(data)
        ? data
        : [];
      const mappedList = mapSheetRowsToRoster(remoteList);
      setSubmissions(mappedList);
      setHasLoadedSheet(true);
      return mappedList;
    } catch (err) {
      console.error("Error loading data from Google Sheets:", err);
      return null;
    } finally {
      setIsRefreshingList(false);
    }
  };

  // Clear any legacy table cache keys and load table strictly from Google Sheets
  useEffect(() => {
    try {
      localStorage.removeItem("dshs_12a1_stage_progress_v1");
      sessionStorage.removeItem("dshs_12a1_stage_progress_v1");
    } catch {
      // ignore
    }
    syncStudentsFromSheet();
  }, []);

  // Lưu trạng thái chặng đang thực hiện & chặng đã hoàn thành của học sinh để giữ nguyên khi reload trang
  useEffect(() => {
    if (!studentMhs.trim()) return;
    try {
      const stateToSave: PersistedStudentUIState = {
        studentMhs,
        studentName,
        studentClass,
        viewMode,
        currentStage,
        highestUnlockedStage,
        completedCount,
      };
      localStorage.setItem(ACTIVE_STUDENT_UI_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // ignore storage errors
    }
  }, [
    studentMhs,
    studentName,
    studentClass,
    viewMode,
    currentStage,
    highestUnlockedStage,
    completedCount,
  ]);

  // Đồng bộ thông tin & tiến trình chặng đã hoàn thành từ Google Sheet vào giao diện của học sinh đang đăng nhập
  useEffect(() => {
    if (!hasLoadedSheet || !studentMhs.trim()) return;
    const sheetRecord = submissions.find(
      (s) => normalizeMhs(s.mhs || s.id || "") === normalizeMhs(studentMhs)
    );
    if (!sheetRecord) {
      // Nếu mã không còn tồn tại trong danh sách Google Sheet thì tự động đăng xuất
      try {
        localStorage.removeItem(ACTIVE_STUDENT_UI_STORAGE_KEY);
      } catch {
        // ignore
      }
      setStudentMhs("");
      setStudentName("");
      setMhsInput("");
      setCompletedCount(0);
      setCurrentStage(1);
      setHighestUnlockedStage(1);
      setViewMode("home");
      return;
    }

    if (sheetRecord.fullName && sheetRecord.fullName !== studentName) {
      setStudentName(sheetRecord.fullName);
    }

    const sheetCompleted = sheetRecord.completedStages ?? 0;
    if (sheetCompleted > 0) {
      const sheetUnlocked = Math.max(1, Math.min(4, sheetCompleted + 1));
      setCompletedCount((prev) => Math.max(prev, sheetCompleted));
      setHighestUnlockedStage((prev) => Math.max(prev, sheetUnlocked));
    }
  }, [submissions, hasLoadedSheet, studentMhs, studentName]);

  const handleOpenSubmissionsModal = () => {
    void syncStudentsFromSheet();
    setIsWebhookModalOpen(true);
  };

  // Open MHS login modal
  const handleOpenMhsModal = (target: "lesson" | "homework" = "lesson") => {
    setFormError("");
    setMhsModalTarget(target);
    if (studentMhs) {
      setMhsInput(studentMhs);
    }
    setIsStudentModalOpen(true);
    void syncStudentsFromSheet();
  };

  // Đăng xuất tài khoản học sinh hiện tại
  const handleLogout = () => {
    try {
      localStorage.removeItem(ACTIVE_STUDENT_UI_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
    setStudentMhs("");
    setStudentName("");
    setStudentClass("12A1");
    setMhsInput("");
    setFormError("");
    setHomeworkError("");
    setHomeworkSuccess(null);
    setHomeworkLinkInput("");
    setCompletedCount(0);
    setCurrentStage(1);
    setHighestUnlockedStage(1);
    setTransitionPopupStage(null);
    setIsStudentModalOpen(false);
    setViewMode("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Live preview of matched student directly from Google Sheet list as user types MHS
  const previewMatchedStudent = useMemo(() => {
    const normalized = normalizeMhs(mhsInput);
    if (!normalized) return null;
    return (
      submissions.find(
        (s) => normalizeMhs(s.mhs || s.id || "") === normalized
      ) || null
    );
  }, [mhsInput, submissions]);

  // Confirm Student MHS -> Validate strictly against current Google Sheet rows
  const handleConfirmStudentInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = normalizeMhs(mhsInput);
    if (!normalizedInput) {
      setFormError("Vui lòng nhập Mã tham gia để xác thực.");
      return;
    }

    let activeRoster = submissions;
    let matchedStudent = activeRoster.find(
      (s) => normalizeMhs(s.mhs || s.id || "") === normalizedInput
    );

    // Nếu chưa tìm thấy trong danh sách đã tải, tải mới trực tiếp từ Google Sheet để kiểm tra
    if (!matchedStudent) {
      setIsVerifyingMhs(true);
      const refreshedList = await syncStudentsFromSheet();
      setIsVerifyingMhs(false);
      if (refreshedList) {
        activeRoster = refreshedList;
        matchedStudent = activeRoster.find(
          (s) => normalizeMhs(s.mhs || s.id || "") === normalizedInput
        );
      } else {
        setFormError(
          "Không thể kết nối tới Google Sheet để kiểm tra mã. Vui lòng thử lại."
        );
        return;
      }
    }

    if (!matchedStudent) {
      setFormError(
        "Mã tham gia không tồn tại trong danh sách hiện có trên Google Sheet. Vui lòng kiểm tra lại."
      );
      return;
    }

    const matchedMhs = matchedStudent.mhs || matchedStudent.id;
    const matchedFullName = matchedStudent.fullName || matchedMhs;

    const isSameStudent =
      Boolean(studentMhs) &&
      normalizeMhs(studentMhs) === normalizeMhs(matchedMhs);

    setFormError("");
    setHomeworkError("");
    setStudentMhs(matchedMhs);
    setMhsInput(matchedMhs);
    setStudentName(matchedFullName);
    setStudentClass("12A1");
    setIsStudentModalOpen(false);

    if (mhsModalTarget === "homework") {
      const pendingLink = homeworkLinkInput.trim();
      if (pendingLink) {
        void submitHomeworkForStudent(
          matchedMhs,
          matchedFullName,
          pendingLink
        );
      }
      return;
    }

    // Khởi tạo tiến trình mở khóa dựa trên dữ liệu đã lưu của học sinh trên Google Sheet
    const sheetCompleted = matchedStudent.completedStages ?? 0;
    const nextCompletedCount = isSameStudent
      ? Math.max(completedCount, sheetCompleted)
      : sheetCompleted;
    const targetUnlockedStage = isSameStudent
      ? Math.max(highestUnlockedStage, Math.min(4, nextCompletedCount + 1))
      : Math.max(1, Math.min(4, sheetCompleted + 1));
    const targetCurrentStage = isSameStudent
      ? Math.min(targetUnlockedStage, Math.max(1, currentStage))
      : targetUnlockedStage;

    // Chuyển đến đúng chặng học sinh đang thực hiện
    setCompletedCount(nextCompletedCount);
    setHighestUnlockedStage(targetUnlockedStage);
    setCurrentStage(targetCurrentStage);
    setViewMode("lesson");
    setTransitionPopupStage(
      PLANT_STAGES.find((s) => s.id === targetCurrentStage) || PLANT_STAGES[0]
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Đồng bộ số chặng đã hoàn thành (1, 2, 3, 4) lên Google Sheet
  const syncStageProgressToSheet = async (
    completedStageCount: number,
    mhsOverride?: string,
    nameOverride?: string
  ) => {
    const targetMhs = (mhsOverride ?? studentMhs).trim();
    const targetName = (nameOverride ?? studentName).trim();
    if (!targetMhs) return;

    const clampedCompleted = Math.max(1, Math.min(4, completedStageCount));
    const submittedAt = new Date().toLocaleString("vi-VN");

    const payload = JSON.stringify({
      action: "update_stage_progress",
      mhs: targetMhs,
      studentCode: targetMhs,
      fullName: targetName,
      className: studentClass || "12A1",
      submittedAt,
      completedStages: clampedCompleted,
      completedText: clampedCompleted,
      completed: clampedCompleted,
      hoanThanh: clampedCompleted,
    });

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload,
      });
    } catch {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: payload,
        });
      } catch (err) {
        console.error("Failed to update stage progress to Google Sheets:", err);
      }
    }

    await syncStudentsFromSheet();
  };

  // Chọn một chặng đang học hoặc đã học qua (không cho phép chọn chặng chưa mở)
  const handleSelectStage = (targetStageId: number, showAnimationPopup = true) => {
    const clampedId = Math.max(1, Math.min(4, targetStageId));
    if (clampedId > highestUnlockedStage) {
      return;
    }
    setCurrentStage(clampedId);

    if (showAnimationPopup) {
      const stageMeta = PLANT_STAGES.find((s) => s.id === clampedId) || null;
      setTransitionPopupStage(stageMeta);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hoàn thành chặng hiện tại và bấm nút sang chặng tiếp theo -> Cập nhật tiến trình chặng trước đó lên Google Sheet
  const handleCompleteStageAndAdvance = (completedStageId: number, nextStageId: number) => {
    const clampedCompleted = Math.max(1, Math.min(4, completedStageId));
    const clampedNext = Math.max(1, Math.min(4, nextStageId));

    setCompletedCount((prev) => Math.max(prev, clampedCompleted));
    setHighestUnlockedStage((prev) => Math.max(prev, clampedNext));
    setCurrentStage(clampedNext);

    const stageMeta = PLANT_STAGES.find((s) => s.id === clampedNext) || null;
    setTransitionPopupStage(stageMeta);
    window.scrollTo({ top: 0, behavior: "smooth" });

    void syncStageProgressToSheet(clampedCompleted);
  };

  // Jump to a section from top navigation bar (chỉ cho phép chọn chặng đang học hoặc đã qua)
  const handleNavSectionClick = (stageId: number) => {
    if (stageId > highestUnlockedStage) {
      return;
    }
    if (!studentMhs.trim()) {
      handleOpenMhsModal("lesson");
      return;
    }
    setViewMode("lesson");
    handleSelectStage(stageId, true);
  };

  // Reload directly from Google Sheet after exercise submission
  const handleSubmissionSuccess = () => {
    setCompletedCount(4);
    setHighestUnlockedStage(4);
    syncStudentsFromSheet();
  };

  const submitHomeworkForStudent = async (
    mhsVal: string,
    fullNameVal: string,
    trimmedLink: string
  ) => {
    setIsSubmittingHomework(true);
    const submittedAt = new Date().toLocaleString("vi-VN");
    const payload = JSON.stringify({
      action: "submit_homework",
      mhs: mhsVal,
      studentCode: mhsVal,
      fullName: fullNameVal,
      className: "12A1",
      submittedAt,
      homeworkLink: trimmedLink,
    });

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload,
      });
    } catch {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: payload,
        });
      } catch (err) {
        console.error("Failed to send homework link to Google Sheets:", err);
      }
    }

    await syncStudentsFromSheet();

    setHomeworkSuccess({
      mhs: mhsVal,
      fullName: fullNameVal,
      submittedAt,
      link: trimmedLink,
    });
    setHomeworkLinkInput("");
    setIsSubmittingHomework(false);
  };

  // Handle Homework Link submission on the Home screen
  const handleHomeworkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHomeworkError("");
    setHomeworkSuccess(null);

    const trimmedLink = homeworkLinkInput.trim();
    if (!trimmedLink) {
      setHomeworkError("Vui lòng dán đường link bài tập về nhà của bạn trước khi gửi.");
      return;
    }

    // Nếu học sinh chưa nhập mã học sinh, bắt buộc phải nhập mã mới gửi được link BTVN
    if (!studentMhs.trim()) {
      setHomeworkError(
        "Bạn chưa nhập Mã học sinh (MHS). Vui lòng nhập Mã học sinh lớp 12A1 để hoàn tất gửi link bài tập về nhà."
      );
      handleOpenMhsModal("homework");
      return;
    }

    await submitHomeworkForStudent(studentMhs, studentName, trimmedLink);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900">
      {/* Top Bar Contract: 3 Zones (Brand Wordmark — 4 Nav Links — 1 Primary Action) */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-4 bg-[#FAF8F5]/95 backdrop-blur-sm border-b-2 border-slate-900">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => setViewMode("home")}
          className="text-lg font-bold tracking-tight text-slate-900 font-serif-display whitespace-nowrap shrink-0 cursor-pointer"
        >
          Điển Cố Văn Học
        </button>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {PLANT_STAGES.map((stage) => {
            const effectiveCompleted = Math.max(
              completedCount,
              Math.max(0, highestUnlockedStage - 1)
            );
            const isLocked = stage.id > highestUnlockedStage;
            const isCompleted = stage.id <= effectiveCompleted;
            const isActive = viewMode === "lesson" && currentStage === stage.id;

            return (
              <button
                key={stage.id}
                type="button"
                disabled={isLocked}
                aria-disabled={isLocked}
                onClick={() => {
                  if (!isLocked) {
                    handleNavSectionClick(stage.id);
                  }
                }}
                className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
                  isLocked
                    ? "text-slate-400 opacity-45 grayscale cursor-not-allowed select-none"
                    : isActive
                    ? "text-slate-900 underline decoration-2 decoration-amber-500 underline-offset-4 font-bold cursor-pointer"
                    : isCompleted
                    ? "text-emerald-800 hover:text-slate-900 hover:underline underline-offset-4 font-bold cursor-pointer"
                    : "text-slate-700 hover:text-slate-900 hover:underline underline-offset-4 cursor-pointer"
                }`}
              >
                <span>
                  {stage.id}. {stage.name} {stage.emoji}
                </span>
                {!isLocked && isCompleted && (
                  <span className="text-xs font-mono text-emerald-700">✓</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Student Account & Logout Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleOpenMhsModal("lesson")}
            className="neo-btn px-4 py-2 text-xs font-bold bg-amber-300 hover:bg-amber-400 text-slate-900 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>
              {studentMhs
                ? `${studentMhs} · ${studentName}`
                : "Nhập mã học sinh (12A1)"}
            </span>
          </button>

          {studentMhs && (
            <button
              type="button"
              onClick={handleLogout}
              title="Đăng xuất tài khoản hiện tại"
              className="neo-btn px-3 py-2 text-xs font-bold bg-white hover:bg-rose-50 text-rose-700 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {viewMode === "home" ? (
          /* ================= MÀN HÌNH CHÍNH (MAIN LANDING SCREEN) ================= */
          <div className="space-y-12">
            {/* Hero Centerpiece Card */}
            <section className="neo-card p-6 sm:p-10 lg:p-12 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Column: Title, Flipped Classroom Introduction & Prominent Start Button */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-slate-600">
                    <span>MÔ HÌNH LỚP HỌC ĐẢO NGƯỢC</span>
                    <span aria-hidden="true">·</span>
                    <span>Ngữ Văn 12</span>
                    <span aria-hidden="true">·</span>
                    <span>4 CHẶNG TƯƠNG TÁC</span>
                  </div>

                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif-display leading-[1.15]"
                    style={{ textWrap: "balance" }}
                  >
                    Nghệ thuật sử dụng điển cố trong tác phẩm văn học
                  </h1>

                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                    Khám phá thế giới <strong>điển tích, điển cố</strong> từ{" "}
                    <em>Bình Ngô đại cáo</em>, <em>Truyện Kiều</em> đến{" "}
                    <em>Chuyện người con gái Nam Xương</em> qua hành trình nuôi dưỡng{" "}
                    <strong>Cây Tri Thức</strong>: từ lúc gieo hạt mầm khái niệm đến khi đơm hoa
                    kết trái qua bài tập thực hành.
                  </p>

                  {/* Primary CTA ("Start" / "Bắt đầu") */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenMhsModal("lesson")}
                      className="neo-btn px-8 py-4 bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold text-base sm:text-lg flex items-center gap-3 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-slate-900" />
                      <span>Bắt đầu bài học</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenSubmissionsModal}
                      className="neo-btn px-5 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <TableProperties className="w-4 h-4" />
                      <span>Tiến độ học tập</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Minimalist Single-Line Literary Doodle */}
                <div className="lg:col-span-5">
                  <div className="p-5 bg-[#FAF8F5] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                    <LiteraryHeroDoodle className="w-full h-auto text-slate-900" />
                    <div className="mt-3 pt-3 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600 font-mono">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Nộp Link Bài Tập Về Nhà (Thay thế Lộ trình bài học tuần tự) */}
            <section className="neo-card p-6 sm:p-8 lg:p-10 bg-white space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
                <div>
                  <p className="text-xs font-mono font-bold text-slate-600"></p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-display mt-1">
                    Nơi nộp Link Bài Tập Về Nhà
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Học sinh thực hiện và dán đường dẫn bài làm (Canva, Google Docs, Google Drive, OneDrive,...)
                  </p>
                </div>
              </div>

              {/* Trạng thái xác thực Mã học sinh (MHS) */}
              {!studentMhs ? (
                <div className="p-5 bg-amber-50 border-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-300 border-2 border-slate-900 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Yêu cầu nhập Mã tham gia trước khi gửi link bài tập về nhà
                      </h3>
                      <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                        Bạn cần xác thực Mã đã được cấp trong danh sách trên Google Sheet để hệ
                        thống mở khóa gửi link bài tập về nhà vào đúng vị trí hàng của bạn.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenMhsModal("homework")}
                    className="neo-btn px-5 py-2.5 bg-amber-300 hover:bg-amber-400 text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Nhập Mã học sinh ngay</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-950">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <span className="text-slate-600">Học sinh nộp bài: </span>
                      <span className="font-mono font-bold">{studentMhs}</span>
                      <span className="mx-1.5">·</span>
                      <span className="font-bold">{studentName}</span>
                      <span className="ml-1.5 text-emerald-800 font-semibold">(Lớp 12A1)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenMhsModal("homework")}
                      className="text-xs font-bold text-slate-800 underline underline-offset-2 hover:text-amber-700 cursor-pointer"
                    >
                      Đổi Mã học sinh khác
                    </button>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-xs font-bold text-rose-700 underline underline-offset-2 hover:text-rose-900 cursor-pointer inline-flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Form nộp link bài tập về nhà */}
              <form onSubmit={handleHomeworkSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="homework-link-input"
                    className="block text-xs sm:text-sm font-bold text-slate-900 mb-2"
                  >
                    Đường dẫn (Link) bài tập về nhà của học sinh *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Link2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="homework-link-input"
                        type="url"
                        value={homeworkLinkInput}
                        onChange={(e) => {
                          setHomeworkLinkInput(e.target.value);
                          if (homeworkError) setHomeworkError("");
                        }}
                        placeholder={
                          studentMhs
                            ? "https://drive.google.com/... hoặc https://docs.google.com/..."
                            : "Vui lòng nhập Mã học sinh (MHS) trước khi dán link bài tập về nhà..."
                        }
                        className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF8F5] border-2 border-slate-900 focus:outline-none focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingHomework}
                      className="neo-btn px-6 py-3 bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmittingHomework
                          ? "Đang lưu vào Sheet..."
                          : studentMhs
                          ? "Gửi Link Bài Tập Về Nhà"
                          : "Nhập Mã HS & Gửi Link"}
                      </span>
                    </button>
                  </div>
                </div>

                {homeworkError && (
                  <div className="p-3 bg-rose-50 border-2 border-rose-800 text-xs font-bold text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{homeworkError}</span>
                  </div>
                )}

                {homeworkSuccess && (
                  <div className="p-4 bg-emerald-50 border-2 border-slate-900 space-y-1.5 text-xs sm:text-sm">
                    <div className="font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>
                        Đã lưu Link bài tập về nhà vào đúng vị trí MHS {homeworkSuccess.mhs} (
                        {homeworkSuccess.fullName}) trên Google Sheet!
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-mono">
                      Thời gian nộp lần cuối: {homeworkSuccess.submittedAt} · Link:{" "}
                      <a
                        href={homeworkSuccess.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-slate-900 font-bold"
                      >
                        {homeworkSuccess.link}
                      </a>
                    </p>
                  </div>
                )}
              </form>
            </section>
          </div>
        ) : (
          /* ================= GIAO DIỆN BÀI HỌC 4 PHẦN (LESSON VIEW) ================= */
          <div>
            {/* Persistent Plant Progress Tracker Bar */}
            <PlantProgressTrackerBar
              currentStage={currentStage}
              highestUnlockedStage={highestUnlockedStage}
              completedCount={completedCount}
              onSelectStage={(stageId) => handleSelectStage(stageId, true)}
              studentName={studentName ? `${studentName} (${studentMhs})` : "Học sinh"}
              studentClass={studentClass || "12A1"}
            />

            {/* Active Lesson Section */}
            {currentStage === 1 && (
              <Section1Concept onNext={() => handleCompleteStageAndAdvance(1, 2)} />
            )}

            {currentStage === 2 && (
              <Section2Characteristics
                onPrev={() => handleSelectStage(1, false)}
                onNext={() => handleCompleteStageAndAdvance(2, 3)}
              />
            )}

            {currentStage === 3 && (
              <Section3CulturalValue
                onPrev={() => handleSelectStage(2, false)}
                onNext={() => handleCompleteStageAndAdvance(3, 4)}
              />
            )}

            {currentStage === 4 && (
              <Section4Exercises
                key={studentMhs || "guest"}
                onPrev={() => handleSelectStage(3, false)}
                onGoHome={() => {
                  setViewMode("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                studentMhs={studentMhs}
                studentName={studentName}
                studentClass={studentClass || "12A1"}
                webhookUrl={webhookUrl}
                onOpenWebhookModal={handleOpenSubmissionsModal}
                onSubmissionSuccess={handleSubmissionSuccess}
              />
            )}
          </div>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-auto border-t-2 border-slate-900 bg-white py-5 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-900">
              Nghệ thuật sử dụng điển cố trong tác phẩm văn học
            </span>
            <span aria-hidden="true">·</span>
            <span>Lớp 12A1 · Mô hình Lớp học đảo ngược</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="./assets/aistudio/T__LI_U__I_N_T_CH__I_N_C___1__817db971.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 underline underline-offset-2"
            >
              Tư liệu Điển tích Điển cố (PDF)
            </a>
          </div>
        </div>
      </footer>

      {/* ================= POPUP NHẬP MÃ HỌC SINH (MHS) ================= */}
      <AnimatePresence>
        {isStudentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-modal-title"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="neo-card w-full max-w-md p-6 sm:p-8 bg-[#FAF8F5] relative"
            >
              <button
                type="button"
                onClick={() => setIsStudentModalOpen(false)}
                className="neo-btn absolute top-4 right-4 p-1.5 bg-white hover:bg-slate-100 text-slate-900 cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 flex items-center justify-center bg-amber-300 border-2 border-slate-900">
                  <UserCheck className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-slate-600">
                    XÁC THỰC TRUY CẬP LỚP 12A1
                  </p>
                  <h2
                    id="student-modal-title"
                    className="text-xl font-bold text-slate-900 font-serif-display"
                  >
                    Nhập Mã Tham Gia
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                {mhsModalTarget === "homework" ? (
                  <>
                    Nhập <strong>Mã truy cập</strong> có trong danh sách trên Google Sheet để mở
                    khóa chức năng gửi <strong>Link bài tập về nhà</strong> vào đúng hàng của bạn.
                  </>
                ) : (
                  <>
                    Nhập <strong>Mã truy cập</strong> đã được cấp trong danh sách lớp{" "}
                    <strong>12A1</strong>
                  </>
                )}
              </p>

              <form onSubmit={handleConfirmStudentInfo} className="space-y-4">
                <div>
                  <label
                    htmlFor="student-mhs"
                    className="block text-xs font-bold text-slate-900 mb-1.5"
                  >
                    Mã truy cập*
                  </label>
                  <input
                    id="student-mhs"
                    type="text"
                    required
                    value={mhsInput}
                    onChange={(e) => {
                      setMhsInput(e.target.value.toUpperCase());
                      if (formError) setFormError("");
                    }}
                    placeholder="Nhập mã truy cập của bạn..."
                    className="w-full px-3.5 py-2.5 text-sm font-mono font-bold uppercase bg-white border-2 border-slate-900 focus:outline-none focus:bg-amber-50"
                    autoFocus
                  />
                </div>

                {/* Live student lookup preview */}
                {previewMatchedStudent && (
                  <div className="p-3 bg-emerald-50 border-2 border-emerald-800 flex items-center gap-2.5 text-xs text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <span className="font-mono font-bold">
                        {previewMatchedStudent.mhs || previewMatchedStudent.id}
                      </span>
                      <span className="mx-1.5">·</span>
                      <span className="font-bold">{previewMatchedStudent.fullName}</span>
                    </div>
                  </div>
                )}

                {formError && (
                  <p className="text-xs font-bold text-rose-700 bg-rose-50 p-2.5 border border-rose-800">
                    {formError}
                  </p>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsStudentModalOpen(false)}
                    className="neo-btn flex-1 py-2.5 px-4 bg-white hover:bg-slate-100 text-xs font-bold text-slate-900 cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifyingMhs}
                    className="neo-btn flex-[2] py-2.5 px-5 bg-amber-300 hover:bg-amber-400 disabled:opacity-60 text-sm font-bold text-slate-900 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {isVerifyingMhs
                        ? "Đang kiểm tra trên Sheet..."
                        : mhsModalTarget === "homework"
                        ? "Xác nhận Mã để nộp BTVN"
                        : "Vào bài học"}
                    </span>
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <button
                    type="button"
                    onClick={() => {
                      setIsStudentModalOpen(false);
                      handleOpenSubmissionsModal();
                    }}
                    className="font-bold text-slate-900 underline underline-offset-2 hover:text-amber-700 cursor-pointer"
                  >
                    Tra cứu DSHS 12A1 trên Sheet
                  </button>
                  {studentMhs && (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="font-bold text-rose-700 underline underline-offset-2 hover:text-rose-900 cursor-pointer inline-flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất ({studentMhs})</span>
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= POPUP THÔNG BÁO NỘP BTVN THÀNH CÔNG ================= */}
      <AnimatePresence>
        {homeworkSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="neo-card w-full max-w-md bg-[#FAF8F5] overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-emerald-200 border-b-2 border-slate-900">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-slate-900" />
                  <h3 className="text-base font-bold text-slate-900 font-serif-display">
                    Nộp Bài Tập Về Nhà Thành Công
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setHomeworkSuccess(null)}
                  className="neo-btn p-1.5 bg-white hover:bg-slate-100 text-slate-900 cursor-pointer"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-emerald-100 border-2 border-slate-900 flex items-center justify-center shadow-[3px_3px_0px_#1E293B]">
                  <CheckCircle2 className="w-9 h-9 text-emerald-700" />
                </div>

                <p className="text-lg font-bold text-slate-900 font-serif-display leading-snug">
                  Chúc mừng bạn{" "}
                  <span className="text-emerald-800 underline decoration-amber-400 decoration-2 underline-offset-4">
                    {homeworkSuccess.fullName}
                  </span>{" "}
                  đã nộp BTVN thành công
                </p>

                <div className="p-3 bg-white border-2 border-slate-900 text-left text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-mono">MÃ HỌC SINH:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {homeworkSuccess.mhs}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-mono">THỜI GIAN NỘP:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {homeworkSuccess.submittedAt}
                    </span>
                  </div>
                  <div className="pt-1 border-t border-slate-200 truncate">
                    <span className="text-slate-500 font-mono">LINK BÀI NỘP: </span>
                    <a
                      href={homeworkSuccess.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-emerald-800 underline"
                    >
                      {homeworkSuccess.link}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHomeworkSuccess(null)}
                  className="neo-btn w-full py-2.5 px-6 bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold text-sm cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= POPUP ANIMATION TIẾN TRÌNH VÒNG ĐỜI CÂY ================= */}
      <StageTransitionPopup
        stage={transitionPopupStage}
        onContinue={() => setTransitionPopupStage(null)}
      />

      {/* ================= MODAL DANH SÁCH HỌC SINH 12A1 & GOOGLE SHEET ================= */}
      <WebhookCodeModal
        isOpen={isWebhookModalOpen}
        onClose={() => setIsWebhookModalOpen(false)}
        submissions={submissions}
        onRefresh={syncStudentsFromSheet}
        isRefreshing={isRefreshingList}
      />
    </div>
  );
}
