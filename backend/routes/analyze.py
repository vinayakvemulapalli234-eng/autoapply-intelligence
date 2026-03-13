from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
import tempfile
import os

from core.parser import extract_text_from_pdf, extract_text_from_string
from core.scorer import calculate_match_score
from core.analyzer import check_ats_compatibility, analyze_keyword_density
from core.ai_engine import get_ai_suggestions

router = APIRouter()

@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    try:
        # Save uploaded PDF temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            content = await resume.read()
            tmp.write(content)
            tmp_path = tmp.name

        # Extract text from PDF
        resume_text = extract_text_from_pdf(tmp_path)
        os.unlink(tmp_path)  # Delete temp file

        # Clean job description
        jd_text = extract_text_from_string(job_description)

        # Run analysis
        match_data = calculate_match_score(resume_text, jd_text)
        ats_checks = check_ats_compatibility(resume_text)
        keyword_data = analyze_keyword_density(resume_text, jd_text)

        # Get AI suggestions + cover letter
        ai_data = get_ai_suggestions(resume_text, jd_text, match_data)

        return JSONResponse({
            "match_score": match_data["match_score"],
            "matched_skills": match_data["matched_skills"],
            "missing_skills": match_data["missing_skills"],
            "ats_score": match_data["ats_score"],
            "hiring_probability": match_data["hiring_probability"],
            "ats_checks": ats_checks,
            "keyword_density": keyword_data["keyword_density"],
            "score_label": ai_data.get("score_label", ""),
            "score_summary": ai_data.get("score_summary", ""),
            "suggestions": ai_data.get("suggestions", []),
            "cover_letter": ai_data.get("cover_letter", "")
        })

    except Exception as e:
        err = str(e)
        if "429" in err or "RESOURCE_EXHAUSTED" in err:
            return JSONResponse(
                {"error": "⏳ AI quota limit reached. Please try again in a few hours."},
                status_code=429
            )
        if "API_KEY" in err or "api_key" in err:
            return JSONResponse(
                {"error": "🔑 API key error. Please check configuration."},
                status_code=500
            )
        return JSONResponse(
            {"error": "Something went wrong. Please try again."},
            status_code=500
        )