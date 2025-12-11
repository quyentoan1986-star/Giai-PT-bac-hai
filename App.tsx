import React, { useState } from 'react';
import { Coefficients, Solution } from './types';
import InputForm from './components/InputForm';
import SolutionDisplay from './components/SolutionDisplay';
import GraphDisplay from './components/GraphDisplay';
import AIExplanation from './components/AIExplanation';

const App: React.FC = () => {
  const [coefficients, setCoefficients] = useState<Coefficients>({ a: 1, b: -5, c: 4 });
  const [solution, setSolution] = useState<Solution | null>(null);

  const handleCoefficientChange = (key: keyof Coefficients, value: number) => {
    setCoefficients(prev => ({ ...prev, [key]: value }));
  };

  const solveEquation = () => {
    const { a, b, c } = coefficients;
    
    // Case 1: Not a quadratic equation (a = 0)
    if (a === 0) {
      if (b === 0) {
        setSolution({
          delta: 0,
          x1: null,
          x2: null,
          hasRealRoots: false,
          message: c === 0 ? "Phương trình vô số nghiệm" : "Phương trình vô nghiệm"
        });
      } else {
        const x = -c / b;
        setSolution({
          delta: 0,
          x1: x,
          x2: x,
          hasRealRoots: true,
          message: "Đây là phương trình bậc nhất (a=0). Có một nghiệm duy nhất."
        });
      }
      return;
    }

    // Case 2: Quadratic equation
    const delta = b * b - 4 * a * c;

    if (delta > 0) {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      setSolution({
        delta,
        x1,
        x2,
        hasRealRoots: true,
        message: "Phương trình có 2 nghiệm phân biệt"
      });
    } else if (delta === 0) {
      const x = -b / (2 * a);
      setSolution({
        delta,
        x1: x,
        x2: x,
        hasRealRoots: true,
        message: "Phương trình có nghiệm kép"
      });
    } else {
      setSolution({
        delta,
        x1: null,
        x2: null,
        hasRealRoots: false,
        message: "Phương trình vô nghiệm thực"
      });
    }
  };

  // Solve initially on mount effect or just leave blank until user clicks? 
  // Let's solve automatically for better UX on first load
  React.useEffect(() => {
    solveEquation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="bg-blue-600 text-white p-2 rounded-lg">
                <span className="text-xl font-bold font-serif">ƒ(x)</span>
             </div>
             <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Quadratic Master</h1>
          </div>
          <a 
            href="https://ai.google.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Powered by Gemini
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Giải Phương Trình Bậc Hai
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nhập các hệ số để nhận kết quả tức thì, xem đồ thị trực quan và nhận lời giải thích chi tiết từ trí tuệ nhân tạo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input and Solution */}
          <div className="lg:col-span-5 space-y-8">
            <InputForm 
              coefficients={coefficients} 
              onChange={handleCoefficientChange}
              onSolve={solveEquation}
            />
            <SolutionDisplay solution={solution} />
          </div>

          {/* Right Column: Graph */}
          <div className="lg:col-span-7">
             <GraphDisplay coefficients={coefficients} />
          </div>
        </div>

        {/* Bottom Section: AI Explanation */}
        <div className="mt-8">
          <AIExplanation coefficients={coefficients} />
        </div>
      </main>
    </div>
  );
};

export default App;
