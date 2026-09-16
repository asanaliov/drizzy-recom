# Drizzy Recom

Started from the bottom of a mood, now the whole playlist's here. Pick how you feel, get five songs from the 6 God that match it. Black and gold, a hundred and seventy-two tracks, nine moods, every one with a reason it made the cut. No cap, no filler, no skips.

Hit **Five more** and the pool runs it back with a new set. Copy the link and send somebody the mood directly, like `#heartbroken` when the texts go green, or `#late-night` when it's 6PM in New York and 3AM in Toronto.

## Started from the bottom

It's a static site. No build, no install, no long talk.

```sh
python3 -m http.server 8000
```

Then pull up to <http://localhost:8000>. Or just open `index.html` and let it ride.

## The moods

| Mood | For when |
| --- | --- |
| Trust Issues | it's over and you're still checking their story |
| 0 to 100 | the pregame, the gym, windows down on the Gardiner |
| Hotline Bling | the city's asleep and you're not |
| Twitter Fingers | you're right, they're wrong, and you want it on record |
| Weston Road | old photos, old friends, the block before all this |
| 6 God | you walk in like you own the place, because tonight you do |
| Now We're Here | it finally happened, and everyone said it wouldn't |
| Lover Boy | the one you're texting right now |
| Nonstop | the early morning and the plan nobody else believes in |

## Trust issues

Everything lives in `moods.js`. Each mood has a colour pair and a pool of tracks:

```js
{ title: "Marvins Room", album: "Take Care", year: 2011, why: "The 3am phone call you shouldn't make, in song form." }
```

Think a song's missing? Add a line to the right pool and reload. Use `album: "Single"` for the loosies. If you think Marvins Room should be under Hyped, that's between you and your woes.

Album covers come from Apple's public artwork CDN (`covers.js`). Tracks link out to YouTube and Spotify search instead of hardcoded IDs, so when a link changes the app doesn't. Know yourself, know your worth, know your fallbacks.

## Trust issues, part two

This is an unofficial fan project. It isn't affiliated with, endorsed by, or sponsored by Drake, OVO Sound, Republic Records, or anyone else on the credits. Album artwork, the owl, and song titles belong to their respective owners and appear here for identification only. Nothing is hosted: tracks link out to YouTube and Spotify search, and covers load from Apple Music's public artwork CDN. If you own any of it and want it gone, open an issue and it's gone.

## License

MIT for the code. Take care.
