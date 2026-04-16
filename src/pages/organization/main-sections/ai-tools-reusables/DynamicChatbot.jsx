import React, { useState, useRef, useEffect } from "react";
import { IoSend, IoArrowBack, IoSparklesOutline, IoPersonOutline } from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

export default function DynamicChatbot({ botName, onBack }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hello! I am ${botName || 'your AI assistant'}. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: `I've received your message regarding "${input}". As a SentinelAI protected interface, I'm analyzing your request...` }
      ]);
    }, 1000);
  };

  return (
    <div className="mt16 flex flex-col h-[calc(100vh-120px)] bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
      
      {/* ── Chat Header ── */}
      <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 cursor-pointer">
            <IoArrowBack className="size-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#89A1EF]/10 to-[#89A1EF]/5 rounded-xl border-[#89A1EF]/20 text-[#89A1EF]">
              <SiGooglegemini className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">{botName}</h2>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Session
              </p>
            </div>
          </div>
        </div>
        <div className="px-3 py-1 bg-[#89A1EF]/10 rounded-full border border-[#89A1EF]/20 text-[#89A1EF] text-[10px] font-bold">
          SENTINEL PROTECTED
        </div>
      </div>

      {/* ── Messages Area ── */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 border 
                ${msg.role === "user" ? "bg-white text-gray-400" : "bg-gradient-to-br from-[#89A1EF]/10 to-[#89A1EF]/5 rounded-xl border-[#89A1EF]/20 text-[#89A1EF]"}`}>
                {msg.role === "user" ? <IoPersonOutline /> : <SiGooglegemini />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === "user" ? "bg-[#89A1EF] text-white rounded-tr-none" : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* ── Input Area ── */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={`Message ${botName}...`}
            className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 p-2.5 bg-[#89A1EF] text-white rounded-xl hover:bg-[#768bd9] transition-all shadow-lg shadow-[#89A1EF]/20 active:scale-95"
          >
            <IoSend className="size-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
          <IoSparklesOutline /> Gemini may provide inaccurate info. SentinelAI filters PII.
        </p>
      </div>
    </div>
  );
}