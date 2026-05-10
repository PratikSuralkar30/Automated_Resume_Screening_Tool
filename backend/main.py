import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
import io
import pandas as pd
from app.document_io import extract_text_from_bytes
from app.nlp_engine import load_models, clean_text, extract_entities, get_semantic_scores

# Ensure models are loaded at startup or lazily
nlp, transformer_model = load_models()

app = FastAPI(title="AI Resume Screening API")

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for simplicity
session_data = {
    "jd_text": "",
    "resumes": []
}

@app.post("/api/upload_jd")
async def upload_jd(jd_text: str = Form(...)):
    if not jd_text.strip():
        raise HTTPException(status_code=400, detail="JD text cannot be empty.")
    session_data["jd_text"] = clean_text(jd_text)
    return {"message": "Job Description uploaded successfully."}

@app.post("/api/upload_resumes")
async def upload_resumes(files: List[UploadFile] = File(...)):
    resumes_processed = []
    
    for file in files:
        if file.filename.endswith('.pdf') or file.filename.endswith('.docx'):
            file_bytes = await file.read()
            raw_text = extract_text_from_bytes(file_bytes, file.filename)
            cleaned_text = clean_text(raw_text)
            
            # Extract basic info
            name = extract_entities(cleaned_text, nlp)
            
            resumes_processed.append({
                "filename": file.filename,
                "name": name,
                "cleaned_text": cleaned_text
            })
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.filename}. Please upload PDF or DOCX.")
            
    session_data["resumes"] = resumes_processed
    return {"message": f"{len(resumes_processed)} resumes uploaded and processed successfully."}

@app.get("/api/rank_candidates")
async def rank_candidates():
    if not session_data["jd_text"]:
        raise HTTPException(status_code=400, detail="Please upload a Job Description first.")
    
    if not session_data["resumes"]:
        raise HTTPException(status_code=400, detail="Please upload resumes first.")
        
    jd_text = session_data["jd_text"]
    resume_texts = [r["cleaned_text"] for r in session_data["resumes"]]
    
    # Get Semantic Scores
    scores = get_semantic_scores(jd_text, resume_texts, transformer_model)
    
    results = []
    for i, resume in enumerate(session_data["resumes"]):
        results.append({
            "id": i + 1,
            "filename": resume["filename"],
            "name": resume["name"],
            "score": scores[i]
        })
        
    # Sort by score descending
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    
    return results

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
