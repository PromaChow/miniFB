from pydoc import cli
from fastapi import FastAPI, HTTPException, Depends, Request,status
from fastapi.middleware.cors import CORSMiddleware
from hash import Hash
from jwttoken import create_access_token, verify_token
from fastapi.security import OAuth2PasswordRequestForm
from model import User,Token,TokenData, Login
import sys
import json
import uuid
import base64
from fastapi import  File, UploadFile, Form
import os
import jwttoken

app = FastAPI()
import asyncio
from model import Story,User,Login, Status, Token
import objDatabase
import re
import pymongo
print(pymongo.version)


print(create_access_token(data={"sub": "abcd@gmail.com" }))
verify_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpcmEwMUBnbWFpbC5jb20iLCJleHAiOjE2NTkwMzg1MjR9.AFRQRx8yM0UjuKRxRMNEz-vkyn5KK4_U0FusQOeTUB0")
    
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
async def login(request: Request):
    print("hello")
    data = await request.json();
    #print(await request.json())
#     print("hello")
    user = coll.find_one({"email":data["email"]})
   # print(user.get('_id'))
    if not user:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if not Hash.verify(user["password"],data["password"]):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    access_token = create_access_token(data={"sub": user["email"] })
    return {"access_token": access_token, "token_type": "bearer", "id": str(user.get('_id')), "username": user["username"]}
    
@app.get("/status")
async def get_status():
    cursor = stat_col.find({})
    #print(cursor)
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
async def post_status(request : Request):
    print("toknen",request.headers['authorization'])
    if(verify_token(request.headers['authorization'])):
        print("yes")
        stat_obj = dict(await request.json())
        print(stat_col.insert_one(stat_obj))
        
        return {"res" : "success"}
    


@app.get("/check")
async def check_validity(request:Request):
    
    data = dict(request.headers)
    email = verify_token(data['authorization'])
    user = coll.find_one({"email":email})
    return {"email": email, "username":user["username"], "id": str(user.get('_id'))}

@app.post("/stories")
async def post_story(request: Request):
    print('hello')
    data_body = await request.form()
    data_body = dict(data_body)
    file = data_body['filesss']
    print(file)
    contents = await file.read()
    print(contents)
    with open('output.png', 'wb') as f:
            print("hello")
            f.write(contents)
    
   
    #img_data = stat_obj["file"]
    #print(img_data)
    # contents = await filesss.read()
    # #print(contents);
    # with open('output.png', 'wb') as f:
    #         print("hello")
    #         f.write(contents)
    
    # print(filesss.filename);
    
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
          
   # print(list)
    return {"list":list}
    

@app.get("/")
async def read_root():
    print(sys.version)
    



    return {sys.version}

