import React, { useState, useRef, useEffect } from 'react';
import { useCivic } from '../context/CivicContext';
import { ChatMessage } from '../types';
import { MessageSquare, Send, Sparkles, X, RotateCcw, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AVATAR_EXPRESSIONS = {
  idle: {
    mouthPath: "M 12 18 Q 15 20 18 18",
    eyeScaleY: 1,
    glowColor: "rgba(20, 184, 166, 0.4)", // teal
  },
  happy: {
    mouthPath: "M 10 17 Q 15 22 20 17",
    eyeScaleY: 1.2,
    glowColor: "rgba(16, 185, 129, 0.5)", // emerald
  },
  thinking: {
    mouthPath: "M 11 18 L 19 18",
    eyeScaleY: 0.3,
    glowColor: "rgba(168, 85, 247, 0.5)", // purple
  },
  speaking: {
    mouthPath: "M 11 18 Q 15 15 19 18",
    eyeScaleY: 1.1,
    glowColor: "rgba(14, 165, 233, 0.5)", // sky
  }
};

const CHAT_PROMPTS = [
  {
    en: "What projects reduce heat islands?",
    zh: "有什么项目可以缓解城市热岛？",
    hn: "शहर की गर्मी को क्या प्रोजेक्ट कम करते हैं?"
  },
  {
    en: "Tell me about the Dharug trail.",
    zh: "请介绍一下达鲁格原住民步道。",
    hn: "धारुग ट्रेल के बारे में विस्तार से बताएं।"
  },
  {
    en: "Is there free civic WiFi?",
    zh: "商务区有免费公共无线网络吗？",
    hn: "क्या वहाँ मुफ्त वाईफ़ाई उपलब्ध है?"
  }
];

export const AnimatedChatbot: React.FC = () => {
  const { language, translateText } = useCivic();
  const [isOpen, setIsOpen] = useState(false);
  const [expression, setExpression] = useState<'idle' | 'happy' | 'thinking' | 'speaking'>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('parravision_animated_chat');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Storage fetch issue:", e);
    }
    return [
      {
        id: 'welcome-anim',
        role: 'assistant',
        content: `Hello! I'm Parra, your animated CBD virtual ranger. 🌳 Need real-time temperatures, planning insights, or heat-mitigation info? Ask me anything!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true); // badge pulse helper
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('parravision_animated_chat', JSON.stringify(messages));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Set expression to thinking when request is placed
    setExpression('thinking');

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const historySummary = messages.slice(-4).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          history: historySummary
        })
      });

      if (!res.ok) throw new Error("Connection failed");

      const data = await res.json();
      
      // Request simulation of speaking expression for real conversational vibe!
      setExpression('speaking');
      setTimeout(() => setExpression('happy'), 1500);
      setTimeout(() => setExpression('idle'), 4000);

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "I've processed your question regarding Parramatta PWA.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setExpression('speaking');
      setTimeout(() => setExpression('idle'), 2500);

      // Offline backup response mapping matching user terms
      let offlineResponse = "Thanks for the ping! In Parramatta, we are currently hosting a range of smart city initiatives like active misting nozzles in Centenary Square, solar flora wifi kiosks, and the river flora filter strip.";
      const term = userMsg.content.toLowerCase();
      if (term.includes('heat') || term.includes('mist') || term.includes('cooling') || term.includes('climate')) {
        offlineResponse = "☀️ **Urban Cooling & Shade Strategies**:\n- Active eucalyptus shade arrays are installed in hot spots.\n- Automatic misting cooling installations lower temperature on pavement by 4.5°C when CBD heat exceeds 34°C.";
      } else if (term.includes('wifi') || term.includes('internet') || term.includes('free')) {
        offlineResponse = "📶 **Free CBD Civic WiFi**:\n- Parramatta Council supplies public fiber speed connectivity along the Waterfront precinct and Church Street.\n- No password is required. Look for 'Parramatta Free WiFi' networks on your device.";
      } else if (term.includes('dharug') || term.includes('aboriginal') || term.includes('indigenous') || term.includes('heritage')) {
        offlineResponse = "🍂 **Dharug Language Signage Trail**:\n- Integrating AR markers and physical signs showcasing indigenous terminology for essential land regions and river curves.\n- Created in direct partnership with Council Dharug elders.";
      }

      const assistantMsg: ChatMessage = {
        id: `ast-fallback-${Date.now()}`,
        role: 'assistant',
        content: offlineResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    if (window.confirm("Delete chat memory?")) {
      setMessages([
        {
          id: 'welcome-anim',
          role: 'assistant',
          content: "Chat log deleted. Ask me anything about local temperatures, climate shading, or town codes!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setExpression('idle');
    }
  };

  // Eyes blink loop
  const [blinkTrigger, setBlinkTrigger] = useState(false);
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkTrigger(true);
      setTimeout(() => setBlinkTrigger(false), 150);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  const currentExpr = AVATAR_EXPRESSIONS[expression];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="animated-floating-chatbot-root">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-80 sm:w-[22rem] bg-white rounded-2xl border border-neutral-200/95 shadow-2xl overflow-hidden flex flex-col h-[460px]"
            id="animated-widget-panel"
          >
            {/* 1. Header Banner */}
            <div className="bg-teal-950 text-white p-4 flex items-center justify-between border-b border-teal-900 shadow-sm">
              <div className="flex items-center gap-3">
                {/* Animated Smart Mascot Mini Area */}
                <div className="relative w-10 h-10 shrink-0 bg-teal-900/60 rounded-xl border border-teal-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
                  
                  {/* Smart SVG Robot Representation */}
                  <svg viewBox="0 0 30 30" className="w-8 h-8 drop-shadow-sm select-none">
                    <defs>
                      <filter id="glow-panel-mascot">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Floating Aura */}
                    <circle cx="15" cy="15" r="10" fill="none" stroke={currentExpr.glowColor} strokeWidth="1.5" className="animate-pulse" />
                    
                    {/* Head Core */}
                    <path d="M 6 15 A 9 9 0 0 1 24 15 L 24 19 A 9 9 0 0 1 6 19 Z" fill="#14b8a6" />
                    <rect x="10" y="8" width="10" height="2" rx="1" fill="#0d9488" />
                    <line x1="15" y1="8" x2="15" y2="4" stroke="#0d9488" strokeWidth="2" />
                    <circle cx="15" cy="3" r="1.5" fill="#f59e0b" className={expression === 'thinking' ? 'animate-ping' : ''} />
                    
                    {/* Eyes - Blinking state or responsive */}
                    <ellipse
                      cx="11"
                      cy="14"
                      rx="2.2"
                      ry={blinkTrigger ? 0.2 : 2.2 * currentExpr.eyeScaleY}
                      fill="#ffffff"
                      className="transition-all duration-100"
                    />
                    <circle cx="11" cy="14" r="1" fill="#0f172a" />
                    
                    <ellipse
                      cx="19"
                      cy="14"
                      rx="2.2"
                      ry={blinkTrigger ? 0.2 : 2.2 * currentExpr.eyeScaleY}
                      fill="#ffffff"
                      className="transition-all duration-100"
                    />
                    <circle cx="19" cy="14" r="1" fill="#0f172a" />
                    
                    {/* Morphing Mouth Expression */}
                    <path
                      d={currentExpr.mouthPath}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-50">
                      Parra Assistant
                    </h4>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-teal-200/80 font-mono tracking-wide">
                    {expression === 'thinking' ? 'System Thinking...' : expression === 'speaking' ? 'Mascot speaking...' : 'Online & Interactive'}
                  </span>
                </div>
              </div>

              {/* Utility Clear/Reset & Close Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Clear conversation"
                  className="p-1.5 text-teal-200 hover:text-white hover:bg-teal-900 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-teal-200 hover:text-white hover:bg-teal-900 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Messages Streaming Box */}
            <div className="flex-1 overflow-y-auto p-4 bg-teal-50/20 space-y-3.5" id="animated-widget-scroller">
              {messages.map((m) => {
                const isAI = m.role === 'assistant';
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2 max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${isAI ? 'bg-teal-100 text-teal-800 border border-teal-200' : 'bg-teal-700 text-white'}`}>
                      {isAI ? (
                        <span className="text-[9px] font-bold font-mono">P</span>
                      ) : (
                        <span className="text-[9px] font-bold font-mono">U</span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <div className={`p-2.5 rounded-xl text-xs font-sans leading-relaxed shadow-xs ${
                        isAI 
                          ? 'bg-white text-neutral-700 border border-neutral-100 rounded-tl-none' 
                          : 'bg-teal-850 text-white rounded-tr-none'
                      }`}>
                        {m.content}
                      </div>
                      <span className={`text-[8px] font-mono text-neutral-400 block ${isAI ? 'text-left pl-1' : 'text-right pr-1'}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-2 max-w-[75%] mr-auto items-center">
                  <div className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center border border-teal-200 text-[10px] font-bold">
                    P
                  </div>
                  <div className="flex gap-1.5 p-3 bg-white border border-neutral-100 rounded-xl rounded-tl-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 3. Fast Suggested Pill Prompts */}
            {messages.length === 1 && (
              <div className="px-3 py-2 border-t border-teal-100 bg-teal-50/40 space-y-1">
                <span className="text-[9px] font-mono uppercase text-teal-800 font-bold tracking-wider">
                  Select Quick Query:
                </span>
                <div className="flex flex-col gap-1">
                  {CHAT_PROMPTS.map((p, idx) => {
                    const text = p[language] || p['en'];
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSend(text)}
                        className="text-[10px] text-left text-neutral-600 hover:text-teal-900 bg-white hover:bg-teal-50 border border-neutral-200 hover:border-teal-300 px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer group"
                      >
                        <span className="truncate">{text}</span>
                        <ArrowRight className="w-3 h-3 text-neutral-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Textarea Input Section */}
            <div className="p-2 border-t border-neutral-200/80 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="flex gap-1.5"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask Parra about local project..."
                  className="flex-1 bg-neutral-50 hover:bg-neutral-100/30 focus:bg-white text-xs px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all text-neutral-800"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isLoading}
                  className="p-2 bg-teal-800 text-white hover:bg-teal-700 disabled:opacity-40 rounded-xl transition-all shadow-xs flex items-center justify-center cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Core Button Launcher */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessage(false);
          setExpression('happy');
          setTimeout(() => setExpression('idle'), 2000);
        }}
        className="h-14 w-14 bg-teal-850 hover:bg-teal-800 text-white rounded-full flex items-center justify-center shadow-2xl border border-teal-700 relative pointer-events-auto cursor-pointer focus:outline-none"
        id="animated-floating-launcher-btn"
      >
        {/* Soft breathing radial background pulse */}
        <div className="absolute inset-0 rounded-full border border-teal-500 animate-ping opacity-25 pointer-events-none" />

        {/* Badge Indicator for new engagement alert */}
        {hasNewMessage && (
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-amber-500 border-2 border-white rounded-full animate-bounce shrink-0 shadow-sm" />
        )}

        {/* Interactive SVG Character Facial Overlay on Button */}
        <svg viewBox="0 0 30 30" className="w-10 h-10 select-none drop-shadow-md">
          {/* Inner blinking and floating core */}
          <circle cx="15" cy="15" r="9" fill="none" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="1" className="animate-spin-slow" />
          
          {/* Head Shape */}
          <rect x="8" y="11" width="14" height="11" rx="4" fill="#ffffff" />
          <line x1="15" y1="11" x2="15" y2="7" stroke="#ffffff" strokeWidth="2" />
          <circle cx="15" cy="6" r="1.5" fill="#f59e0b" />
          
          {/* Virtual Animated Eyes */}
          <circle cx="11" cy="15" r="1.5" fill="#0f172a" />
          <circle cx="19" cy="15" r="1.5" fill="#0f172a" />
          
          {/* Happy Mouth Curve */}
          <path d="M 12 18 Q 15 20.5 18 18" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <span className="absolute -bottom-8 bg-teal-950 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-teal-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          PARRA AI
        </span>
      </motion.button>
    </div>
  );
};
