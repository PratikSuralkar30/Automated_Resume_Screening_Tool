import spacy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

def load_models():
    # Load SpaCy for NER
    nlp = spacy.load("en_core_web_sm")
    # Load Sentence-BERT for semantic similarity
    model = SentenceTransformer('all-MiniLM-L6-v2')
    return nlp, model

def clean_text(text):
    text = re.sub(r'\n+', ' ', text)
    text = re.sub(r'[^\w\s.,]', '', text)
    return text.strip()

def extract_entities(text, nlp_model):
    doc = nlp_model(text)
    entities = {"PERSON": [], "ORG": []}
    for ent in doc.ents:
        if ent.label_ in entities and ent.text not in entities[ent.label_]:
            entities[ent.label_].append(ent.text)
    
    # Try to guess candidate name (usually the first PERSON entity found)
    candidate_name = entities["PERSON"][0] if entities["PERSON"] else "Unknown"
    return candidate_name

def get_semantic_scores(jd_text, resume_texts, transformer_model):
    # Encode JD and Resumes into semantic vectors
    jd_vector = transformer_model.encode([jd_text])
    resume_vectors = transformer_model.encode(resume_texts)
    
    # Calculate cosine similarity
    scores = cosine_similarity(jd_vector, resume_vectors).flatten()
    return [round(float(score) * 100, 2) for score in scores]
