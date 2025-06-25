import React from 'react';
import { Download } from 'lucide-react';

const FileDownloader = ({ 
  data, 
  originalFileName, 
  algorithm, 
  isCompressed 
}) => {
  const handleDownload = () => {
    if (!data) return;

    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const extension = isCompressed ? `${algorithm}_` : '';
    const prefix = isCompressed ? 'compressed_' : 'decompressed_';
    const fileName = `${prefix}${extension}${originalFileName}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!data) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-1">
              {isCompressed ? 'Compressed' : 'Decompressed'} File Ready
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Your file has been {isCompressed ? 'compressed' : 'decompressed'} using <strong>{algorithm.toUpperCase()}</strong>
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition-colors shadow"
          >
            <Download className="h-5 w-5" />
            <span className="font-medium">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileDownloader;
