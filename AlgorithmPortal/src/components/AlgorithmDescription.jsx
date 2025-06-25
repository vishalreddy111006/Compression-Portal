import React from 'react';
import { X } from 'lucide-react';

const algorithmDetails = {
  huffman: {
    title: 'Huffman Coding',
    overview:
      'Huffman uses shorter binary codes for frequent characters to reduce file size.',
    howItWorks: [
      'Count character frequencies',
      'Build a binary tree based on frequency',
      'Assign shorter codes to frequent characters',
      'Encode using the new codes'
    ],
    advantages: [
      'Great for text compression',
      'Lossless and efficient',
      'Smaller output for repetitive data'
    ],
    disadvantages: [
      'Needs frequency table',
      'Not good for random data',
      'Slightly complex to implement'
    ],
    complexity: 'O(n log n) time, O(n) space'
  },
  rle: {
    title: 'Run-Length Encoding (RLE)',
    overview:
      'RLE replaces repeated characters with a single value and count.',
    howItWorks: [
      'Scan input left to right',
      'Count repeated characters',
      'Store count and character',
      'Repeat until end'
    ],
    advantages: [
      'Very simple and fast',
      'Best for repeating patterns',
      'Easy to implement'
    ],
    disadvantages: [
      'Can grow file size',
      'Not suitable for complex data',
      'Works poorly on noisy input'
    ],
    complexity: 'O(n) time, O(1) space'
  },
  lz77: {
    title: 'LZ77 Compression',
    overview:
      'LZ77 finds repeating patterns and replaces them with references.',
    howItWorks: [
      'Use a sliding window',
      'Find longest past match',
      'Replace with (distance, length)',
      'Slide window and repeat'
    ],
    advantages: [
      'Good for general data',
      'Widely used (gzip, PNG)',
      'Adapts well to input'
    ],
    disadvantages: [
      'Needs larger memory',
      'Slower than RLE',
      'More complex logic'
    ],
    complexity: 'O(n log n) time, O(window size) space'
  }
};

const AlgorithmDescription = ({ algorithm, onClose }) => {
  if (!algorithm) return null;

  const details = algorithmDetails[algorithm];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-purple-900 border border-purple-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto text-white shadow-xl">
        {/* Header */}
        <div className="border-b border-purple-700 p-4 flex items-center justify-between bg-purple-800/50 rounded-t-2xl">
          <h2 className="text-xl font-bold tracking-wide">{details.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-800 rounded-lg transition-colors text-purple-300 hover:text-red-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-200">Overview</h3>
            <p className="text-purple-300">{details.overview}</p>
          </div>

          {/* How it works */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-200">How it Works</h3>
            <ol className="space-y-2">
              {details.howItWorks.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-purple-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Pros and cons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-400">Advantages</h3>
              <ul className="space-y-2">
                {details.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span className="text-purple-200">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-orange-400">Disadvantages</h3>
              <ul className="space-y-2">
                {details.disadvantages.map((disadvantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span className="text-purple-200">{disadvantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Complexity */}
          <div className="bg-purple-800/40 rounded-xl p-4 border border-purple-700">
            <h3 className="text-lg font-semibold mb-2 text-purple-200">Complexity</h3>
            <p className="text-purple-300 font-mono">{details.complexity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDescription;
