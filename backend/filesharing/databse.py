from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import URL
import os

# url_object = URL.create(
#     "postgresql+pg8000",
#     username="test",
#     password="1234",  # plain (unescaped) text
#     host="localhost",
#     database="fastapi",
# )
database_url = os.getenv('DATABASE_URL')
engine = create_engine(database_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()