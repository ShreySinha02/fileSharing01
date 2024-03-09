# send_rec.py
from sqlalchemy.orm import Session
from fastapi import UploadFile,HTTPException
from . import models
from .userfunction.randomString import randomstring 

async def uploadfile(db: Session, file: UploadFile):
    uniqueString=randomstring()
    file_model = models.File_store(file_name=file.filename,file_content=file.file.read(),unique_string=uniqueString)
    try:
        db.add(file_model)
        db.commit()
        db.refresh(file_model)
        return uniqueString
    except Exception as e:
        db.rollback()
        raise e
def downloadfile(db:Session,file_id:str):
    file_data=db.query(models.File_store).filter(models.File_store.unique_string==file_id).first()
    if file_data:
        return file_data
    else:
            raise HTTPException(status_code=404, detail="Image not found")
    
        # db.close()