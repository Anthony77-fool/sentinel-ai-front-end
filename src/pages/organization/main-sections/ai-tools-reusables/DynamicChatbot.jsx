import React, { useState, useRef, useEffect } from "react";
import { IoSend, IoArrowBack, IoSparklesOutline, IoPersonOutline } from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

export default function DynamicChatbot({ botName, onBack }) {

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat_history/${botName}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const historyData = await response.json();
          
          // Transform the DB rows: 1 row -> 2 messages (User & Assistant)
          const formattedMessages = [];
          historyData.forEach(session => {
            formattedMessages.push({ role: "user", content: session.raw_input });
            formattedMessages.push({ role: "assistant", content: session.ai_response });
          });

          // Only set history if it exists, otherwise keep the default welcome message
          if (formattedMessages.length > 0) {
            setMessages(formattedMessages);
          }
        }
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadChatHistory();
  }, [botName]); // Re-runs if the bot name changes

  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hello! I am ${botName || 'your AI assistant'}. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //Handle send
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    const userMsg = { role: "user", content: currentInput };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Get the token exactly like your working 'deploy' function
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/sentinel_chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` // <--- THIS WAS THE MISSING LINK
        },
        body: JSON.stringify({
          chatInput: currentInput,
          botName: botName || "SentinelBot"
        })
      });

      // If Laravel sends a 401 now, it's because the token in localStorage expired
      if (response.status === 401) {
          throw new Error("Session expired. Please log in again.");
      }

      const data = await response.json();

      // Access the data through the 'data' wrapper if you use a Laravel Resource
      const aiContent = data.data ? data.data.ai_response : data.ai_response;

      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: aiContent }
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: error.message || "Error: Could not reach Agent. Please check your connection." }
      ]);
    } finally {
      setIsLoading(false);
    }
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
        {isInitialLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
            <SiGooglegemini className="animate-spin size-6" />
            <span className="text-xs font-medium">Retrieving secure conversation...</span>
          </div>
        ) : (
          messages.map((msg, idx) => (
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
          ))
        )}

        {/* Loading Indicator for new messages */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center text-xs text-gray-400 animate-pulse">
              <SiGooglegemini className="animate-spin" /> Sentinel is analyzing...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* ── Input Area ── */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            disabled={isLoading}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={isLoading ? "Processing..." : `Message ${botName}...`}
            className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 transition-all disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2.5 bg-[#89A1EF] text-white rounded-xl hover:bg-[#768bd9] transition-all shadow-lg shadow-[#89A1EF]/20 active:scale-95 disabled:grayscale"
          >
            <IoSend className="size-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
          <span className="flex items-center gap-1"><IoSparklesOutline /> Gemini may provide inaccurate info. SentinelAI filters PII.</span>
        </p>
      </div>
    </div>
  );
}