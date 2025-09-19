# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

import openai
import google.generativeai as genai
from anthropic import Anthropic

openai.api_key = os.getenv("OPENAI_API_KEY")
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
anthropic_client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

app = FastAPI(title="AI Ask Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str
    ai_choice: str

@app.post("/ask")
async def ask_ai(req: QueryRequest):
    try:
        if req.ai_choice == "gpt":
            if not openai.api_key:
                return {"error": "OpenAI API key belum diatur"}
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": req.question}],
                max_tokens=1000,
                temperature=0.7
            )
            return {"answer": response.choices[0].message.content.strip()}

        elif req.ai_choice == "gemini":
            if not os.getenv("GEMINI_API_KEY"):
                return {"error": "Gemini API key belum diatur"}
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(req.question)
            return {"answer": response.text.strip()}

        elif req.ai_choice == "claude":
            if not os.getenv("ANTHROPIC_API_KEY"):
                return {"error": "Claude API key belum diatur"}
            message = anthropic_client.messages.create(
                model="claude-3-haiku-20240307",  # lebih murah & cepat
                max_tokens=1000,
                messages=[{"role": "user", "content": req.question}]
            )
            return {"answer": message.content[0].text.strip()}

        else:
            return {"error": "Pilih AI: gpt, gemini, atau claude"}

    except Exception as e:
        return {"error": f"Error: {str(e)}"}
