import React from "react";

const StatsDisplay = ({ stats }) => {
  if (!stats) return null;

  const isCompress = stats.mode === "compress";

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const spaceSaved = stats.inputSize - stats.outputSize;
  const spaceSavedPercentage = ((spaceSaved / stats.inputSize) * 100).toFixed(1);
  const isSpaceSaved = spaceSaved > 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-8 text-center">
        {isCompress ? "Compression Results" : "Decompression Results"}
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Original or Compressed Size */}
        <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-2xl shadow p-6 text-center">
          <h3 className="text-sm font-medium text-indigo-600 mb-2">
            {isCompress ? "Original Size" : "Compressed Size"}
          </h3>
          <p className="text-3xl font-bold text-zinc-800 dark:text-white">
            {formatSize(stats.inputSize)}
          </p>
        </div>

        {/* Compressed or Decompressed Size */}
        <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-2xl shadow p-6 text-center">
          <h3 className="text-sm font-medium text-emerald-600 mb-2">
            {isCompress ? "Compressed Size" : "Decompressed Size"}
          </h3>
          <p className="text-3xl font-bold text-zinc-800 dark:text-white">
            {formatSize(stats.outputSize)}
          </p>
        </div>

        {/* Compression Ratio */}
        <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-2xl shadow p-6 text-center">
          <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Compression Ratio
          </h3>
          <p className={`text-3xl font-bold ${isSpaceSaved ? "text-green-600" : "text-red-500"}`}>
            {stats.compressionRatio}:1
          </p>
          <p className="text-sm text-zinc-500 mt-1">
            {isSpaceSaved
              ? `Space saved: ${formatSize(Math.abs(spaceSaved))} (${spaceSavedPercentage}%)`
              : `Size increased by: ${formatSize(Math.abs(spaceSaved))} (${spaceSavedPercentage}%)`}
          </p>
        </div>
      </div>

      {/* Processing Time and Algorithm */}
      <div className="mt-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow p-6 text-center">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
          Processing Time
        </h3>
        <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
          {stats.timeTaken} ms
        </p>
        <p className="text-sm text-zinc-500 mt-1">
          Algorithm: <span className="font-medium">{stats.algorithm}</span>
        </p>
      </div>
    </div>
  );
};

export default StatsDisplay;
