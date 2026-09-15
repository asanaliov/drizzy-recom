# Drake by Mood

Pick a mood, get five Drake songs that fit it.

Eight moods, 96 tracks, every one with a line on why it's there. Hit **Five more** to draw another set from the same pool, or copy the link to send someone a mood directly (`#heartbroken`, `#late-night`, and so on).

## Run it

It's a static site. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

Then go to <http://localhost:8000>.

## Add a track

Everything lives in `moods.js`. Each mood has a colour pair and a list of tracks:

```js
{ title: "Marvins Room", album: "Take Care", year: 2011, why: "The 3am phone call you shouldn't make, in song form." }
```

Add a line to the right pool and reload. Use `album: "Single"` for loosies.

## Moods

Heartbroken, Hyped, Late night, Petty, Nostalgic, Confident, In love, Grinding.

Tracks link to YouTube and Spotify search rather than fixed IDs, so nothing breaks when a link changes.

## License

MIT
