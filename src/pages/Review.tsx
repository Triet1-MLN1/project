import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import ReactMarkdown from 'react-markdown';

/* ─── Types ─────────────────────────────────────────────────────── */
interface Question {
  _id: string;
  questionId: number;
  question: string;
  options: string[];
  answer: string; // "A", "B", "C", "D"
}

type Screen = 'setup' | 'reviewing' | 'results';

/* ─── Helper ─────────────────────────────────────────────────────── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function Review() {
  const navigate = useNavigate();
  const rawQuestions = useQuery(api.questions.list);
  const seedMutation = useMutation(api.questions.seed);
  const explainAction = useAction(api.questions.explain);

  // Screen state
  const [screen, setScreen] = useState<Screen>('setup');

  // Setup settings
  const [questionCount, setQuestionCount] = useState(20);
  const [doShuffle, setDoShuffle] = useState(true);
  const [autoExplain, setAutoExplain] = useState(false);

  // Review state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});       // _id -> selected option letter
  const [explanations, setExplanations] = useState<Record<string, string>>({}); // _id -> explanation text
  const [loadingExplain, setLoadingExplain] = useState<string | null>(null); // _id loading

  // Seed on mount if no data
  const seeded = useRef(false);
  useEffect(() => {
    if (rawQuestions !== undefined && !seeded.current) {
      seeded.current = true;
      if (rawQuestions.length === 0) {
        seedMutation({}).catch(console.error);
      }
    }
  }, [rawQuestions, seedMutation]);

  // Auto-explain when answer is selected
  const handleAutoExplain = async (q: Question, selected: string) => {
    if (!autoExplain) return;
    const id = q._id;
    if (explanations[id]) return;
    setLoadingExplain(id);
    try {
      const text = await explainAction({
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        selectedAnswer: selected,
      });
      setExplanations(prev => ({ ...prev, [id]: text }));
    } catch {
      setExplanations(prev => ({ ...prev, [id]: '❌ Không tạo được giải thích.' }));
    } finally {
      setLoadingExplain(null);
    }
  };

  const handleSelectAnswer = (q: Question, letter: string) => {
    if (answers[q._id]) return; // already answered
    setAnswers(prev => ({ ...prev, [q._id]: letter }));
    handleAutoExplain(q, letter);
  };

  const handleRequestExplain = async (q: Question) => {
    const id = q._id;
    if (loadingExplain === id || explanations[id]) return;
    setLoadingExplain(id);
    try {
      const text = await explainAction({
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        selectedAnswer: answers[id] ?? '',
      });
      setExplanations(prev => ({ ...prev, [id]: text }));
    } catch {
      setExplanations(prev => ({ ...prev, [id]: '❌ Không tạo được giải thích.' }));
    } finally {
      setLoadingExplain(null);
    }
  };

  const startReview = () => {
    if (!rawQuestions || rawQuestions.length === 0) return;
    let pool = [...rawQuestions] as Question[];
    if (doShuffle) pool = shuffle(pool);
    pool = pool.slice(0, questionCount);
    setQuestions(pool);
    setCurrentIndex(0);
    setAnswers({});
    setExplanations({});
    setLoadingExplain(null);
    setScreen('reviewing');
  };

  const finishReview = () => {
    setScreen('results');
  };

  /* ─── Setup Screen ─── */
  if (screen === 'setup') {
    const total = rawQuestions?.length ?? 131;
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-surface, #f8f9fa)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
        zIndex: 9999,
      }}>
        <div style={{
          background: 'var(--color-surface-container-lowest, #fff)',
          border: '1px solid var(--color-outline-variant, #e0e0e0)',
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '480px',
          width: '90vw',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <button
              onClick={() => navigate('/quiz')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-on-surface-variant, #666)',
                fontSize: '14px',
                padding: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              ← Quay lại
            </button>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              margin: '0 0 8px 0',
              color: 'var(--color-on-surface, #111)',
            }}>
              Cài đặt Ôn tập
            </h1>
            <p style={{ color: 'var(--color-on-surface-variant, #666)', margin: 0, fontSize: '14px' }}>
              {rawQuestions === undefined
                ? 'Đang tải câu hỏi...'
                : `Tổng cộng ${total} câu hỏi trong ngân hàng đề`}
            </p>
          </div>

          {/* Setting: question count */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
              fontWeight: 600,
              fontSize: '15px',
              color: 'var(--color-on-surface, #111)',
            }}>
              <span>Số câu hỏi</span>
              <span style={{
                background: 'var(--color-primary, #2d5a27)',
                color: 'var(--color-on-primary, #fff)',
                borderRadius: '8px',
                padding: '2px 12px',
                fontSize: '16px',
                fontWeight: 700,
              }}>{questionCount}</span>
            </label>
            <input
              type="range"
              min={5}
              max={total || 131}
              value={questionCount}
              onChange={e => setQuestionCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary, #2d5a27)' }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: 'var(--color-on-surface-variant, #666)',
              marginTop: '4px',
            }}>
              <span>5</span>
              <span>{total || 131}</span>
            </div>
          </div>

          {/* Setting: shuffle */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            cursor: 'pointer',
            padding: '14px 16px',
            borderRadius: '12px',
            background: doShuffle ? 'var(--color-primary-container, #d4edda)' : 'var(--color-surface-variant, #f0f0f0)',
            transition: 'background 0.2s',
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-on-surface, #111)' }}>
                Xáo trộn câu hỏi
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant, #666)', marginTop: '2px' }}>
                Thứ tự ngẫu nhiên mỗi lần ôn
              </div>
            </div>
            <input
              type="checkbox"
              checked={doShuffle}
              onChange={e => setDoShuffle(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary, #2d5a27)' }}
            />
          </label>

          {/* Setting: auto-explain */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            cursor: 'pointer',
            padding: '14px 16px',
            borderRadius: '12px',
            background: autoExplain ? 'var(--color-primary-container, #d4edda)' : 'var(--color-surface-variant, #f0f0f0)',
            transition: 'background 0.2s',
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-on-surface, #111)' }}>
                Tự động giải thích AI
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant, #666)', marginTop: '2px' }}>
                AI giải thích ngay sau khi chọn đáp án
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoExplain}
              onChange={e => setAutoExplain(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary, #2d5a27)' }}
            />
          </label>

          {/* Start button */}
          <button
            onClick={startReview}
            disabled={!rawQuestions || rawQuestions.length === 0}
            style={{
              width: '100%',
              padding: '16px',
              background: 'var(--color-primary, #2d5a27)',
              color: 'var(--color-on-primary, #fff)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: rawQuestions && rawQuestions.length > 0 ? 'pointer' : 'not-allowed',
              opacity: rawQuestions && rawQuestions.length > 0 ? 1 : 0.5,
              letterSpacing: '0.5px',
            }}
          >
            {rawQuestions === undefined ? 'Đang tải...' : 'Bắt đầu ôn tập →'}
          </button>
        </div>
      </div>
    );
  }

  /* ─── Results Screen ─── */
  if (screen === 'results') {
    const answered = Object.keys(answers).length;
    const correct = questions.filter(q => answers[q._id] === q.answer).length;
    const wrong = questions.filter(q => answers[q._id] && answers[q._id] !== q.answer).length;
    const skipped = questions.length - answered;
    const pct = answered > 0 ? Math.round((correct / questions.length) * 100) : 0;
    const isPassed = pct >= 50;

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-surface, #f8f9fa)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: 'inherit',
        overflowY: 'auto',
        padding: '24px',
      }}>
        <div style={{
          background: 'var(--color-surface-container-lowest, #fff)',
          border: '1px solid var(--color-outline-variant, #e0e0e0)',
          borderRadius: '24px',
          padding: '48px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>
            {isPassed ? '🎉' : '📚'}
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--color-on-surface, #111)' }}>
            {isPassed ? 'Hoàn thành xuất sắc!' : 'Cần ôn tập thêm!'}
          </h2>
          <p style={{ color: 'var(--color-on-surface-variant, #666)', marginBottom: '32px', fontSize: '15px' }}>
            Bạn đã hoàn thành buổi ôn tập với {questions.length} câu hỏi.
          </p>

          {/* Score circle */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: isPassed ? '#e8f5e9' : '#fce4ec',
            border: `4px solid ${isPassed ? '#2d5a27' : '#c62828'}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
          }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: isPassed ? '#2d5a27' : '#c62828' }}>
              {pct}%
            </span>
            <span style={{ fontSize: '12px', color: '#666' }}>{correct}/{questions.length}</span>
          </div>

          {/* Stats table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', textAlign: 'left' }}>
            <tbody>
              {[
                ['Tổng câu hỏi', questions.length, '#2196f3'],
                ['Trả lời đúng', correct, '#2d5a27'],
                ['Trả lời sai', wrong, '#c62828'],
                ['Bỏ qua', skipped, '#888'],
              ].map(([label, value, color]) => (
                <tr key={String(label)} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 8px', color: '#555', fontSize: '14px' }}>{String(label)}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 700, color: String(color), fontSize: '15px' }}>
                    {String(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setScreen('setup')}
              style={{
                padding: '12px 24px',
                background: 'var(--color-primary, #2d5a27)',
                color: 'var(--color-on-primary, #fff)',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Ôn tập lại
            </button>
            <button
              onClick={() => navigate('/quiz')}
              style={{
                padding: '12px 24px',
                background: 'var(--color-surface-container-highest, #f0f0f0)',
                color: 'var(--color-on-surface, #111)',
                border: '1px solid var(--color-outline-variant, #ddd)',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Về trang Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Review Screen ─── */
  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const selectedAnswer = answers[currentQ._id];
  const isAnswered = !!selectedAnswer;
  const isCorrect = selectedAnswer === currentQ.answer;
  const answeredCount = Object.keys(answers).length;
  const explanation = explanations[currentQ._id];
  const isExplaining = loadingExplain === currentQ._id;

  const optionLetters = ['A', 'B', 'C', 'D'] as const;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--color-surface, #f8f9fa)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
      fontFamily: 'inherit',
    }}>
      {/* ─── Header bar ─── */}
      <div style={{
        background: 'var(--color-primary, #2d5a27)',
        color: 'var(--color-on-primary, #fff)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        gap: '12px',
      }}>
        {/* Left: Exit */}
        <button
          onClick={() => navigate('/quiz')}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: '8px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          ← Thoát
        </button>

        {/* Center: Progress */}
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            marginBottom: '4px',
            opacity: 0.9,
          }}>
            <span>Câu {currentIndex + 1} / {questions.length}</span>
            <span>{answeredCount} đã trả lời</span>
          </div>
          <div style={{
            height: '6px',
            background: 'rgba(255,255,255,0.25)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
              background: '#fff',
              borderRadius: '3px',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {/* Right: Finish */}
        <button
          onClick={finishReview}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: '8px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          Kết thúc
        </button>
      </div>

      {/* ─── Main content ─── */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '24px 20px',
      }}>
        <div style={{ width: '100%', maxWidth: '720px' }}>

          {/* Question card */}
          <div style={{
            background: 'var(--color-surface-container-lowest, #fff)',
            border: '1px solid var(--color-outline-variant, #e0e0e0)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            {/* Question label */}
            <div style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-primary, #2d5a27)',
              marginBottom: '10px',
            }}>
              Câu {currentIndex + 1}
            </div>
            {/* Question text */}
            <p style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--color-on-surface, #111)',
              margin: '0 0 24px 0',
              fontWeight: 500,
            }}>
              {currentQ.question}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentQ.options.map((opt, i) => {
                const letter = optionLetters[i];
                const isSelected = selectedAnswer === letter;
                const isCorrectOpt = currentQ.answer === letter;

                let bg = 'var(--color-surface-variant, #f5f5f5)';
                let border = '2px solid transparent';
                let color = 'var(--color-on-surface, #111)';
                let cursor = 'pointer';

                if (isAnswered) {
                  cursor = 'default';
                  if (isCorrectOpt) {
                    bg = '#e8f5e9';
                    border = '2px solid #2d5a27';
                    color = '#1b5e20';
                  } else if (isSelected && !isCorrect) {
                    bg = '#fce4ec';
                    border = '2px solid #c62828';
                    color = '#b71c1c';
                  } else {
                    bg = 'var(--color-surface-variant, #f5f5f5)';
                    border = '2px solid transparent';
                    color = 'var(--color-on-surface-variant, #666)';
                  }
                } else {
                  // hover handled inline
                }

                return (
                  <button
                    key={letter}
                    onClick={() => handleSelectAnswer(currentQ, letter)}
                    disabled={isAnswered}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '14px 16px',
                      background: bg,
                      border,
                      borderRadius: '10px',
                      cursor,
                      textAlign: 'left',
                      width: '100%',
                      transition: 'background 0.15s, border 0.15s',
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isAnswered
                        ? (isCorrectOpt ? '#2d5a27' : (isSelected ? '#c62828' : '#bbb'))
                        : 'var(--color-primary, #2d5a27)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px',
                      flexShrink: 0,
                    }}>
                      {letter}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color,
                      fontWeight: isAnswered && isCorrectOpt ? 600 : 400,
                      paddingTop: '4px',
                    }}>
                      {opt}
                    </span>
                    {isAnswered && isCorrectOpt && (
                      <span style={{ marginLeft: 'auto', fontSize: '18px', flexShrink: 0, paddingTop: '2px' }}>✓</span>
                    )}
                    {isAnswered && isSelected && !isCorrect && letter === selectedAnswer && (
                      <span style={{ marginLeft: 'auto', fontSize: '18px', flexShrink: 0, paddingTop: '2px' }}>✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback banner */}
            {isAnswered && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: isCorrect ? '#e8f5e9' : '#fce4ec',
                border: `1px solid ${isCorrect ? '#a5d6a7' : '#ef9a9a'}`,
                color: isCorrect ? '#1b5e20' : '#b71c1c',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ fontSize: '18px' }}>{isCorrect ? '✅' : '❌'}</span>
                <span>
                  {isCorrect
                    ? 'Chính xác! Bạn đã chọn đúng đáp án.'
                    : `Chưa đúng. Đáp án đúng là ${currentQ.answer}.`}
                </span>
              </div>
            )}
          </div>

          {/* AI Explain section */}
          {isAnswered && (
            <div style={{
              background: 'var(--color-surface-container-lowest, #fff)',
              border: '1px solid var(--color-outline-variant, #e0e0e0)',
              borderRadius: '16px',
              padding: '20px 24px',
              marginBottom: '16px',
            }}>
              {!explanation && !isExplaining && (
                <button
                  onClick={() => handleRequestExplain(currentQ)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: 'var(--color-primary-container, #d4edda)',
                    border: '1px solid var(--color-primary, #2d5a27)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: 'var(--color-primary, #2d5a27)',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  <span>✨</span>
                  Giải thích bằng AI
                </button>
              )}
              {isExplaining && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'var(--color-on-surface-variant, #666)',
                  fontSize: '14px',
                }}>
                  <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                  AI đang phân tích câu trả lời...
                </div>
              )}
              {explanation && (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                    color: 'var(--color-primary, #2d5a27)',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}>
                    <span>✨</span> Giải thích từ AI
                  </div>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'var(--color-on-surface, #111)',
                    background: 'var(--color-surface-variant, #f8f9fa)',
                    borderRadius: '10px',
                    padding: '16px',
                    borderLeft: '3px solid var(--color-primary, #2d5a27)',
                  }}>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p style={{ margin: '0 0 8px 0' }}>{children}</p>,
                        strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
                        ul: ({ children }) => <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ margin: '8px 0', paddingLeft: '20px' }}>{children}</ol>,
                        li: ({ children }) => <li style={{ marginBottom: '4px' }}>{children}</li>,
                      }}
                    >
                      {explanation}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}>
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              style={{
                padding: '12px 24px',
                background: currentIndex === 0 ? '#e0e0e0' : 'var(--color-surface-container-highest, #e8e8e8)',
                border: '1px solid var(--color-outline-variant, #ddd)',
                borderRadius: '10px',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                color: currentIndex === 0 ? '#aaa' : 'var(--color-on-surface, #111)',
              }}
            >
              ← Câu trước
            </button>

            {/* Question dots (show up to 10) */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {questions.slice(0, 10).map((q, i) => {
                const hasAnswer = !!answers[q._id];
                const correct = answers[q._id] === q.answer;
                return (
                  <button
                    key={q._id}
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: i === currentIndex ? '2px solid #2d5a27' : '2px solid transparent',
                      background: hasAnswer
                        ? (correct ? '#c8e6c9' : '#ffcdd2')
                        : (i === currentIndex ? 'var(--color-primary, #2d5a27)' : 'var(--color-surface-variant, #e0e0e0)'),
                      color: i === currentIndex && !hasAnswer ? '#fff' : '#333',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </button>
                );
              })}
              {questions.length > 10 && (
                <span style={{ fontSize: '12px', color: '#888', paddingTop: '6px' }}>+{questions.length - 10}</span>
              )}
            </div>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
                style={{
                  padding: '12px 24px',
                  background: 'var(--color-primary, #2d5a27)',
                  color: 'var(--color-on-primary, #fff)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                Câu tiếp →
              </button>
            ) : (
              <button
                onClick={finishReview}
                style={{
                  padding: '12px 24px',
                  background: '#c62828',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                Kết thúc ✓
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
