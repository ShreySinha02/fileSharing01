from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import URL


url_object = URL.create(
    "postgresql+pg8000",
    username="test",
    password="1234",  # plain (unescaped) text
    host="localhost",
    database="fastapi",
)
engine = create_engine(url_object)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()