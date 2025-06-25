import React from 'react';
import { Info } from 'lucide-react';

const algorithms = [
  {
    id: 'huffman',
    name: 'Huffman Coding',
    description: 'Variable-length prefix coding based on character frequency',
    bestFor: 'Text files, structured data'
  },
  {
    id: 'rle',
    name: 'Run-Length Encoding',
    description: 'Replaces consecutive identical characters with count + character',
    bestFor: 'Images with large uniform areas, simple graphics'
  },
  {
    id: 'lz77',
    name: 'LZ77',
    description: 'Dictionary-based compression using sliding window',
    bestFor: 'General purpose, mixed content types'
  }
];

const AlgorithmSelector = ({ 
  selectedAlgorithm, 
  onAlgorithmChange, 
  onShowDescription 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Choose Compression Algorithm</h2>
      <div className="grid gap-4">
        {algorithms.map((algorithm) => (
          <div
            key={algorithm.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedAlgorithm === algorithm.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
            onClick={() => onAlgorithmChange(algorithm.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  checked={selectedAlgorithm === algorithm.id}
                  onChange={() => onAlgorithmChange(algorithm.id)}
                  className="h-4 w-4 text-primary"
                />
                <div>
                  <h3 className="font-semibold">{algorithm.name}</h3>
                  <p className="text-sm text-muted-foreground">{algorithm.description}</p>
                  <p className="text-xs text-primary mt-1">Best for: {algorithm.bestFor}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowDescription(algorithm.id);
                }}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
