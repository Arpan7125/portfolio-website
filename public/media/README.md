# Backdrop media

Drop background photos and video clips here, then point
`media` in [`src/data/profile.js`](../../src/data/profile.js) at them.
Nothing renders until a path is set, so an empty folder is a valid state.

## Licensing — read this first

This site is public. Only use media you own or that carries a free
**commercial** licence.

**Safe:**

- Photos and clips you shot yourself
- [Pexels](https://www.pexels.com/search/formula%201/), [Pixabay](https://pixabay.com/videos/search/racing/),
  [Unsplash](https://unsplash.com/s/photos/race-car) — free for commercial use, no attribution required
  (attribution still appreciated; add it to the footer if you want)

**Not safe, regardless of where you found the file:**

- Official Formula 1 broadcast footage or screen grabs
- Press/agency photography (Getty, Motorsport Images, LAT, team media sites)
- Any shot where a current team livery and its sponsor logos are the subject
- YouTube rips, onboard footage, race highlights

F1 and its teams actively enforce this, including against personal
portfolios. Free-licence stock has plenty of genuine open-wheel and
formula-style cars — they just aren't wearing this season's sponsors.

## Specs

| Asset  | Format          | Target size      | Notes                                          |
|--------|-----------------|------------------|------------------------------------------------|
| Video  | `.mp4` (H.264)  | **under 3 MB**   | 6–12 s seamless loop, 1280×720, no audio track |
| Poster | `.jpg`/`.webp`  | **under 150 KB** | 1600 px wide, matches the video's first frame  |

The poster does the work on phones, on touch devices and for anyone with
`prefers-reduced-motion` set — the video only loads on a wide desktop
viewport with a fine pointer, and only once the section scrolls into view.
So the poster is the one that has to look good; treat the video as a bonus.

Strip the audio track — it saves bytes and the video is muted anyway:

```bash
ffmpeg -i input.mp4 -an -vf "scale=1280:-2" -c:v libx264 -crf 30 -preset slow -movflags +faststart hero-track.mp4
```

## Keeping text readable

`MediaBackdrop` always paints a scrim over the media, and the `opacity`
values in `profile.js` are deliberately low (0.14–0.26). Turn them up and
you will start losing contrast on the body copy — check any change against
grey `#A0A0A0` text before shipping it.
