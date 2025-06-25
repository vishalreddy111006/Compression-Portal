import React from 'react';
import { Info } from 'lucide-react';

const algorithms = [
  {
    id: 'huffman',
    name: 'Huffman Coding',
    description: 'Efficient binary coding based on frequency.',
    bestFor: 'Text files, structured data'
  },
  {
    id: 'rle',
    name: 'Run-Length Encoding',
    description: 'Compresses repeated characters efficiently.',
    bestFor: 'Images with large uniform areas'
  },
  {
    id: 'lz77',
    name: 'LZ77',
    description: 'Uses dictionary-based sliding window compression.',
    bestFor: 'Mixed content and general-purpose data'
  }
];

const AlgorithmSelector = ({
  selectedAlgorithm,
  onAlgorithmChange,
  onShowDescription
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 font-sans">
      <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
        Choose Compression Algorithm
      </h2>

      <div className="grid gap-5">
        {algorithms.map((algorithm) => {
          const isSelected = selectedAlgorithm === algorithm.id;
          return (
            <div
              key={algorithm.id}
              onClick={() => onAlgorithmChange(algorithm.id)}
              className={`rounded-xl p-5 cursor-pointer border transition-all duration-300 shadow-md hover:shadow-lg
                ${
                  isSelected
                    ? 'border-purple-400 bg-purple-700/50'
                    : 'border-purple-600 bg-purple-800/40 hover:bg-purple-700/40 hover:border-purple-400'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => onAlgorithmChange(algorithm.id)}
                    className="mt-1 h-5 w-5 text-purple-400 bg-purple-900 border-purple-500"
                  />
                  <div>
                    <h3
                      className={`text-lg font-semibold transition-colors duration-200 ${
                        isSelected ? 'text-white' : 'text-purple-200 group-hover:text-white'
                      }`}
                    >
                      {algorithm.name}
                    </h3>
                    <p
                      className={`text-sm mt-1 transition-colors duration-200 ${
                        isSelected ? 'text-purple-200' : 'text-purple-300 group-hover:text-purple-200'
                      }`}
                    >
                      {algorithm.description}
                    </p>
                    <p
                      className={`text-xs mt-2 transition-colors duration-200 ${
                        isSelected ? 'text-purple-300' : 'text-purple-400 group-hover:text-purple-300'
                      }`}
                    >
                      Best for: {algorithm.bestFor}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowDescription(algorithm.id);
                  }}
                  className="p-2 hover:bg-purple-600/30 rounded-lg transition-colors text-purple-300 hover:text-white"
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
