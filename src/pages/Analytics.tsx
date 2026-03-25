import { TrendingUp, Eye, Heart, MessageCircle, Share2 } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Analytics & Performance</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your video performance and engagement metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Total Views
              </p>
              <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                45.2K
              </p>
            </div>
            <Eye className="text-cyan-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Total Likes
              </p>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                3.2K
              </p>
            </div>
            <Heart className="text-pink-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Comments
              </p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                245
              </p>
            </div>
            <MessageCircle className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Shares
              </p>
              <p className="text-3xl font-bold text-coral-600 dark:text-orange-400">
                189
              </p>
            </div>
            <Share2 className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Engagement Rate */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <TrendingUp className="text-green-500" size={40} />
          <div>
            <p className="text-gray-600 dark:text-gray-400">Engagement Rate</p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">
              7.1%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ↑ 2.3% from last week
            </p>
          </div>
        </div>
      </div>

      {/* Top Performing Videos */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Top Performing Videos</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold">React Hooks Explained</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Posted March 20
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">12.5K views</p>
              <p className="text-sm text-green-600 dark:text-green-400">
                8.2% engagement
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-semibold">CSS Grid Tutorial</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Posted March 18
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">8.7K views</p>
              <p className="text-sm text-green-600 dark:text-green-400">
                6.5% engagement
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">TypeScript Best Practices</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Posted March 15
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">7.2K views</p>
              <p className="text-sm text-green-600 dark:text-green-400">
                5.8% engagement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
