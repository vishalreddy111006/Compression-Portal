import React, { useState } from 'react';
import { toast } from '../hooks/use-toast';
import FileUploader from '../components/FileUploader';
import AlgorithmSelector from '../components/AlgorithmSelector';
import StatsDisplay from '../components/StatsDisplay';
import FileDownloader from '../components/FileDownloader';
import AlgorithmDescription from '../components/AlgorithmDescription';
import * as huffman from '../utils/huffman';
import * as rle from '../utils/rle';
import * as lz77 from '../utils/lz77';
import { Zap, FileText } from 'lucide-react';

const algorithms = {
  huffman,
  rle,
  lz77
};

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('huffman');
  const [stats, setStats] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [isCompressed, setIsCompressed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDescription, setShowDescription] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setStats(null);
    setProcessedData(null);
    console.log('File uploaded:', file.name, file.size, 'bytes');
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setStats(null);
    setProcessedData(null);
  };

  const processFile = async (compress) => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file first.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    const startTime = Date.now();

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const inputData = new Uint8Array(arrayBuffer);

      console.log(`Starting ${compress ? 'compression' : 'decompression'} with ${selectedAlgorithm}...`);

      let result;
      if (compress) {
        result = algorithms[selectedAlgorithm].compress(inputData);
      } else {
        result = algorithms[selectedAlgorithm].decompress(inputData);
      }

      const timeTaken = Date.now() - startTime;

      // Prepare stats
      const inputSize = inputData.length;
      const outputSize = result.length;

      setStats({
        inputSize,
        outputSize,
        compressionRatio: parseFloat(
          compress
            ? (inputSize / outputSize).toFixed(2)
            : (outputSize / inputSize).toFixed(2)
        ),
        timeTaken,
        algorithm: selectedAlgorithm.toUpperCase(),
        mode: compress ? 'compress' : 'decompress'
      });

      setProcessedData(result);
      setIsCompressed(compress);

      toast({
        title: `${compress ? 'Compression' : 'Decompression'} complete!`,
        description: `File processed in ${timeTaken}ms using ${selectedAlgorithm.toUpperCase()}`,
      });

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen from-background to-muted/20 bg-gradient-to-b from-white to-blue-200">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl text-black font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
              File Compressor
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compress and decompress files using Huffman Coding, Run-Length Encoding, and LZ77 algorithms. 
            Learn how different compression techniques work in real-time.
          </p>
        </div>

        <div className="space-y-8">
          {/* File Upload */}
          <FileUploader
            onFileUpload={handleFileUpload}
            uploadedFile={uploadedFile}
            onClearFile={handleClearFile}
          />

          {uploadedFile && (
            <>
              {/* Algorithm Selection */}
              <AlgorithmSelector
                selectedAlgorithm={selectedAlgorithm}
                onAlgorithmChange={setSelectedAlgorithm}
                onShowDescription={setShowDescription}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <button
                  onClick={() => processFile(true)}
                  disabled={isProcessing}
                  className="font-bold hover:bg-blue-400 hover:font-normal  text-black text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <Zap className="h-5 w-5" />
                  <span >{isProcessing ? 'Processing...' : 'Compress File'}</span>
                </button>
                <button
                  onClick={() => processFile(false)}
                  disabled={isProcessing}
                  className=" font-bold bg-secondary hover:bg-blue-400 hover:font-normal  text-secondary-foreground px-8 py-3 rounded-lg hover:bg-secondary/90 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  <FileText className="h-5 w-5" />
                  <span>{isProcessing ? 'Processing...' : 'Decompress File'}</span>
                </button>
              </div>
            </>
          )}

          {/* Stats Display */}
          {stats && <StatsDisplay stats={stats} />}

          {/* Download Section */}
          {processedData && uploadedFile && (
            <FileDownloader
              data={processedData}
              originalFileName={uploadedFile.name}
              algorithm={selectedAlgorithm}
              isCompressed={isCompressed}
            />
          )}
        </div>

        {/* Description Modal */}
        <AlgorithmDescription
          algorithm={showDescription}
          onClose={() => setShowDescription(null)}
        />
      </div>
    </div>
  );
};

export default Index;
