from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx

httpx._config.DEFAULT_CIPHERS += ":ALL:@SECLEVEL=1"
import database
app = FastAPI()


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

@app.get("/status")
async def get_status(request: Request):
    print("status")
    if(await jwt_check(request.headers['authorization'])):
        cursor = database.stat_col.find({})
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
async def post_status(request : Request):
    print("im here")
    print(request)
    if(await jwt_check(request.headers['authorization'])):
        print("yes")
        stat_obj = dict(await request.json())
    print(database.stat_col.insert_one(stat_obj))
        
    return {"res" : "success"}
 
   



async def jwt_check(token:str):
    print('/endpoint/')
    
    client_http = httpx.AsyncClient()
    headers = {'authorization': token}
    print(headers)
    print("\n\n")
    response = await client_http.get('http://userservice:8000/auth/check' ,headers=headers)
    print(response)
    data =  response.json()
    print("data")
    print(data)
    data = data["email"]
    
    if(data):
        return True
    else : return False
    
    


@app.get("/")
async def root():
    await jwt_check("1234")
    return {"message": "Hello World"}