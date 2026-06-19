import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useAction } from 'convex/react';
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

    for (let idx = 0; idx < answer.length; idx++) {
      const ansVal = answer[idx];
      if (!/^[A-Z]$/.test(ansVal)) {
        // Try to match against options
        let matchedLetter = '';
        for (let oIdx = 0; oIdx < options.length; oIdx++) {
          const opt = options[oIdx];
          const cleanOpt = opt.replace(/^[A-F]\.\s*/, '').trim().toUpperCase();
          const cleanAns = ansVal.replace(/^[A-F]\.\s*/, '').trim().toUpperCase();
          
          if (cleanOpt === cleanAns || opt.trim().toUpperCase() === ansVal) {
            const matchLetterPrefix = opt.trim().match(/^([A-F])\./);
            if (matchLetterPrefix) {
              matchedLetter = matchLetterPrefix[1].toUpperCase();
            } else {
              matchedLetter = String.fromCharCode(65 + oIdx);
            }
            break;
          }
        }
        if (matchedLetter && /^[A-Z]$/.test(matchedLetter)) {
          answer[idx] = matchedLetter;
        } else {
          throw new Error(
            `Câu ${i + 1}: giá trị "${ansVal}" trong "answer" không hợp lệ — phải là một chữ cái (A–Z)`,
          );
        }
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
    text: '"Tồn tại xã hội quyết định ý thức xã hội, nhưng ý thức xã hội có tính độc lập tương đối và tác động trở lại tồn tại xã hội."',
    author: '— Nguyên lý cơ bản của Chủ nghĩa duy vật lịch sử',
  },
  {
    text: '"Không phải ý thức của con người quyết định tồn tại của họ; trái lại, tồn tại xã hội của họ quyết định ý thức của họ."',
    author: '— C. Mác',
  },
  {
    text: '"Sự phát triển của phương thức sản xuất là cội nguồn sâu xa của mọi sự biến đổi xã hội."',
    author: '— Ph. Ăng-ghen',
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

  /* AI Generator state */
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const generateQuestionsAI = useAction(api.quizAi.generateQuestions);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStatusText, setAiStatusText] = useState('');
  const [aiError, setAiError] = useState('');
  const aiFileInputRef = useRef<HTMLInputElement>(null);

  /* Ensure questions are seeded when modal opens (lazy) */
  const openModal = () => {
    setImportError('');
    setAiError('');
    setModalOpen(true);
    if (rawQuestions !== undefined) {
      seedMutation({}).catch(console.error);
    }
  };

  /* Option 1: system bank (60 random) */
  const handleSystemBank = () => {
    if (!rawQuestions || rawQuestions.length === 0) return;
    const selected = shuffleArr(rawQuestions)
      .slice(0, 50)
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
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  /* Option 3: AI Generate from File */
  const handleAIGenerateFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setAiError('File quá lớn. Vui lòng chọn file dưới 5MB.');
      if (aiFileInputRef.current) aiFileInputRef.current.value = '';
      return;
    }

    setAiLoading(true);
    setAiError('');
    setAiProgress(5);
    setAiStatusText('Đang đọc tài liệu... 📄');

    let progressInterval: ReturnType<typeof setInterval> | undefined;
    try {
      // 1. Read / Extract text content from PDF or TXT
      let textContent = "";
      if (file.type === "text/plain") {
        textContent = await file.text();
      } else if (file.type === "application/pdf") {
        const { PDFParse } = await import("pdf-parse");
        // Use CDN worker to avoid bundling complex workers locally
        PDFParse.setWorker('https://cdn.jsdelivr.net/npm/pdf-parse@2.4.5/dist/pdf-parse/web/pdf.worker.min.mjs');
        const arrayBuffer = await file.arrayBuffer();
        const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });
        const parsed = await parser.getText();
        textContent = parsed.text;
        await parser.destroy();
      } else {
        throw new Error("Định dạng file không hỗ trợ. Vui lòng chọn file PDF hoặc TXT.");
      }

      if (!textContent || textContent.trim().length < 50) {
        throw new Error("Không thể trích xuất văn bản từ tệp này hoặc tệp quá ngắn.");
      }

      setAiProgress(20);
      setAiStatusText('Đang gửi nội dung lên hệ thống phân tích... 📡');

      // Create simulated progress updates
      progressInterval = setInterval(() => {
        setAiProgress(prev => {
          if (prev < 45) {
            setAiStatusText('Phân tích cấu trúc văn bản... 🔍');
            return prev + Math.floor(Math.random() * 4) + 1;
          } else if (prev < 70) {
            setAiStatusText('Trích xuất kiến thức Triết học trọng tâm... 🧠');
            return prev + Math.floor(Math.random() * 3) + 1;
          } else if (prev < 90) {
            setAiStatusText('AI Mentor đang soạn thảo bộ câu hỏi trắc nghiệm... ✏️');
            return prev + Math.floor(Math.random() * 2) + 1;
          } else if (prev < 95) {
            setAiStatusText('Đang kiểm duyệt và tối ưu hóa cấu trúc đề thi... ⚙️');
            return prev + 1;
          }
          return prev;
        });
      }, 600);

      // 2. Call AI action with plain text
      const newQuestionsRaw = await generateQuestionsAI({ textContent });
      
      // 4. Normalize and Start Quiz
      clearInterval(progressInterval);
      setAiProgress(100);
      setAiStatusText('Hoàn thành! Đang bắt đầu bài thi... 🎉');
      
      // Small delay to let user see 100% completion
      await new Promise(resolve => setTimeout(resolve, 800));

      const formatted = normalizeImport(newQuestionsRaw);
      const finalQuestions = shuffleArr(formatted);
      
      setModalOpen(false);
      navigate('/quiz/exam', { state: { questions: finalQuestions, source: 'ai' } });
    } catch (err: any) {
      if (progressInterval) clearInterval(progressInterval);
      setAiProgress(0);
      console.error(err);
      setAiError(err.message || "Lỗi khi dùng AI tạo câu hỏi.");
    } finally {
      if (progressInterval) clearInterval(progressInterval);
      setAiLoading(false);
      if (aiFileInputRef.current) aiFileInputRef.current.value = '';
    }
  };

  const bankReady = rawQuestions && rawQuestions.length > 0;

  /* =========================================================================
     4. RENDER
     ========================================================================= */
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
                  {/* Đã đổi sang nội dung Triết học */}
                  Làm bài và xem đáp án ngay, có AI hỗ trợ giải thích các khái niệm Triết học và
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
                alt="Cyberpunk Marxist Background"
                src="/quote_marxist_cyberpunk.png"
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
                className="pointer-events-auto bg-surface-container-lowest border border-outline-variant/20 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-4 shrink-0 border-b border-outline-variant/10 mb-4">
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
                <div className="px-8 pb-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto">

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
                        Ngân hàng câu hỏi Triết học
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                        50 câu ngẫu nhiên từ ngân hàng đề. Phù hợp ôn thi Triết học Mác-Lênin.
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
                      <summary className="cursor-pointer font-semibold select-none flex items-center justify-between">
                        <span>Xem định dạng JSON & Prompt AI</span>
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                      </summary>
                      
                      <div className="mt-3">
                        <div className="font-semibold text-[11px] text-primary uppercase tracking-wider mb-1">Mẫu cấu trúc JSON:</div>
                        <pre className="overflow-x-auto leading-relaxed whitespace-pre-wrap break-all bg-surface/50 p-2 rounded border border-outline-variant/20">{`[
  {
    "question": "Câu hỏi trắc nghiệm?",
    "options": ["A. Phương án 1", "B. Phương án 2", "C. Phương án 3", "D. Phương án 4"],
    "answer": "A"
  },
  {
    "question": "Câu hỏi nhiều đáp án đúng?",
    "options": ["A. Phương án 1", "B. Phương án 2", "C. Phương án 3", "D. Phương án 4"],
    "answer": ["A", "C"]
  }
]`}</pre>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-[11px] text-tertiary uppercase tracking-wider">Prompt chuẩn cho AI Chat:</span>
                          <button
                            type="button"
                            onClick={() => {
                              const promptText = `Hãy đóng vai trò là một chuyên gia Triết học Mác-Lênin. Dựa vào tài liệu nội dung tôi cung cấp, hãy soạn thảo bộ câu hỏi trắc nghiệm dưới dạng định dạng JSON chuẩn sau đây. 

Đầu ra bắt buộc phải là một mảng JSON hợp lệ chứa các object câu hỏi theo đúng cấu trúc sau:
[
  {
    "question": "Nội dung câu hỏi trắc nghiệm?",
    "options": [
      "A. Phương án A",
      "B. Phương án B",
      "C. Phương án C",
      "D. Phương án D"
    ],
    "answer": "A"
  },
  {
    "question": "Nội dung câu hỏi có nhiều đáp án đúng?",
    "options": [
      "A. Phương án A",
      "B. Phương án B",
      "C. Phương án C",
      "D. Phương án D"
    ],
    "answer": ["A", "C"]
  }
]

Yêu cầu cụ thể:
1. Trường "options" là một mảng chứa từ 2 đến 26 phương án lựa chọn, mỗi phương án bắt đầu bằng chữ cái tương ứng (ví dụ: "A. ...", "B. ...").
2. Trường "answer" chứa chữ cái viết hoa đại diện cho phương án đúng. Nếu câu hỏi có 1 đáp án đúng thì để dạng chuỗi (ví dụ: "A"). Nếu có từ 2 đáp án đúng trở lên, để dưới dạng mảng các chuỗi (ví dụ: ["A", "C"]).
3. Kết quả phản hồi của bạn CHỈ chứa duy nhất khối code JSON hợp lệ, không thêm bất kỳ văn bản giải thích, lời chào hay lời dặn dò nào khác.`;
                              navigator.clipboard.writeText(promptText);
                              alert("Đã sao chép Prompt chuẩn cho AI chat!");
                            }}
                            className="text-[10px] text-tertiary font-bold hover:underline flex items-center gap-0.5"
                          >
                            <span className="material-symbols-outlined text-[12px]">content_copy</span>
                            Sao chép Prompt
                          </button>
                        </div>
                        <p className="text-[10px] text-on-surface-variant leading-relaxed">
                          Sao chép prompt này, dán vào ChatGPT/Gemini/Claude cùng tài liệu học của bạn để lấy file JSON chuẩn nạp vào hệ thống.
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-outline-variant/10 text-[11px] space-y-0.5">
                        <span className="block">• Số lượng options tùy ý (2–26), hỗ trợ True/False.</span>
                        <span className="block">• Trường <code>id</code> và <code>correct_answer</code> được chấp nhận nhưng bỏ qua.</span>
                        <span className="block">• Dùng <code>A</code>,<code>B</code>,<code>C</code>,<code>D</code>… riêng lẻ thay cho <code>options</code> cũng được.</span>
                      </div>
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

                  {/* ─── Option 3: AI Generate ─── */}
                  <div className="relative flex flex-col gap-4 rounded-2xl border-2 border-tertiary/30 bg-tertiary/5 p-6">
                    <div className="absolute -top-3 left-5">
                      <span className="bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                        Mới
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-tertiary flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                      <span
                        className="material-symbols-outlined text-xl text-on-tertiary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        smart_toy
                      </span>
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-lg text-on-surface">
                        AI Sinh Đề Tự Động
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                        Tải lên tệp <span className="font-semibold text-on-surface">PDF</span> hoặc <span className="font-semibold text-on-surface">TXT</span>. Hệ lõi AI Mentor sẽ đọc và tự động sinh 50 câu hỏi trắc nghiệm ngay lập tức.
                      </p>
                    </div>

                    {/* Error message */}
                    {aiError && (
                      <div className="text-xs text-error bg-error-container/40 border border-error/20 rounded-lg px-3 py-2 leading-relaxed">
                        ⚠ {aiError}
                      </div>
                    )}

                    {/* Hidden file input */}
                    <input
                      ref={aiFileInputRef}
                      type="file"
                      accept="application/pdf,text/plain"
                      className="hidden"
                      onChange={handleAIGenerateFileChange}
                    />

                    <button
                      onClick={() => aiFileInputRef.current?.click()}
                      disabled={aiLoading}
                      className="mt-auto w-full py-3 rounded-xl bg-tertiary text-on-tertiary font-bold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tertiary/90 transition-colors flex justify-center items-center gap-2"
                    >
                      {aiLoading ? (
                        <>
                          <span className="material-symbols-outlined text-base animate-spin">
                            progress_activity
                          </span>
                          AI đang phân tích…
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-base">
                            upload_file
                          </span>
                          Tải lên PDF/TXT
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

      {/* AI Mascot & Progress Loading Overlay */}
      <AnimatePresence>
        {aiLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface/95 backdrop-blur-md z-[300] flex flex-col items-center justify-center p-6 pointer-events-auto"
          >
            {/* Mascot Robot */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              {/* Antenna */}
              <motion.div 
                className="absolute top-2 w-1.5 h-8 bg-tertiary rounded-full origin-bottom"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                {/* Antenna tip glowing light */}
                <motion.div 
                  className="absolute -top-2 -left-1 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              </motion.div>

              {/* Ears / Headphone */}
              <div className="absolute top-10 w-36 h-8 bg-tertiary/20 rounded-full border border-tertiary/20 flex justify-between px-1">
                <div className="w-4 h-6 bg-tertiary rounded-lg shadow-inner" />
                <div className="w-4 h-6 bg-tertiary rounded-lg shadow-inner" />
              </div>

              {/* Robot Head Body */}
              <motion.div
                className="w-28 h-24 bg-surface-container-high border-2 border-tertiary rounded-[24px] shadow-[0_0_25px_rgba(0,240,255,0.15)] flex items-center justify-center p-3 relative z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                {/* Robot Face Screen */}
                <div className="w-full h-full bg-black/90 rounded-[16px] border border-outline-variant/30 flex flex-col items-center justify-center gap-1.5 overflow-hidden p-2 relative">
                  {/* Neon Grid Effect inside face screen */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)',
                      backgroundSize: '8px 8px'
                    }}
                  />
                  
                  {/* Glowing Eyes */}
                  <div className="flex gap-6 relative z-10">
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] flex items-center justify-center"
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 0.2 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                    </motion.div>
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] flex items-center justify-center"
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 0.2 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                    </motion.div>
                  </div>

                  {/* Robot Mouth / LED Wave */}
                  <motion.div 
                    className="w-12 h-1 bg-cyan-400 shadow-[0_0_8px_#22d3ee] rounded-full"
                    animate={{ scaleX: [0.6, 1.2, 0.8, 1.1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Progress Information Card */}
            <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 shadow-xl text-center space-y-6">
              <div className="space-y-2">
                <h3 className="font-headline font-bold text-2xl text-on-surface">
                  AI Mentor Đang Soạn Đề
                </h3>
                <p className="text-sm text-on-surface-variant font-medium min-h-[20px] transition-all">
                  {aiStatusText}
                </p>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-outline uppercase tracking-wider px-1">
                  <span>Tiến trình</span>
                  <span className="text-tertiary font-mono font-black text-sm">{aiProgress}%</span>
                </div>
                <div className="w-full h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/20 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-tertiary shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all duration-300"
                    style={{ width: `${aiProgress}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] text-outline font-medium max-w-xs mx-auto leading-relaxed">
                Vui lòng không đóng trình duyệt hoặc tải lại trang trong quá trình AI phân tích tài liệu.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
