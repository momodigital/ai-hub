## 🖥️ Deploy Backend ke Render

1. Buat akun di https://render.com
2. Buat **Web Service**
3. Hubungkan repo GitHub ini
4. Set Runtime: **Python 3.11**
5. Build Command: `pip install -r requirements.txt`
6. Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
7. Tambahkan Environment Variables:
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
   - `ANTHROPIC_API_KEY`
8. Deploy → catat URL-nya (misal: `https://ai-ask-backend.onrender.com`)
9. Ganti URL ini di `frontend/src/App.jsx`
