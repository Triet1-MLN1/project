import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

/* ─── Types ─────────────────────────────────────────────────────── */
interface ExamQuestion {
  _id: string;
  questionId: number;
  question: string;
  options: string[];
  /** Always an array — single-answer = ["A"], multi-answer = ["C","D"] */
  answer: string[];
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Normalises imported JSON into ExamQuestion[].
 *
 * Accepted formats:
 *   • { question, options: string[], answer: "A" | ["A","C"] }
 *   • { question, A, B, C, D[, E, F…], answer: "A" | ["A","C"] }
 *   • Extra fields like "id", "correct_answer" are silently ignored.
 *   • "text" is accepted as alias for "question".
 *   • "correct" is accepted as alias for "answer".
 */
function normalizeImport(data: unknown): ExamQuestion[] {
  if (!Array.isArray(data)) throw new Error('File JSON phải là một mảng (array) câu hỏi');
  if (data.length === 0) throw new Error('Mảng câu hỏi trống');

  return data.map((item: any, i: number) => {
    const question = String(item.question ?? item.text ?? '').trim();
    if (!question) throw new Error(`Câu ${i + 1}: thiếu trường "question"`);

    // ── Options ──────────────────────────────────────────────────────
    let options: string[];
    if (Array.isArray(item.options) && item.options.length >= 2) {
      options = item.options.map(String);
    } else {
      // Build from individual letter fields: A, B, C, D, E, F…
      const built: string[] = [];
      for (let c = 0; c < 26; c++) {
        const key = String.fromCharCode(65 + c);
        if (item[key] != null) built.push(`${key}. ${item[key]}`);
        else if (c >= 2) break;
      }
      if (built.length >= 2) {
        options = built;
      } else {
        throw new Error(
          `Câu ${i + 1}: cần "options" (mảng ≥ 2 phần tử) hoặc các trường "A","B"[,"C","D",…]`,
        );
      }
    }

    // ── Answer — string OR array of strings ──────────────────────────
    const rawAnswer = item.answer ?? item.correct;
    let answer: string[];
    if (Array.isArray(rawAnswer)) {
      answer = rawAnswer.map((a: unknown) => String(a).trim().toUpperCase());
    } else {
      answer = [String(rawAnswer ?? '').trim().toUpperCase()];
    }
    for (const a of answer) {
      if (!/^[A-Z]$/.test(a)) {
        throw new Error(
          `Câu ${i + 1}: giá trị "${a}" trong "answer" không hợp lệ — phải là một chữ cái (A–Z)`,
        );
      }
    }
    if (answer.length === 0) throw new Error(`Câu ${i + 1}: thiếu trường "answer"`);

    const id = typeof item.id === 'number' ? item.id : i + 1;
    return { _id: `import-${id}`, questionId: id, question, options, answer };
  });
}

/* ─── Animation variants ─────────────────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
};

/* ─── Daily quotes pool ──────────────────────────────────────────── */
const quotes = [
  {
    text: '"Công nghiệp hóa là chìa khóa để mở cánh cửa của sự thịnh vượng và độc lập tự chủ."',
    author: '— Tầm nhìn phát triển kinh tế',
  },
  {
    text: '"Khoa học công nghệ là lực lượng sản xuất trực tiếp và là động lực chính của hiện đại hóa."',
    author: '— Lý luận phát triển hiện đại',
  },
  {
    text: '"Trong thời đại 4.0, không đổi mới sáng tạo nghĩa là đang tự tụt hậu phía sau."',
    author: '— Châm ngôn chuyển đổi số',
  },
];

const todayQuote = quotes[new Date().getDay() % quotes.length];

/* ─── Component ──────────────────────────────────────────────────── */
export default function Quiz() {
  const navigate = useNavigate();
  const rawQuestions = useQuery(api.questions.list);
  const seedMutation = useMutation(api.questions.seed);

  /* modal state */
  const [modalOpen, setModalOpen] = useState(false);
  const [importError, setImportError] = useState('');
  const [importing, setImporting] = useState(false);
  const [shuffleImport, setShuffleImport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Ensure questions are seeded when modal opens (lazy) */
  const openModal = () => {
    setImportError('');
    setModalOpen(true);
    if (rawQuestions !== undefined && rawQuestions.length === 0) {
      seedMutation({}).catch(console.error);
    }
  };

  /* Option 1: system bank (60 random) */
  const handleSystemBank = () => {
    if (!rawQuestions || rawQuestions.length === 0) return;
    const selected = shuffleArr(rawQuestions)
      .slice(0, 60)
      .map(q => ({
        _id: q._id,
        questionId: q.questionId,
        question: q.question,
        options: q.options,
        answer: [q.answer], // Convex stores single string; wrap in array
      }));
    setModalOpen(false);
    // Pass questions via router state — RAM only, cleared on navigation away
    navigate('/quiz/exam', { state: { questions: selected, source: 'system' } });
  };

  /* Option 2: import JSON (read on client, never leaves browser) */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError('');
    setImporting(true);
    try {
      const text = await file.text();
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        throw new Error('File không hợp lệ — không thể parse JSON');
      }
      const questions = normalizeImport(parsed);
      const finalQuestions = shuffleImport ? shuffleArr(questions) : questions;
      setModalOpen(false);
      navigate('/quiz/exam', { state: { questions: finalQuestions, source: 'import', fileName: file.name } });
    } catch (err) {
      setImportError(err instanceof Error ? err.message : String(err));
    } finally {
      setImporting(false);
      // Reset input so the same file can be re-selected if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const bankReady = rawQuestions && rawQuestions.length > 0;

  /* ─────────────────────────────────────── */
  return (
    <main className="pt-20 min-h-screen bg-surface">
      {/* ═══ HEADER SECTION ═══ */}
      <section className="py-16 md:py-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <motion.div
          className="container mx-auto px-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-headline font-bold tracking-tighter text-on-background leading-[1.1] mb-5"
            variants={fadeInUp}
          >
            Chọn Chế Độ Quiz
          </motion.h1>
          <motion.p
            className="text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Chào mừng bạn đến với Học Viện Giải Phóng. Hãy lựa chọn phương thức rèn luyện kiến
            thức phù hợp với mục tiêu của bạn hôm nay.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══ QUIZ MODE CARDS ═══ */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {/* ── Card 1: Thi thử ── */}
            <motion.div
              className="group relative bg-surface-container-lowest border border-outline-variant/15 rounded-3xl p-8 md:p-10 overflow-hidden cursor-pointer"
              variants={scaleIn}
              whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(0,0,0,0.08)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="absolute top-6 right-6 opacity-[0.06] pointer-events-none">
                <span
                  className="material-symbols-outlined text-[120px] text-on-surface"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  timer
                </span>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />

              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center mb-6 shadow-sm"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span
                    className="material-symbols-outlined text-2xl text-on-secondary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    timer
                  </span>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-on-surface mb-3">
                  Thi thử
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow">
                  Mô phỏng hệ thống thi thật, có giới hạn thời gian để rèn luyện áp lực phòng thi
                  và đánh giá năng lực thực tế.
                </p>

                {/* Open modal instead of navigating directly */}
                <motion.button
                  onClick={openModal}
                  className="w-full py-4 bg-primary text-on-primary font-bold tracking-wide text-base flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(45,90,39,0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/15"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Bắt đầu thi
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </span>
                </motion.button>

                <div className="flex items-center gap-2 mt-5">
                  <span
                    className="material-symbols-outlined text-sm text-secondary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/70">
                    Chứng chỉ phòng thi nghiệm
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Card 2: Ôn tập ── */}
            <motion.div
              className="group relative bg-surface-container-lowest border border-outline-variant/15 rounded-3xl p-8 md:p-10 overflow-hidden cursor-pointer"
              variants={scaleIn}
              whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(0,0,0,0.08)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="absolute top-6 right-6 opacity-[0.06] pointer-events-none">
                <span
                  className="material-symbols-outlined text-[120px] text-on-surface"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  settings
                </span>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-secondary/5 to-transparent rounded-3xl" />

              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-6 shadow-sm"
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span
                    className="material-symbols-outlined text-2xl text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    psychology
                  </span>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-on-surface mb-3">
                  Ôn tập
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-grow">
                  {/* Đã đổi từ Triết học sang Kinh tế chính trị học theo yêu cầu */}
                  Làm bài và xem đáp án ngay, có AI hỗ trợ giải thích các khái niệm Kinh tế chính trị học và
                  xã hội phức tạp một cách trực quan.
                </p>

                <Link to="/quiz/review">
                  <motion.button
                    className="w-full py-4 bg-surface-container-highest border border-outline-variant/30 text-on-surface font-bold tracking-wide text-base flex items-center justify-center gap-2 relative overflow-hidden"
                    whileHover={{ scale: 1.02, backgroundColor: 'var(--color-surface-bright)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Ôn tập ngay
                      <span
                        className="material-symbols-outlined text-lg text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        auto_awesome
                      </span>
                    </span>
                  </motion.button>
                </Link>

                <div className="flex items-center gap-2 mt-5">
                  <span
                    className="material-symbols-outlined text-sm text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    smart_toy
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/70">
                    Hỗ trợ bởi AI Mentor
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DAILY QUOTE ═══ */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <motion.img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Dense atmospheric forest with morning light filtering through tall trees"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmo_hmbm-dMpT9P7id-jVfSS8zsogVZ70dHpL2-QuofeDrzNIhXmKUBzTZyaryVdDAaD1p16ItLgwcwgWHIQyZJA_hHVwTaVP-gJ1sAB4UegnbWgx_VZXuXKIs-nw94JxoQ_UIlcMzNBqOi7YsHKW7yoSzTjxDEVVH5CpcYMwNFvyWPdmYRMZvsDxXGjZ2mNroKDeT3QlSRQ8yGKAVN0Sb1VpUHvqh9cweYfwsLpvdoy2FMOiAHYI5IUzFQGQn-r4nnsYM5ghfu_Ud"
                referrerPolicy="no-referrer"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10 max-w-2xl">
                <motion.span
                  className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold uppercase tracking-[0.2em] rounded-md mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Trích dẫn hôm nay
                </motion.span>
                <motion.p
                  className="text-xl md:text-2xl text-white font-headline font-medium leading-relaxed italic"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                >
                  {todayQuote.text}
                </motion.p>
                <motion.span
                  className="block mt-3 text-sm text-white/70 font-body"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  {todayQuote.author}
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ EXAM SOURCE MODAL ═══ */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto bg-surface-container-lowest border border-outline-variant/20 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-4">
                  <div>
                    <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
                      Chọn nguồn câu hỏi
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-1">
                      Thi thử với ngân hàng đề có sẵn hoặc import bộ đề của bạn
                    </p>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>

                {/* Options */}
                <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* ─── Option 1: System bank ─── */}
                  <div className="relative flex flex-col gap-4 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
                    {/* Recommend badge */}
                    <div className="absolute -top-3 left-5">
                      <span className="bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                        Khuyên dùng
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shadow-sm mt-2">
                      <span
                        className="material-symbols-outlined text-xl text-on-secondary-fixed"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        school
                      </span>
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-lg text-on-surface">
                        Ngân hàng MLN122
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                        60 câu ngẫu nhiên từ{' '}
                        <span className="font-semibold text-on-surface">
                          {rawQuestions?.length ?? '…'} câu
                        </span>{' '}
                        {/* Đã đổi từ Triết học sang Kinh tế chính trị học (Chương 6) theo yêu cầu */}
                        trong hệ thống. Phù hợp ôn thi Kinh tế chính trị học Mác-Lênin.
                      </p>
                    </div>

                    <button
                      onClick={handleSystemBank}
                      disabled={!bankReady}
                      className="mt-auto w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                      {rawQuestions === undefined
                        ? 'Đang tải…'
                        : rawQuestions.length === 0
                          ? 'Chưa có dữ liệu'
                          : 'Thi thử ngay →'}
                    </button>
                  </div>

                  {/* ─── Option 2: Import JSON ─── */}
                  <div className="flex flex-col gap-4 rounded-2xl border-2 border-outline-variant/30 bg-surface-container p-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shadow-sm">
                      <span
                        className="material-symbols-outlined text-xl text-on-surface"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        upload_file
                      </span>
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-lg text-on-surface">
                        Import JSON của bạn
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                        Dùng bộ câu hỏi riêng. File chỉ được đọc trên trình duyệt —{' '}
                        <span className="font-semibold text-on-surface">
                          không lưu lên server
                        </span>
                        .
                      </p>
                    </div>

                    {/* Format hint (collapsed) */}
                    <details className="text-xs text-on-surface-variant bg-surface-variant/50 rounded-lg p-3">
                      <summary className="cursor-pointer font-semibold select-none">
                        Xem định dạng JSON hợp lệ
                      </summary>
                      <pre className="mt-2 overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">{`[
  {
    "question": "Câu 1 đáp án",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": "A"
  },
  {
    "question": "Câu nhiều đáp án",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": ["A", "C"]
  }
]`}</pre>
                      <p className="mt-2 text-[11px] space-y-0.5">
                        <span className="block">• Số lượng options tùy ý (2–26), hỗ trợ True/False.</span>
                        <span className="block">• Trường <code>id</code> và <code>correct_answer</code> được chấp nhận nhưng bỏ qua.</span>
                        <span className="block">• Dùng <code>A</code>,<code>B</code>,<code>C</code>,<code>D</code>… riêng lẻ thay cho <code>options</code> cũng được.</span>
                      </p>
                    </details>

                    {/* Error message */}
                    {importError && (
                      <div className="text-xs text-error bg-error-container/40 border border-error/20 rounded-lg px-3 py-2 leading-relaxed">
                        ⚠ {importError}
                      </div>
                    )}

                    {/* Shuffle toggle */}
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <div className="relative shrink-0">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={shuffleImport}
                          onChange={e => setShuffleImport(e.target.checked)}
                        />
                        <div className="w-9 h-5 rounded-full bg-outline-variant/40 peer-checked:bg-primary transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                      </div>
                      <span className="text-sm text-on-surface-variant">Xáo trộn câu hỏi</span>
                    </label>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={importing}
                      className="mt-auto w-full py-3 rounded-xl border-2 border-outline-variant/50 bg-surface text-on-surface font-bold text-sm tracking-wide hover:bg-surface-variant transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {importing ? (
                        <>
                          <span className="material-symbols-outlined text-base animate-spin">
                            progress_activity
                          </span>
                          Đang đọc file…
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-base">
                            folder_open
                          </span>
                          Chọn file .json
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
