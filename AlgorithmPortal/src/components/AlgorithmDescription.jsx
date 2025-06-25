import React from 'react';
import { X } from 'lucide-react';

const algorithmDetails = {
  huffman: {
    title: 'Huffman Coding',
    overview: 'Huffman coding is a lossless data compression algorithm that uses variable-length prefix codes based on the frequency of characters in the input.',
    howItWorks: [
      'Count the frequency of each character in the input',
      'Build a binary tree with characters as leaves, ordered by frequency',
      'Assign shorter codes to more frequent characters',
      'Replace each character with its corresponding code'
    ],
    advantages: [
      'Optimal for known character frequencies',
      'No information loss (lossless)',
      'Works well with text and structured data'
    ],
    disadvantages: [
      'Requires two passes through the data',
      'Overhead of storing the frequency table',
      'Not effective for random or already compressed data'
    ],
    complexity: 'Time: O(n log n), Space: O(n)'
  },
  rle: {
    title: 'Run-Length Encoding (RLE)',
    overview: 'RLE is a simple form of lossless data compression that replaces sequences of identical characters with a count followed by the character.',
    howItWorks: [
      'Scan the input data sequentially',
      'Count consecutive identical characters',
      'Replace runs with count + character pairs',
      'Single characters are represented as count of 1'
    ],
    advantages: [
      'Very simple to implement',
      'Fast compression and decompression',
      'Excellent for data with many repeated values',
      'Works well with simple graphics and images'
    ],
    disadvantages: [
      'Can increase size if data has few repetitions',
      'Not suitable for random data',
      'Limited compression ratio for complex data'
    ],
    complexity: 'Time: O(n), Space: O(1)'
  },
  lz77: {
    title: 'LZ77 (Lempel-Ziv 1977)',
    overview: 'LZ77 is a dictionary-based compression algorithm that uses a sliding window to find repeated sequences and replace them with references.',
    howItWorks: [
      'Maintain a sliding window of recent data',
      'Search for the longest match in the window',
      'Replace matches with (distance, length, next character) tuples',
      'Move the window forward and repeat'
    ],
    advantages: [
      'Good general-purpose compression',
      'Adapts to data patterns automatically',
      'Forms basis for many modern algorithms (deflate, gzip)',
      'Works well with various data types'
    ],
    disadvantages: [
      'More complex than simpler algorithms',
      'Compression ratio depends on window size',
      'Slower than RLE for simple patterns'
    ],
    complexity: 'Time: O(n²) naive, O(n log n) optimized, Space: O(window size)'
  }
};

const AlgorithmDescription = ({ algorithm, onClose }) => {
  if (!algorithm) return null;

  const details = algorithmDetails[algorithm];

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="top-0 bg-background border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{details.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-muted-foreground">{details.overview}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">How it Works</h3>
            <ol className="space-y-2">
              {details.howItWorks.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Advantages</h3>
              <ul className="space-y-2">
                {details.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-muted-foreground">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-orange-600">Disadvantages</h3>
              <ul className="space-y-2">
                {details.disadvantages.map((disadvantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span className="text-muted-foreground">{disadvantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Complexity</h3>
            <p className="text-muted-foreground font-mono">{details.complexity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDescription;
