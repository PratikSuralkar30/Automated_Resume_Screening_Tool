import requests
from reportlab.pdfgen import canvas
import io

def test_api():
    print("Testing JD upload...")
    jd_resp = requests.post("http://localhost:8000/api/upload_jd", data={"jd_text": "Looking for a Python backend developer with FastAPI and NLP."})
    print(jd_resp.json())

    print("\nCreating dummy resume PDF...")
    pdf_buffer = io.BytesIO()
    c = canvas.Canvas(pdf_buffer)
    c.drawString(100, 750, "John Doe")
    c.drawString(100, 730, "Experienced Python Backend Developer.")
    c.drawString(100, 710, "Skills: FastAPI, Django, NLP, Machine Learning.")
    c.save()
    pdf_buffer.seek(0)

    print("\nTesting Resume upload...")
    files = [
        ('files', ('johndoe_resume.pdf', pdf_buffer.read(), 'application/pdf'))
    ]
    resume_resp = requests.post("http://localhost:8000/api/upload_resumes", files=files)
    print(resume_resp.json())

    print("\nTesting Rank Candidates...")
    rank_resp = requests.get("http://localhost:8000/api/rank_candidates")
    print(rank_resp.json())

if __name__ == "__main__":
    test_api()
