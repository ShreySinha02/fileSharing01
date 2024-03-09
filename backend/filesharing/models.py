from sqlalchemy import (Integer,Column, 
PrimaryKeyConstraint,String,
LargeBinary,Boolean,JSON,ForeignKey)
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import FileType
from .databse import Base
from sqlalchemy.orm import relationship,Mapped,mapped_column
from typing import List
# storage = FileSystemStorage(path="/tmp")

class File_store(Base):
    __tablename__ ="file"
    id = Column(Integer,primary_key=True,index=True)
    file_name=Column(String,index=True)
    file_content = Column(LargeBinary)
    unique_string=Column(String,unique=True,index=True)

class Users(Base):
    __tablename__="users"
    username=Column(String,primary_key=True,unique=True)
    full_name=Column(String)
    email=Column(String)
    hashed_password=Column(String)
    disabled=Column(Boolean,default=False)
    document=relationship("Document",back_populates="user")

class Document(Base):
    __tablename__="doc"
    id=Column(String,primary_key=True)
    file_name=Column(String,default='')
    delta=Column(JSON)
    user_name=Column(String,ForeignKey("users.username"))
    user=relationship("Users",back_populates="document")