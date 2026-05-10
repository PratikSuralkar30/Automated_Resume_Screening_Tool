# 📚 Master Guide: Automated Resume Screening Tool

This document is your comprehensive, end-to-end guide for building, understanding, and presenting the "Automated Resume Screening Tool" as a high-impact portfolio project.

---

## 1️⃣ PROJECT EXPLANATION

### Simple Explanation
Imagine an HR manager receives 500 resumes for a single job posting. Reading all of them manually would take weeks. The Automated Resume Screening Tool acts like an ultra-fast virtual assistant. You give it the Job Description (what the company wants) and all 500 resumes. It reads them instantly, understands the meaning behind the words, and gives each resume a score based on how well it matches the job. It then gives the HR manager a ranked list of the best candidates.

### Technical Explanation
The tool is an NLP-driven document ranking system. It ingests unstructured text data from PDF and DOCX files. The text undergoes preprocessing (noise removal, tokenization). We use **SpaCy** for Named Entity Recognition (NER) to extract candidate details. For the core matching engine, we use **Sentence-Transformers (BERT-based)** to convert both the Job Description and the parsed resumes into high-dimensional semantic vectors. We then compute the **Cosine Similarity** between the JD vector and each resume vector to generate a match percentage, effectively ranking candidates based on semantic relevance rather than rigid keyword matching.

### Workflow
`Resume Upload` → `Text Extraction (PyPDF2/docx2txt)` → `Cleaning (Regex)` → `Entity Extraction (SpaCy)` → `Semantic Vectorization (Sentence-BERT)` → `Cosine Similarity Scoring` → `Shortlist Ranking` → `Dashboard Display`

---

## 2️⃣ TECH STACK OPTIONS

**Option A: Easy**
- **Tools:** Python, Pandas, PyPDF2, Scikit-learn (TF-IDF), Streamlit.
- **Difficulty:** Beginner.
- **Output:** Basic keyword matching dashboard.

**Option B: Intermediate**
- **Tools:** Python, SpaCy, HuggingFace Sentence-Transformers, Streamlit.
- **Difficulty:** Intermediate.
- **Output:** Semantic matching app (understands context).

**Option C: Advanced (Chosen Stack)**
- **Tools:** Python, FastAPI, Next.js (React), Tailwind CSS, Sentence-Transformers, SpaCy.
- **Difficulty:** Advanced / Industry Standard.
- **Output:** Full-stack microservices architecture. Decoupled ML backend and modern web frontend.

*Best Option for Students:* **Option C**. It proves you can build machine learning models *and* serve them in a production-ready web application, making you highly attractive for Data Science, MLE, and Full-Stack roles.

---

## 3️⃣ PROJECT ARCHITECTURE

**Input:**
- Resumes (PDF, DOCX)
- Job Description (Text)

**Processing (Backend - FastAPI):**
- **document_io.py:** Reads byte streams and extracts raw text.
- **nlp_engine.py:** Cleans text, extracts entities (Names), and uses `all-MiniLM-L6-v2` to create embeddings and calculate cosine similarity.

**Output (Frontend - Next.js):**
- Ranked Table (Score, Candidate Name, Filename)
- Interactive Upload Dashboard

### Architecture Diagram
```text
[ Resumes ] + [ Job Description ]
       |                 |
       v                 v
+-------------------------------+
|     Next.js Web Dashboard     |
+---------------+---------------+
                | (REST API)
                v
+-------------------------------+
|       FastAPI Backend         |
| 1. Text Parsing               |
| 2. SpaCy NER                  |
| 3. Transformer Embeddings     |
| 4. Cosine Similarity          |
+---------------+---------------+
                |
                v
[ JSON: Ranked List w/ Scores ]
```

---

## 4️⃣ IMPLEMENTATION PLAN

- **Phase 1: Setup:** Install Python, Node.js, create virtual environments.
- **Phase 2: Project folder creation:** Setup `backend/` and `frontend/` folders.
- **Phase 3: Sample data creation:** Download/create 5 sample PDF resumes.
- **Phase 4: Job description creation:** Draft a sample Data Scientist or Python Developer JD.
- **Phase 5: Resume text extraction:** Implement `PyPDF2` logic.
- **Phase 6: Text cleaning:** Implement Regex to remove stop words and punctuation.
- **Phase 7: NLP matching:** Implement Sentence-Transformers logic.
- **Phase 8: API creation:** Build FastAPI endpoints.
- **Phase 9: Frontend creation:** Build Next.js dashboard.
- **Phase 10: Integration:** Connect frontend to backend.
- **Phase 11: GitHub upload:** Document in README and push to GitHub.

---

## 5️⃣ FOLDER STRUCTURE

```text
Automated-Resume-Screening-Tool/
├── backend/               -> Contains all Python API and ML code
│   ├── app/               -> Core logic (nlp_engine.py, document_io.py)
│   ├── main.py            -> FastAPI server
│   └── requirements.txt   -> Python dependencies
├── frontend/              -> Contains Next.js React code
│   ├── src/app/page.tsx   -> Main Dashboard UI
│   └── package.json       -> Node dependencies
├── resumes/               -> (Local only) Put your sample PDFs here
├── outputs/               -> (Local only) Save your result CSVs here
├── docs/                  -> Guides and reports
├── README.md              -> GitHub landing page
└── .gitignore             -> Prevents pushing virtual envs and node_modules
```

---

## 6️⃣ INSTALLATION GUIDE

### Windows
1. **Backend:**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   ```
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   ```

### Mac/Linux
1. **Backend:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   ```
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   ```

---

## 7️⃣ FULL PROJECT CODE
*(The complete code is already provided in `backend/main.py`, `backend/app/nlp_engine.py`, and `frontend/src/app/page.tsx` within this repository. Please review those files for the highly commented, modular code.)*

---

## 8️⃣ VIRTUAL SIMULATION

**Simulating an HR Environment:**
1. **Create Sample Resumes:** Use MS Word to create 3 fake resumes. 
   - Resume 1: "Jane Doe" - Python Developer (Perfect Match).
   - Resume 2: "John Smith" - Java Backend (Partial Match).
   - Resume 3: "Alice Jones" - Graphic Designer (Terrible Match).
   Save them as PDFs.
2. **Job Description:** Copy a "Python Developer" JD from LinkedIn.
3. **Execution:** Upload the JD and the 3 PDFs into the Dashboard.
4. **Verification:** The system should rank Jane #1, John #2, and Alice #3. Take screenshots of this exact outcome to prove the AI works correctly.

---

## 9️⃣ HOW TO RUN PROJECT

Open two terminals.
**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate # or source venv/bin/activate
uvicorn main:app --reload
```
*Expected output: `Application startup complete.`*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*Expected output: `Ready in ... ms. Local: http://localhost:3000`*

Open your browser to `http://localhost:3000`.

---

## 🔟 GITHUB UPLOAD STEPS

1. Open your terminal in the root folder.
2. Ensure you have a `.gitignore` file that includes `venv/`, `node_modules/`, `__pycache__/`, `.next/`.
3. Run commands:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Fullstack Resume Screener"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/AI-Resume-Screener.git
   git push -u origin main
   ```
**Best Repo Name:** `AI-Resume-Screener-FullStack`
**Tags:** `python`, `nlp`, `fastapi`, `nextjs`, `machine-learning`, `resume-parser`

---

## 1️⃣1️⃣ README.md
*(A complete, professional README has been generated in the root of the repository. It includes badges, architecture diagrams, and setup instructions.)*

---

## 1️⃣2️⃣ PROOF BUILDING STRATEGY (LinkedIn & GitHub)

- **Day 1:** Set up repo, backend structure. *Commit: "Setup FastAPI backend and NLP dependencies".*
- **Day 2:** Implement PyPDF extraction and SpaCy NER. *Commit: "Implement text extraction and entity recognition".*
- **Day 3:** Integrate Sentence-Transformers. *Commit: "Add Semantic similarity scoring engine".*
- **Day 4:** Build Next.js frontend UI. *Commit: "Create Next.js dashboard UI".*
- **Day 5:** Connect APIs and Test. Record a video of the UI. *Commit: "Integrate backend and frontend".*
- **Day 6:** Write README, take screenshots, post on LinkedIn showcasing the architecture and the problem it solves.

---

## 1️⃣3️⃣ SCREENSHOTS / OUTPUTS TO CAPTURE

Take the following screenshots for your README and LinkedIn:
1. **The Dashboard:** Clean shot of the UI before uploading.
2. **The Result Table:** A shot showing the ranked list with the green progress bars indicating match percentage.
3. **The Architecture:** A screenshot of your code structure (VS Code explorer).
4. **Terminal Logs:** The FastAPI logs showing successful 200 OK API requests.

---

## 1️⃣4️⃣ INTERVIEW PREPARATION

**1. Explain your project.**
*Answer:* "I built an AI-powered Resume Screening tool to automate the recruitment pipeline. Instead of relying on rigid keyword matching, I used HuggingFace Sentence-Transformers to generate semantic embeddings of both the Job Description and candidate resumes. I served this ML model using a FastAPI backend and built a responsive recruiter dashboard using Next.js, allowing HR to instantly rank candidates based on context and relevance."

**2. Why did you choose Sentence-Transformers over TF-IDF?**
*Answer:* TF-IDF only matches exact words. If the JD asks for "Machine Learning" and the resume says "Deep Learning", TF-IDF might miss it. Sentence-Transformers understand the *meaning* and context of the words, giving a much more accurate semantic similarity score.

**3. How did you extract names from the resumes?**
*Answer:* I used SpaCy's pre-trained English model (`en_core_web_sm`) to perform Named Entity Recognition (NER), specifically filtering for the "PERSON" label.

**4. Why FastAPI instead of Flask or Django?**
*Answer:* FastAPI is inherently asynchronous, incredibly fast (built on Starlette), and automatically generates Swagger UI documentation. It’s the modern industry standard for serving ML models.

**5. How does Cosine Similarity work here?**
*Answer:* The Transformer converts text into high-dimensional numerical vectors. Cosine similarity measures the angle between the JD vector and the Resume vector. An angle of 0 (cosine of 1) means they are perfectly identical in meaning.

**6. What challenges did you face with PDF extraction?**
*Answer:* PDFs often have hidden formatting, columns, or tables that break standard text extraction. I handled this by using robust regex cleaning to remove extra whitespaces, weird punctuation, and newline characters to ensure the ML model received clean strings.

**7. How would you scale this to 10,000 resumes?**
*Answer:* Currently, it processes in-memory. To scale, I would add a task queue like Celery and Redis to process resumes in the background, and store the embeddings in a Vector Database (like Pinecone or Qdrant) so we don't have to re-encode resumes for every new job posting.

**8. What does Next.js add to this project over Streamlit?**
*Answer:* While Streamlit is great for prototyping, Next.js allows for a production-grade, highly customizable UI. It decoupled my architecture, meaning the frontend and ML backend can be hosted, scaled, and maintained independently.

**9. How do you handle bias in this AI screener?**
*Answer:* Semantic models can inherit bias from training data. To mitigate this in a real environment, we should redact names, genders, and university names *before* vectorizing, ensuring the model only scores based on skills and experience.

**10. How did you connect the frontend to the backend?**
*Answer:* I used standard REST API endpoints. The Next.js frontend uses `fetch()` and `FormData` to send the JD string and the binary Resume files via HTTP POST requests to the FastAPI backend, which returns a JSON array of ranked candidates.
