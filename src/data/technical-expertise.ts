import {
  Server, Terminal, Code2, Database, Layout, BarChart2, Cloud, Container, Shield, GitBranch, FileType, Binary, Cpu, Boxes, Network, Bot, Radio, Atom
} from "lucide-react";

export const DOMAINS = [
  {
    index: "01",
    title: "AI & GenAI",
    descriptor: "LLM Applications & Agents",
    depth: "Real-time voice agents, RAG, tool calling, and LLM evaluation",
    techs: [
      { label: "LangChain", Icon: Network },
      { label: "LangGraph", Icon: Boxes },
      { label: "RAG", Icon: Database },
      { label: "AI Agents", Icon: Bot },
      { label: "MCP", Icon: Server },
    ],
  },
  {
    index: "02",
    title: "Backend Systems",
    descriptor: "APIs, Real-time & Async Processing",
    depth: "REST and WebSocket services with background jobs and RBAC",
    techs: [
      { label: "FastAPI", Icon: Terminal },
      { label: "Node.js", Icon: Server },
      { label: "Express.js", Icon: Code2 },
      { label: "Nest.js", Icon: Boxes },
      { label: "Socket.IO", Icon: Radio },
    ],
  },
  {
    index: "03",
    title: "Frontend",
    descriptor: "Product Interfaces",
    depth: "React and Next.js apps with predictable state management",
    techs: [
      { label: "React.js", Icon: Atom },
      { label: "Next.js", Icon: Layout },
      { label: "Redux Toolkit", Icon: Binary },
      { label: "Tailwind CSS", Icon: FileType },
    ],
  },
  {
    index: "04",
    title: "Languages",
    descriptor: "Programming Foundations",
    depth: "Typed application code and systems fundamentals",
    techs: [
      { label: "Python", Icon: Code2 },
      { label: "TypeScript", Icon: FileType },
      { label: "JavaScript", Icon: Binary },
      { label: "SQL", Icon: Cpu },
      { label: "C/C++", Icon: Cpu },
    ],
  },
  {
    index: "05",
    title: "Data & DevOps",
    descriptor: "Storage, Deployment & Delivery",
    depth: "Relational and document stores, containers, and CI/CD on AWS",
    techs: [
      { label: "PostgreSQL", Icon: Database },
      { label: "MongoDB", Icon: BarChart2 },
      { label: "MySQL", Icon: Database },
      { label: "Docker", Icon: Container },
      { label: "AWS", Icon: Cloud },
      { label: "CI/CD", Icon: GitBranch },
      { label: "RBAC", Icon: Shield },
    ],
  },
] as const;
