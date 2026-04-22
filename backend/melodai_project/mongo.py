from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Atlas connection string
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(os.getenv("MONGO_URI"))

# Create/select database
db = client["melodai_db"]

# Create/select collection
music_history_collection = db["music_history"]

# ✅ NEW — Favourites collection
favourites_collection = db["favourites"]