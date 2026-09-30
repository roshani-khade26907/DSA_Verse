import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/mentor', async (req, res) => {
    try {
      const { prompt, problemTitle, codeContext, history } = req.body as {
        prompt?: string;
        problemTitle?: string;
        codeContext?: string;
        history?: { sender: 'ai' | 'user'; text: string }[];
      };

      if (!prompt || !prompt.trim()) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(503).json({ error: 'GEMINI_API_KEY not configured' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const conversationContext = Array.isArray(history)
        ? history
            .slice(-6)
            .map((m) => `${m.sender === 'user' ? 'Student' : 'Mentor'}: ${m.text}`)
            .join('\n\n')
        : '';

      const fullPrompt = [
        problemTitle ? `Current Topic / Problem: ${problemTitle}` : '',
        codeContext && codeContext.trim() ? `Student C++ Code:\n${codeContext}` : '',
        conversationContext ? `Recent Conversation:\n${conversationContext}` : '',
        `Student Question: ${prompt}`,
      ]
        .filter(Boolean)
        .join('\n\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          systemInstruction:
            'You are an expert C++ Data Structures and Algorithms (DSA) Mentor for engineering students on DSAverse. ' +
            'Provide clear, accurate, directly relevant answers tailored to the exact question, algorithm, or C++ code asked by the student. ' +
            'Structure your response with: 1) Core Intuition, 2) Step-by-Step Logic or Dry Run, 3) C++ Implementation / STL Tips, and 4) Time and Space Complexity (write Big-O cleanly like O(N), O(log N), O(N^2) without dollar signs or LaTeX syntax). ' +
            'Never use raw $ or # markdown symbols in your output. Use clean numbered lists, bullet points, and concise C++ code blocks where helpful.',
        },
      });

      const reply = response.text || '';
      res.json({ reply: reply.replace(/[$#]/g, '') });
    } catch (error: any) {
      res.status(500).json({ error: error?.message || 'Failed to generate mentor response' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DSAverse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
