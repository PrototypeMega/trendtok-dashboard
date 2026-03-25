import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Film,
  CheckCircle,
  Moon,
  Sun,
  Zap,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import TrendingTopics from "./pages/TrendingTopics";
import VideoStudio from "./pages/VideoStudio";
import ApprovalQueue from "./pages/ApprovalQueue";
import Publishing from "./pages/Publishing";
import Analytics from "./pages/Analytics";
import Automations from "./pages/Automations";

type PageType =
  | "dashboard"
  | "trends"
  | "studio"
  | "queue"
  | "publishing"
  | "analytics"
  | "automations";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "trends":
        return <TrendingTopics />;
      case "studio":
        return <VideoStudio />;
      case "queue":
        return <ApprovalQueue />;
      case "publishing":
        return <Publishing />;
      case "analytics":
        return <Analytics />;
      case "automations":
        return <Automations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={darkMode ? "dark" : ""}
      style={{
        backgroundColor: darkMode ? "#0f172a" : "#ffffff",
        color: darkMode ? "#f1f5f9" : "#1a202c",
      }}
    >
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`w-64 border-r transition-colors ${
            darkMode
              ? "border-gray-700 bg-slate-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="p-6 border-b border-inherit">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              TrendTok AI
            </h1>
          </div>

          <nav className="p-4 space-y-2">
            {/* Dashboard Section */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase text-gray-500 mb-3">
                Dashboard
              </p>
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "dashboard"
                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200"
                    : darkMode
                    ? "hover:bg-slate-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </button>
            </div>

            {/* Content Creation Section */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase text-gray-500 mb-3">
                Content Creation
              </p>
              <button
                onClick={() => setCurrentPage("trends")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "trends"
                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200"
                    : darkMode
                    ? "hover:bg-slate-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <TrendingUp size={20} />
                <span>Trends</span>
              </button>
              <button
                onClick={() => setCurrentPage("studio")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "studio"
                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200"
                    : darkMode
                    ? "hover:bg-slate-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Film size={20} />
                <span>Video Studio</span>
              </button>
              <button
                onClick={() => setCurrentPage("queue")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "queue"
                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200"
                    : darkMode
                    ? "hover:bg-slate-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <CheckCircle size={20} />
                <span>Approval Queue</span>
              </button>
            </div>

            {/* Publishing Section */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase text-gray-500 mb-3">
                Publishing
              </p>
              <button
                onClick={() => setCurrentPage("publishing")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "publishing"
                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200"
                    : darkMode
                    ? "hover:bg-slate-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Film size={20} />
                <span>Publishing</span>
              </button>
              <button
                onClick={() => setCurrentPage("analytics")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "analytics"
                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200"
                    : darkMode
                    ? "hover:bg-slate-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <TrendingUp size={20} />
                <span>Analytics</span>
              </button>
              <button
                onClick={() => setCurrentPage("automations")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === "automations"
                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200"
                    : darkMode
                    ? "hover:bg-slate-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Zap size={20} />
                <span>Automations</span>
              </button>
            </div>
          </nav>

          {/* Dark Mode Toggle */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                darkMode
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                  : "bg-gray-100 text-blue-600 hover:bg-gray-200"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">{renderPage()}</div>
      </div>
    </div>
  );
}
