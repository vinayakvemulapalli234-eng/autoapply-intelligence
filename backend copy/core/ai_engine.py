import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def get_ai_suggestions(resume_text: str, jd_text: str, match_data: dict) -> dict:
    """Use Claude to generate resume suggestions and cover letter."""

    prompt = f"""You are an expert career coach and resume writer.

Analyze this resume against the job description and return ONLY a valid JSON object with no markdown, no explanation.

RESUME:
{resume_text[:3000]}

JOB DESCRIPTION:
{jd_text[:2000]}

MATCH DATA:
- Match Score: {match_data['match_score']}%
- Matched Skills: {', '.join(match_data['matched_skills'])}
- Missing Skills: {', '.join(match_data['missing_skills'])}

Return this exact JSON structure:
{{
  "score_label": "Excellent/Strong/Moderate/Weak Match",
  "score_summary": "2-3 sentence honest assessment",
  "suggestions": [
    "Specific actionable suggestion 1",
    "Specific actionable suggestion 2",
    "Specific actionable suggestion 3",
    "Specific actionable suggestion 4",
    "Specific actionable suggestion 5"
  ],
  "cover_letter": "Full professional cover letter text here (3-4 paragraphs)"
}}"""

    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=1500,
        messages=[{"role": "user", "content": prompt}]
    )

    import json
    raw = message.content[0].text.strip()
    json_match = __import__('re').search(r'\{[\s\S]*\}', raw)
    if json_match:
        return json.loads(json_match.group())
    return {"error": "Could not parse AI response"}