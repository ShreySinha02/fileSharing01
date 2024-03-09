from ..schemas import UserInDB
from fastapi.testclient import TestClient
from ..main import app
client=TestClient(app)

def test_userInDB():
    user_instance = UserInDB(
    username="john_doe",
    email="john.doe@example.com",
    full_name="John Doe",
    disabled=False,
    hashed_password="hashed_password_here"
    )
    assert user_instance==UserInDB.from_orm(user_instance)


    