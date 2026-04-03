import { callWithRetry } from '../lib/geminiClient'

const EXTRACTION_PROMPT = (role: string) => `Analyze this photo of the ${role} and describe their appearance in a single English sentence for use as a character description in Disney Pixar 3D animation style image generation.

Format (follow exactly):
Korean [man/woman] [age range], [build], [face shape], [eye description], [hair style and color], [skin tone], [overall vibe/aura]

Example:
Korean man early 30s, athletic build, angular jaw, warm brown eyes, short neat dark hair parted to the side, tan skin, confident warm smile

Rules:
- English only, one sentence
- Be specific about hair (length, style, color, parting)
- Include approximate age range
- Describe build/body type
- Note distinctive features
- Keep it under 40 words
- Do NOT include clothing (clothing changes per scene)`

export function buildExtractionPrompt(role: 'groom' | 'bride'): string {
  return EXTRACTION_PROMPT(role)
}

export async function extractFixedPrompt(
  photoBase64: string,
  role: 'groom' | 'bride'
): Promise<string> {
  if (process.env.DEMO_MODE === 'true') {
    return role === 'groom'
      ? 'Korean man early 30s, athletic build, angular jaw, warm brown eyes, short neat dark hair, tan skin, confident warm smile'
      : 'Korean woman late 20s, petite build, soft oval face, large gentle brown eyes, long straight black hair with middle part, fair skin, bright lovely smile'
  }

  const prompt = buildExtractionPrompt(role)

  return callWithRetry(async (client) => {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-preview-05-20',
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: photoBase64 } },
            { text: prompt },
          ],
        },
      ],
    })

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) throw new Error('Failed to extract appearance description')
    return text.trim()
  })
}
