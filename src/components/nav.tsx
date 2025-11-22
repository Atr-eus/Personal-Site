"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Terminal,
  Home,
  BookOpen,
  User,
  CornerDownLeft,
  X,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";

type Command = {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  action: () => void;
};

export function Navigation() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    {
      id: "home",
      label: "Home",
      description: "Go to home page",
      icon: <Home size={18} />,
      action: () => {
        router.push("/");
        setIsOpen(false);
      },
    },
    {
      id: "blog",
      label: "Blog",
      description: "Read blog posts",
      icon: <BookOpen size={18} />,
      action: () => {
        window.open("https://an1ndya.gitbook.io/blog/", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "about",
      label: "About",
      description: "Learn about me",
      icon: <User size={18} />,
      action: () => {
        router.push("/about");
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
        setSearch("");
        setSelectedIndex(0);
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearch("");
      }

      if (isOpen) {
        if (e.key === "ArrowDown" || e.key === "j") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        if (e.key === "ArrowUp" || e.key === "k") {
          e.preventDefault();
          setSelectedIndex(
            (prev) =>
              (prev - 1 + filteredCommands.length) % filteredCommands.length,
          );
        }
        if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, search, selectedIndex, filteredCommands]);

  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border-border text-sm"
        >
          <Terminal size={16} />
          <span>Navigate...</span>
          <kbd className="ml-2 px-2 py-1 text-xs bg-background rounded border border-border">
            ⌘K
          </kbd>
        </Button>{" "}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              layout
              initial={{
                opacity: 0,
                scale: 0.8,
                borderRadius: "1.5rem",
                y: -20,
              }}
              animate={{ opacity: 1, scale: 1, borderRadius: "0.5rem", y: 0 }}
              exit={{ opacity: 0, scale: 0.9, borderRadius: "1.5rem", y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md mx-4 bg-background border border-border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Terminal size={18} className="text-muted-foreground" />
                <Input
                  autoFocus
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Type a command..."
                  className="bg-transparent border-0 shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, index) => (
                    <Button
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      variant="ghost"
                      className={`w-full justify-start flex items-center gap-3 px-4 py-3 h-auto text-left transition-colors ${index === selectedIndex
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                    >
                      <div className="text-muted-foreground">{cmd.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{cmd.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {cmd.description}
                        </div>
                      </div>
                    </Button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No commands found
                  </div>
                )}
              </div>

              <div className="border-t border-border px-4 py-2 bg-muted/30 text-xs text-muted-foreground flex items-center justify-around">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/60 border border-border">
                    <ArrowUpDown size={12} />
                  </div>
                  <span className="hidden sm:inline">Navigate</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/60 border border-border">
                    <CornerDownLeft size={12} />
                  </div>
                  <span className="hidden sm:inline">Select</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/60 border border-border">
                    <X size={12} />
                  </div>
                  <span className="hidden sm:inline">Close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
