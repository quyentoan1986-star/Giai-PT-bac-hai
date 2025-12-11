import React, { useEffect, useRef } from 'react';
import { Solution } from '../types';

interface SolutionDisplayProps {
  solution: Solution | null;
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution }) => {
  const deltaRef = useRef<HTMLDivElement>(null);
  const x1Ref = useRef<HTMLDivElement>(null);
  const x2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (solution && (window as any).katex) {
      try {
        // Render Delta
        if (deltaRef.current) {
          const deltaTex = `\\Delta = b^2 - 4ac = ${parseFloat(solution.delta.toFixed(4))}`;
          (window as any).katex.render(deltaTex, deltaRef.current, {
            throwOnError: false
          });
        }

        // Render x1
        if (solution.hasRealRoots && solution.x1 !== null && x1Ref.current) {
          const x1Tex = `x_1 = ${parseFloat(solution.x1.toFixed(4))}`;
          (window as any).katex.render(x1Tex, x1Ref.current, {
            throwOnError: false
          });
        }

        // Render x2
        if (solution.hasRealRoots && solution.x2 !== null && x2Ref.current) {
          const x2Tex = `x_2 = ${parseFloat(solution.x2.toFixed(4))}`;
          (window as any).katex.render(x2Tex, x2Ref.current, {
            throwOnError: false
          });
        }
      } catch (e) {
        console.error("KaTeX render error", e);
      }
    }
  }, [solution]);

  if (!solution) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        Kết quả tính toán
      </h2>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Biệt thức Delta (Δ)</p>
          <div ref={deltaRef} className="text-xl text-gray-800 overflow-x-auto">
             {/* Fallback if katex fails */}
             Δ = {solution.delta.toFixed(2)}
          </div>
        </div>

        <div className={`p-4 rounded-xl border-l-4 ${solution.hasRealRoots ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <p className={`font-semibold text-lg ${solution.hasRealRoots ? 'text-green-800' : 'text-red-800'}`}>
            {solution.message}
          </p>
        </div>

        {solution.hasRealRoots && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-500 font-bold mb-1">Nghiệm x₁</p>
              <div ref={x1Ref} className="text-2xl font-bold text-blue-800 overflow-x-auto">
                {solution.x1?.toFixed(4)}
              </div>
            </div>
            {solution.x2 !== null && solution.x2 !== solution.x1 && (
               <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
               <p className="text-sm text-blue-500 font-bold mb-1">Nghiệm x₂</p>
               <div ref={x2Ref} className="text-2xl font-bold text-blue-800 overflow-x-auto">
                 {solution.x2?.toFixed(4)}
               </div>
             </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionDisplay;