import React, { useEffect, useRef } from 'react';
import { Coefficients } from '../types';

interface InputFormProps {
  coefficients: Coefficients;
  onChange: (key: keyof Coefficients, value: number) => void;
  onSolve: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ coefficients, onChange, onSolve }) => {
  const equationRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Coefficients) => {
    const val = parseFloat(e.target.value);
    onChange(key, isNaN(val) ? 0 : val);
  };

  // Logic tạo chuỗi LaTeX thông minh
  const generateLatex = (a: number, b: number, c: number) => {
    // Format number to remove excessive decimals
    const fmt = (n: number) => parseFloat(n.toFixed(5));
    const A = fmt(a);
    const B = fmt(b);
    const C = fmt(c);

    if (A === 0 && B === 0 && C === 0) return "0 = 0";

    let tex = "";

    // Xử lý hạng tử bậc 2: ax^2
    if (A !== 0) {
      if (A === -1) tex += "-x^2";
      else if (A === 1) tex += "x^2";
      else tex += `${A}x^2`;
    }

    // Xử lý hạng tử bậc 1: bx
    if (B !== 0) {
      if (tex !== "") {
        tex += B > 0 ? " + " : " - ";
        const absB = Math.abs(B);
        tex += (absB === 1 ? "" : absB) + "x";
      } else {
        // Nếu là hạng tử đầu tiên
        if (B === -1) tex += "-x";
        else if (B === 1) tex += "x";
        else tex += `${B}x`;
      }
    }

    // Xử lý hạng tử tự do: c
    if (C !== 0) {
      if (tex !== "") {
        tex += C > 0 ? " + " : " - ";
        tex += Math.abs(C);
      } else {
        tex += `${C}`;
      }
    }

    if (tex === "") tex = "0";
    
    return tex + " = 0";
  };

  useEffect(() => {
    if (equationRef.current && (window as any).katex) {
      const latex = generateLatex(coefficients.a, coefficients.b, coefficients.c);
      try {
        (window as any).katex.render(latex, equationRef.current, {
          throwOnError: false,
          displayMode: true,
          output: 'html'
        });
      } catch (e) {
        console.error("KaTeX render error", e);
      }
    }
  }, [coefficients]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </span>
        Nhập hệ số
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">Hệ số a</label>
          <input
            type="number"
            step="any"
            value={coefficients.a}
            onChange={(e) => handleChange(e, 'a')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-semibold text-gray-800"
          />
          <span className="absolute right-4 top-9 text-gray-400 font-serif italic">x²</span>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">Hệ số b</label>
          <input
            type="number"
            step="any"
            value={coefficients.b}
            onChange={(e) => handleChange(e, 'b')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-semibold text-gray-800"
          />
          <span className="absolute right-4 top-9 text-gray-400 font-serif italic">x</span>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">Hệ số c</label>
          <input
            type="number"
            step="any"
            value={coefficients.c}
            onChange={(e) => handleChange(e, 'c')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-semibold text-gray-800"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 p-4 rounded-xl mb-6">
        <div className="w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0 overflow-x-auto">
             <div ref={equationRef} className="text-blue-800 min-h-[30px] flex items-center justify-center sm:justify-start"></div>
        </div>
        <button
          onClick={onSolve}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
        >
          Giải phương trình
        </button>
      </div>
    </div>
  );
};

export default InputForm;