from fastapi import FastAPI,WebSocket,WebSocketDisconnect,Depends
from .routers import file,authentication,getdoc
from sqlalchemy.orm import Session
from typing import List
from . import models
from .databse import SessionLocal
from .connection import ConnectionManager
from .doc_save_update import find_update_Document
from .databse import engine
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import json
models.Base.metadata.create_all(bind=engine)
app=FastAPI()
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Update this to the frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/')
async def home():
    return {"message":"sucess"}
async def findDocument(doc_id):
    pass


app.include_router(file.router)
app.include_router(authentication.router)
app.include_router(getdoc.router)

# connected_clients: List[WebSocket] = []

# Use a dictionary to map documentId to a list of connected clients
document_clients = {}
@app.websocket("/ws/{documentId}")
async def websocket_endpoint(websocket: WebSocket,documentId:str,db:Session=Depends(get_db)):
    await websocket.accept()
    # print("connected")
    # Add the new client to the list of connected clients
    if documentId not in document_clients:
        document_clients[documentId] = []
    document_clients[documentId].append(websocket)
    

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            message_type = list(message.keys()) 
            # print(message_type)

            if message_type[0]=="send-changes":
                delta = message.get("send-changes") 
                # print('send')
                receivers = document_clients.get(documentId, [])
                # Broadcast changes to all connected clients for the documentId
                for client in receivers:
                    if client != websocket:  # Exclude the sender
                        await client.send_json({"receive-changes": delta})
            elif message_type[0]=="get-document":
                receivers = document_clients.get(documentId, [])
                user=message.get("get-document")
                # print(user)
                doc= await find_update_Document(docid=documentId,username=user,db=db)
                # print("get:",doc.delta)
                for client in receivers:
                    await client.send_json({"load-document": doc.delta})
            elif message_type[0]=="save-document":
                delta = message.get("save-document") 
                # print(f"save : {delta[1]}")
                await find_update_Document(docid=documentId,db=db,username=delta[1],delta=delta[0])

    except WebSocketDisconnect:
        # Remove the disconnected client from the list
        if documentId in document_clients:
            document_clients[documentId].remove(websocket)
        pass