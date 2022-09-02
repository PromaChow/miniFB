from fastapi import FastAPI, HTTPException,Request,status
from fastapi.middleware.cors import CORSMiddleware
from hash import Hash
from jwttoken import create_access_token, verify_token
from fastapi.security import OAuth2PasswordRequestForm
from model import User
import sys
import database

app = FastAPI()




origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

@app.post('/auth/register')
def create_user(request:User):
   user = database.coll.find_one({"email":request.email})
   if user : return{"res":"email exists"}    
   hashed_pass = Hash.bcrypt(request.password)
   user_object = dict(request)
   user_object["password"] = hashed_pass
   user_id = database.coll.insert_one(user_object)
   return {"res":"created"}

@app.post('/auth/login')
async def login(request: Request):
    print("hello")
    data = await request.json();

    user = database.coll.find_one({"email":data["email"]})
    if not user:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if not Hash.verify(user["password"],data["password"]):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    access_token = create_access_token(data={"sub": user["email"] })
    return {"access_token": access_token, "token_type": "bearer", "id": str(user.get('_id')), "username": user["username"]}
    

    


@app.get("/auth/check")
async def check_validity(request:Request):
    print("working")
    data = dict(request.headers)
    email = verify_token(data['authorization'])
    user = database.coll.find_one({"email":email})
    return {"email": email, "username":user["username"], "id": str(user.get('_id'))}


@app.get("/")
async def read_root():
    print(sys.version)
    return {sys.version}

