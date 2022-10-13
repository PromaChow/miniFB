import pymongo
import config


client = pymongo.MongoClient(config.settings.conn_str, serverSelectionTimeoutMS=config.settings.timeout)
try:
    db = client['facebookDBUser']
    coll = db["Users"]

except Exception:
    print("Unable to connect to the server.")

print("database")
print(client.list_database_names())


