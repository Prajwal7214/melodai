from rest_framework.decorators import api_view
from rest_framework.response import Response
from melodai_project.spotify import get_songs_by_mood
from melodai_project.mongo import music_history_collection
from melodai_project.music_generator import generate_music_from_mood
from datetime import datetime


@api_view(['GET'])
def test_api(request):
    return Response({"message": "Backend working successfully"})


@api_view(['POST'])
def generate_music(request):
    mood    = request.data.get('mood', '')
    context = request.data.get('context', '')

    if not mood:
        return Response({"error": "Please provide a mood"}, status=400)

    # Get songs and AI music
    songs     = get_songs_by_mood(mood, limit=10)
    generated = generate_music_from_mood(mood, context or mood)

    # ✅ AUTO SAVE TO HISTORY — no extra button needed
    history_document = {
        "mood":       mood,
        "context":    context,
        "songs":      songs,
        "ai_music":   generated,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    music_history_collection.insert_one(history_document)
    print(f"✅ Auto-saved to history: {mood} - {context}")

    return Response({
        "message":         "Music generated successfully",
        "mood":            mood,
        "context":         context,
        "ai_music":        generated,
        "recommendations": songs,
        "total_songs":     len(songs),
        "saved_to_history": True,   # ← Tell frontend it was saved
    })

@api_view(['POST'])
def spotify_recommend(request):
    mood = request.data.get('mood', '')

    if not mood:
        return Response({"error": "Please provide a mood"}, status=400)

    songs = get_songs_by_mood(mood, limit=10)

    return Response({
        "mood":            mood,
        "total_songs":     len(songs),
        "recommendations": songs
    })


# ✅ NEW API — Smart search by text input
@api_view(['POST'])
def search_by_text(request):
    text    = request.data.get('text', '')
    mood    = request.data.get('mood', '')

    if not text and not mood:
        return Response({"error": "Please provide text or mood"}, status=400)

    # Use text directly if provided, else use mood
    search_term = text if text else mood
    songs       = get_songs_by_mood(search_term, limit=10)

    return Response({
        "search_term": search_term,
        "total_songs": len(songs),
        "songs":       songs
    })


@api_view(['POST'])
def save_history(request):
    mood    = request.data.get('mood', '')
    context = request.data.get('context', '')

    if not mood:
        return Response({"error": "Please provide a mood"}, status=400)

    songs     = get_songs_by_mood(mood, limit=10)
    generated = generate_music_from_mood(mood, context or mood)

    history_document = {
        "mood":       mood,
        "context":    context,
        "songs":      songs,
        "ai_music":   generated,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    music_history_collection.insert_one(history_document)

    return Response({
        "message":  "History saved successfully",
        "mood":     mood,
        "context":  context,
        "songs":    songs,
        "ai_music": generated,
        "saved_at": history_document["created_at"]
    })


@api_view(['GET'])
def get_history(request):
    history = list(music_history_collection.find({}, {"_id": 0}))
    return Response({
        "total_records": len(history),
        "history":       history
    })


@api_view(['POST'])
def get_playlist(request):
    mood  = request.data.get('mood', 'happy')
    limit = request.data.get('limit', 10)
    songs = get_songs_by_mood(mood, limit=limit)
    return Response({
        "mood":        mood,
        "total_songs": len(songs),
        "playlist":    songs,
    })

@api_view(['POST'])
def add_favourite(request):
    song = request.data.get('song', {})

    if not song:
        return Response({"error": "Please provide song data"}, status=400)

    # Check if already favourited
    existing = music_history_collection.database["favourites"].find_one({
        "title":  song.get('title'),
        "artist": song.get('artist'),
    })

    if existing:
        return Response({
            "message": "Song already in favourites",
            "already_exists": True
        })

    # Save to favourites collection
    favourite_document = {
        "id":          song.get('id'),
        "title":       song.get('title'),
        "artist":      song.get('artist'),
        "album":       song.get('album'),
        "duration":    song.get('duration'),
        "preview_url": song.get('preview_url'),
        "artwork":     song.get('artwork'),
        "url":         song.get('url'),
        "genre":       song.get('genre'),
        "mood":        song.get('mood', ''),
        "added_at":    datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    music_history_collection.database["favourites"].insert_one(
        favourite_document
    )
    print(f"✅ Added to favourites: {song.get('title')}")

    return Response({
        "message":  "Song added to favourites",
        "song":     favourite_document,
        "added_at": favourite_document["added_at"]
    })


@api_view(['POST'])
def remove_favourite(request):
    title  = request.data.get('title', '')
    artist = request.data.get('artist', '')

    if not title:
        return Response({"error": "Please provide song title"}, status=400)

    result = music_history_collection.database["favourites"].delete_one({
        "title":  title,
        "artist": artist,
    })

    if result.deleted_count > 0:
        return Response({"message": "Song removed from favourites"})
    else:
        return Response({"message": "Song not found in favourites"}, status=404)


@api_view(['GET'])
def get_favourites(request):
    favourites = list(
        music_history_collection.database["favourites"].find(
            {}, {"_id": 0}
        )
    )
    # Sort newest first
    favourites.sort(
        key=lambda x: x.get('added_at', ''),
        reverse=True
    )
    return Response({
        "total":      len(favourites),
        "favourites": favourites
    })


@api_view(['POST'])
def check_favourite(request):
    title  = request.data.get('title', '')
    artist = request.data.get('artist', '')

    existing = music_history_collection.database["favourites"].find_one({
        "title":  title,
        "artist": artist,
    })

    return Response({
        "is_favourite": existing is not None
    })