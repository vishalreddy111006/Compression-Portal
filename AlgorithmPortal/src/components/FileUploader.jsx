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

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
  {!uploadedFile ? (
    <div
      className={`group border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer 
        hover:bg-gradient-to-b from-transprent via-gray-350 to-[#b3d4fc] ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-105'
            : 'border-border hover:border-primary hover:bg-primary/5'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <div className="transition-transform duration-300 group-hover:-translate-y-2">
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Upload a file to compress</h3>
        <p className="text-muted-foreground mb-4">
          Drag and drop your file here, or click to browse
        </p>
        <p className="text-sm text-muted-foreground">
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
    <div className="border rounded-lg p-6 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <File className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold">{uploadedFile.name}</h3>
            <p className="text-sm text-muted-foreground">
              {formatFileSize(uploadedFile.size)} • {uploadedFile.type || 'Unknown type'}
            </p>
          </div>
        </div>
        <button
          onClick={onClearFile}
          className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
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
