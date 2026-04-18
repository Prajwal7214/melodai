# 🎵 MelodAI — AI-Based Music Composition + Recommendation System

> Final Year Project | Django + MongoDB Atlas + iTunes API + MelodAI AI Engine

---

## 📌 Project Overview

MelodAI is an AI-powered music system that:
- Accepts user **mood** and **context** as input
- **Generates AI music descriptions** using MelodAI Engine
- **Recommends real songs** from iTunes API based on mood
- **Saves history** to MongoDB Atlas cloud database

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Backend Framework | Django 6.0 + Django REST Framework |
| Database | MongoDB Atlas (Cloud) |
| Music Recommendations | iTunes Search API (Free) |
| AI Music Generation | MelodAI Music Generator v1.0 |
| Language | Python 3.13 |
| Package Manager | pip + virtualenv |

---

## 📁 Project Structure

```
melodai/
├── melodai_project/
│   ├── __init__.py
│   ├── settings.py          ← Django settings + installed apps
│   ├── urls.py              ← Main URL router
│   ├── wsgi.py              ← Server entry point
│   ├── mongo.py             ← MongoDB Atlas connection
│   ├── spotify.py           ← iTunes API integration
│   └── music_generator.py  ← AI music generation engine
├── music/
│   ├── __init__.py
│   ├── apps.py
│   ├── views.py             ← All API logic lives here
│   └── urls.py              ← API URL definitions
├── manage.py
├── requirements.txt
└── venv/                    ← Virtual environment
```

---

## ⚙️ Setup Instructions

### Step 1 — Navigate to Project Folder
```bash
cd C:\Users\prajw\OneDrive\Attachments\melodai
```

### Step 2 — Activate Virtual Environment
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```
> You should see `(venv)` at the start of your terminal line ✅

### Step 3 — Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4 — Run the Server
```bash
python manage.py runserver
```

### Step 5 — Verify Backend is Running
Open browser and go to:
```
http://127.0.0.1:8000/api/test-api/
```
You should see:
```json
{ "message": "Backend working successfully" }
```

---

## 🚀 API Endpoints

**Base URL:** `http://127.0.0.1:8000`

| API Endpoint | Method | Description |
|---|---|---|
| `/api/test-api/` | GET | Check if backend is running |
| `/api/generate-music/` | POST | Generate AI music based on mood + context |
| `/api/spotify-recommend/` | POST | Get 10 song recommendations based on mood |
| `/api/save-history/` | POST | Save mood, context and songs to MongoDB |
| `/api/get-history/` | GET | Fetch all saved history from MongoDB |
| `/api/get-playlist/` | POST | Get full playlist for music player |

---

## 📦 Request & Response Formats

### 🎵 Generate Music — `POST /api/generate-music/`

**Request Body:**
```json
{
    "mood": "happy",
    "context": "study"
}
```

**Response:**
```json
{
    "message": "Music generated successfully",
    "mood": "happy",
    "context": "study",
    "ai_music": {
        "success": true,
        "track_id": "MELODAI_HAPPY_20260402001500",
        "description": "Upbeat pop track with bright piano melody at 128 BPM",
        "mood": "happy",
        "context": "study",
        "duration": "30 seconds",
        "format": "MP3",
        "generated_at": "2026-04-02 00:15:00",
        "ai_model": "MelodAI Music Generator v1.0",
        "note": "AI music generation powered by MelodAI deep learning model"
    },
    "recommendations": [ ...10 songs... ]
}
```

---

### 🎧 Spotify Recommend — `POST /api/spotify-recommend/`

**Request Body:**
```json
{
    "mood": "romantic"
}
```

**Response:**
```json
{
    "mood": "romantic",
    "total_songs": 10,
    "recommendations": [ ...10 songs... ]
}
```

---

### 💾 Save History — `POST /api/save-history/`

**Request Body:**
```json
{
    "mood": "calm",
    "context": "sleep"
}
```

**Response:**
```json
{
    "message": "History saved successfully",
    "mood": "calm",
    "context": "sleep",
    "songs": [ ...10 songs... ],
    "saved_at": "2026-04-02 00:20:00"
}
```

---

### 📋 Get Playlist — `POST /api/get-playlist/`

**Request Body:**
```json
{
    "mood": "happy",
    "limit": 10
}
```

---

## 🎵 Song Data Structure

Each song object contains:

| Field | Type | Description |
|---|---|---|
| `id` | integer | Song index in playlist |
| `title` | string | Song title |
| `artist` | string | Artist name |
| `album` | string | Album name |
| `duration` | integer | Duration in milliseconds |
| `preview_url` | string (URL) | ⭐ 30-second MP3 — **USE FOR PLAYBACK** |
| `artwork` | string (URL) | Album artwork image (500x500px) |
| `url` | string (URL) | Full song on Apple Music |
| `genre` | string | Music genre |

---

## 🎭 Available Moods

| Mood | Music Style | BPM | Best Context |
|---|---|---|---|
| `happy` | Upbeat pop, bright melody | 120-132 | Party, morning, celebration |
| `sad` | Slow piano ballad, minor key | 55-65 | Relaxing, emotional moments |
| `calm` | Ambient soundscape, lo-fi | 65-75 | Meditation, sleep, reading |
| `energetic` | EDM, rock, heavy bass | 140-150 | Workout, gym, sports |
| `romantic` | Jazz piano, soft strings | 72-82 | Date night, love, dinner |
| `focus` | Minimal techno, binaural | 85-95 | Study, work, coding |

---

## 🌐 CORS Setup for Frontend

Run this command first:
```bash
pip install django-cors-headers
```

Add to `melodai_project/settings.py`:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ← Add at TOP
    'django.middleware.security.SecurityMiddleware',
    ...
]

# Allow all origins (for development)
CORS_ALLOW_ALL_ORIGINS = True
```

---

## 🗄️ MongoDB Atlas Details

| Detail | Value |
|---|---|
| Database Name | `melodai_db` |
| Collection | `music_history` |
| Connection File | `melodai_project/mongo.py` |
| Stored Fields | mood, context, songs, ai_music, created_at |

---

## 🖥️ Frontend Integration Notes

- **Backend URL:** `http://127.0.0.1:8000`
- All APIs accept and return **JSON format**
- Use `preview_url` field to **play 30-second song previews**
- Use `artwork` field to **display album cover images**
- Music player loads songs from `/api/get-playlist/`
- Save user sessions using `/api/save-history/`
- Enable CORS before connecting frontend

---

## ▶️ Start & Stop Server

### Start Server:
```bash
# Step 1 - Activate venv
venv\Scripts\activate

# Step 2 - Run server
python manage.py runserver
```

### Stop Server:
```
Press Ctrl + C in terminal
```

---

## 📋 Requirements

All dependencies are in `requirements.txt`. Install with:
```bash
pip install -r requirements.txt
```

Key packages:
- `django` — Web framework
- `djangorestframework` — REST API
- `pymongo` — MongoDB connection
- `dnspython` — MongoDB Atlas DNS
- `requests` — HTTP calls to iTunes API
- `django-cors-headers` — Frontend CORS support

---

## 🎓 Project Information

| Detail | Info |
|---|---|
| Project Name | MelodAI |
| Type | Final Year Project |
| Backend | Django + DRF |
| Database | MongoDB Atlas |
| Music Source | iTunes Search API |
| AI Engine | MelodAI Generator v1.0 |

---

*MelodAI Backend — Built with Django + MongoDB + iTunes API + MelodAI AI Engine* 🎵
