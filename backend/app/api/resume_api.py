from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

from app.services.resume_service import extract_resume_text

router = APIRouter()

UPLOAD_FOLDER = "../uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    allowed_extensions = [".pdf", ".docx"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_resume_text(file_path)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "text": resume_text
    }