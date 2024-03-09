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

def test_upload_and_download_file():
    client = TestClient(app)

    # Test uploadfile
    response = client.post("/uploadfile", files={"file": ("test_file.txt", b"Hello, this is a test file.")})
    
    assert response.status_code == 200
    unique_string = response.json()['unique_string']


    # Test downloadfile
    response = client.get(f"/downloadfile/{unique_string}")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/octet-stream"
    assert response.content == b"Hello, this is a test file."

def test_download_file_not_found():
    client = TestClient(app)

    # Test downloadfile with an invalid unique_string
    response = client.get("/downloadfile/invalid_string")
    assert response.status_code == 404
    assert response.json() == {"detail": "Image not found"}

# Add more test cases as needed

# Clean up the database after all tests
def finalizer():
    models.Base.metadata.drop_all(bind=engine)

pytest.fixture(autouse=True)
def cleanup(request):
    request.addfinalizer(finalizer)
