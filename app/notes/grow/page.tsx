"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { LouisAvatar } from "../../../components/LouisAvatar";

type MessageRole = "user" | "assistant";

type Message = {
  role: MessageRole;
  content: string;
};

export default function GrowNotePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
        const meta = data.user.user_metadata || {};
        const name =
          meta.first_name ||
          meta.firstName ||
          (data.user.email ? data.user.email.split("@")[0] : "User");
        setDisplayName(name);
      }
    }
    loadUser();

    // Start with welcome message
    setMessages([
      {
        role: "assistant",
        content:
          "Ready to dive into the Word? Tell me the passage, and we'll start your GROW process.",
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function extractFormattedNote() {
    // Look for the final formatted GROW note in assistant messages
    // It should contain "GROW Study Notes" or the formatted structure
    // Check all assistant messages, not just the last one
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.role === "assistant") {
        const content = msg.content;
        // Check if this is the final formatted note (with or without pin emojis)
        // Look for the full structure with all three sections
        const hasPassageText = content.includes("**Passage Text**") || content.includes("Passage Text");
        const hasQuestions = content.includes("**Questions & Research**") || content.includes("Questions & Research");
        const hasReflection = content.includes("**Journal Reflection**") || content.includes("Journal Reflection");
        
        // Also check if message contains "Are you happy" which indicates W step completion
        const hasHappyQuestion = content.toLowerCase().includes("are you happy");
        
        if (
          content.includes("GROW Study Notes") ||
          content.includes("📖 GROW Study Notes") ||
          (hasPassageText && hasQuestions && hasReflection) ||
          (hasHappyQuestion && (hasReflection || content.length > 200))
        ) {
          return content;
        }
      }
    }
    return null;
  }

  function parseFormattedNote() {
    // First try to get formatted note
    const formattedNote = extractFormattedNote();
    
    // Extract passage reference from first user message
    const userMessages = messages.filter((m) => m.role === "user");
    const assistantMessages = messages.filter((m) => m.role === "assistant");
    
    let book = "";
    let chapter = 1;
    let verseFrom = 1;
    let verseTo = 1;
    let passageText = "";
    let research = "";
    let reflection = "";
    
    // Get passage reference from first user message
    if (userMessages.length > 0) {
      const firstMsg = userMessages[0].content;
      const passageMatch = firstMsg.match(/([A-Za-z\s]+?)\s+(\d+):(\d+)(?:-(\d+))?/);
      if (passageMatch) {
        book = passageMatch[1].trim();
        chapter = parseInt(passageMatch[2]) || 1;
        verseFrom = parseInt(passageMatch[3]) || 1;
        verseTo = parseInt(passageMatch[4]) || verseFrom;
      }
    }
    
    if (formattedNote) {
      // Parse the formatted note to extract components
      const cleaned = formattedNote
        .replace(/Would you like to save this as your GROW Note\?/gi, "")
        .trim();

      // Extract passage reference (e.g., "Passage: Proverbs 25:28")
      const passageMatch = cleaned.match(/Passage:\s*([^\n]+)/i);
      let passageRef = passageMatch ? passageMatch[1].trim() : "";

      // If no passage found in formatted note, use the one we already extracted
      if (!passageRef && book) {
        passageRef = `${book} ${chapter}:${verseFrom}${verseTo !== verseFrom ? `-${verseTo}` : ""}`;
      }

      // Update book/chapter/verse from passage reference if found
      if (passageRef && !book) {
        const match = passageRef.match(/([A-Za-z\s]+?)\s+(\d+):(\d+)(?:-(\d+))?/);
        if (match) {
          book = match[1].trim();
          chapter = parseInt(match[2]) || 1;
          verseFrom = parseInt(match[3]) || 1;
          verseTo = parseInt(match[4]) || verseFrom;
        }
      }

      // Extract Passage Text section - ONLY the Bible verses, nothing else
      // Try with ** markers first, then without
      let passageTextMatch = cleaned.match(/\*\*Passage Text\*\*[\s\S]*?(?=\*\*Questions|$)/i);
      if (!passageTextMatch) {
        passageTextMatch = cleaned.match(/Passage Text[\s\S]*?(?=Questions|$)/i);
      }
      if (passageTextMatch) {
        passageText = passageTextMatch[0].replace(/(?:\*\*)?Passage Text(?:\*\*)?/i, "").replace(/📌/g, "").replace(/Great choice!/gi, "").trim();
        // Remove ALL instructions and keep ONLY verses with [01], [02] format
        const lines = passageText.split('\n');
        const verseLines = lines.filter(line => {
          const trimmed = line.trim();
          // Keep only lines that start with [##] (verse numbers)
          return trimmed.match(/^\[\d+\]/);
        });
        passageText = verseLines.join('\n').trim();
      }

      // Extract Questions & Research section (remove pin emoji and unwanted text if present)
      // Try with ** markers first, then without
      let researchMatch = cleaned.match(/\*\*Questions & Research\*\*[\s\S]*?(?=\*\*Journal|$)/i);
      if (!researchMatch) {
        researchMatch = cleaned.match(/Questions & Research[\s\S]*?(?=Journal|$)/i);
      }
      research = researchMatch
        ? researchMatch[0].replace(/(?:\*\*)?Questions & Research(?:\*\*)?/i, "").replace(/📌/g, "").replace(/If you have more questions or thoughts, feel free to ask anytime!/gi, "").replace(/That's a great question!/gi, "").replace(/That is a great question!/gi, "").trim()
        : "";

      // Extract Journal Reflection section (stop at equals signs, "Would you like", or "Are you happy")
      // Try with ** markers first, then without
      let reflectionMatch = cleaned.match(/\*\*Journal Reflection\*\*([\s\S]*?)(?=\n*=+|Would you like|Are you happy|Click.*Save|$)/i);
      if (!reflectionMatch) {
        reflectionMatch = cleaned.match(/Journal Reflection([\s\S]*?)(?=\n*=+|Would you like|Are you happy|Click.*Save|$)/i);
      }
      reflection = reflectionMatch
        ? reflectionMatch[1].replace(/(?:\*\*)?Journal Reflection(?:\*\*)?/i, "").replace(/📌/g, "").trim()
        : "";
      
      // If reflection not found in formatted structure, look for it BEFORE the full structure
      // The new format shows reflection first, then full structure
      if (!reflection) {
        // Find where the full structure starts
        const fullNoteStart = cleaned.search(/📖 GROW Study Notes|=====================================================================\s*📖 GROW Study Notes|\*\*Passage Text\*\*/i);
        if (fullNoteStart > 100) {
          // Get everything before the full structure - this should contain the reflection
          const beforeStructure = cleaned.substring(0, fullNoteStart);
          // Look for reflection-like content (first person, personal reflection)
          if (beforeStructure.length > 50 && (beforeStructure.includes("I ") || beforeStructure.includes("I'm") || beforeStructure.includes("I've"))) {
            // Extract the reflection part, stopping at "Are you happy"
            const reflectionPart = beforeStructure.split(/Are you happy/i)[0].trim();
            if (reflectionPart.length > 50) {
              reflection = reflectionPart
                .replace(/Thank you for sharing[^\n]*\n?/gi, "")
                .replace(/You have some great insights[^\n]*\n?/gi, "")
                .replace(/Let me format it for you[^\n]*\n?/gi, "")
                .replace(/Here's what you wrote[^:]*:\s*/gi, "")
                .trim();
            }
          }
        }
      }
      
      // Clean up - remove ALL conversation text before the actual reflection
      if (reflection) {
        reflection = reflection
          .replace(/Thank you for sharing[^\n]*\n?/gi, "")
          .replace(/You have some great insights[^\n]*\n?/gi, "")
          .replace(/Now, let's make sure[^\n]*\n?/gi, "")
          .replace(/Here's what you wrote[^:]*:\s*/gi, "")
          .replace(/This is a wonderful reflection[^\n]*\n?/gi, "")
          .replace(/Let me format it for you[^\n]*\n?/gi, "")
          .replace(/You have some great insights here[^\n]*\n?/gi, "")
          .replace(/Now, let's make sure it's at least 6 sentences[^\n]*\n?/gi, "")
          .trim();
        
        // Only keep lines that look like actual reflection content (not conversation)
        // Remove lines that are just conversation prompts
        const lines = reflection.split('\n');
        const filteredLines = lines.filter(line => {
          const trimmed = line.trim();
          // Skip empty lines, conversation prompts, and separator lines
          if (!trimmed || trimmed === '---' || trimmed.match(/^(Thank you|You have|Now, let's|Here's what|This is|Let me)/i)) {
            return false;
          }
          return true;
        });
        reflection = filteredLines.join('\n').trim();
      }
      
      // If no reflection found in formatted structure, try to get it from different formats
      if (!reflection) {
        // Look for polished journal entry text
        const polishedMatch = cleaned.match(/polished into a smooth journal entry:([\s\S]*?)(?=Would you like|Are you happy|$)/i);
        if (polishedMatch) {
          reflection = polishedMatch[1].trim();
        } else {
          // Look for "Here's what you wrote" pattern
          const heresMatch = cleaned.match(/Here's what you wrote[^:]*:([\s\S]*?)(?=Would you like|Are you happy|$)/i);
          if (heresMatch) {
            reflection = heresMatch[1].trim();
          }
        }
      }
    }
    
    // If we don't have passage text or research, extract from conversation history
    // (This helps even if we have a formatted note but it's missing some parts)
    if (!passageText || !research) {
      // Look for passage text in assistant messages (G step)
      for (const msg of assistantMessages) {
        if (msg.content.includes("[01]") || msg.content.includes("Here is the passage")) {
          // Extract ONLY the verses with [01], [02] format - nothing else
          const lines = msg.content.split('\n');
          const verseLines = lines.filter(line => {
            const trimmed = line.trim();
            // Keep ONLY lines that start with [##] (verse numbers)
            return trimmed.match(/^\[\d+\]/);
          });
          if (verseLines.length > 0 && !passageText) {
            passageText = verseLines.join('\n').trim();
          }
        }
        
        // Look for research/questions in assistant messages (R step)
        // Get ONLY the conversational paragraph format where Lil Louis reminds them of questions and answers
        if ((!research || research.length < 50) && 
            (msg.content.includes("You asked about") || 
             msg.content.includes("You also wondered") || 
             msg.content.includes("You wanted to know") ||
             (msg.content.includes("You") && msg.content.includes("asked") && msg.content.includes("Here's what")) ||
             (msg.content.includes("Here's what") && msg.content.includes("means")))) {
          // Extract ONLY the question/answer content, remove ALL instructions
          let researchText = msg.content;
          // Remove ALL intro text, instructions, and prompts
          researchText = researchText
            .replace(/Now let's move to R[^\n]*\n?/gi, "")
            .replace(/This is where you ask questions[^\n]*\n?/gi, "")
            .replace(/That's a great question!/gi, "")
            .replace(/That is a great question!/gi, "")
            .replace(/Looking at the verse above[^\n]*\n?/gi, "")
            .replace(/Do you have more questions[^\n]*\n?/gi, "")
            .replace(/What words, phrases[^\n]*\n?/gi, "")
            .replace(/Ask anything[^\n]*\n?/gi, "")
            .replace(/or can we move to O\?/gi, "")
            .trim();
          
          // Filter out instruction lines - keep only question/answer content
          const lines = researchText.split('\n');
          const contentLines = lines.filter(line => {
            const trimmed = line.trim();
            // Skip empty lines and instruction prompts
            if (!trimmed || 
                trimmed.match(/^(Now let's|This is|Looking at|What words|Ask anything|Do you have more)/i)) {
              return false;
            }
            return true;
          });
          researchText = contentLines.join('\n').trim();
          
          // Combine multiple research responses
          if (research && research.length > 0) {
            research = research + "\n\n" + researchText;
          } else {
            research = researchText;
          }
        }
        
        // Look for formatted reflection in assistant messages (after W step)
        // Extract the EXACT formatted version shown before "Are you happy"
        if (msg.content.includes("**Journal Reflection**") || 
            msg.content.includes("Let me format it for you") ||
            msg.content.includes("Are you happy with how I formatted")) {
          // Extract the formatted reflection - the clean version shown to user
          let reflectionPart = "";
          if (msg.content.includes("**Journal Reflection**")) {
            // Get content after **Journal Reflection** and before "Are you happy"
            const match = msg.content.match(/\*\*Journal Reflection\*\*([\s\S]*?)(?:Are you happy|Click.*Save|$)/i);
            if (match) {
              reflectionPart = match[1].trim();
            }
          } else if (msg.content.includes("Let me format it for you")) {
            // Extract after "Let me format it for you" and "**Journal Reflection**" header
            const match = msg.content.match(/Let me format it for you[^\n]*\n\s*\*\*Journal Reflection\*\*([\s\S]*?)(?:Are you happy|Click.*Save|$)/i);
            if (match) {
              reflectionPart = match[1].trim();
            }
          } else if (msg.content.includes("Are you happy with how I formatted")) {
            // Extract everything before "Are you happy" - this is the formatted version shown
            const parts = msg.content.split(/Are you happy with how I formatted/i);
            if (parts[0] && parts[0].trim().length > 50) {
              reflectionPart = parts[0].trim();
              // Remove "**Journal Reflection**" header if present
              reflectionPart = reflectionPart.replace(/\*\*Journal Reflection\*\*/i, "").trim();
            }
          }
          
          if (reflectionPart) {
            // Clean up - remove ALL conversation text, keep ONLY the formatted reflection
            reflection = reflectionPart
              .replace(/Thank you for sharing[^\n]*\n?/gi, "")
              .replace(/You have some great insights[^\n]*\n?/gi, "")
              .replace(/Now, let's make sure[^\n]*\n?/gi, "")
              .replace(/Here's what you wrote[^:]*:\s*/gi, "")
              .replace(/This is a wonderful reflection[^\n]*\n?/gi, "")
              .replace(/Let me format it for you[^\n]*\n?/gi, "")
              .replace(/^---\s*/gm, "")
              .trim();
            
            // Filter out conversation lines - keep ONLY the reflection paragraphs
            const lines = reflection.split('\n');
            const filteredLines = lines.filter(line => {
              const trimmed = line.trim();
              // Skip empty lines, separator lines, and ALL conversation prompts
              if (!trimmed || 
                  trimmed === '---' || 
                  trimmed.match(/^(Thank you|You have|Now, let's|Here's what|This is|Let me|Are you)/i)) {
                return false;
              }
              return true;
            });
            reflection = filteredLines.join('\n').trim();
          }
        }
      }
      
      // If no formatted reflection found, try to extract from the reflection text shown in chat
      // Look for the formatted reflection that was displayed to the user (the one before "Are you happy")
      if (!reflection) {
        // Check the last few assistant messages for formatted reflection text
        for (let i = assistantMessages.length - 1; i >= Math.max(0, assistantMessages.length - 5); i--) {
          const msg = assistantMessages[i].content;
          
          // Look for the formatted reflection - it should be after "**Journal Reflection**" or "Let me format it for you"
          if (msg.includes("**Journal Reflection**") || msg.includes("Let me format it for you")) {
            // Extract the reflection part after "**Journal Reflection**"
            let reflectionPart = "";
            if (msg.includes("**Journal Reflection**")) {
              const match = msg.match(/\*\*Journal Reflection\*\*([\s\S]*?)(?:Are you happy|Click.*Save|$)/i);
              if (match) {
                reflectionPart = match[1].trim();
              }
            } else if (msg.includes("Let me format it for you")) {
              // Extract everything after "Let me format it for you" and before "Are you happy"
              const match = msg.match(/Let me format it for you[^\n]*\n([\s\S]*?)(?:Are you happy|Click.*Save|$)/i);
              if (match) {
                reflectionPart = match[1].trim();
                // Remove "**Journal Reflection**" header if present
                reflectionPart = reflectionPart.replace(/\*\*Journal Reflection\*\*/i, "").trim();
              }
            }
            
            if (reflectionPart) {
              // Clean up - remove ALL conversation text and keep only the reflection paragraphs
              reflection = reflectionPart
                .replace(/Thank you for sharing[^\n]*\n?/gi, "")
                .replace(/You have some great insights[^\n]*\n?/gi, "")
                .replace(/Now, let's make sure[^\n]*\n?/gi, "")
                .replace(/Here's what you wrote[^:]*:\s*/gi, "")
                .replace(/This is a wonderful reflection[^\n]*\n?/gi, "")
                .replace(/Let me format it for you[^\n]*\n?/gi, "")
                .replace(/^---\s*/gm, "")
                .trim();
              
              // Filter out conversation lines - only keep actual reflection content
              const lines = reflection.split('\n');
              const filteredLines = lines.filter(line => {
                const trimmed = line.trim();
                // Skip empty lines, separator lines, and conversation prompts
                if (!trimmed || 
                    trimmed === '---' || 
                    trimmed.match(/^(Thank you|You have|Now, let's|Here's what|This is|Let me)/i)) {
                  return false;
                }
                return true;
              });
              reflection = filteredLines.join('\n').trim();
              
              if (reflection.length > 50) {
                break;
              }
            }
          }
        }
      }
    }
    
    // Format reflection with proper line breaks
    if (reflection) {
      // Remove unwanted text
      reflection = reflection
        .replace(/^=+$/gm, "")
        .replace(/\n=+\s*$/g, "")
        .replace(/^-+$/gm, "")
        .replace(/Are you happy with this note\?/gi, "")
        .replace(/Are you happy with how i formatted/gi, "")
        .trim();
      
      // Ensure proper paragraph breaks
      reflection = reflection
        .replace(/([.!?])\s+([A-Z])/g, "$1\n\n$2") // Add double line breaks between sentences
        .split(/\n\s*\n/)
        .filter(p => p.trim())
        .join("\n\n");
    }

    // Ensure we have at least book
    if (!book) {
      console.error("Could not find book/passage reference");
      return null;
    }
    
    // If we don't have reflection, try one more time to get it from the last assistant message
    if (!reflection) {
      // Look for any formatted reflection in the last few assistant messages
      for (let i = assistantMessages.length - 1; i >= Math.max(0, assistantMessages.length - 5); i--) {
        const msg = assistantMessages[i].content;
        
        // Check if this message has "Are you happy" - the reflection should be before it
        if (msg.toLowerCase().includes("are you happy")) {
          // Split at "Are you happy" and get the part before it
          const parts = msg.split(/Are you happy/i);
          if (parts[0] && parts[0].trim().length > 50) {
            let reflectionPart = parts[0].trim();
            
            // Remove any headers or intro text
            reflectionPart = reflectionPart
              .replace(/\*\*Journal Reflection\*\*/i, "")
              .replace(/Thank you for sharing[^\n]*\n?/gi, "")
              .replace(/You have some great insights[^\n]*\n?/gi, "")
              .replace(/Let me format it for you[^\n]*\n?/gi, "")
              .replace(/Here's what you wrote[^:]*:\s*/gi, "")
              .trim();
            
            // Check if it looks like a reflection (has first person pronouns or is substantial)
            if (reflectionPart.length > 50 && 
                (reflectionPart.includes("I ") || reflectionPart.includes("I'm") || 
                 reflectionPart.includes("I've") || reflectionPart.includes("I can") ||
                 reflectionPart.split(/[.!?]/).length >= 3)) {
              reflection = reflectionPart;
              break;
            }
          }
        }
        
        // Look for formatted reflection patterns
        if (msg.includes("This reminded me") || msg.includes("I can see") || 
            (msg.length > 100 && msg.includes(".") && !msg.toLowerCase().includes("are you happy"))) {
          // This might be the formatted reflection
          const reflectionPart = msg.split(/Are you happy|Would you like|Click.*Save/i)[0].trim();
          if (reflectionPart.length > 50) {
            reflection = reflectionPart;
            break;
          }
        }
      }
    }
    
    // If still no reflection, try to get it from the visible part of messages (before full structure)
    if (!reflection) {
      // Look through all assistant messages for content that appears before "Are you happy"
      for (let i = assistantMessages.length - 1; i >= 0; i--) {
        const msg = assistantMessages[i].content;
        const lowerMsg = msg.toLowerCase();
        
        // If message has "are you happy", get everything before it
        if (lowerMsg.includes("are you happy")) {
          const happyIndex = lowerMsg.indexOf("are you happy");
          let beforeHappy = msg.substring(0, happyIndex).trim();
          
          // Find where the full structure might start (if present)
          const structureStart = beforeHappy.search(/📖 GROW Study Notes|=====================================================================|\*\*Passage Text\*\*/i);
          let reflectionCandidate = beforeHappy;
          
          if (structureStart > 0 && structureStart < beforeHappy.length) {
            reflectionCandidate = beforeHappy.substring(0, structureStart).trim();
          }
          
          // Clean it up - remove headers and intro text
          reflectionCandidate = reflectionCandidate
            .replace(/\*\*Journal Reflection\*\*/i, "")
            .replace(/Journal Reflection/i, "")
            .replace(/Thank you for sharing[^\n]*\n?/gi, "")
            .replace(/You have some great insights[^\n]*\n?/gi, "")
            .replace(/Let me format it for you[^\n]*\n?/gi, "")
            .replace(/Here's what you wrote[^:]*:\s*/gi, "")
            .replace(/Here is your formatted reflection[^:]*:\s*/gi, "")
            .replace(/I've formatted your reflection[^:]*:\s*/gi, "")
            .replace(/^---\s*/gm, "")
            .replace(/^=+\s*$/gm, "")
            .trim();
          
          // Split into lines and filter out empty lines and conversation prompts
          const lines = reflectionCandidate.split('\n');
          const filteredLines = lines.filter(line => {
            const trimmed = line.trim();
            if (!trimmed) return false;
            // Skip conversation prompts
            if (trimmed.match(/^(Thank you|You have|Now, let's|Here's what|This is|Let me|Are you|Click)/i)) {
              return false;
            }
            return true;
          });
          reflectionCandidate = filteredLines.join('\n').trim();
          
          // If it's substantial (at least 30 chars and has sentences), use it
          if (reflectionCandidate.length >= 30) {
            // Count sentences
            const sentenceCount = (reflectionCandidate.match(/[.!?]+/g) || []).length;
            // Check if it has first person or looks like a reflection
            const hasFirstPerson = reflectionCandidate.includes("I ") || 
                                   reflectionCandidate.includes("I'm") || 
                                   reflectionCandidate.includes("I've") ||
                                   reflectionCandidate.includes("I can") ||
                                   reflectionCandidate.includes("I feel");
            
            if (sentenceCount >= 1 || hasFirstPerson || reflectionCandidate.length > 100) {
              reflection = reflectionCandidate;
              console.log("Found reflection from message before 'are you happy':", reflection.substring(0, 100));
              break;
            }
          }
        }
      }
    }
    
    // If still no reflection, we can't save
    if (!reflection) {
      console.error("Could not find formatted reflection. Messages:", messages.map(m => ({ role: m.role, contentLength: m.content.length, hasHappy: m.content.toLowerCase().includes("are you happy") })));
      return null;
    }

    return {
      book,
      chapter,
      verseFrom,
      verseTo,
      passage: passageText,
      research,
      observe: "", // O step is not saved separately
      write: reflection,
    };
  }

  function formatContent() {
    // Try to get the formatted note from AI
    const formattedNote = extractFormattedNote();
    if (formattedNote) {
      // Remove the "Would you like to save" question and equals sign lines
      return formattedNote
        .replace(/Would you like to save this as your GROW Note\?/gi, "")
        .replace(/^=+$/gm, "")
        .replace(/\n=+\s*$/g, "")
        .trim();
    }

    // Fallback: extract from conversation if formatted note not found
    const userMessages = messages.filter((m) => m.role === "user");
    const passage = userMessages[0]?.content || "";
    return `📖 GROW Study Notes\nPassage: ${passage}\n\nNote content from conversation.`;
  }

  function filterMessageForDisplay(content: string): string {
    // If the message contains the full formatted note structure, show only the reflection part
    // and the question, hiding the full note structure
    const hasFullNote = content.includes("📖 GROW Study Notes") || 
                        (content.includes("**Passage Text**") && 
                         content.includes("**Questions & Research**") && 
                         content.includes("**Journal Reflection**"));
    
    if (hasFullNote) {
      // Find where the full formatted note structure starts
      // Look for the pattern: "=====================================================================" followed by "📖 GROW Study Notes"
      const fullNotePattern = /(?:^|\n)={10,}\s*\n\s*📖 GROW Study Notes/i;
      const fullNoteMatch = content.match(fullNotePattern);
      
      if (fullNoteMatch && fullNoteMatch.index !== undefined) {
        // Return only the part before the full note structure (reflection + question)
        const visiblePart = content.substring(0, fullNoteMatch.index).trim();
        // Make sure we include the question
        if (visiblePart.includes("Are you happy") || visiblePart.includes("Save Note Now")) {
          return visiblePart;
        }
      }
      
      // Alternative: look for "**Passage Text**" as the start of the full structure
      const passageTextPattern = /\*\*Passage Text\*\*/i;
      const passageTextIndex = content.search(passageTextPattern);
      
      if (passageTextIndex > 0) {
        // Get everything before the full structure
        const beforeStructure = content.substring(0, passageTextIndex).trim();
        
        // Make sure we have the reflection and question
        if (beforeStructure.includes("Are you happy") || beforeStructure.length > 50) {
          return beforeStructure;
        }
      }
      
      // If we can't find the structure start, try to find "Are you happy" and show everything up to that plus a bit after
      const happyIndex = content.toLowerCase().indexOf("are you happy");
      if (happyIndex > 0) {
        // Get the question and a bit after it, but stop before the full structure
        const questionEnd = content.indexOf("=====================================================================", happyIndex);
        if (questionEnd > happyIndex) {
          return content.substring(0, questionEnd).trim();
        }
        // If no structure found after, get up to 500 chars after "are you happy"
        const endIndex = Math.min(happyIndex + 500, content.length);
        return content.substring(0, endIndex).trim();
      }
    }
    
    // If no full note structure, return content as-is
    return content;
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
      // Add GROW context to the messages
      const growContextMessage: Message = {
        role: "assistant",
        content:
          "You are helping the user create a GROW note. Guide them through G (Get the passage), R (Research), O (Observe), and W (Write) steps. After they complete all steps, help them review and save their note.",
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          growMode: true,
        }),
      });

      if (!res.ok) {
        let errorData: any = {};
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          try {
            errorData = await res.json();
          } catch (e) {
            console.error("Failed to parse error response as JSON:", e);
          }
        } else {
          const text = await res.text().catch(() => "");
          console.error("Non-JSON error response:", text);
        }
        
        console.error("API error response:", {
          status: res.status,
          statusText: res.statusText,
          error: errorData,
        });
        
        const errorMsg = errorData.error?.message || 
                        errorData.reply || 
                        errorData.error || 
                        res.statusText || 
                        "Internal Server Error";
        
        throw new Error(`HTTP ${res.status}: ${errorMsg}`);
      }

      const data = await res.json();
      console.log("API response:", data);

      if (data.error) {
        console.error("API returned error:", data.error);
        throw new Error(data.error.message || "API error");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply ?? "Sorry, I did not understand that.",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Check if assistant is asking if user is happy with the formatted reflection
      const lowerContent = assistantMessage.content.toLowerCase();
      const isAskingIfHappy = 
        lowerContent.includes("are you happy") ||
        lowerContent.includes("click 'save note now'") ||
        lowerContent.includes("click \"save note now\"") ||
        lowerContent.includes("save note now") ||
        lowerContent.includes("no, keep editing");
      
      // Show save button when AI asks if they're happy
      if (isAskingIfHappy) {
        console.log("Showing save button - detected happy question");
        setShowSaveButton(true);
      }
    } catch (err: any) {
      console.error("Error in handleSend:", err);
      const errorMessage: Message = {
        role: "assistant",
        content:
          err?.message?.includes("HTTP") || err?.message?.includes("API")
            ? `Error: ${err.message}`
            : "Sorry, something went wrong. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  async function handleSave() {
    if (!userId) {
      alert("You must be logged in to save notes.");
      return;
    }
    setSaving(true);

    try {
      console.log("Starting save process...");
      console.log("Total messages:", messages.length);
      console.log("Messages with 'are you happy':", messages.filter(m => m.content.toLowerCase().includes("are you happy")).length);
      
      const parsed = parseFormattedNote();
      console.log("Parsed note:", parsed);
      console.log("Has book:", !!parsed?.book);
      console.log("Has passage:", !!parsed?.passage);
      console.log("Has research:", !!parsed?.research);
      console.log("Has reflection:", !!parsed?.write);
      
      if (!parsed) {
        // Show more helpful error message
        const hasHappyMessage = messages.some(m => m.content.toLowerCase().includes("are you happy"));
        const errorMsg = hasHappyMessage 
          ? "Could not parse note. The reflection might not be formatted correctly. Please try completing the W step again."
          : "Could not parse note. Please make sure you completed the GROW process and reached the W (Write) step.";
        alert(errorMsg);
        setSaving(false);
        return;
      }

      // If book is missing, try to extract from first user message
      if (!parsed.book) {
        const userMessages = messages.filter((m) => m.role === "user");
        if (userMessages.length > 0) {
          const firstMsg = userMessages[0].content;
          const match = firstMsg.match(/([A-Za-z\s]+?)\s+(\d+):(\d+)(?:-(\d+))?/);
          if (match) {
            parsed.book = match[1].trim();
            parsed.chapter = parseInt(match[2]) || 1;
            parsed.verseFrom = parseInt(match[3]) || 1;
            parsed.verseTo = parseInt(match[4]) || parsed.verseFrom;
          }
        }
      }

      if (!parsed.book) {
        alert("Could not find passage reference. Please make sure you provided a Bible passage.");
        setSaving(false);
        return;
      }

      console.log("Saving to Supabase:", {
        user_id: userId,
        book: parsed.book,
        chapter: parsed.chapter,
        verse_from: parsed.verseFrom,
        verse_to: parsed.verseTo,
        passage: parsed.passage?.substring(0, 50) + "...",
        research: parsed.research?.substring(0, 50) + "...",
        write: parsed.write?.substring(0, 50) + "...",
      });

      const { data, error } = await supabase.from("notes").insert({
        user_id: userId,
        book: parsed.book,
        chapter: parsed.chapter,
        verse_from: parsed.verseFrom,
        verse_to: parsed.verseTo,
        passage: parsed.passage,
        research: parsed.research,
        observe: parsed.observe,
        write: parsed.write,
      }).select();

      if (error) {
        console.error("Error saving note:", error);
        alert(`Failed to save note: ${error.message}`);
        setSaving(false);
        return;
      }

      console.log("Note saved successfully:", data);
      router.push("/notes");
    } catch (error: any) {
      console.error("Error:", error);
      alert(`Failed to save note: ${error.message || "Unknown error"}`);
      setSaving(false);
    }
  }

  if (showReview) {
    const formattedNote = extractFormattedNote();
    const noteContent = formattedNote || "No formatted note found. Please complete the GROW process.";

    // Parse the formatted note to display beautifully
    function renderFormattedNote(content: string) {
      // Clean up the content - remove "Would you like to save" question and equals signs
      let cleaned = content
        .replace(/Would you like to save this as your GROW Note\?/gi, "")
        .replace(/^=+$/gm, "")
        .replace(/\n=+\s*$/g, "")
        .trim();

      const elements: React.ReactElement[] = [];
      
      // Extract and render Passage Text section
      const passageMatch = cleaned.match(/\*\*Passage Text\*\*([\s\S]*?)(?=\*\*Questions|$)/i);
      if (passageMatch) {
        const passageContent = passageMatch[1].trim();
        elements.push(
          <div key="passage" className="mb-8">
            <h1 className="text-2xl font-bold mb-4">📖 Passage</h1>
            <div className="space-y-2">
              {passageContent.split("\n").filter(l => l.trim()).map((line, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        );
      }

      // Extract and render Questions & Research section
      const researchMatch = cleaned.match(/\*\*Questions & Research\*\*([\s\S]*?)(?=\*\*Journal|$)/i);
      if (researchMatch) {
        const researchContent = researchMatch[1].trim();
        elements.push(
          <div key="research" className="mb-8">
            <h1 className="text-2xl font-bold mb-4">❓ Questions</h1>
            <div className="space-y-4">
              {researchContent.split("\n").filter(l => l.trim()).map((line, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        );
      }

      // Extract and render Journal Reflection section (stop at equals signs)
      const reflectionMatch = cleaned.match(/\*\*Journal Reflection\*\*([\s\S]*?)(?=\n*=+|$)/i);
      if (reflectionMatch) {
        let reflectionContent = reflectionMatch[1].trim();
        // Remove any equals sign lines and trailing separators
        reflectionContent = reflectionContent.replace(/^=+$/gm, "").replace(/\n=+\s*$/g, "").trim();
        // Split into paragraphs for better formatting
        const paragraphs = reflectionContent.split(/\n\s*\n/).filter(p => p.trim());
        elements.push(
          <div key="reflection" className="mb-8">
            <h1 className="text-2xl font-bold mb-4">✍️ Reflection</h1>
            <div className="space-y-4">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </div>
        );
      }

      // If no sections found, render as plain text
      if (elements.length === 0) {
        return (
          <div className="text-gray-600">
            {cleaned.split("\n").map((line, idx) => (
              <p key={idx} className="mb-3 leading-relaxed whitespace-pre-line">
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        );
      }

      return elements;
    }

    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review</h2>
                <p className="text-gray-600 text-sm">Review your GROW note</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="prose prose-sm max-w-none">
                  {renderFormattedNote(noteContent)}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowReview(false)}
                  className="px-6 py-3 border rounded-full font-semibold hover:bg-gray-50"
                >
                  ← Back to Chat
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LouisAvatar mood="bible" size={40} />
            <span className="text-lg font-semibold">Lil Louis</span>
          </div>
          <button
            onClick={() => router.push("/notes")}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((m, i) => {
            // Filter assistant messages to hide full formatted note structure
            const displayContent = m.role === "assistant" 
              ? filterMessageForDisplay(m.content)
              : m.content;
            
            return (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start items-start gap-3"
                }
              >
                {m.role === "assistant" && (
                  <LouisAvatar mood="bible" size={32} />
                )}
                <span
                  className={
                    m.role === "user"
                      ? "inline-block bg-blue-600 text-white px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-line leading-relaxed"
                      : "inline-block bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-line leading-relaxed"
                  }
                >
                  {displayContent}
                </span>
              </div>
            );
          })}
          {isSending && (
            <div className="flex justify-start items-start gap-3">
              <LouisAvatar mood="think" size={32} />
              <span className="inline-block bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                Thinking...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 px-6 py-4">
          {showSaveButton ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 flex items-center gap-2"
              >
                <span>←</span>
                <span>{saving ? "Saving..." : "Save Note Now"}</span>
              </button>
              <button
                onClick={() => setShowSaveButton(false)}
                className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700"
              >
                No, keep editing
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !isSending && handleSend()
                }
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSend}
                disabled={isSending || !input.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

