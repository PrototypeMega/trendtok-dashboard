export default function VideoStudio() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Video Studio</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate AI-powered videos from trending topics
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Select Topic
          </label>
          <select className="w-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2">
            <option>Choose a trending topic...</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Video Style</label>
          <div className="grid grid-cols-3 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="style" className="w-4 h-4" />
              <span>Viral</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="style" className="w-4 h-4" />
              <span>News</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="style" className="w-4 h-4" />
              <span>Educational</span>
            </label>
          </div>
        </div>

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Generate Video
        </button>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 text-center">
        <p className="text-blue-800 dark:text-blue-200">
          Select a trending topic to generate a video.
        </p>
      </div>
    </div>
  );
}
