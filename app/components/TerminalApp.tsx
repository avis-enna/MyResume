"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalAppProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function TerminalApp({ onClose, isOpen }: TerminalAppProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState("~");
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalOutputRef = useRef<HTMLDivElement>(null);

  // File system structure
  const fileSystem = {
    "~": {
      type: "directory",
      contents: ["about", "skills", "experience", "projects", "contact", "resume.txt"]
    },
    "~/about": {
      type: "directory",
      contents: ["whoami.txt", "education.txt", "certifications.txt", "mission.txt"]
    },
    "~/skills": {
      type: "directory", 
      contents: ["programming.txt", "frameworks.txt", "tools.txt", "databases.txt", "cloud.txt"]
    },
    "~/experience": {
      type: "directory",
      contents: ["cisco.txt", "internships.txt", "projects.txt", "achievements.txt"]
    },
    "~/projects": {
      type: "directory",
      contents: ["library-management/", "ecommerce-microservices/", "network-automation/", "portfolio/"]
    },
    "~/contact": {
      type: "directory",
      contents: ["email.txt", "linkedin.txt", "github.txt", "phone.txt"]
    }
  };

  // File contents
  const fileContents: Record<string, string[]> = {
    "~/resume.txt": [
      "SIVAREDDY GUNDA",
      "Software Engineer Trainee @ Cisco",
      "==========================================",
      "",
      "📧 Contact: sivareddy.gunda@example.com",
      "🔗 LinkedIn: linkedin.com/in/sivareddy",
      "💻 GitHub: github.com/sivareddy",
      "",
      "🎓 Education: B.Tech Computer Science",
      "🏢 Current: Software Engineer Trainee at Cisco",
      "🌟 Certifications: CCNA, Python, Cloud Computing",
      "",
      "Use 'cd <directory>' to explore different sections",
      "Use 'ls' to list directory contents",
      "Use 'cat <file>' to view file contents"
    ],
    "~/about/whoami.txt": [
      "$ whoami",
      "sivareddy",
      "",
      "Role: Software Engineer Trainee",
      "Company: Cisco Systems",
      "Location: India",
      "Specialization: Network Programming & Cloud Solutions",
      "",
      "A passionate software engineer with expertise in",
      "Python, Java, React, and network automation."
    ],
    "~/about/education.txt": [
      "🎓 EDUCATION",
      "============",
      "",
      "🏛️  Bachelor of Technology - Computer Science",
      "📅 2020-2024",
      "🎯 CGPA: 8.5/10",
      "",
      "📚 Relevant Coursework:",
      "• Data Structures & Algorithms",
      "• Computer Networks", 
      "• Database Management Systems",
      "• Software Engineering",
      "• Machine Learning"
    ],
    "~/skills/programming.txt": [
      "💻 PROGRAMMING LANGUAGES",
      "========================",
      "",
      "🐍 Python 3.11+",
      "   └── Frameworks: Django, Flask, FastAPI",
      "   └── Libraries: NumPy, Pandas, Requests",
      "",
      "☕ Java 17+", 
      "   └── Spring Boot, Spring Security",
      "   └── Maven, Gradle",
      "",
      "⚛️  JavaScript/TypeScript",
      "   └── React, Next.js, Node.js",
      "   └── Express.js, Socket.io"
    ],
    "~/experience/cisco.txt": [
      "🏢 CISCO SYSTEMS - Software Engineer Trainee",
      "=============================================",
      "",
      "📅 Duration: July 2024 - Present",
      "📍 Location: Bangalore, India",
      "",
      "🔧 Responsibilities:",
      "• Developing network automation tools using Python",
      "• Working on enterprise network solutions", 
      "• Contributing to cloud-native applications",
      "• Collaborating with cross-functional teams",
      "",
      "🏆 Achievements:",
      "• Reduced network configuration time by 40%",
      "• Implemented automated testing frameworks",
      "• Received excellence award for innovation"
    ],
    "~/projects/library-management/README.md": [
      "📚 LIBRARY MANAGEMENT SYSTEM",
      "============================",
      "",
      "A comprehensive library management system built with:",
      "",
      "🛠️ Tech Stack:",
      "• Backend: Python + Flask + SQLAlchemy",
      "• Frontend: HTML, CSS, JavaScript",
      "• Database: SQLite/PostgreSQL",
      "• Authentication: JWT tokens",
      "",
      "✨ Features:",
      "• Book catalog management",
      "• Member registration and management", 
      "• Issue/return tracking",
      "• Fine calculation",
      "• Admin dashboard",
      "",
      "🚀 Live Demo: Available on GitHub"
    ],
    "~/contact/email.txt": [
      "📧 EMAIL CONTACT",
      "================",
      "",
      "Primary: sivareddy.gunda@cisco.com",
      "Personal: sivareddy.dev@gmail.com",
      "",
      "📝 Best for:",
      "• Job opportunities",
      "• Project collaborations", 
      "• Technical discussions",
      "• Professional inquiries",
      "",
      "⏰ Response time: Usually within 24 hours"
    ]
  };

  // Initialize terminal
  useEffect(() => {
    if (isOpen && !history.length) {
      setHistory([
        "Terminal App v2.0 - Portfolio Navigation System",
        "===============================================",
        "",
        "Welcome to Siva's Interactive Terminal!",
        "",
        "🧭 Navigation Commands:",
        "• ls          - List directory contents",
        "• cd <dir>    - Change directory", 
        "• cat <file>  - View file contents",
        "• pwd         - Show current directory",
        "• clear       - Clear terminal",
        "• help        - Show all commands",
        "",
        "💡 Try: cd about && ls && cat whoami.txt",
        ""
      ]);
    }
  }, [isOpen, history.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const getCurrentDirContents = () => {
    const dirInfo = fileSystem[currentDirectory as keyof typeof fileSystem];
    return dirInfo ? dirInfo.contents : [];
  };

  const handleCommand = (command: string) => {
    const cmd = command.trim();
    const args = cmd.split(/\s+/);
    const baseCmd = args[0];
    let output: string[] = [];

    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    if (!baseCmd) return;

    switch (baseCmd) {
      case "help":
        output = [
          "📖 AVAILABLE COMMANDS",
          "=====================",
          "",
          "🧭 Navigation:",
          "  ls              - List directory contents",
          "  cd <directory>  - Change to directory",
          "  pwd             - Print working directory",
          "  cd ..           - Go to parent directory", 
          "  cd ~            - Go to home directory",
          "",
          "📄 File Operations:",
          "  cat <file>      - Display file contents",
          "",
          "🔧 Terminal:",
          "  clear           - Clear screen",
          "  history         - Show command history",
          "  exit            - Close terminal",
          "",
          "💡 Examples:",
          "  cd about        - Go to about directory",
          "  ls              - List files and folders",
          "  cat resume.txt  - View resume file",
          ""
        ];
        break;

      case "ls":
        const contents = getCurrentDirContents();
        if (contents.length === 0) {
          output = ["Directory is empty"];
        } else {
          output = [
            `Contents of ${currentDirectory}:`,
            "",
            ...contents.map(item => {
              const isDir = item.endsWith('/') || fileSystem[`${currentDirectory}/${item}` as keyof typeof fileSystem];
              return `${isDir ? '📁' : '📄'} ${item}`;
            }),
            ""
          ];
        }
        break;

      case "pwd":
        output = [currentDirectory];
        break;

      case "cd":
        if (args.length < 2) {
          output = ["Usage: cd <directory>", "Use 'ls' to see available directories"];
        } else {
          const targetDir = args[1];
          let newPath = "";

          if (targetDir === "~") {
            newPath = "~";
          } else if (targetDir === "..") {
            const parts = currentDirectory.split('/');
            if (parts.length > 1) {
              parts.pop();
              newPath = parts.join('/') || "~";
            } else {
              newPath = "~";
            }
          } else if (targetDir.startsWith('/')) {
            newPath = targetDir;
          } else {
            newPath = currentDirectory === "~" ? `~/${targetDir}` : `${currentDirectory}/${targetDir}`;
          }

          // Check if directory exists
          if (fileSystem[newPath as keyof typeof fileSystem]) {
            setCurrentDirectory(newPath);
            output = [`Changed directory to ${newPath}`];
          } else {
            const availableDirs = getCurrentDirContents().filter(item => 
              fileSystem[`${currentDirectory}/${item}` as keyof typeof fileSystem]
            );
            output = [
              `cd: ${targetDir}: No such directory`,
              "",
              `Available directories in ${currentDirectory}:`,
              ...availableDirs.map(dir => `  📁 ${dir}`)
            ];
          }
        }
        break;

      case "cat":
        if (args.length < 2) {
          output = ["Usage: cat <filename>", "Use 'ls' to see available files"];
        } else {
          const filename = args.slice(1).join(' ');
          let filePath = "";
          
          if (filename.startsWith('/')) {
            filePath = filename;
          } else {
            filePath = currentDirectory === "~" ? `~/${filename}` : `${currentDirectory}/${filename}`;
          }

          if (fileContents[filePath]) {
            output = fileContents[filePath];
          } else {
            // Check if file exists in current directory contents
            const contents = getCurrentDirContents();
            const availableFiles = contents.filter(item => !item.endsWith('/') && 
              !fileSystem[`${currentDirectory}/${item}` as keyof typeof fileSystem]
            );
            output = [
              `cat: ${filename}: No such file`,
              "",
              `Available files in ${currentDirectory}:`,
              ...availableFiles.map(file => `  📄 ${file}`)
            ];
          }
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "history":
        output = commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`);
        break;

      case "exit":
        onClose();
        return;

      default:
        output = [
          `bash: ${baseCmd}: command not found`,
          "",
          "💡 Type 'help' to see available commands",
          "💡 Use 'ls' to explore directories",
          "💡 Use 'cd <directory>' to navigate"
        ];
    }

    setHistory(prev => [...prev, `${currentDirectory}$ ${command}`, ...output, ""]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        handleCommand(input);
      }
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: isMinimized ? 0 : 1, 
        scale: isMinimized ? 0.95 : 1,
        y: isMinimized ? 20 : 0 
      }}
      className={`fixed inset-0 md:inset-auto md:top-20 md:left-20 md:right-20 md:bottom-20 
        bg-black/95 border border-green-400/30 rounded-lg shadow-2xl backdrop-blur-sm z-50
        ${isMinimized ? 'pointer-events-none' : ''}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-3 border-b border-green-400/30 bg-green-400/5">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors"
            onClick={onClose}
          ></div>
          <div 
            className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"
            onClick={() => setIsMinimized(!isMinimized)}
          ></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-green-400 font-mono text-sm ml-4">Terminal - {currentDirectory}</span>
        </div>
        <span className="text-green-400/60 text-xs font-mono">Interactive Portfolio Terminal</span>
      </div>

      {/* Terminal Content */}
      <div className="flex flex-col h-[calc(100%-60px)]">
        {/* Terminal Output */}
        <div 
          ref={terminalOutputRef}
          className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 space-y-1 terminal-scrollbar"
        >
          {history.map((line, index) => (
            <div key={index} className={line.startsWith(currentDirectory + '$') ? 'text-green-300' : 'text-green-400/80'}>
              {line}
            </div>
          ))}
        </div>

        {/* Command Input */}
        <div className="flex items-center space-x-2 p-4 border-t border-green-400/20 bg-green-400/5">
          <span className="text-green-400 font-mono font-bold">{currentDirectory}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 font-mono outline-none"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </motion.div>
  );
}
