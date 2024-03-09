from fastapi import APIRouter,Depends
from ..databse import SessionLocal
from typing import List
from sqlalchemy.orm import session
from ..doc_save_update import getdocuments,renameDocument
from ..schemas import Doc
router=APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.get("/getdoc",response_model=List[Doc])
async def getDoc(username:str,db:session=Depends(get_db)):
    res=getdocuments(username=username,db=db)
    # print(res)
    return res
@router.post("/rename")
async def renameDoc(docId:str,filename:str,db:session=Depends(get_db)):
    res=renameDocument(docId=docId,filename=filename,db=db)
    return {"message":res}
