# First Tidal Patch

Noah Wang MTEC-343 Assignment 4

## Final Code

```haskell

hush

setcps (75/240)

import Sound.Tidal.Chords

d1 $ fast 2                                   --arp
  $ n "[0|-12|-5] [3|5|7] [10|12|15] [3|5|7]? [17|14|12] [9|10|15] [3|7|24|22] [12|19]"
  # s "supersquare"
  # octave "[4|5|6]"
  # semitone 0
  # lpf 1000
  # lpq 0.2
  # room 0.8
  # size 0.6
  # gain 0.5

d2 $ s "[[808bd 808bd] ~ ~ [808bd 808bd]] ~"  --kick
  # shape 0.8
  # gain 0.65

d3 $ s "[~ 808sd]!2" <| n (run 4)             --snare
  # gain 0.8

d4 $ n "[[0 0] ~ ~ [0 0]] ~"                  --bass
  # s "supersaw"
  # octave 3
  # semitone 0
  # lpf 300
  # gain 0.75

d5 $ fast 4                                   --delayed chords
  $ n "[c'min11'5'd3|c'min9'd2|c'min11'i2|~]"
  # sound "[supervibe|superfork]"
  # hpf 550
  # delay 0.5
  # delayfb 0.5
  # delayt 3
  # room 0.6
  # gain 0.7

d6 $ n "[c'min11'o]"
  # sound "supersaw"
  # lpf 700
  # room 0.9
  # gain 0.8
```

## My Steps

- I set the bpm to 75.
- I have 6 different layers for this patch:
  - A triangle-wavy arpeggio
  - A kick drum
  - A snare drum
  - A bass
  - A chord stab with delay
  - A pad

- My first layer contains a sequence of notes with random picking integration. I added a filter to square wave to make it sounds like trangle wave. I added some reverb on it.

```haskell

d1 $ fast 2                                   --arp
  $ n "[0|-12|-5] [3|5|7] [10|12|15] [3|5|7]? [17|14|12] [9|10|15] [3|7|24|22] [12|19]"
  # s "supersquare"
  # octave "[4|5|6]"
  # semitone 0
  # lpf 1000
  # lpq 0.2
  # room 0.8
  # size 0.6
  # gain 0.5
```

- My second and third layers are the drum sounds. I added a bit of overdrive on the kick.

```haskell

d2 $ s "[[808bd 808bd] ~ ~ [808bd 808bd]] ~"  --kick
  # shape 0.8
  # gain 0.65

d3 $ s "[~ 808sd]!2" <| n (run 4)             --snare
  # gain 0.8
```

- My fourth layer is a sawtooth bass sound. Its rhythm matches the kick.

```haskell

d4 $ n "[[0 0] ~ ~ [0 0]] ~"                  --bass
  # s "supersaw"
  # octave 3
  # semitone 0
  # lpf 300
  # gain 0.75
```

- My fifth layer is a chord stab on 2 sounds with delay. I used the chord function, drop voicing, and inversion to make the variation.

```haskell
import Sound.Tidal.Chords

d5 $ fast 4                                   --delayed chords
  $ n "[c'min11'5'd3|c'min9'd2|c'min11'i2|~]"
  # sound "[supervibe|superfork]"
  # hpf 550
  # delay 0.5
  # delayfb 0.5
  # delayt 3
  # room 0.6
  # gain 0.7
```

- My final layer is a supersaw pad with filter.

```haskell

d6 $ n "[c'min11'o]"
  # sound "supersaw"
  # lpf 700
  # room 0.9
  # gain 0.8
```
