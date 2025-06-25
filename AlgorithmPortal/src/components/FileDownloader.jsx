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
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">
              {isCompressed ? 'Compressed' : 'Decompressed'} File Ready
            </h3>
            <p className="text-muted-foreground">
              Your file has been {isCompressed ? 'compressed' : 'decompressed'} using {algorithm.toUpperCase()}
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileDownloader;
