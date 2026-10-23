import { FileText, Mic } from "lucide-react";

import { type Project } from "@/types";

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "All",
  "Full Stack",
  "Backend Systems",
  "AI Systems",
] as const;

// ─── Project Data ─────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    slug: "property-voice-ai",
    title: "Property Voice AI",
    category: "AI Systems",
    tag: "Real-time voice",
    description:
      "A real-time voice negotiation trainer: practice closing a real-estate deal against David, an emotionally adaptive GPT-4o seller. Token streaming over Socket.IO, sentence-level TTS, barge-in, and a 5-dimension scoring engine.",
    tech: ["React.js", "Node.js", "Socket.IO", "OpenAI GPT-4o", "Web Speech API"],
    year: "2026",
    annotation: "Voice AI",
    href: "/projects/property-voice-ai",
    image: "/projects/twilio.png",
    githubUrl: "https://github.com/Ajayvish0/prop-voice",
    liveUrl: "https://propvoice.netlify.app/",
    icon: Mic,
    stat: { label: "seller moods", value: "5" },
    featured: true,
  },
  {
    slug: "pdf-chat",
    title: "PDF-Chat Application",
    category: "Full Stack",
    tag: "RAG / documents",
    description:
      "Conversational querying over PDF documents with FastAPI, LangChain, React, PostgreSQL, and Google Drive storage — 85% response relevance and 50% faster API responses with async FastAPI.",
    tech: ["FastAPI", "LangChain", "React.js", "PostgreSQL", "Google Drive API"],
    year: "2024",
    annotation: "RAG",
    href: "/projects/pdf-chat",
    image: "/projects/pdfchat.png",
    githubUrl: "https://github.com/Ajayvish0/AI_PDF_CHAT",
    icon: FileText,
    stat: { label: "relevance", value: "85%" },
    featured: true,
  },
];
