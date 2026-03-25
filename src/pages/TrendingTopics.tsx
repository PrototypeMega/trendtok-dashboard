export default function TrendingTopics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Trending Topics</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Discover and explore trending topics
        </p>
      </div>

      <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
        Discover Trends
      </button>

      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 text-center">
        <p className="text-yellow-800 dark:text-yellow-200">
          No trending topics discovered yet. Click "Discover Trends" to get started.
        </p>
      </div>
    </div>
  );
}
