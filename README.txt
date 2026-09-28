FOR MEGHA - HOW TO USE THIS PROJECT
===================================

1) WHERE TO PUT THE MP3
   Save your song as:  assets/megha-song.mp3   (same folder as this file).
   The player loads it automatically. If the file is missing or broken,
   it falls back to a royalty-free demo track (URL in CONFIG.fallback in
   script.js) and shows a small note under the player.
   Music never autoplays; she starts it with the play button.

2) HOW TO CHANGE THE NAME
   Open script.js. At the top, change   name: 'Megha'   in CONFIG.
   The name updates everywhere, including the typed secret word.
   (The tab title, headings, cover art and messages all follow it.)

3) HOW TO EDIT THE MESSAGES
   All text lives in the T object at the top of script.js: intro lines,
   quiz questions, this-or-that pairs, the letter, the final message,
   and the easter egg texts. Each line is  ['text', 'optional style'].
   Styles: soft (dim italic) or big (glowing headline).

4) EASTER EGGS
   - Tap the name in the title 7 times
   - Tap the moon icon (top right)
   - Type her name on a keyboard
   - Find the nearly invisible heart at the bottom-right of the birthday screen
   - The "Still here?" midnight flash before the big question

5) DEPLOY TO GITHUB PAGES
   - Create a GitHub repository and upload the contents of this folder
     (index.html, style.css, script.js, assets/) to the repo root.
   - Repo Settings > Pages > Source: "Deploy from a branch" > main / (root) > Save.
   - After a minute your site is live at https://YOURNAME.github.io/REPO/

6) DEPLOY TO NETLIFY
   - Go to app.netlify.com/drop and drag this whole folder onto the page.
   - You get a live link immediately. Rename it in Site settings if you like.

TIP: Test on your phone first. Sound effects can be muted with the speaker
icon (top right). Fonts load from Google Fonts; without internet the site
falls back to Georgia and system fonts.


FINAL BUILD NOTE
This package includes a working local demo MP3 at assets/megha-song.mp3. Upload the entire folder contents to the GitHub repository root. The second chapter also has an explicit continuation button so the experience cannot get stuck there.


HEART GAME FIX
The Catch the Hearts game uses JavaScript-controlled touch/pointer events and timers rather than relying on CSS animation-end events. This makes it reliable on desktop and mobile browsers.
