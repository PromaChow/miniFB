from pydantic import BaseSettings



class Settings(BaseSettings):
    conn_str : str = "mongodb://statusdb:27017/facebookDBStory"
    timeout : int = 5000


settings = Settings()