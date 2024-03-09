import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database, drop_database
from ..main import app, get_db
from .. import models

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

def testCreateUser():
    client = TestClient(app)
    user_data = {
        "username": "test",
        "email": "test@gmail.com",
        "full_name": "test",
        "password": "test"
    }
    res=client.post('/signup',json=user_data)
    print(res)
    assert res.status_code==200