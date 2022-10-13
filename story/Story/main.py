from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from httpx import AsyncClient
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
import pymongo
import time
import uuid
import sys
import objDatabase
import database
import base64


origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)



@app.get("/")
async def root():
    return {"message": "Hello World"}



@app.post("/stories")
async def post_story(request: Request):
    print('hello')
    print(request.headers)
    data = await jwt_check(request.headers['authorization'])
    if(data):
        data_body = await request.form()
        data_body = dict(data_body)
        file = data_body['filesss']
        print(file)
        contents = await file.read()
        print(contents)
        with open('output.png', 'wb') as f:
                print("hello")
                f.write(contents)
        object_id = uuid.uuid4();
        objDatabase.putObjects(str(object_id));
        story_obj = {}
        story_obj["id"] = data["id"]
        story_obj["name"] = data["username"]
        story_obj["time"] = str(time.time())
        story_obj["objectId"] = str(object_id);
        database.story_col.insert_one(story_obj);

        return {"res": "success"}
    
@app.get("/stories")
async def get_story(request:Request):
    data = await jwt_check(request.headers['authorization'])
    if(data):
        cursor = database.story_col.find({})
        list = []
        for document in cursor:
            dic = {}
            dic["id"] = document["id"]
            dic["name"] = document["name"]
            dic["time"] = document["time"]
            dic["objectId"]= document["objectId"]+".png"
            dic["img"] = objDatabase.getObjects(document["objectId"]+".png")
            
            list.insert(len(list),dic)
          
   # print(list)
        return {"list":list}


async def jwt_check(token:str):
    print('/endpoint/')
    
    client_http = AsyncClient()
    headers = {'authorization': token}
    
    response = await client_http.get('http://userservice:8000/auth/check' ,headers=headers)
    data = response.json()
    print("data")
    print(data)
    
    if(data):
        return data
    else : return None