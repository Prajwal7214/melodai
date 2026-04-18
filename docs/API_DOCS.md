# MelodAI API Documentation

Base URL: http://127.0.0.1:8000

## Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET  | /api/test-api/          | Health check |
| POST | /api/generate-music/    | Generate AI music |
| POST | /api/spotify-recommend/ | Song recommendations |
| POST | /api/search/            | Search by text |
| POST | /api/save-history/      | Save session |
| GET  | /api/get-history/       | Get all history |
| POST | /api/get-playlist/      | Get playlist |
| GET  | /api/favourites/        | Get favourites |
| POST | /api/favourites/add/    | Add favourite |
| POST | /api/favourites/remove/ | Remove favourite |
| POST | /api/favourites/check/  | Check favourite |