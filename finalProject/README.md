# Tidal Cycles Solo Final Project

Noah Wang MTEC-343 Final Project

## Final Code

### For Tidal Cycle

```haskell
hush

setcps (140/240)    -- DO THIS FIRST

d1 $ n ("[0 ~]!2")    -- kick
  # s "gbkick:1"
  # gain 0.8

-- d1 $ n ("[0 0] [~ 0] 0 ~")
--   # s "gbkick:2"
--   # gain 0.75

d2 $ n ("[~ 0]!2")    -- snare
  # s "gbsnare:4"
  # gain 0.9

-- d2 $ n ("[~ 0]!2")
--   # s "gbsnare:1"
--   # gain 0.75

d3 $ n ("[0!4] [0 0 0 1]")    -- hihat
  # s "gbhat"
  # gain 0.85

-- d3 $ n ("0!16")
--   # s "gbhat"
--   # gain 0.78

d4 $ up ("[4 2 -1 4] [4 -1 2 4]")   -- triangle bass
  # s "triangle"
  # gain 1

d5 $ palindrome
  $ up ("[[-1|4|9] [2|7|11]]*3")    -- square triplets
  # s "square"
  # gain 0.7
  # delay 0.2
  # delayfb 0.6
  # delayt 0.666

d6 $ fast 2                         -- saw arp
  $ up "~ [[[4|-8|-1] [7|9|11] [14|16|19] [7|9|11]]|[[21|18|16] [13|14|19] [7|11|28|26] [16|23|4]]]"
  # s "sawtooth"
  # gain 0.9

d7 $ palindrome                     -- pulse melody
  $ note (scale "dorian" "[0|1|2|3|4|5|6]*8?" +4)   -- 16
  # s "supersquare"
  # voice 0.85
  # semitone 0
  # pitch1 3
  # octave (choose [5,6])
  # gain 0.55
  # delay 0.2
  # delayt 0.333
  # delayfb 0.6

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

mute 6
unmute 6

mute 7
unmute 7
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
    ~dirt.loadSoundFiles("/Users/luma/Documents/GitHub/lc/finalProject/sample/**"); // 01_xx, 02_xx.WAV
    s.sync; // wait for supercollider to finish booting up
    ~dirt.start(57120, 0 ! 12); // start superdirt, listening on port 57120, create twelve orbits each sending audio to channel 0
};
);
```

### For Hydra

```javascript
osc(8,-0.5, 1)
  .color(-1.5, -1.5, -1.5)          // darker
  // .blend(o0)                     // uncheck this to make it pale
  .rotate(-0.5, -0.5)               // rotating rainbow
  .modulate(noise(0.6,0.5)
    .rotate(0.5, 0.5)
    .scale(2)
  )                                 // repeated rectangles
  .brightness(-0.75)                // dim the display
  .out(o1)

osc(5, 0.9, 0.001)
  .kaleid([3,4,5,7,8,9,10].fast(0.1))    // Apply a kaleidoscopic effect with dynamic parameters
  .color(0.5, 0.3)               // Color the oscillator
  .colorama(0.1)                 // hue, make it purple
  .rotate(0.009,()=>Math.sin(time)* -0.001 )   // Slowly rotate
  .modulateRotate(o0,()=>Math.sin(time) * 0.003)
  .modulate(o0, 0.9)
  .scale(0.9)
  .brightness(-0.4)
  .contrast(2)
  .out(o2)

shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7].smooth(1))
  .color(0.2,0.4,0.3)
  .scrollX(()=>Math.sin(time*0.27))
  .add(
    shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))
    .color(0.6,0.2,0.5)
    .scrollY(0.35)
    .scrollX(()=>Math.sin(time*0.33)))
  .add(
    shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.3].smooth(1))
  .color(0.2,0.4,0.6)
  .scrollY(-0.35)
  .scrollX(()=>Math.sin(time*0.41)*-1))
  .add(
    src(o0).shift(0.001,0.01,0.001)
    .scrollX([0.05,-0.05].fast(0.1).smooth(1))
    .scale([1.05,0.9].fast(0.3).smooth(1),[1.05,0.9,1].fast(0.29).smooth(1))
    ,0.85)
  .modulate(voronoi(10,2,2))
  .contrast(5)                  // added contrast to make it darker
  .out(o3)                      // I did not make this layer. I copied it from Nesso's "clouds of passage"

src(o3).add(o2).add(o1)
  .brightness(-0.5)
  .pixelate(160,120)
  .out(o0)                      // final output
```

## My Steps

### For Audio

- I set the bpm to 140.
- I decided to make a chiptune style performance, so I used the GameBoy drum samples and basic waveforms samples. I added them in a folder and put the file directory to SuperCollider.

```haskell
~dirt.loadSoundFiles;
~dirt.loadSoundFiles("/Users/luma/Documents/GitHub/lc/finalProject/sample/**");
```

- I have 7 different layers for the Tidal Cycle patch:
  - 3 layers for drums: kick, snare, and hi-hat
  - A bitcrushed triangle waveform for the bass
  - A square wave triplet pattern in the mid-low range
  - A fast sawtooth arpeggio in the high range
  - A 85% pulse wave melody in the mid-high range

- My first 3 layers contain the basic kick, snare, and hi-hat samples. I made variations for them.

```haskell
d1 $ n ("[0 ~]!2")    -- kick
  # s "gbkick:1"
  # gain 0.8

-- d1 $ n ("[0 0] [~ 0] 0 ~")
--   # s "gbkick:2"
--   # gain 0.75

d2 $ n ("[~ 0]!2")    -- snare
  # s "gbsnare:4"
  # gain 0.9

-- d2 $ n ("[~ 0]!2")
--   # s "gbsnare:1"
--   # gain 0.75

d3 $ n ("[0!4] [0 0 0 1]")    -- hihat
  # s "gbhat"
  # gain 0.85

-- d3 $ n ("0!16")
--   # s "gbhat"
--   # gain 0.78
```

- My fourth layer is a bass made from bitcrushed triangle waveform.

```haskell
d4 $ up ("[4 2 -1 4] [4 -1 2 4]")   -- triangle bass
  # s "triangle"
  # gain 1
```

- My fifth layer is a square wave sound in triplets with a delay. The pattern is randomly chosen between 2 sets of 3 notes and has palindrome.

```haskell
d5 $ palindrome
  $ up ("[[-1|4|9] [2|7|11]]*3")    -- square triplets
  # s "square"
  # gain 0.7
  # delay 0.2
  # delayfb 0.6
  # delayt 0.666
```

- My sixth layer is a very fast sawtooth arp in the very high range. It is played on the back beat.

```haskell
d6 $ fast 2                         -- saw arp
  $ up "~ [[[4|-8|-1] [7|9|11] [14|16|19] [7|9|11]]|[[21|18|16] [13|14|19] [7|11|28|26] [16|23|4]]]"
  # s "sawtooth"
  # gain 0.9
```

- My last layer is a melody played using 85% pulse wave. It randomly choose a note from the E dorian scale between 2 octaves. I added a delay on it. This layer is the only one that is not my original sample (and it is also not sample).

```haskell
d7 $ palindrome                     -- pulse melody
  $ note (scale "dorian" "[0|1|2|3|4|5|6]*8?" +4)   -- 16
  # s "supersquare"
  # voice 0.85
  # semitone 0
  # pitch1 3
  # octave (choose [5,6])
  # gain 0.55
  # delay 0.2
  # delayt 0.333
  # delayfb 0.6
```

### For Visual

- In this project, I decided to work with **Hydra** in **Pulsar**. I used the atom-hydra entension to achieve it.

- My **o1** is a rotating rainbow oscillator. It is modulated by noise. I decreased the brightness to make it not too bright.

```javascript
osc(8,-0.5, 1)
  .color(-1.5, -1.5, -1.5)          // darker
  // .blend(o0)                     // uncheck this to make it pale
  .rotate(-0.5, -0.5)               // rotating rainbow
  .modulate(noise(0.6,0.5)
    .rotate(0.5, 0.5)
    .scale(2)
  )                                 // repeated rectangles
  .brightness(-0.75)                // dim the display
  .out(o1)
```

- My **o2** is a colorful kaleidoscopic pattern with subtle rotations and modulations.

```javascript
osc(5, 0.9, 0.001)
  .kaleid([3,4,5,7,8,9,10].fast(0.1))    // Apply a kaleidoscopic effect with dynamic parameters
  .color(0.5, 0.3)               // Color the oscillator
  .colorama(0.1)                 // hue, make it purple
  .rotate(0.009,()=>Math.sin(time)* -0.001 )   // Slowly rotate
  .modulateRotate(o0,()=>Math.sin(time) * 0.003)
  .modulate(o0, 0.9)
  .scale(0.9)
  .brightness(-0.4)
  .contrast(2)
  .out(o2)
```

- My **o3** is a pattern I took from [Hydra website](https://hydra.ojack.xyz/?sketch_id=nesso_0), and it is made by Nesso. It is a series of colorful clouds. I added more contrast to make it darker for blending with my previous layers more effectively.

```javascript
shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7].smooth(1))
  .color(0.2,0.4,0.3)
  .scrollX(()=>Math.sin(time*0.27))
  .add(
    shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))
    .color(0.6,0.2,0.5)
    .scrollY(0.35)
    .scrollX(()=>Math.sin(time*0.33)))
  .add(
    shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.3].smooth(1))
  .color(0.2,0.4,0.6)
  .scrollY(-0.35)
  .scrollX(()=>Math.sin(time*0.41)*-1))
  .add(
    src(o0).shift(0.001,0.01,0.001)
    .scrollX([0.05,-0.05].fast(0.1).smooth(1))
    .scale([1.05,0.9].fast(0.3).smooth(1),[1.05,0.9,1].fast(0.29).smooth(1))
    ,0.85)
  .modulate(voronoi(10,2,2))
  .contrast(5)                  // added contrast to make it darker
  .out(o3)                      // I did not make this layer. I copied it from Nesso's "clouds of passage"
```

- Finally, I blended them into my output. Because this is a chiptune project, I used *pixelate* function on the visual.

```javascript
src(o3).add(o2).add(o1)
  .brightness(-0.5)
  .pixelate(160,120)
  .out(o0)                      // final output
```
