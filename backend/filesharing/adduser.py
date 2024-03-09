from sqlalchemy.orm import Session
from . import models
from .auth.authutility import get_password_hash,get_user
from .schemas import Userlog

def createUser(req:Userlog,db:Session):
    hashed_password=get_password_hash(req.password)
    user=get_user(req.username,db)
    if user:
        return {"message":"Please Enter Unique Username"}
    user=models.Users(username=req.username,email=req.email,full_name=req.full_name,
                      disabled=req.disabled,hashed_password=hashed_password)
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message":f"{user.username} created"}
    except Exception as e:
        db.rollback()
        # print(e)
        raise e
        

    
