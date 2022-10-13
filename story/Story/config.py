from pydantic import BaseSettings



class Settings(BaseSettings):
    conn_str : str = "mongodb://storydb:27017/facebookDBStory"
    timeout : int = 5000
    minio_conn : str = "storyobjectdb:9000"
    access_key :str  = "minioadmin"
    secret_key : str = "minioadmin"


settings = Settings()