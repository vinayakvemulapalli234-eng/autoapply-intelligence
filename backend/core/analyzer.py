import re

def check_ats_compatibility(resume_text: str) -> list:
    checks = []
    text_lower = resume_text.lower()

    has_email = bool(re.search(r'[\w.-]+@[\w.-]+\.\w+', resume_text))
    checks.append({"ok": has_email, "text": "Email address found" if has_email else "Missing email address"})

    has_phone = bool(re.search(r'[\+\d][\d\s\-\(\)]{8,}', resume_text))
    checks.append({"ok": has_phone, "text": "Phone number found" if has_phone else "Missing phone number"})

    has_linkedin = "linkedin" in text_lower
    checks.append({"ok": has_linkedin, "text": "LinkedIn profile found" if has_linkedin else "No LinkedIn profile detected"})

    has_github = "github" in text_lower
    checks.append({"ok": has_github, "text": "GitHub profile found" if has_github else "No GitHub profile detected"})

    sections = {
        "Education": ["education", "degree", "university", "college", "b.tech", "bachelor"],
        "Experience": ["experience", "internship", "worked", "employment"],
        "Skills": ["skills", "technologies", "tools", "languages"],
        "Projects": ["projects", "built", "developed", "created"]
    }
    for section, keywords in sections.items():
        found = any(kw in text_lower for kw in keywords)
        checks.append({"ok": found, "text": f"{section} section detected" if found else f"Missing {section} section"})

    has_numbers = bool(re.search(r'\d+[\%x]|\d+\s*(users|requests|ms|seconds|hours|projects|teams)', text_lower))
    checks.append({"ok": has_numbers, "text": "Quantified achievements found" if has_numbers else "No quantified achievements (add numbers like 50%, 10k users)"})

    action_verbs = ["built", "developed", "designed", "implemented", "optimized", "led", "created", "improved", "deployed", "automated"]
    has_verbs = sum(1 for v in action_verbs if v in text_lower) >= 3
    checks.append({"ok": has_verbs, "text": "Strong action verbs detected" if has_verbs else "Use more action verbs (built, deployed, optimized...)"})

    word_count = len(resume_text.split())
    good_length = 200 <= word_count <= 800
    checks.append({"ok": good_length, "text": f"Good resume length ({word_count} words)" if good_length else f"Resume too {'short' if word_count < 200 else 'long'} ({word_count} words)"})

    has_special = resume_text.count("|") > 10 or resume_text.count("\t\t\t") > 5
    checks.append({"ok": not has_special, "text": "No complex formatting detected" if not has_special else "Complex tables/columns may confuse ATS parsers"})

    return checks


def analyze_keyword_density(resume_text: str, jd_text: str) -> dict:
    jd_words = set(re.findall(r'\b\w{4,}\b', jd_text.lower()))
    resume_words = set(re.findall(r'\b\w{4,}\b', resume_text.lower()))

    common = jd_words & resume_words
    density = round(len(common) / len(jd_words) * 100, 1) if jd_words else 0

    return {
        "keyword_density": density,
        "common_keywords": list(common)[:10]
    }