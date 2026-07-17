from fastapi import FastAPI

from app.database.database import Base, engine
from app.models.user import User
from app.api.user_api import router as user_router
from app.api.resume_api import router as resume_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Resume Analyzer API"
)

app.include_router(user_router)
app.include_router(resume_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Resume Analyzer API",
        "status": "Running Successfully"
    }