from minio import Minio

access_key = "minioadmin"
secret_key = "minioadmin"

from PIL import Image
import requests
from io import BytesIO

client = Minio("127.0.0.1:9000", access_key, secret_key, secure=False)

# buckets = client.list_buckets()
# for bucket in buckets:
#     print(bucket.name, bucket.creation_date)
    
# bucket_name = "images"
# object_name = "test.png"

# print(client.fput_object(bucket_name, object_name, "dg.jpg"))

objects = client.list_objects("images")
for obj in objects:
    print(obj.object_name)
   # print(client.host)
   # print(client.protocol + '//' + client.host + ':' + client.port + '/' + '/' + obj.object_name)
    
