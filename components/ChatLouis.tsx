// components/ChatLouis.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { LouisAvatar } from "./LouisAvatar";

type MessageRole = "user" | "assistant";

type Message = {
  role: MessageRole;
  content: string;
};

// Type for SpeechRecognition (Web Speech API)
interface SpeechRecognitionResult {
  [key: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  [key: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function ChatLouis() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Format voice text with paragraph breaks
  function formatVoiceText(text: string, prevText: string): string {
    // Clean up the text
    let formatted = text.trim();
    
    // Add double line break after periods, exclamation marks, or question marks
    // This creates natural paragraph breaks
    formatted = formatted.replace(/([.!?])\s+/g, "$1\n\n");
    
    // Combine with previous text
    if (prevText.trim()) {
      // Add a space if previous text doesn't end with newline
      const separator = prevText.trimEnd().endsWith("\n") ? "" : " ";
      return prevText + separator + formatted;
    }
    
    return formatted;
  }

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser doesn't support speech recognition - silently fail
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => formatVoiceText(transcript, prev));
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // Handle errors silently
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  // Initialize audio visualization
  useEffect(() => {
    if (typeof window === "undefined") return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      // AudioContext not available - silently fail
      return;
    }

    return () => {
      // Cleanup on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      analyserRef.current = null;
    };
  }, []);

  // Handle audio visualization
  useEffect(() => {
    if (!isListening) {
      // Stop visualization
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setAudioLevels([]);
      return;
    }

    // Start audio visualization
    async function startVisualization() {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 32; // Small for performance
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Animation loop
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        function animate() {
          if (!analyserRef.current || !isListening) {
            return;
          }

          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Extract 5 bars from the frequency data
          const barCount = 5;
          const step = Math.floor(dataArray.length / barCount);
          const levels: number[] = [];
          
          for (let i = 0; i < barCount; i++) {
            const index = i * step;
            levels.push(dataArray[index] / 255); // Normalize to 0-1
          }
          
          setAudioLevels(levels);
          animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();
      } catch (err) {
        // Silently fail if audio access denied or unavailable
        console.error("Audio visualization error:", err);
      }
    }

    startVisualization();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setAudioLevels([]);
    };
  }, [isListening]);

  // Handle listening state changes
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // Already started or other error - silently handle
        setIsListening(false);
      }
    } else {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Clean up when chat closes
  useEffect(() => {
    if (!isOpen && isListening) {
      setIsListening(false);
    }
  }, [isOpen, isListening]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  function toggleListening() {
    setIsListening((prev) => !prev);
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages: Message[] = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply ?? "Sorry, I did not understand that.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, something went wrong. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Send on Enter (without Shift), otherwise allow normal textarea behavior
    if (e.key === "Enter" && !e.shiftKey && !isSending) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating avatar button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-40 rounded-full shadow-xl flex items-center justify-center"
        aria-label="Chat with Louis"
      >
        <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center">
          <LouisAvatar mood="bible" size={64} />
        </div>
      </button>

      {/* Chat panel - Medium size */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-40 w-[360px] h-[500px] rounded-t-2xl bg-white border border-gray-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <LouisAvatar mood="bible" size={28} />
              <span className="text-sm font-semibold text-gray-900">Chat with Louis</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-base leading-none"
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-white">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-xs text-gray-500 text-center">
                  Ask me a question about your Bible reading.
                </p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "bg-blue-600 text-white px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm"
                      : "bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm"
                  }
                >
                  <p className="text-xs whitespace-pre-line leading-relaxed break-words">
                    {m.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 px-3 py-2.5 bg-gray-50 rounded-b-2xl">
            <div className="flex gap-2 items-end">
              <div className="flex-1 flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a Bible question..."
                  rows={1}
                  className="flex-1 text-xs border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none min-h-[36px] max-h-[120px] overflow-y-auto"
                />
                {isListening && audioLevels.length > 0 && (
                  <div className="flex items-end gap-0.5 h-8 pb-1">
                    {audioLevels.map((level, index) => (
                      <div
                        key={index}
                        className="w-1 bg-red-500 rounded-full transition-all duration-75"
                        style={{
                          height: `${Math.max(level * 24, 4)}px`,
                          minHeight: "4px",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={toggleListening}
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                }`}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 9a1 1 0 10-2 0v2a1 1 0 102 0V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={handleSend}
                disabled={isSending || !input.trim()}
                className="text-xs font-semibold bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
