from minio import Minio
import config
import requests
from io import BytesIO
import urllib3
from urllib3 import PoolManager
urllib3.disable_warnings()
https = PoolManager()
import base64


client = Minio(config.settings.minio_conn, config.settings.access_key, config.settings.secret_key, secure=False)
print(client)

found = client.bucket_exists("images")

if not found :
     client.make_bucket("images")
else:
     print("bucket exists")

buckets = client.list_buckets()
for bucket in buckets:
    print(bucket.name, bucket.creation_date)
    

def getObjects(object_id):
     response = client.get_object("images", object_id)
     with open('my-testfile.png', 'wb') as file_data:
          for d in response.stream(32*1024):
               file_data.write(d)
     with open("my-testfile.png", "rb") as image_file:
          encoded_string = base64.b64encode(image_file.read())
     return encoded_string




def putObjects(object_name):
     bucket_name = "images"
     object_name+=".png"
     print(client.fput_object(bucket_name, object_name, "output.png"))