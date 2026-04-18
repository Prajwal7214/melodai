# 🎵 MelodAI — Section by Section Prompts for Antigravity

---

## HOW TO USE THESE PROMPTS:
Give ONE section prompt at a time to Antigravity.
Wait for it to finish, verify it looks good, then move to next section.

---

# ═══════════════════════════════════════
# SECTION 1 — Project Setup + Global Styles
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer (Awwwards-level) specializing in React, Framer Motion, and dark mode UI design.

**THE TASK:**
Set up the base project for MelodAI — an AI-powered music app. Create the global configuration, styling, routing, and API setup only. No pages yet.

**TECH STACK:**
- Framework: React 18 (Vite)
- Styling: Tailwind CSS
- Animation: Framer Motion
- HTTP: Axios
- Icons: Lucide React
- Fonts: Poppins + Inter (Google Fonts)

**COLOR PALETTE:**
```
Background:      #0A0A14
Card BG:         #12122A
Primary:         #6C63FF
Secondary:       #FF6584
Accent:          #00D4FF
Text Primary:    #FFFFFF
Text Secondary:  #A0AEC0
Border:          rgba(255,255,255,0.08)
```

**OUTPUT REQUIRED:**
1. `package.json` — with all dependencies
2. `tailwind.config.js` — custom colors + fonts
3. `index.css` — global styles, scrollbar, fonts
4. `App.jsx` — React Router setup with routes for:
   - `/` → Home
   - `/generate` → Generate Music
   - `/recommendations` → Recommendations
   - `/history` → History
5. `api/melodai.js` — All API calls:
```javascript
BASE_URL = 'http://127.0.0.1:8000'

// Functions needed:
generateMusic(mood, context)
getRecommendations(mood)
saveHistory(mood, context)
getHistory()
getPlaylist(mood, limit)
```
6. `context/PlayerContext.jsx` — Global music player state with:
   - currentSong, playlist, isPlaying, volume, currentTime
   - Functions: play, pause, next, previous, setVolume, seek

**VISUAL STYLE:**
- Pure dark mode
- Glassmorphism: `backdrop-blur-md bg-white/5 border border-white/10`
- Smooth page transitions with Framer Motion

---

# ═══════════════════════════════════════
# SECTION 2 — Navbar Component
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React and Framer Motion.

**THE TASK:**
Build ONLY the Navbar component for MelodAI music app.

**DESIGN:**
```
[ 🎵 MelodAI ]    [ Home  Generate  Recommendations  History ]    [ Login  Get Started ]
```

**SPECS:**
- Fixed top, full width
- Background: `bg-[#0A0A14]/80 backdrop-blur-lg`
- Border bottom: `border-b border-white/5`
- Logo: gradient text purple to pink `🎵 MelodAI`
- Nav links: fade to white on hover, active link = purple underline
- `Get Started` button: gradient purple to pink, rounded-full
- Mobile: hamburger menu that slides down smoothly
- Scroll effect: navbar becomes more opaque when user scrolls down
- Framer Motion: links have hover scale animation

**OUTPUT:**
`components/Navbar.jsx` — complete working component

---

# ═══════════════════════════════════════
# SECTION 3 — Hero Section (Homepage)
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React, Framer Motion, and immersive hero sections.

**THE TASK:**
Build ONLY the Hero section for MelodAI homepage.

**CONTENT:**
```
Main Heading:   "Feel the Music,"
                "Your Mood Deserves"

Sub Heading:    "AI-powered music generation that understands
                 your emotions and creates the perfect soundtrack
                 for every moment of your life."

Button 1:       🎵 Generate My Music  (links to /generate)
Button 2:       🎧 Explore Songs  (links to /recommendations)

Trust Text:     ✨ No signup required  •  🎯 6 moods  •  🎶 Real songs
```

**VISUAL EFFECTS:**
- Animated aurora/gradient background that slowly moves
- Floating musical notes particles in background (use simple divs or canvas)
- Main heading: large gradient text (purple → cyan)
- Buttons: gradient with hover glow effect
- 3 floating album art placeholder cards in background (blurred, slowly rotating)
- All elements animate in with Framer Motion stagger effect on load

**COLOR:**
- Background: `#0A0A14`
- Heading gradient: `from-[#6C63FF] via-[#00D4FF] to-[#FF6584]`
- Button 1: `from-[#6C63FF] to-[#FF6584]`
- Button 2: border only, glass style

**OUTPUT:**
`components/HeroSection.jsx` — complete working component

---

# ═══════════════════════════════════════
# SECTION 4 — Mood Selector Section (Homepage)
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React and interactive UI cards.

**THE TASK:**
Build ONLY the Mood Selector section for MelodAI homepage.

**CONTENT:**
```
Section Title:  "How Are You Feeling Today?"
Sub Title:      "Select your mood and let AI create your perfect soundtrack"
```

**6 MOOD CARDS:**
```
😊 Happy      "Upbeat & Cheerful"    color: #FFD700
😢 Sad        "Emotional & Deep"     color: #4A90D9
😌 Calm       "Peaceful & Relaxing"  color: #48BB78
⚡ Energetic  "Powerful & Intense"   color: #FF4500
💕 Romantic   "Soft & Tender"        color: #FF6584
🎯 Focus      "Sharp & Minimal"      color: #6C63FF
```

**CARD DESIGN:**
- Glass card: `bg-white/5 backdrop-blur-md border border-white/10`
- Emoji: large (text-5xl), centered
- Mood name: bold white text
- Description: small secondary text
- Hover: scale(1.05) + colored glow shadow + border color change
- Click: navigate to `/generate?mood=happy` (pass mood in URL)
- Selected/Active: glowing border + background tint of mood color

**ANIMATION:**
- Cards fade in with stagger (0.1s delay each) on scroll into view
- Hover animation: Framer Motion `whileHover`
- Floating subtle animation on cards (slight y movement)

**OUTPUT:**
`components/MoodSection.jsx` — complete working component

---

# ═══════════════════════════════════════
# SECTION 5 — How It Works Section (Homepage)
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React and scroll animations.

**THE TASK:**
Build ONLY the "How It Works" section for MelodAI homepage.

**CONTENT:**
```
Title: "How MelodAI Works"

Step 1: 🎭  "Select Your Mood"
            "Tell us how you feel right now"

Step 2: 🤖  "AI Generates Music"
            "Our AI engine creates the perfect track for you"

Step 3: 🎵  "Enjoy & Save"
            "Listen to your personalized playlist and save history"
```

**DESIGN:**
- 3 cards in a row with animated connecting line/arrow between them
- Each card: glass style, numbered badge (01, 02, 03)
- Large icon at top of each card
- Animated connector line that draws from left to right on scroll
- Cards animate in one by one from bottom on scroll

**ANIMATION:**
- Framer Motion `whileInView` for scroll trigger
- Stagger children animation
- Connector line draws with `pathLength` animation

**OUTPUT:**
`components/HowItWorksSection.jsx` — complete working component

---

# ═══════════════════════════════════════
# SECTION 6 — Features + Stats + Testimonials (Homepage)
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React UI components.

**THE TASK:**
Build THREE sections for MelodAI homepage in ONE component:
1. Features Section
2. Stats Counter Section
3. Testimonials Section

**FEATURES SECTION:**
```
Title: "Why Choose MelodAI?"

6 Cards (3x2 grid):
🤖 AI Music Generation      "Smart AI creates unique music based on your mood"
🎧 Real Song Recommendations "Get 10 real songs from iTunes matched to your mood"
📱 Built-in Music Player     "Play, pause, skip with full volume control"
💾 History Tracking          "All your sessions saved to MongoDB cloud"
⚡ Instant Results           "Recommendations generated in under 3 seconds"
🎭 6 Mood Categories         "Happy, Sad, Calm, Energetic, Romantic, Focus"
```

**STATS SECTION:**
```
Background: subtle gradient band across full width

🎵 6          🎶 10           ⚡ <3 sec      🗄️ Cloud
Moods      Songs/Session    Response       MongoDB
```
- Numbers count up from 0 when scrolled into view

**TESTIMONIALS SECTION:**
```
Title: "What Users Say"

Card 1: ⭐⭐⭐⭐⭐
"MelodAI perfectly matches music to my study sessions!"
— Priya S., Student

Card 2: ⭐⭐⭐⭐⭐
"The romantic mood playlist was absolutely perfect for my date!"
— Rahul M., Engineer

Card 3: ⭐⭐⭐⭐⭐
"I use the focus mode every single day for coding sessions!"
— Anika T., Developer
```

**OUTPUT:**
`components/FeaturesSection.jsx` — all three sections in one file

---

# ═══════════════════════════════════════
# SECTION 7 — CTA Section + Footer (Homepage)
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React UI.

**THE TASK:**
Build the CTA Section and Footer for MelodAI homepage.

**CTA SECTION:**
```
Background: gradient from #6C63FF to #FF6584 (or glass card version)

Big Heading: "Ready to Experience
              AI-Powered Music?"

Sub Text:    "Select your mood and let MelodAI create
              the perfect musical journey for you."

Button:      [ 🎵 Start Listening Now ]  → links to /generate
```
- Full width section with gradient or glassmorphism background
- Animated background orbs/blobs
- Button: white text on dark, hover = scale up

**FOOTER:**
```
Left Column:
  🎵 MelodAI
  "AI-powered music for every emotion"

Center Column:
  Quick Links
  Home | Generate Music | Recommendations | History

Right Column:
  Made with ❤️
  Final Year Project
  © 2026 MelodAI
```
- Background: `#050510`
- Top border: subtle gradient line
- Social icons (optional): Github, LinkedIn

**OUTPUT:**
`components/CTASection.jsx`
`components/Footer.jsx`

---

# ═══════════════════════════════════════
# SECTION 8 — Complete Home Page Assembly
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React.

**THE TASK:**
Assemble ALL homepage sections into one complete `Home.jsx` page.

**ASSEMBLE IN THIS ORDER:**
```
1. <Navbar />
2. <HeroSection />
3. <MoodSection />
4. <HowItWorksSection />
5. <FeaturesSection />   (includes Stats + Testimonials)
6. <CTASection />
7. <Footer />
```

**SPECS:**
- Smooth scroll between sections
- Page fade-in on load with Framer Motion
- Each section has proper spacing `py-20`
- Mobile responsive throughout

**OUTPUT:**
`pages/Home.jsx` — complete assembled homepage

---

# ═══════════════════════════════════════
# SECTION 9 — Song Card + Song List Components
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React music UI.

**THE TASK:**
Build reusable song components used across multiple pages.

**SONG CARD COMPONENT:**
```
[ Album Art (60x60, rounded) ] [ Title + Artist ] [ Genre Badge ] [ Duration ] [ ▶ Play ]
```
- Glass background
- Hover: highlight row + show play button
- Active/Playing song: glowing left border + pulsing artwork
- Duration: convert milliseconds to mm:ss format
- Genre: small colored badge
- Click play = add to player queue and start playing

**SONG GRID CARD (for Recommendations page):**
```
[ Large Album Art (full width top) ]
[ Title ]
[ Artist ]
[ Genre Badge ]
[ ▶ Play Button (overlay on hover) ]
```

**LOADING SKELETON:**
- Animated shimmer placeholder while songs load
- Match exact layout of SongCard

**OUTPUT:**
`components/SongCard.jsx` — list style song item
`components/SongGridCard.jsx` — grid style song card
`components/LoadingSkeleton.jsx` — shimmer loading state

---

# ═══════════════════════════════════════
# SECTION 10 — Music Player (Bottom Bar)
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React audio players.

**THE TASK:**
Build the persistent bottom music player bar for MelodAI.
This player stays visible on ALL pages (like Spotify).

**PLAYER LAYOUT:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Artwork] [Title / Artist]  [⏮ ⏪ ▶/⏸ ⏩ ⏭]  [🔀 🔁]  [🔈━━●━━🔊] │
│           Progress: ━━━━━━●━━━━━━━━━━  0:15 / 0:30                 │
└─────────────────────────────────────────────────────────────────────┘
```

**FEATURES:**
- Play / Pause toggle button
- Previous song button
- Next song button
- Seek bar — click or drag to jump position
- Volume slider — drag to change volume
- Mute button
- Current time display + total time
- Album artwork (small, rounded, with rotation animation when playing)
- Song title + artist name
- Shuffle toggle button
- Repeat button (off → repeat-one → repeat-all)

**AUDIO LOGIC:**
```javascript
// Use HTML5 Audio API
const audio = new Audio()
audio.src = song.preview_url   // iTunes 30-second preview
audio.play()
audio.pause()
audio.currentTime = seekValue
audio.volume = volumeValue

// Events to listen:
audio.ontimeupdate   → update progress bar
audio.onended        → auto play next song
audio.onloadeddata   → show duration
```

**DESIGN:**
- Fixed bottom, full width, z-index 50
- Background: `bg-[#12122A]/95 backdrop-blur-xl`
- Border top: `border-t border-white/10`
- Artwork: 50x50, rounded, slow rotation animation when playing
- Progress bar: custom styled, purple fill
- Volume bar: custom styled
- Slides up from bottom with Framer Motion when first song plays
- Mobile: simplified layout (artwork + controls only)

**STATE:**
- Use `PlayerContext` from Section 1
- Player persists when navigating between pages

**OUTPUT:**
`components/MusicPlayer.jsx` — complete player component

---

# ═══════════════════════════════════════
# SECTION 11 — Generate Music Page
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React forms and API integration.

**THE TASK:**
Build the complete Generate Music page for MelodAI.

**LAYOUT:** Two columns on desktop, single column on mobile

**LEFT PANEL — Input Form:**
```
Title:    "Generate Your Music"
Subtitle: "Tell us your mood and we'll create your perfect soundtrack"

[Mood Selector — 6 clickable cards]
😊 Happy  😢 Sad  😌 Calm  ⚡ Energetic  💕 Romantic  🎯 Focus

[Context Input Field]
Label:       "What are you doing?"
Placeholder: "studying, working out, sleeping, relaxing..."

[Generate Button]
"🎵 Generate Music"
Loading state: "⏳ Generating your music..."
```

**AI RESULT CARD (shown after generation):**
```
✅ Music Generated!
━━━━━━━━━━━━━━━━━━━
🎵 Track ID:    MELODAI_HAPPY_20260402
📝 Description: Upbeat pop track with bright piano at 128 BPM
⏱️ Duration:    30 seconds  
🎼 Format:      MP3
🤖 AI Model:    MelodAI Generator v1.0
```
- Animate in with Framer Motion slide up + fade
- Gradient border glow effect

**RIGHT PANEL — Song Recommendations:**
```
Title: "Recommended Songs for [mood]"
[10 SongCard components]
[Save to History button]
```

**API CALLS:**
```javascript
// On Generate button click:
1. POST /api/generate-music/ { mood, context }
2. Display ai_music result
3. Display recommendations list
4. Auto-load songs into player queue

// On Save History click:
POST /api/save-history/ { mood, context }
Show success toast notification
```

**OUTPUT:**
`pages/GenerateMusic.jsx` — complete page

---

# ═══════════════════════════════════════
# SECTION 12 — Recommendations Page
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React and music UIs.

**THE TASK:**
Build the complete Recommendations page for MelodAI.

**LAYOUT:**

**Header:**
```
Title:    "Discover Music by Mood"
Subtitle: "Real songs matched perfectly to how you feel"
```

**Mood Filter Bar (horizontal scroll on mobile):**
```
[ All ] [ 😊 Happy ] [ 😢 Sad ] [ 😌 Calm ] [ ⚡ Energetic ] [ 💕 Romantic ] [ 🎯 Focus ]
```
- Active filter: gradient background + glow
- Click = API call to `/api/spotify-recommend/`

**Song Grid:**
- 3 column grid on desktop, 2 on tablet, 1 on mobile
- Each `SongGridCard` with artwork + title + artist + play button
- Loading skeleton while fetching (show 9 skeleton cards)
- Stagger animation when songs appear

**On song click:**
- Add all 10 songs to player queue
- Start playing clicked song
- Player bar appears at bottom

**API CALL:**
```javascript
POST /api/spotify-recommend/ { mood: selectedMood }
```

**OUTPUT:**
`pages/Recommendations.jsx` — complete page

---

# ═══════════════════════════════════════
# SECTION 13 — History Page
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer specializing in React timeline UIs.

**THE TASK:**
Build the complete History page for MelodAI.

**LAYOUT:**

**Header:**
```
Title:    "Your Music History"
Subtitle: "All your past mood sessions saved here"
```

**History Timeline Cards:**
Each card from `/api/get-history/` shows:
```
┌─────────────────────────────────────────┐
│ [Mood Emoji] HAPPY MOOD    📅 Date/Time │
│ 📝 Context: "studying"                  │
│                                          │
│ 🎵 AI Generated:                        │
│    Upbeat pop track at 128 BPM          │
│                                          │
│ 🎧 Songs:                               │
│    [Artwork] Song 1 - Artist            │
│    [Artwork] Song 2 - Artist            │
│    [Artwork] Song 3 - Artist            │
│                                          │
│ [ ▶ Play Again ]  [ 🗑 Delete ]         │
└─────────────────────────────────────────┘
```

**DESIGN:**
- Cards sorted by most recent first
- Each card: glass style with mood color left border
- Mood badge: colored pill (Happy = yellow, Sad = blue, etc.)
- `Play Again` button: reloads those songs into player queue
- Empty state: nice illustration + "No history yet, generate some music!"
- Fade in animation on scroll with stagger

**API CALL:**
```javascript
GET /api/get-history/
```

**OUTPUT:**
`pages/History.jsx` — complete page

---

# ═══════════════════════════════════════
# SECTION 14 — Final Assembly + Polish
# ═══════════════════════════════════════

**ACT AS:**
A world-class Creative Developer doing final polish on a React app.

**THE TASK:**
Do the final assembly and polish for MelodAI app.

**TASKS:**

1. **Update `App.jsx`** — Add `<MusicPlayer />` outside routes so it persists on all pages:
```jsx
<PlayerProvider>
  <Router>
    <Routes>...</Routes>
    <MusicPlayer />   {/* Always visible */}
  </Router>
</PlayerProvider>
```

2. **Add Toast Notifications** for:
   - Music generated successfully ✅
   - History saved ✅
   - Error loading songs ❌
   - Song added to queue 🎵

3. **Add Loading States:**
   - Spinner on Generate button while API loads
   - Skeleton cards while songs load
   - Page loader on first visit

4. **Add Error States:**
   - If API fails: show retry button + error message
   - If no songs found: show empty state illustration

5. **Mobile Responsive Check:**
   - Navbar → hamburger menu on mobile
   - Player bar → simplified on mobile
   - Mood cards → 2x3 grid on mobile
   - Song list → full width on mobile

6. **Smooth Page Transitions:**
```jsx
// Wrap each page content with:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
```

7. **Active Nav Link** — highlight current page in navbar

**OUTPUT:**
Updated `App.jsx` with all providers and player
Final polish applied to all components

---

## 📋 SECTION ORDER SUMMARY:

```
Section 1  → Project Setup + Config + API + Context
Section 2  → Navbar
Section 3  → Hero Section
Section 4  → Mood Selector Section
Section 5  → How It Works Section
Section 6  → Features + Stats + Testimonials
Section 7  → CTA + Footer
Section 8  → Home Page Assembly
Section 9  → Song Card Components
Section 10 → Music Player (Bottom Bar)
Section 11 → Generate Music Page
Section 12 → Recommendations Page
Section 13 → History Page
Section 14 → Final Assembly + Polish
```

**Give ONE section at a time. Verify it works. Then move to next.** ✅
