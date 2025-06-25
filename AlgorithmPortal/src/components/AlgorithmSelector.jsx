import React from 'react';

const algorithms = [
  {
    id: 'huffman',
    name: 'Huffman Coding',
    description: 'Efficient binary coding based on frequency.',
    bestFor: 'Text files, structured data',
    details: {
      overview: 'Uses shorter binary codes for more frequent characters.',
      howItWorks: [
        'Count frequency of each character',
        'Build a binary tree based on frequency',
        'Assign shorter codes to frequent characters',
        'Replace each character with its code'
      ],
      advantages: [
        'Lossless compression',
        'Efficient for known patterns',
        'Optimized space usage'
      ],
      disadvantages: [
        'Requires tree storage',
        'Needs 2 passes over data',
        'Not great for already-compressed data'
      ],
      complexity: 'Time: O(n log n), Space: O(n)'
    }
  },
  {
    id: 'rle',
    name: 'Run-Length Encoding',
    description: 'Compresses repeated characters efficiently.',
    bestFor: 'Images with large uniform areas',
    details: {
      overview: 'Replaces repeated data with counts and values.',
      howItWorks: [
        'Scan input sequentially',
        'Count identical elements',
        'Store as (count, value)',
        'Repeat for all sequences'
      ],
      advantages: [
        'Fast and simple',
        'Perfect for repetitive data',
        'Low memory footprint'
      ],
      disadvantages: [
        'Inefficient for non-repetitive data',
        'Limited compression ratio',
        'May bloat complex files'
      ],
      complexity: 'Time: O(n), Space: O(1)'
    }
  },
  {
    id: 'lz77',
    name: 'LZ77',
    description: 'Sliding window compression using previous sequences.',
    bestFor: 'General-purpose and mixed files',
    details: {
      overview: 'Encodes data as references to previously seen strings.',
      howItWorks: [
        'Maintain a sliding window',
        'Find repeated substrings',
        'Replace with (distance, length)',
        'Move forward and repeat'
      ],
      advantages: [
        'Works for any file type',
        'Adapts to structure',
        'Basis of ZIP/gzip'
      ],
      disadvantages: [
        'Slower for small/simple data',
        'Uses more memory',
        'Performance varies with window size'
      ],
      complexity: 'Time: O(n²) naive, O(n log n) optimized, Space: O(window size)'
    }
  }
];

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange, onShowDescription }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 font-sans">
      <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
        Choose Compression Algorithm
      </h2>

      <div className="grid gap-5">
        {algorithms.map((algorithm) => {
          return (
            <div
              key={algorithm.id}
              onClick={() => {
                onAlgorithmChange(algorithm.id);
                onShowDescription(algorithm);
              }}
              className={`rounded-xl p-5 cursor-pointer border transition-all duration-300 shadow-md hover:shadow-lg
                border-purple-600 bg-purple-800/40 hover:bg-purple-700/40 hover:border-purple-400`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="radio"
                  checked={selectedAlgorithm === algorithm.id}
                  readOnly
                  className="mt-1 h-5 w-5 text-purple-400 bg-purple-900 border-purple-500"
                />
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-white">{algorithm.name}</h3>
                  <p className="text-sm mt-1 text-purple-300">{algorithm.description}</p>
                  <p className="text-xs mt-2 text-purple-400">
                    Best for: {algorithm.bestFor}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
