import { Zap, RotateCw, Calendar, CheckCircle, AlertCircle } from "lucide-react";

export default function Automations() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Workflow Automations</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set up and manage automated content workflows
        </p>
      </div>

      {/* Automation Templates */}
      <div className="space-y-4">
        {/* Daily Discovery */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-lg">
                <Calendar className="text-cyan-600 dark:text-cyan-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  Daily Trend Discovery
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs px-2 py-1 rounded">
                    Active
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Automatically discover trending topics every day at 9:00 AM
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
              Edit
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle size={16} className="text-green-500" />
              <span>Last run: Today at 9:05 AM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <RotateCw size={16} />
              <span>Next run: Tomorrow at 9:00 AM</span>
            </div>
          </div>
        </div>

        {/* Weekly Generate & Post */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-violet-100 dark:bg-violet-900 p-3 rounded-lg">
                <Zap className="text-violet-600 dark:text-violet-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  Weekly Generate & Post
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs px-2 py-1 rounded">
                    Active
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Generate and post videos every Monday at 10:00 AM
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
              Edit
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle size={16} className="text-green-500" />
              <span>Last run: Monday at 10:12 AM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <RotateCw size={16} />
              <span>Next run: Next Monday at 10:00 AM</span>
            </div>
          </div>
        </div>

        {/* Trend Monitor */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <AlertCircle className="text-orange-600 dark:text-orange-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  Trend Monitor
                  <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-xs px-2 py-1 rounded">
                    Paused
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get alerts when your target keywords start trending
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
              Enable
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <AlertCircle size={16} className="text-yellow-500" />
              <span>Monitoring: React, TypeScript, Vite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Execution History */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Recent Executions</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="font-semibold">Daily Trend Discovery</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Today at 9:05 AM
              </p>
            </div>
            <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs px-2 py-1 rounded">
              Success
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="font-semibold">Weekly Generate & Post</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monday at 10:12 AM
              </p>
            </div>
            <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs px-2 py-1 rounded">
              Success
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Daily Trend Discovery</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yesterday at 9:03 AM
              </p>
            </div>
            <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs px-2 py-1 rounded">
              Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
