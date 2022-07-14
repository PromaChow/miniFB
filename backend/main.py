from pydoc import cli
from fastapi import FastAPI, HTTPException, Depends, Request,status
from fastapi.middleware.cors import CORSMiddleware
from hash import Hash
from jwttoken import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from model import User,Token,TokenData, Login
import sys
import json

app = FastAPI()
import motor.motor_asyncio
import asyncio
from model import User,Login, Status

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
    stat_col = db["Status"]
    #document = {"id": "1234", "name": "system" , "time": "1657405086", "text":"hello" }
    #stat_col.insert_one(document)
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
   user = coll.find_one({"email":request.email})
   if user : return{"res":"email exists"}    
   hashed_pass = Hash.bcrypt(request.password)
   user_object = dict(request)
   user_object["password"] = hashed_pass
   user_id = coll.insert_one(user_object)
   return {"res":"created"}

@app.post('/login')
def login(request:Login):
    print("hello")
    user = coll.find_one({"email":request.email})
   # print(user.get('_id'))
    if not user:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if not Hash.verify(user["password"],request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    access_token = create_access_token(data={"sub": user["email"] })
    return {"access_token": access_token, "token_type": "bearer", "id": str(user.get('_id')), "username": user["username"]}

@app.get("/status")
async def get_status():
    cursor = stat_col.find({})
    list = []
    for document in cursor:
          dic = {}
          dic["id"] = document["id"]
          dic["name"] = document["name"]
          dic["time"] = document["time"]
          dic["text"]= document["text"]
          
          list.insert(len(list),dic)
          
    print(list)
    return {"list":list}


@app.post("/status")
def post_status(request : Status):
    stat_obj = dict(request)
    stat_col.insert_one(stat_obj)
    
    return {"res" : "success"}
    

@app.get("/")
async def read_root():
    print(sys.version)
    



    return {sys.version}

