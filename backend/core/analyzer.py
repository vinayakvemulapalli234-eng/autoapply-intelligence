import re

def check_ats_compatibility(resume_text: str) -> list:
    """Check resume for ATS compatibility issues."""
    checks = []
    text_lower = resume_text.lower()

    # Check for contact info
    has_email = bool(re.search(r'[\w.-]+@[\w.-]+\.\w+', resume_text))
    checks.append({
        "ok": has_email,
        "text": "Email address found" if has_email else "Missing email address"
    })

    # Check for phone number
    has_phone = bool(re.search(r'[\+\d][\d\s\-\(\)]{8,}', resume_text))
    checks.append({
        "ok": has_phone,
        "text": "Phone number found" if has_phone else "Missing phone number"
    })

    # Check for key sections
    sections = {
        "education": ["education", "degree", "university", "college", "b.tech", "bachelor"],
        "experience": ["experience", "internship", "worked", "employment"],
        "skills": ["skills", "technologies", "tools", "languages"],
        "projects": ["projects", "built", "developed", "created"]
    }

    for section, keywords in sections.items():
        found = any(kw in text_lower for kw in keywords)
        checks.append({
            "ok": found,
            "text": f"{section.capitalize()} section detected" if found else f"Missing {section.capitalize()} section"
        })

    # Check resume length
    word_count = len(resume_text.split())
    good_length = 200 <= word_count <= 800
    checks.append({
        "ok": good_length,
        "text": f"Good resume length ({word_count} words)" if good_length else f"Resume too {'short' if word_count < 200 else 'long'} ({word_count} words)"
    })

    return checks


def analyze_keyword_density(resume_text: str, jd_text: str) -> dict:
    """Check how well resume keywords match job description."""
    jd_words = set(re.findall(r'\b\w{4,}\b', jd_text.lower()))
    resume_words = set(re.findall(r'\b\w{4,}\b', resume_text.lower()))

    common = jd_words & resume_words
    density = round(len(common) / len(jd_words) * 100, 1) if jd_words else 0

    return {
        "keyword_density": density,
        "common_keywords": list(common)[:10]
    }