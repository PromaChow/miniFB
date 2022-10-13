import pymongo
import config
print(pymongo.version)

#h
client = pymongo.MongoClient(config.settings.conn_str, serverSelectionTimeoutMS= config.settings.timeout)
print("hello/n/n")
print(client)
try:

    db = client['facebookDBStatus']
    stat_col = db["Status"]
    
except Exception:
    print("Unable to connect to the server.")
    
    
print(client.list_database_names())