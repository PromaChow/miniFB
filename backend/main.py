from pydoc import cli
from fastapi import FastAPI, HTTPException, Depends, Request,status
from fastapi.middleware.cors import CORSMiddleware
from hash import Hash
from jwttoken import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from model import User,Token,TokenData, Login
import sys
import json
import uuid
import base64
from fastapi import  File, UploadFile, Form
import asyncio
import os

app = FastAPI()
import motor.motor_asyncio
import asyncio
from model import Story,User,Login, Status
import objDatabase
import re
import pymongo
import shutil
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
    story_col = db["Story"]
    # document = {"id": "1234", "name": "system" , "time": "1657405086", "objectId":"hello" }
    # story_col.insert_one(document)
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
    print(cursor)
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


@app.post("/stories")
async def post_story(filesss : UploadFile = File(...)):
   # stat_obj = dict(request)
    #print(stat_obj)
    #img_data = stat_obj["file"]
    contents = await filesss.read()
    #print(contents);
    with open('output.png', 'wb') as f:
            print("hello")
            f.write(contents)
    
    print(filesss.filename);
    
@app.post("/storiesAdditional")
def post_storyy(data: Story):
   
   # os.remove("hello.png") 
    print(data.id);
    object_id = uuid.uuid4();
    objDatabase.putObjects(str(object_id));
    story_obj = dict(data);
    story_obj["objectId"] = str(object_id);
    story_col.insert_one(story_obj);
    #print(img_data)
    # with open("imageToSave.png", "wb") as fh:
    #     fh.write(base64.decodebytes(img_data))
    
    # with open("destination1.png", "wb") as buffer:
    #     shutil.copyfileobj(image.file, buffer)
    
    
    return {"filename": "hello"}


@app.get("/stories")
async def get_story():
    cursor = story_col.find({})
    list = []
    for document in cursor:
          dic = {}
          dic["id"] = document["id"]
          dic["name"] = document["name"]
          dic["time"] = document["time"]
          dic["objectId"]= document["objectId"]+".png"
          
          list.insert(len(list),dic)
          
    print(list)
    return {"list":list}
    

@app.get("/")
async def read_root():
    print(sys.version)
    



    return {sys.version}

