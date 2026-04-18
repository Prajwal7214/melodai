from django.urls import path
from . import views

urlpatterns = [
    path('test-api/',          views.test_api),
    path('generate-music/',    views.generate_music),
    path('spotify-recommend/', views.spotify_recommend),
    path('search/',            views.search_by_text),   # ← NEW
    path('save-history/',      views.save_history),
    path('get-history/',       views.get_history),
    path('get-playlist/',      views.get_playlist),
    path('favourites/',         views.get_favourites),
    path('favourites/add/',     views.add_favourite),
    path('favourites/remove/',  views.remove_favourite),
    path('favourites/check/',   views.check_favourite),
]