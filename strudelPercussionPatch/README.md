# Strudel Percussion Patch

Noah Wang MTEC-343 Assignment 2

## Final Code

```strudel
stack (
  ("[bd bd!3?] [bd bd!3?] [bd bd!3?] [bd bd!3?]").bank("RhodesPolaris").hpf(400),
  ("bd!4").bank("CasioRZ1"),
  ("[EmuModular_perc|SergeModular_perc]?").fast(16).lpf(6000),
  ("[~ perc ~ perc] [perc ~ ~ perc] [[perc!3] perc] [[~ perc] [perc!7]]").bank("RolandCompurhythm8000").pan(square.fast(2)).gain(".15"),
  ("[~ triangles] [~ triangles ~ ~] [triangles ~ ~ triangles] [~ triangles]").gain("1.75"),
  ("RolandMC303_rd siren").delay(".25").delaytime(".35").slow(4)
).cpm(137/4).s()
```

## My Steps

- I used the *stack* function to create different layers. Then I set the cpm to 137.

```strudel
stack (

).cpm(137/4).s()
```

- I used kick drums from *RhodesPolaris* bank for the percussion, then run it through a high-pass filter to make it does not sound like a kick.

```strudel
  ("[bd bd!3?] [bd bd!3?] [bd bd!3?] [bd bd!3?]").bank("RhodesPolaris").hpf(400),
```

- I used kick drums from *CasioRZ1* bank for 4-on-floor kicks.

```strudel
  ("bd!4").bank("CasioRZ1"),
```

- I picked up 2 different percussion sound *EmuModular_perc* and *SergeModular_perc*, run them into a random-pick function, and repeat it 16 times in a cycle. I also run it into a low pass filter in order not to make the sound too harsh.

```strudel
  ("[EmuModular_perc|SergeModular_perc]?").fast(16).lpf(6000),
```

- I used the clave sound from *Roland CR-8000* and pan it on either all left or all right, using square wave.
  - I also changed the rhythm to make it sounds more lively.
  - I adjusted the volume to 15% to match the balance between channels.

```strudel
  ("[~ perc ~ perc] [perc ~ ~ perc] [[perc!3] perc] [[~ perc] [perc!7]]").bank("RolandCompurhythm8000").pan(square.fast(2)).gain(".15"),
```

- I also used a triangle sample as another percussion sound. I created a simpler pattern and made the gain louder.

```strudel
  ("[~ triangles] [~ triangles ~ ~] [triangles ~ ~ triangles] [~ triangles]").gain("1.75"),
```

- Finally, I used a *Roland MC-303* ride sample and a siren sample as one shot effects. I added a delay as an audio effect.

```strudel
  ("RolandMC303_rd siren").delay(".25").delaytime(".35").slow(4)
```
