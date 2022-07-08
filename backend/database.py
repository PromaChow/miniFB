import motor.motor_asyncio
from model import User

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
database = client.fbDB
collection = database.users