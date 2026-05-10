import PyPDF2
import docx2txt
import io

def extract_text_from_bytes(file_bytes, filename):
    text = ""
    file_stream = io.BytesIO(file_bytes)
    
    if filename.endswith('.pdf'):
        pdf_reader = PyPDF2.PdfReader(file_stream)
        for page in pdf_reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + " "
    elif filename.endswith('.docx'):
        text = docx2txt.process(file_stream)
    
    return text
