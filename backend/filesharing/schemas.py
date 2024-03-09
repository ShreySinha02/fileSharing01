from pydantic import BaseModel
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    email: str 
    full_name: str | None = None
    disabled: bool | None = None

class Userlog(User):
    password:str

class UserInDB(User):
    hashed_password: str
    @classmethod
    def from_orm(cls, user):
        return cls(
            username=user.username,
            email=user.email,
            full_name=user.full_name,
            disabled=user.disabled,
            hashed_password=user.hashed_password
        )
class Doc(BaseModel):
    id:str
    file_name:str