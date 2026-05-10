# Automated Resume Screening Tool (FastAPI + Next.js)

<div align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi"/>
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</div>

<br/>

## 📌 Project Overview
The **Automated Resume Screening Tool** is an AI-powered system designed to streamline the recruitment process. It leverages Natural Language Processing (NLP) to parse candidate resumes, extract relevant skills and entities, and semantically match them against a given Job Description (JD). 

By utilizing HuggingFace Transformers (Sentence-BERT) and SpaCy, this tool provides a highly accurate semantic match score, allowing HR professionals and recruiters to focus on the top candidates without manual sifting.

## 🚀 Features
- **Semantic JD Matching:** Uses deep learning to understand context rather than just keyword matching.
- **Entity Extraction:** Automatically extracts candidate names and other entities using SpaCy.
- **Multi-Format Support:** Processes both PDF and DOCX resume formats.
- **Modern Full-Stack UI:** A responsive, real-time dashboard built with Next.js and Tailwind CSS.
- **High-Performance Backend:** FastAPI backend ensuring rapid text processing and model inference.

## 🏗️ Architecture
```text
[ Resumes (PDF/DOCX) ]     [ Job Description (Text) ]
           |                            |
           v                            v
+-------------------------------------------------------+
|                Next.js Frontend Dashboard             |
+---------------------------+---------------------------+
                            | (REST API Calls)
                            v
+-------------------------------------------------------+
|                   FastAPI Backend                     |
|                                                       |
|  1. Text Extraction (PyPDF2, docx2txt)                |
|  2. Text Cleaning (Regex)                             |
|  3. Named Entity Recognition (SpaCy 'en_core_web_sm') |
|  4. Semantic Vectorization (Sentence-Transformers)    |
|  5. Cosine Similarity Scoring (Scikit-Learn)          |
+-------------------------------------------------------+
                            |
                            v
[ JSON Response: Ranked Candidates with Scores ]
```

## 📂 Folder Structure
```text
Enterprise-AI-Resume-Screener/
│
├── backend/                  # FastAPI Application
│   ├── app/                  # Core NLP logic and Document IO
│   │   ├── document_io.py    # PDF/DOCX extraction logic
│   │   └── nlp_engine.py     # SpaCy and Transformer models
│   ├── main.py               # FastAPI endpoints
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # Next.js Application
│   ├── src/app/              # Next.js app router pages
│   │   ├── page.tsx          # Main Dashboard UI
│   │   ├── layout.tsx        # Global Layout
│   │   └── globals.css       # Tailwind Directives
│   ├── package.json          # Node dependencies
│   └── tailwind.config.ts    # Tailwind configuration
│
├── docs/                     # Project Guides and Reports
│   └── Resume_Screening_Project_Guide.md # Comprehensive tutorial
│
├── data/                     # Sample datasets (optional)
├── outputs/                  # Exported CSVs and reports
└── README.md                 # This file
```

## 🛠️ Installation & Setup

### 1. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python -m spacy download en_core_web_sm

# Start FastAPI server
uvicorn main:app --reload
```
The API will run at `http://localhost:8000`

### 2. Frontend Setup
```bash
cd frontend
npm install

# Start Next.js server
npm run dev
```
The Dashboard will run at `http://localhost:3000`

## 💡 Learning Outcomes
- Full-Stack integration bridging Python ML models with React-based frontends.
- Applying Sentence Transformers to real-world semantic search problems.
- Building robust, asynchronous REST APIs with FastAPI.
- State management and API fetching in Next.js using App Router.
