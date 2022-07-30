import pymongo


conn_str = "mongodb://localhost:27017"

client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)
try:
    db = client['facebookDB']
    coll = db["Users"]

except Exception:
    print("Unable to connect to the server.")


print(client.list_database_names())