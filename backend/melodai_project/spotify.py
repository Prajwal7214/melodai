import requests

def get_songs_by_mood(mood, limit=10):
    try:
        # Smart mood → search keyword mapping
        # Multiple keywords per mood for better results
        mood_search_map = {
            "happy": [
                "happy feel good upbeat",
                "cheerful pop music",
                "good vibes songs"
            ],
            "sad": [
                "sad emotional heartbreak",
                "melancholy slow songs",
                "crying songs emotional"
            ],
            "motivated": [
                "motivational workout pump up",
                "powerful energetic anthem",
                "hustle grind motivation songs"
            ],
            "lonely": [
                "lonely alone sad night",
                "missing someone emotional",
                "solitude peaceful songs"
            ],
            "normal": [
                "chill everyday casual",
                "feel good background music",
                "easy listening popular songs"
            ],
            "energetic": [
                "energetic fast beat",
                "high energy workout",
                "power songs intense"
            ],
            "romantic": [
                "romantic love songs",
                "sweet love ballad",
                "couple love music"
            ],
            "calm": [
                "calm peaceful relaxing",
                "meditation ambient music",
                "soft acoustic chill"
            ],
            "focus": [
                "focus study concentration",
                "deep work instrumental",
                "lo-fi study beats"
            ],
            "angry": [
                "angry intense aggressive",
                "hard rock rage songs",
                "powerful dark music"
            ],
            "nostalgic": [
                "nostalgic throwback classic",
                "old memories songs",
                "childhood songs retro"
            ],
            "party": [
                "party dance club hits",
                "fun upbeat dance music",
                "celeberation songs"
            ],
        }

        # Get mood keyword list
        # Default to "normal" if mood not found
        mood_keywords = mood_search_map.get(
            mood.lower(),
            mood_search_map["normal"]
        )

        # Use first keyword for primary search
        primary_keyword  = mood_keywords[0]
        fallback_keyword = mood_keywords[1] if len(mood_keywords) > 1 else mood_keywords[0]

        # --- Primary Search ---
        url = (
            f"https://itunes.apple.com/search"
            f"?term={primary_keyword}"
            f"&media=music&limit={limit}&explicit=No"
        )
        response = requests.get(url, timeout=10)
        data     = response.json()
        results  = data.get('results', [])

        # --- Fallback if not enough results ---
        if len(results) < 5:
            fallback_url = (
                f"https://itunes.apple.com/search"
                f"?term={fallback_keyword}"
                f"&media=music&limit={limit}&explicit=No"
            )
            fallback_resp    = requests.get(fallback_url, timeout=10)
            fallback_results = fallback_resp.json().get('results', [])
            results          = results + fallback_results

        # --- Format songs ---
        songs = []
        seen  = set()
        index = 0

        for track in results:
            # Skip duplicates
            track_id = track.get('trackId')
            if track_id in seen:
                continue
            seen.add(track_id)

            # Skip songs without preview
            if not track.get('previewUrl'):
                continue

            songs.append({
                "id":          index,
                "title":       track.get('trackName', 'Unknown'),
                "artist":      track.get('artistName', 'Unknown'),
                "album":       track.get('collectionName', 'Unknown'),
                "duration":    track.get('trackTimeMillis', 0),
                "preview_url": track.get('previewUrl', ''),
                "artwork":     track.get('artworkUrl100', '').replace(
                                   '100x100', '600x600'
                               ),
                "url":         track.get('trackViewUrl', ''),
                "genre":       track.get('primaryGenreName', 'Unknown'),
                "mood":        mood,
            })
            index += 1

            if index >= limit:
                break

        return songs

    except Exception as e:
        print(f"iTunes API error: {e}")
        return []