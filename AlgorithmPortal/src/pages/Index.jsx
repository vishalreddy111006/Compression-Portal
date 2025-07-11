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
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setStats(null);
    setProcessedData(null);
  };

  const processFile = async (compress) => {
    if (!uploadedFile) {
      toast({
        title: 'No file selected',
        description: 'Please upload a file first.',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    const startTime = Date.now();

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const inputData = new Uint8Array(arrayBuffer);

      let result;
      if (compress) {
        result = algorithms[selectedAlgorithm].compress(inputData);
      } else {
        result = algorithms[selectedAlgorithm].decompress(inputData);
      }

      const timeTaken = Date.now() - startTime;

      setStats({
        inputSize: inputData.length,
        outputSize: result.length,
        compressionRatio: parseFloat(
          compress
            ? (inputData.length / result.length).toFixed(2)
            : (result.length / inputData.length).toFixed(2)
        ),
        timeTaken,
        algorithm: selectedAlgorithm.toUpperCase(),
        mode: compress ? 'compress' : 'decompress'
      });

      setProcessedData(result);
      setIsCompressed(compress);

      toast({
        title: `${compress ? 'Compression' : 'Decompression'} complete!`,
        description: `File processed in ${timeTaken}ms using ${selectedAlgorithm.toUpperCase()}`
      });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: 'Processing failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white font-sans">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">ByteSqueeze</h1>
        </div>

        <div className="space-y-10">
          <FileUploader
            onFileUpload={handleFileUpload}
            uploadedFile={uploadedFile}
            onClearFile={handleClearFile}
          />

          {uploadedFile && (
            <>
              <AlgorithmSelector
                selectedAlgorithm={selectedAlgorithm}
                onAlgorithmChange={setSelectedAlgorithm}
                onShowDescription={(alg) => setShowDescription(alg)}
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <button
                  onClick={() => processFile(true)}
                  disabled={isProcessing}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="h-5 w-5" />
                  <span>{isProcessing ? 'Processing...' : 'Compress File'}</span>
                </button>
                <button
                  onClick={() => processFile(false)}
                  disabled={isProcessing}
                  className="bg-purple-200 hover:bg-purple-300 text-purple-900 px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FileText className="h-5 w-5" />
                  <span>{isProcessing ? 'Processing...' : 'Decompress File'}</span>
                </button>
              </div>
            </>
          )}

          {stats && <StatsDisplay stats={stats} />}

          {processedData && uploadedFile && (
            <FileDownloader
              data={processedData}
              originalFileName={uploadedFile.name}
              algorithm={selectedAlgorithm}
              isCompressed={isCompressed}
            />
          )}
        </div>

        {showDescription && (
          <AlgorithmDescription
            algorithm={showDescription}
            onClose={() => setShowDescription(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
