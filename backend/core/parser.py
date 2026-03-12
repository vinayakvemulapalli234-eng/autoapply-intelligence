from pdfminer.high_level import extract_text
import re

def extract_text_from_pdf(file_path: str) -> str:
    """Extract raw text from a PDF file."""
    text = extract_text(file_path)
    return clean_text(text)

def clean_text(text: str) -> str:
    """Remove extra whitespace and blank lines."""
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

def extract_text_from_string(raw: str) -> str:
    """Clean plain text input (for job description paste)."""
    return clean_text(raw)