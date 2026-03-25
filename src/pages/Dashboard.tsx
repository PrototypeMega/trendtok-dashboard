import { TrendingUp, Video, Eye, Zap } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to TrendTok AI - Your AI-powered content automation platform
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Videos Generated
              </p>
              <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                24
              </p>
            </div>
            <Video className="text-cyan-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Posted Today
              </p>
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                18
              </p>
            </div>
            <Zap className="text-violet-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Total Views
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                45.2K
              </p>
            </div>
            <Eye className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Engagement Rate
              </p>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                7.1%
              </p>
            </div>
            <TrendingUp className="text-pink-500" size={32} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-4 rounded-lg font-semibold transition-all hover:shadow-lg">
          Discover Trends
        </button>
        <button className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white px-6 py-4 rounded-lg font-semibold transition-all hover:shadow-lg">
          Generate Video
        </button>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-lg font-semibold transition-all hover:shadow-lg">
          View Analytics
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="font-semibold">Video Generated</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                React Hooks Tutorial
              </p>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              2 hours ago
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="font-semibold">Video Posted</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                CSS Grid Mastery
              </p>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              4 hours ago
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Trend Discovered</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                TypeScript Best Practices
              </p>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              6 hours ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
