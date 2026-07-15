from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.core.security import hash_password


def create_user(db: Session, user: UserCreate):

    hashed_password = hash_password(user.password)

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user