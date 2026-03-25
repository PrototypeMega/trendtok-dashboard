import { Calendar, Clock, Send } from "lucide-react";

export default function Publishing() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Publishing Schedule</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Schedule and manage your video posts
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
          <Calendar size={20} />
          Schedule New Post
        </button>
        <button className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
          <Send size={20} />
          Publish Now
        </button>
      </div>

      {/* Publishing Calendar */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Scheduled Posts</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-cyan-500 pl-4 py-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">Trending React Tips</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  React Best Practices #2
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock size={16} />
                  March 26, 2:00 PM
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="inline-block bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 text-xs px-2 py-1 rounded">
                TikTok
              </span>
              <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-xs px-2 py-1 rounded">
                Instagram
              </span>
            </div>
          </div>

          <div className="border-l-4 border-violet-500 pl-4 py-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">Design System Deep Dive</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The Kinetic Curator - Part 3
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock size={16} />
                  March 27, 10:00 AM
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="inline-block bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 text-xs px-2 py-1 rounded">
                TikTok
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* No Videos Message */}
      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 text-center">
        <p className="text-yellow-800 dark:text-yellow-200">
          No approved videos to publish yet.{" "}
          <span className="font-semibold">Review videos in the Approval Queue</span> to start
          scheduling posts.
        </p>
      </div>
    </div>
  );
}
