import pdfplumber
from docx import Document


def extract_pdf_text(file_path: str):
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text


def extract_docx_text(file_path: str):
    document = Document(file_path)

    text = ""

    for paragraph in document.paragraphs:
        text += paragraph.text + "\n"

    return text


def extract_resume_text(file_path: str):
    if file_path.endswith(".pdf"):
        return extract_pdf_text(file_path)

    elif file_path.endswith(".docx"):
        return extract_docx_text(file_path)

    else:
        return "Unsupported File"