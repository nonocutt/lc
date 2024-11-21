# Second Tidal Patch

Noah Wang MTEC-343 Assignment 5

## Final Code

### For Tidal

```haskell
hush

setcps (180/240)    -- DO THIS FIRST

d1 $ randslice 16   -- my breakbeat sample, slice to 16 parts
  $ n ("1 [2 3] 2 [3 5] 4 6 7 8" |+ irand 7)  -- randomly sort the playback
  # s "break"
  # gain 0.8

d2 $ up ("-8? -5? 0? [-2|-1] ~ ~ -3? ~" |+ irand 4) -- transpose the sample
  # s "chordstab"   -- minor piano stab, add delay & reverb
  # hpf 300
  # delay 0.5
  # delayfb 0.6
  # delayt 0.25
  # gain 0.87
  # room 0.6

d3 $ slow 1         -- semi-random bass pattern
  $ palindrome
  $ note (scale "minor" "3 [5|6]? ~ [8|9] 11? [2 9]? [7|13] ~" |+ irand 4)
  # s "bass1:10"
  # distort 0.3
  # gain 0.75
  # lpf 300


d4 $ slow 4         -- chiptune sfx
  $ s "sfx:1"
  # gain 0.75
  # delay 0.6
  # delayfb 0.8
  # delayt 0.666
  # room 0.4

d5 $ slow 8         -- pikachu sfx
  $ n ("~ 0 ~ ~")
  # s "sfx:3"
  # delay 0.6
  # delayfb 0.6
  # delayt 0.5
  # room 0.7
  # gain 0.8

mute 1
unmute 1

mute 2
unmute 2

mute 3
unmute 3

mute 4
unmute 4

mute 5
unmute 5
```

### For SuperColldier

```haskell
(
s.options.numBuffers = 1024 * 256;
s.options.memSize = 8192 * 32;
s.options.maxNodes = 1024 * 32;
s.options.numOutputBusChannels = 2; // total number of output channels
s.options.numInputBusChannels = 0;

s.waitForBoot {
  ~dirt = SuperDirt(2, s); // total number of output channels
  ~dirt.loadSoundFiles;
  ~dirt.loadSoundFiles("/Users/luma/Documents/GitHub/lc/secondTidalPatch/sample/**"); // 01_xx, 02_xx.WAV
  s.sync; // wait for supercollider to finish booting up
  ~dirt.start(57120, 0 ! 12); // start superdirt, listening on port 57120, create twelve orbits each sending audio to channel 0
};
);
```

## My Steps

- I set the bpm to 180.
- I added all my samples in a folder and put the file directory to SuperCollider.

```haskell
~dirt.loadSoundFiles;
~dirt.loadSoundFiles("/Users/luma/Documents/GitHub/lc/secondTidalPatch/sample/**");
```

- I have 5 different layers for this patch:
  - A breakbeat sample from my sample library
  - A chord stab sample from my sample library
  - A semi-random bass pattern
  - A chiptune sfx from my sample library
  - A pikachu sfx from my sample library

- My first layer contains a breakbeat sample from my *break* library, sliced to 16 parts, and used *irand* to displace them.

```haskell
d1 $ randslice 16   -- my breakbeat sample, slice to 16 parts
  $ n ("1 [2 3] 2 [3 5] 4 6 7 8" |+ irand 7)  -- randomly sort the playback
  # s "break"
  # gain 0.8
```

- My second layer is a piano stab sample from my *chordstab* library. I use the *up* function to transpose it, then added high-pass filter, delay, and reverb.

```haskell
d2 $ up ("-8? -5? 0? [-2|-1] ~ ~ -3? ~" |+ irand 4) -- transpose the sample
  # s "chordstab"   -- minor piano stab, add delay & reverb
  # hpf 300
  # delay 0.5
  # delayfb 0.6
  # delayt 0.25
  # gain 0.87
  # room 0.6
```

- My fourth layer is a chiptune sound effect from my *sfx* library. I added delay and reverb on it.

```haskell
d4 $ slow 4         -- chiptune sfx
  $ s "sfx:1"
  # gain 0.75
  # delay 0.6
  # delayfb 0.8
  # delayt 0.666
  # room 0.4
```

- My fifth layer is a pikachu sound effect, also from my *sfx* library. I displaced it with my chiptune sfx, and also added delay and reverb on it.

```haskell
d5 $ slow 8         -- pikachu sfx
  $ n ("~ 0 ~ ~")
  # s "sfx:3"
  # delay 0.6
  # delayfb 0.6
  # delayt 0.5
  # room 0.7
  # gain 0.8
```
