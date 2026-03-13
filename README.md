# 🎯 AutoApply Intelligence

> AI-powered job application analyzer — know your chances before you apply.

**Live Demo:** [autoapply-intelligence.vercel.app](https://autoapply-intelligence.vercel.app) &nbsp;|&nbsp; **Backend:** [Render](https://autoapply-backend-rxkp.onrender.com)

---

## What It Does

Upload your resume PDF + paste any job description → get an instant AI-powered breakdown:

- **Match Score** — how well your resume matches the JD (0–100%)
- **Skill Gap Analysis** — matched skills vs missing skills
- **ATS Compatibility Check** — 7-point resume format audit
- **AI Improvement Suggestions** — 5 specific, actionable fixes
- **Cover Letter Generator** — personalized cover letter using your actual resume content

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, Axios |
| Backend | Python, FastAPI, Uvicorn |
| AI | Google Gemini API (gemini-2.0-flash) |
| NLP | scikit-learn (TF-IDF, cosine similarity) |
| PDF Parsing | pdfminer.six |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project Structure
```
autoapply-intelligence/
├── backend/
│   ├── core/
│   │   ├── parser.py        # PDF text extraction
│   │   ├── scorer.py        # TF-IDF match scoring + skill detection
│   │   ├── analyzer.py      # ATS compatibility checks
│   │   └── ai_engine.py     # Gemini API integration
│   ├── routes/
│   │   └── analyze.py       # FastAPI endpoint
│   ├── main.py
│   └── requirements.txt
└── frontend/
    └── src/
        ├── components/
        │   ├── UploadZone.jsx
        │   └── Results.jsx
        └── App.jsx
```

---

## Run Locally

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt

# Create .env file
echo GEMINI_API_KEY=your_key_here > .env

uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## How It Works
```
Resume PDF  +  Job Description
        ↓
   PDF Text Extraction (pdfminer.six)
        ↓
   TF-IDF Cosine Similarity → Match Score
        ↓
   Skill Keyword Matching → Skill Gap
        ↓
   ATS Format Checks → ATS Score
        ↓
   Gemini API → Suggestions + Cover Letter
        ↓
   React Dashboard
```

---

## Built By

**Vemulapalli Sesha Sai Vinayak** — 2nd Year B.Tech CSE, SRKR Engineering College  
[GitHub](https://github.com/vinayakvemulapalli234-eng)