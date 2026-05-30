import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import lenninLogo from "../public/lennin2.0.png";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Chào đồng chí! Tôi là Lenin 2.0 🚩. Tôi đã sẵn sàng hỗ trợ đồng chí về chủ đề **Công nghiệp hóa, hiện đại hóa và Hội nhập kinh tế quốc tế**. Đồng chí cần tra cứu lý luận hay ví dụ thực tiễn nào không?",
      isBot: true,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Kết nối tới Convex action
  const askLenin = useAction(api.chat.answer);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Focus input khi mở chat
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userText = message.trim();
    const userMsg: Message = { id: Date.now(), text: userText, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      // Gọi Convex action – RAG pipeline với Gemini
      const reply = await askLenin({ message: userText });
      const replyText = typeof reply === "string" ? reply : JSON.stringify(reply);

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: replyText || "(Không có phản hồi)", isBot: true },
      ]);
    } catch (err) {
      // Hiển thị lỗi dễ hiểu + log ra console để debug nhanh
      console.error("Convex chat action failed:", err);
      const details = err instanceof Error ? err.message : String(err);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text:
            "❌ Không gọi được Convex action.\n" +
            "• Kiểm tra VITE_CONVEX_URL đang trỏ đúng deployment\n" +
            "• Kiểm tra GEMINI_API_KEY đã được set trong Convex env\n" +
            (details ? `\nChi tiết: ${details}` : ""),
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Chỉ hiển thị ở các trang home (/), quiz (/quiz) và theory (/theory)
  const allowedPaths = ["/", "/quiz", "/theory"];
  if (!allowedPaths.includes(location.pathname)) return null;

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-50 overflow-hidden border-2 border-primary bg-surface p-0 ${isOpen ? "hidden" : "flex"
          }`}
        style={{ borderRadius: "9999px" }}
        aria-label="Mở chat Lenin 2.0"
      >
        <img
          src={lenninLogo}
          alt="Lenin Assistant"
          className="w-full h-full object-cover rounded-full"
          style={{ imageRendering: "auto" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />
        <MessageSquare className="w-6 h-6 text-primary hidden" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[520px] max-h-[85vh] bg-surface border border-outline-variant rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-on-primary shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface/20 flex items-center justify-center overflow-hidden border-2 border-surface shrink-0">
                  <img
                    src={lenninLogo}
                    alt="Lenin 2.0"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <Bot className="w-6 h-6 hidden" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight tracking-tight">Lenin 2.0</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1.5 font-medium mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                    Trợ lý AI · CNH & Hội Nhập
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-surface/20 rounded-full transition-colors"
                aria-label="Đóng chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-variant/20 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  {msg.isBot && (
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-outline-variant mr-2 shrink-0 self-end">
                      <img src={lenninLogo} alt="bot" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`max-w-[78%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${msg.isBot
                      ? "bg-surface border border-outline-variant text-on-surface rounded-tl-sm shadow-sm"
                      : "bg-primary text-on-primary rounded-tr-sm shadow-md"
                      }`}
                  >
                    {msg.isBot ? (
                      <div className="markdown-body">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-[15px] font-bold mb-2 mt-1 text-primary border-b border-outline-variant pb-1">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-[14px] font-semibold mb-1.5 mt-2 text-on-surface">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-[13px] font-semibold mb-1 mt-1.5 text-on-surface-variant">{children}</h3>
                            ),
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-2 space-y-1 pl-1">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-2 space-y-1 pl-4 list-decimal">{children}</ol>
                            ),
                            li: ({ children }) => (
                              <li className="flex gap-1.5 items-start">
                                <span className="mt-1 shrink-0 text-primary text-[10px]">●</span>
                                <span>{children}</span>
                              </li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-on-surface">{children}</strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic text-on-surface-variant">{children}</em>
                            ),
                            code: ({ children }) => (
                              <code className="bg-surface-variant/60 rounded px-1 py-0.5 text-[12px] font-mono">{children}</code>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-primary pl-3 my-2 text-on-surface-variant italic">{children}</blockquote>
                            ),
                            hr: () => (
                              <hr className="border-outline-variant my-2" />
                            ),
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </motion.div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start items-end gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-outline-variant shrink-0">
                    <img src={lenninLogo} alt="bot" className="w-full h-full object-cover" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface border border-outline-variant px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5"
                  >
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    <span className="text-sm text-on-surface-variant">Đang suy nghĩ...</span>
                  </motion.div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-outline-variant bg-surface shrink-0"
            >
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hỏi đồng chí Lenin 2.0..."
                  disabled={isLoading}
                  className="flex-1 bg-surface-variant/50 border border-outline-variant rounded-full pl-4 pr-3 py-2.5 text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-outline transition-all disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-on-primary hover:bg-primary/90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all shrink-0"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
