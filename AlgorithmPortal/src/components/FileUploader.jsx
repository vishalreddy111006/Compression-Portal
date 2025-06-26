import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

const FileUploader = ({ onFileUpload, uploadedFile, onClearFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-sans">
      {!uploadedFile ? (
        <div
          className={`group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
            ${
              isDragOver
                ? 'border-purple-400 bg-purple-700/20 scale-105'
                : 'border-purple-600 bg-purple-800/30 hover:border-purple-400 hover:bg-purple-700/20'
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div className="transition-transform duration-300 group-hover:-translate-y-1">
            <Upload className="mx-auto h-12 w-12 text-purple-300 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">
              Upload a file to compress or Decompress
            </h3>
            <p className="text-sm text-purple-200 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-xs text-purple-300">
              Supports all file types • Max size: 10MB
            </p>
          </div>
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      ) : (
        <div className="border border-purple-600 bg-purple-800/40 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-purple-300" />
              <div>
                <h3 className="font-semibold text-white">{uploadedFile.name}</h3>
                <p className="text-sm text-purple-200">
                  {formatFileSize(uploadedFile.size)} • {uploadedFile.type || 'Unknown type'}
                </p>
              </div>
            </div>
            <button
              onClick={onClearFile}
              className="p-2 hover:bg-purple-700/30 text-purple-300 hover:text-red-400 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
