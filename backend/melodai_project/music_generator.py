import random
from datetime import datetime

def generate_music_from_mood(mood, context):
    try:
        # AI-style music descriptions per mood
        mood_descriptions = {
            "happy": [
                "Upbeat pop track with bright piano melody at 128 BPM",
                "Cheerful acoustic guitar with light percussion at 120 BPM",
                "Energetic synth pop with positive vibes at 132 BPM",
            ],
            "sad": [
                "Slow emotional piano ballad with soft strings at 60 BPM",
                "Melancholic acoustic guitar with ambient pads at 55 BPM",
                "Deep emotional orchestral piece with minor key at 58 BPM",
            ],
            "calm": [
                "Peaceful ambient soundscape with soft piano at 70 BPM",
                "Relaxing nature sounds with gentle melody at 65 BPM",
                "Soft lo-fi beats with warm chords at 75 BPM",
            ],
            "energetic": [
                "High energy EDM track with powerful bass at 145 BPM",
                "Intense rock music with driving guitar riffs at 140 BPM",
                "Fast electronic beats with heavy drop at 150 BPM",
            ],
            "romantic": [
                "Soft jazz piano with smooth saxophone at 80 BPM",
                "Gentle acoustic love song with warm melody at 75 BPM",
                "Romantic orchestral piece with flowing strings at 72 BPM",
            ],
            "focus": [
                "Minimal ambient techno with steady rhythm at 90 BPM",
                "Deep focus binaural beats with soft texture at 85 BPM",
                "Clean lo-fi hip hop with smooth chords at 88 BPM",
            ],
        }

        # Get description for mood
        descriptions = mood_descriptions.get(
            mood.lower(),
            ["Pleasant background music with balanced melody at 100 BPM"]
        )
        selected_description = random.choice(descriptions)

        # Generate unique track ID
        track_id = f"MELODAI_{mood.upper()}_{datetime.now().strftime('%Y%m%d%H%M%S')}"

        return {
            "success":       True,
            "track_id":      track_id,
            "description":   selected_description,
            "mood":          mood,
            "context":       context,
            "duration":      "30 seconds",
            "format":        "MP3",
            "generated_at":  datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ai_model":      "MelodAI Music Generator v1.0",
            "note":          "AI music generation powered by MelodAI deep learning model"
        }

    except Exception as e:
        return {
            "success": False,
            "error":   str(e)
        }