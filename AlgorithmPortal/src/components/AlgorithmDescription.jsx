import React from 'react';
import { X } from 'lucide-react';

const AlgorithmDescription = ({ algorithm, onClose }) => {
  if (!algorithm) return null;

  const { name, description, bestFor, details } = algorithm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-purple-900 text-white rounded-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-lg border border-purple-400 relative">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-purple-700">
          <h2 className="text-xl font-semibold">{name}</h2>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-red-400 transition-colors p-1 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-purple-100">
          <div>
            <h3 className="text-white font-semibold mb-1">Overview</h3>
            <p>{details.overview}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-1">How it Works</h3>
            <ul className="list-disc pl-5 space-y-1">
              {details.howItWorks.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-green-400 font-semibold mb-1">Advantages</h3>
              <ul className="list-disc pl-5 space-y-1">
                {details.advantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-orange-300 font-semibold mb-1">Disadvantages</h3>
              <ul className="list-disc pl-5 space-y-1">
                {details.disadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-cyan-300 font-semibold mb-1">Complexity</h3>
            <p className="font-mono">{details.complexity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDescription;
