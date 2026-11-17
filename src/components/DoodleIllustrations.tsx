import React from "react";
import heroDienCoImg from "../assets/images/dien_co_van_hoc_hero_1794814209770.jpg";

interface DoodleProps {
  className?: string;
}

/**
 * 1. Gieo hạt (Seed in soil with gentle rain drops) - Minimalist single-line SVG
 */
export const SeedDoodle: React.FC<DoodleProps> = ({ className = "w-16 h-16" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Soil horizon wave */}
    <path d="M10 54 C 24 50, 36 58, 50 54 C 60 51, 66 55, 72 53" />
    <path d="M16 62 C 30 60, 50 64, 66 61" strokeDasharray="3 4" />
    {/* Seed nestled in soil */}
    <path
      d="M40 34 C 48 34, 52 43, 47 50 C 43 55, 36 55, 33 50 C 28 43, 32 34, 40 34 Z"
      fill="#FEF3C7"
    />
    {/* Tiny embryonic sprout line inside seed */}
    <path d="M40 48 C 40 43, 42 40, 44 38" />
    {/* Gentle water drops / sun rays */}
    <path d="M26 22 C 26 22, 23 27, 26 29 C 29 27, 26 22, 26 22 Z" />
    <path d="M54 20 C 54 20, 51 25, 54 27 C 57 25, 54 20, 54 20 Z" />
    <path d="M40 14 L 40 21" />
  </svg>
);

/**
 * 2. Nảy mầm (Young sprout breaking through soil) - Minimalist single-line SVG
 */
export const SproutDoodle: React.FC<DoodleProps> = ({ className = "w-16 h-16" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Soil base */}
    <path d="M12 60 C 28 56, 52 56, 68 60" />
    {/* Roots below */}
    <path d="M40 58 L 36 68 M40 58 L 45 69 M40 62 L 40 71" />
    {/* Curved stem */}
    <path d="M40 58 C 40 44, 39 34, 41 26" />
    {/* Left cotyledon leaf */}
    <path
      d="M40 36 C 28 36, 22 28, 25 22 C 30 20, 38 26, 40 36 Z"
      fill="#D1FAE5"
    />
    {/* Right cotyledon leaf */}
    <path
      d="M41 28 C 51 26, 57 18, 53 14 C 47 13, 41 20, 41 28 Z"
      fill="#A7F3D0"
    />
  </svg>
);

/**
 * 3. Ra lá (Vigorous leafy branch) - Minimalist single-line SVG
 */
export const LeafyDoodle: React.FC<DoodleProps> = ({ className = "w-16 h-16" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M14 64 C 30 61, 50 61, 66 64" />
    {/* Main trunk/stem */}
    <path d="M40 62 C 39 46, 41 30, 40 14" />
    {/* 4 lush leaves */}
    <path
      d="M40 48 C 26 47, 18 39, 21 31 C 29 31, 37 38, 40 48 Z"
      fill="#A7F3D0"
    />
    <path d="M27 37 L 40 48" />
    <path
      d="M40 42 C 54 41, 62 33, 59 25 C 51 25, 43 32, 40 42 Z"
      fill="#6EE7B7"
    />
    <path d="M53 31 L 40 42" />
    <path
      d="M40 28 C 28 26, 23 18, 27 12 C 34 13, 39 20, 40 28 Z"
      fill="#D1FAE5"
    />
    <path
      d="M40 22 C 50 20, 56 13, 52 8 C 45 9, 41 15, 40 22 Z"
      fill="#A7F3D0"
    />
  </svg>
);

/**
 * 4. Đơm hoa (Blooming literary flower) - Minimalist single-line SVG
 */
export const FlowerDoodle: React.FC<DoodleProps> = ({ className = "w-16 h-16" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 68 C 32 65, 48 65, 64 68" />
    <path d="M40 66 L 40 38" />
    {/* Side leaves */}
    <path
      d="M40 56 C 28 55, 22 47, 26 42 C 32 42, 38 48, 40 56 Z"
      fill="#BBF7D0"
    />
    <path
      d="M40 52 C 52 51, 58 43, 54 38 C 48 38, 42 44, 40 52 Z"
      fill="#BBF7D0"
    />
    {/* Petals */}
    <path
      d="M40 16 C 44 8, 48 8, 46 18 C 55 13, 58 17, 50 24 C 58 26, 57 31, 48 31 C 53 38, 48 42, 42 35 C 40 43, 35 42, 36 34 C 29 40, 25 36, 31 29 C 22 28, 23 23, 31 22 C 25 15, 29 11, 36 18 C 35 9, 39 8, 40 16 Z"
      fill="#FDE68A"
    />
    {/* Flower center */}
    <circle cx="40" cy="26" r="7" fill="#F59E0B" />
  </svg>
);

/**
 * Hero Illustration: Nghệ thuật sử dụng điển cố trong tác phẩm văn học
 */
export const LiteraryHeroDoodle: React.FC<DoodleProps> = ({ className = "w-full h-auto" }) => (
  <img
    src={heroDienCoImg}
    alt="Minh họa Nghệ thuật sử dụng điển cố trong tác phẩm văn học: chén rượu hòa nước sông, rừng phong thu quan san, ngọc Mị Nương, chỉ hồng và sách cổ"
    className={`block object-cover border border-slate-900 ${className}`}
  />
);

/**
 * Helper to render the matching Plant Stage Doodle by stage ID (1..4)
 */
export const StageDoodleIcon: React.FC<{ stageId: number; className?: string }> = ({
  stageId,
  className = "w-16 h-16",
}) => {
  switch (stageId) {
    case 1:
      return <SeedDoodle className={className} />;
    case 2:
      return <SproutDoodle className={className} />;
    case 3:
      return <LeafyDoodle className={className} />;
    case 4:
    default:
      return <FlowerDoodle className={className} />;
  }
};
