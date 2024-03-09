# route.py
from fastapi import APIRouter, Depends,HTTPException,Response
from ..send_rec import uploadfile,downloadfile
from fastapi import UploadFile
from fastapi.responses import HTMLResponse,StreamingResponse,JSONResponse
from sqlalchemy.orm import Session
from ..databse import SessionLocal
import io
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile, db: Session = Depends(get_db)):
    uniqueString = await uploadfile(db, file)
    return JSONResponse({"unique_string": uniqueString})


@router.get('/downloadfile/{unique_string}')
async def download_file(unique_string:str,db: Session = Depends(get_db)):
    file_data= downloadfile(db,unique_string)
    filename=file_data.file_name
    content=file_data.file_content
    if not file_data:
        raise HTTPException(status_code=404, detail="File not found")
    # response = Response(content, media_type="application/octet-stream")
    # response.headers["Content-Disposition"] = f"attachment; filename={filename}"
    response=StreamingResponse(io.BytesIO(content), media_type="application/octet-stream", headers={"Content-Disposition": filename})
    return  response
    