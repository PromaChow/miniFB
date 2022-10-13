from pydantic import BaseModel
from typing import Optional
import uuid
from fastapi import FastAPI, File, UploadFile


class User(BaseModel):
    username: str
    email: str
    password: str
    

class token(BaseModel):
    token : str


class Login(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    
    
class Status(BaseModel):
    id : str
    name : str
    time : str
    text: str
    
    
class Story(BaseModel):
    id: str
    name : str
    time : str
    
