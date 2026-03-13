import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def extract_skills(text: str) -> list:
    skills = [
        "python", "java", "javascript", "typescript", "react", "node",
        "sql", "mysql", "postgresql", "mongodb", "redis",
        "aws", "azure", "gcp", "docker", "kubernetes",
        "machine learning", "deep learning", "nlp", "tensorflow", "pytorch",
        "fastapi", "flask", "django", "spring", "express",
        "git", "linux", "rest", "api", "html", "css",
        "data structures", "algorithms", "system design",
        "pandas", "numpy", "scikit-learn", "opencv",
        "c++", "c#", "ruby", "php", "swift", "kotlin",
        "jenkins", "ci/cd", "devops", "agile", "scrum",
        "problem solving", "communication", "teamwork"
    ]
    text_lower = text.lower()
    found = [skill for skill in skills if skill in text_lower]
    return list(set(found))

def calculate_match_score(resume_text: str, jd_text: str) -> dict:
    # TF-IDF similarity
    vectorizer = TfidfVectorizer(stop_words='english')
    vectors = vectorizer.fit_transform([resume_text, jd_text])
    similarity = cosine_similarity(vectors[0], vectors[1])[0][0]
    match_score = round(similarity * 100, 1)

    # Skill matching
    resume_skills = set(extract_skills(resume_text))
    jd_skills = set(extract_skills(jd_text))

    matched = list(resume_skills & jd_skills)
    missing = list(jd_skills - resume_skills)

    # ATS score based on checklist-style scoring
    ats_base = 50  # base score
    ats_score = min(100, round(ats_base + match_score * 0.3 + len(matched) * 3))

    # Hiring probability
    hiring_prob = min(100, round(match_score * 0.5 + len(matched) * 4 + 20))

    return {
        "match_score": match_score,
        "matched_skills": matched,
        "missing_skills": missing,
        "ats_score": ats_score,
        "hiring_probability": hiring_prob
    }