from pymongo import MongoClient

# MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://melodai_user:melodai123@cluster0.t1nfshd.mongodb.net/?appName=Cluster0"

# Connect to MongoDB
client = MongoClient(MONGO_URI)

# Create/select database
db = client["melodai_db"]

# Create/select collection
music_history_collection = db["music_history"]

# ✅ NEW — Favourites collection
favourites_collection = db["favourites"]