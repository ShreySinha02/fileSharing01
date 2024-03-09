from sqlalchemy.orm import Session
from fastapi import UploadFile,HTTPException,Depends
from . import models
from .databse import SessionLocal

def getdocuments(username:str,db:Session):
    documents=db.query(models.Document).filter(models.Document.user_name==username).all()
    # print(documents)
    if documents:
        return documents
    else:
        return{"no doc found"}
def renameDocument(docId:str,filename:str,db:Session):
    document = db.query(models.Document).filter(models.Document.id == docId).first()
    if document:
        try:
            document.file_name=filename
            db.commit()
            db.refresh(document)
            return "renamed"
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal Server Error")
async def find_update_Document(docid: str,db: Session,username,delta=None ):
    # Check if the document exists in the database
    
    document = db.query(models.Document).filter(models.Document.id == docid).first()
    # print("my deldja:",delta)
    if document:
        # Document exists, update it
        if delta is None or delta=={'ops': [{'insert': 'Loading...\n'}]}:
            return document
        try:
            # Perform the update here, for example, updating the delta field
            document.delta = delta  # Replace this with your actual update logic
            # print(f"my del {document.delta}")

            db.commit()
            db.refresh(document)
            return document
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal Server Error")
    else:
        # Document does not exist, create a new one
        if delta is None:
            delta = {}
        new_document = models.Document(id=docid,user_name=username,delta=delta)
        try:
            db.add(new_document)
            db.commit()
            db.refresh(new_document)
            return new_document
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal Server Error")