import re

def check_ats_compatibility(resume_text):
    checks = []
    t = resume_text.lower()
    checks.append({"ok": bool(re.search(r'[\w.-]+@[\w.-]+\.\w+', resume_text)), "text": "Email found"})
    checks.append({"ok": bool(re.search(r'[\+\d][\d\s\-\(\)]{8,}', resume_text)), "text": "Phone found"})
    checks.append({"ok": "linkedin" in t, "text": "LinkedIn found"})
    checks.append({"ok": "github" in t, "text": "GitHub found"})
    for s, kws in {"Education":["education","degree","university","b.tech"],"Experience":["experience","internship"],"Skills":["skills","technologies"],"Projects":["projects","built"]}.items():
        checks.append({"ok": any(k in t for k in kws), "text": s + " section found"})
    checks.append({"ok": bool(re.search(r'\d+', t)), "text": "Numbers found"})
    checks.append({"ok": any(v in t for v in ["built","developed","deployed"]), "text": "Action verbs found"})
    wc = len(resume_text.split())
    checks.append({"ok": 200 <= wc <= 800, "text": f"Word count: {wc}"})
    return checks

def analyze_keyword_density(resume_text, jd_text):
    jd = set(re.findall(r'\b\w{4,}\b', jd_text.lower()))
    res = set(re.findall(r'\b\w{4,}\b', resume_text.lower()))
    common = jd & res
    density = round(len(common)/len(jd)*100, 1) if jd else 0
    return {"keyword_density": density, "common_keywords": list(common)[:10]}