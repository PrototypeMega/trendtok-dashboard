export default function ApprovalQueue() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Approval Queue</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Review and approve videos before posting
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
        <div className="text-5xl mb-3">📹</div>
        <h3 className="text-xl font-semibold mb-2">No Videos to Review</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Videos generated in the Video Studio will appear here for your approval.
        </p>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-block">
          Go to Video Studio
        </button>
      </div>
    </div>
  );
}
