from pydoc import cli
from fastapi import FastAPI, HTTPException, Depends, Request,status
from fastapi.middleware.cors import CORSMiddleware
from hash import Hash
from jwttoken import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from model import User,Token,TokenData, Login
import sys

app = FastAPI()
import motor.motor_asyncio
import asyncio
from model import User 

import pymongo
print(pymongo.version)
# Replace the uri string with your MongoDB deployment's connection string.
conn_str = "mongodb://localhost:27017"
# set a 5-second connection timeout
client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)
try:
   # print(client.server_info())
    db = client['facebookDB']
    coll = db["Users"]
    # document = {"email": "abcd@gmail.com", "password": "test"}
    # coll.insert_one(document)
    # print(db)
except Exception:
    print("Unable to connect to the server.")


print(client.list_database_names())


origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/register')
def create_user(request:User):
   hashed_pass = Hash.bcrypt(request.password)
   user_object = dict(request)
   user_object["password"] = hashed_pass
   user_id = coll.insert_one(user_object)
   return {"res":"created"}

@app.post('/login')
def login(request:User):
    print("hello")
    user = coll.find_one({"email":request.email})
    if not user:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if not Hash.verify(user["password"],request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    access_token = create_access_token(data={"sub": user["email"] })
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/")
async def read_root():
    print(sys.version)

    return {sys.version}

