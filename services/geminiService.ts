import { GoogleGenAI, Type } from "@google/genai";
import { DamageRegion } from "../types";

/**
 * Generates a scene visualization based on the claim description.
 * Uses the 'gemini-3-pro-image-preview' model for high-quality generation.
 */
export const generateSceneImage = async (prompt: string): Promise<string | null> => {
  try {
    // Initialize inside the function to capture the latest API_KEY after user selection
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      },
    });

    // Parse the response to find the image part
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          // Assuming JPEG or PNG based on model default, usually it returns mimeType
          const mimeType = part.inlineData.mimeType || 'image/png'; 
          return `data:${mimeType};base64,${base64EncodeString}`;
        }
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error generating scene image:", error);
    return null;
  }
};

/**
 * Detects damage regions in a base64 encoded image using Gemini Flash.
 */
export const detectDamageRegions = async (base64Image: string): Promise<DamageRegion[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Clean base64 string if it contains data URI prefix
    const data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: data
            }
          },
          {
            text: "Analyze this image of a vehicle. Identify distinct areas of damage (e.g., 'Shattered Taillight', 'Dented Bumper', 'Scratched Door'). For each area, return a bounding box and a label."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              description: { type: Type.STRING },
              box_2d: {
                type: Type.ARRAY,
                items: { type: Type.NUMBER },
                description: "Bounding box coordinates [ymin, xmin, ymax, xmax] normalized to 0-1."
              }
            }
          }
        }
      }
    });

    const regions = JSON.parse(response.text || "[]");
    
    return regions.map((r: any, index: number) => ({
      id: `dmg-${index}`,
      label: r.label,
      description: r.description,
      confidence: 0.95, // Mock confidence as it's not standard output yet
      box: {
        ymin: r.box_2d[0],
        xmin: r.box_2d[1],
        ymax: r.box_2d[2],
        xmax: r.box_2d[3]
      }
    }));

  } catch (error) {
    console.error("Error detecting damage:", error);
    return [];
  }
}
