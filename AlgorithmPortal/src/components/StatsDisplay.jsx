import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  const chartData = [
    {
      name: isCompress ? "Original" : "Compressed",
      size: stats.inputSize,
    },
    {
      name: isCompress ? "Compressed" : "Decompressed",
      size: stats.outputSize,
    },
  ];

  const spaceSaved = stats.inputSize - stats.outputSize;
  const spaceSavedPercentage = ((spaceSaved / stats.inputSize) * 100).toFixed(
    1
  );
  const isSpaceSaved = spaceSaved > 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">
        {isCompress ? "Compression Results" : "Decompression Results"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stats Cards */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {isCompress ? "Original Size" : "Compressed Size"}
              </h3>
              <p className="text-2xl font-bold">
                {formatSize(stats.inputSize)}
              </p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {isCompress ? "Compressed Size" : "Decompressed Size"}
              </h3>
              <p className="text-2xl font-bold text-primary">
                {formatSize(stats.outputSize)}
              </p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Compression Ratio
            </h3>
            <p
              className={`text-3xl font-bold ${
                isSpaceSaved ? "text-green-600" : "text-red-600"
              }`}
            >
              {stats.compressionRatio}:1
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isSpaceSaved
                ? `Space saved: ${formatSize(
                    Math.abs(spaceSaved)
                  )} (${spaceSavedPercentage}%)`
                : `Size increased by: ${formatSize(
                    Math.abs(spaceSaved)
                  )} (${spaceSavedPercentage}%)`}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Processing Time
            </h3>
            <p className="text-2xl font-bold">{stats.timeTaken}ms</p>
            <p className="text-sm text-muted-foreground mt-1">
              Algorithm: {stats.algorithm}
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-card border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Size Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [formatSize(value), "Size"]}
                labelFormatter={(label) => `${label} File`}
              />
              <Bar
                dataKey="size"
                fill="#00000" // dark blue
                radius={[4, 4, 0, 0]}
                activeBar={{ fill: "#1e293b" }}
                hoverBackgroundColor={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
