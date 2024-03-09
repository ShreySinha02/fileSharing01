from fastapi import APIRouter,Depends,HTTPException,status
from datetime import timedelta
from typing import Annotated
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..schemas import Token, User
from ..schemas import Userlog
from ..databse import SessionLocal
from sqlalchemy.orm import Session
import json
from ..adduser import createUser
from ..auth.authutility import authenticate_user,create_access_token, get_current_user
router=APIRouter()
ACCESS_TOKEN_EXPIRE_MINUTES = 30
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signUp(req:Userlog,db:Session=Depends(get_db)):
    response=createUser(req,db)
    return response


@router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db:Session=Depends(get_db)
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
   
    return Token(access_token=access_token,token_type="bearers")


@router.get("/user")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)]
):
    
    return {"message":current_user.username}
