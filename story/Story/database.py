import pymongo
import config
print(pymongo.version)

client = pymongo.MongoClient(config.settings.conn_str, serverSelectionTimeoutMS= config.settings.timeout)
try:
   # print(client.server_info())
    db = client['facebookDBStory']
    story_col = db["Story"]
   
except Exception:
    print("Unable to connect to the server.")


print(client.list_database_names())