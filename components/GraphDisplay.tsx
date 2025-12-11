import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Coefficients, GraphPoint } from '../types';

interface GraphDisplayProps {
  coefficients: Coefficients;
}

const GraphDisplay: React.FC<GraphDisplayProps> = ({ coefficients }) => {
  const { a, b, c } = coefficients;

  const data = useMemo<GraphPoint[]>(() => {
    if (a === 0 && b === 0) return [];

    // Determine the vertex x coordinate: x = -b / (2a)
    // If linear (a=0), just center around 0 or the root
    let centerX = 0;
    if (a !== 0) {
      centerX = -b / (2 * a);
    } else if (b !== 0) {
      // Linear equation bx + c = 0 -> x = -c/b
      centerX = -c / b;
    }

    // Generate points around the center
    const points: GraphPoint[] = [];
    const range = 10; // How wide the graph is
    const step = 0.5;

    for (let x = centerX - range; x <= centerX + range; x += step) {
      const y = a * x * x + b * x + c;
      points.push({ x, y });
    }
    return points;
  }, [a, b, c]);

  if (a === 0 && b === 0 && c === 0) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-96 flex items-center justify-center text-gray-400">
            Biểu đồ sẽ xuất hiện khi bạn nhập hệ số.
        </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
        </span>
        Đồ thị hàm số y = {a}x² + {b}x + {c}
      </h2>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
                dataKey="x" 
                type="number" 
                domain={['auto', 'auto']} 
                tickFormatter={(val) => val.toFixed(1)}
                stroke="#6b7280"
            />
            <YAxis 
                stroke="#6b7280"
                domain={['auto', 'auto']}
            />
            <Tooltip 
                formatter={(value: number) => [value.toFixed(2), 'y']}
                labelFormatter={(label: number) => `x: ${label.toFixed(2)}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <ReferenceLine y={0} stroke="#000" strokeWidth={2} />
            <ReferenceLine x={0} stroke="#000" strokeWidth={2} />
            <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphDisplay;
