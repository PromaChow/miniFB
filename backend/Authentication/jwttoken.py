from datetime import datetime, timedelta
from model import TokenData
from jose import JWTError, jwt
# from main import TokenData
SECRET_KEY = "91a7284ec8d51b05be77cf666a8d6c23324a7ca7296a90c91296c6d49d133296"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token:str):
 try:
     print("hello")
     
     payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM],  options=dict(
                              verify_aud=False,
                              verify_sub=True,
                              verify_exp=True,
                          ))
     email : str = payload.get("sub")
     print(payload)
     
     if email is None:
         print("none")
     print(email)
     token_data = TokenData(email = email)
     return email
 except JWTError:
     print("error")
     return None
 

 