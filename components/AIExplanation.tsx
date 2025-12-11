import React, { useState } from 'react';
import { Coefficients } from '../types';
import { getMathExplanation } from '../services/geminiService';

interface AIExplanationProps {
  coefficients: Coefficients;
}

const AIExplanation: React.FC<AIExplanationProps> = ({ coefficients }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    const result = await getMathExplanation(coefficients);
    setExplanation(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-lg border border-indigo-100 mt-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-indigo-900 flex items-center mb-4 sm:mb-0">
          <span className="bg-indigo-200 text-indigo-700 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </span>
          Gia sư AI Gemini
        </h2>
        <button
          onClick={handleExplain}
          disabled={loading || (coefficients.a === 0 && coefficients.b === 0 && coefficients.c === 0)}
          className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition-all flex items-center ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang suy nghĩ...
            </>
          ) : (
            'Giải thích chi tiết'
          )}
        </button>
      </div>

      <div className="prose prose-indigo max-w-none text-gray-700 bg-white/50 p-4 rounded-xl border border-indigo-50 min-h-[100px]">
        {explanation ? (
          <div className="whitespace-pre-line leading-relaxed">
             {explanation}
          </div>
        ) : (
          <p className="text-gray-400 italic text-center py-4">
            Nhấn nút "Giải thích chi tiết" để xem hướng dẫn từng bước từ AI.
          </p>
        )}
      </div>
    </div>
  );
};

export default AIExplanation;
