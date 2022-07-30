from pydantic import BaseSettings



class Settings(BaseSettings):
    conn_str : str = "mongodb://localhost:27017"
    timeout : int = 5000


settings = Settings()