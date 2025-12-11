import { GoogleGenAI } from "@google/genai";
import { Coefficients } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMathExplanation = async (coeffs: Coefficients): Promise<string> => {
  try {
    const { a, b, c } = coeffs;
    
    const prompt = `
      Bạn là một giáo viên dạy toán giỏi và thân thiện.
      Hãy giải thích chi tiết từng bước cách giải phương trình bậc hai sau đây:
      ${a}x² + ${b}x + ${c} = 0

      Hãy trình bày rõ ràng:
      1. Xác định các hệ số a, b, c.
      2. Tính biệt thức Delta (Δ).
      3. Biện luận số nghiệm dựa trên Delta.
      4. Tính các nghiệm (nếu có).
      
      Sử dụng định dạng Markdown để trình bày công thức toán học cho dễ đọc.
      Giọng văn khuyến khích, dễ hiểu cho học sinh cấp 3.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Standard fast response
      }
    });

    return response.text || "Xin lỗi, hiện tại tôi không thể đưa ra lời giải thích.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với gia sư AI. Vui lòng kiểm tra API Key hoặc thử lại sau.";
  }
};
