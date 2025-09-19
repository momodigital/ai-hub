// frontend/src/App.jsx
import { useState } from 'react';
import './index.css';

function App() {
  const [question, setQuestion] = useState('');
  const [aiChoice, setAiChoice] = useState('gpt');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');

    try {
      // GANTI DENGAN URL BACKEND-MU (misal dari Render)
      const res = await fetch('https://your-backend.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, ai_choice: aiChoice }),
      });

      const data = await res.json();

      if (data.error) {
        setAnswer("🤖 Error: " + data.error);
      } else {
        setAnswer(data.answer || "Tidak ada jawaban.");
      }
    } catch (err) {
      setAnswer("❌ Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🤖 Tanya AI Apa Saja</h1>
      <p>Pilih AI favoritmu, lalu ajukan pertanyaan — semua jawaban tampil di sini!</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Pilih AI:
            <select value={aiChoice} onChange={(e) => setAiChoice(e.target.value)}>
              <option value="gpt">GPT (OpenAI)</option>
              <option value="gemini">Gemini (Google)</option>
              <option value="claude">Claude (Anthropic)</option>
            </select>
          </label>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ketik pertanyaanmu di sini..."
          rows="5"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Bertanya...' : 'Kirim Pertanyaan'}
        </button>
      </form>

      {answer && (
        <div className="answer-box">
          <h3>💬 Jawaban dari {aiChoice.toUpperCase()}:</h3>
          <div className="answer-content">{answer}</div>
        </div>
      )}
    </div>
  );
}

export default App;
