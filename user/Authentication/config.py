from pydantic import BaseSettings



class Settings(BaseSettings):
    conn_str : str = "mongodb://localhost:27017/facebookDBUser"
    timeout : int = 5000


settings = Settings()