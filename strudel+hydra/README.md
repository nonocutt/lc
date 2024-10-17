# Strudel+Hydra Project

Noah Wang MTEC-343 Project 1

## Final Code

- Some parts of the code is commented to be muted initially.

```javascript
setcpm(100/4)                       // set master clock

// graphic
await initHydra({feedStrudel:1})
osc(8,-0.5, 1)
  .color(-1.5, -1.5, -1.5)          // darker
  // .blend(o0)                     // uncheck this to make it pale
  .rotate(-0.5, -0.5)               // rotating rainbow
  .modulate(shape(4)
    .rotate(0.5, 0.5)
    .scale(2)
    .repeatX([2,3,4], [2,4,3])        
    .modulate(o0, () => mouse.x * 0.005)    // modulate itself
    .repeatY(2, 3)
  )                                 // repeated rectangles
  .pixelate(160,120)
  .out(o1)                      

// osc(5, 0.9, 0.001)
//   .kaleid([3,4,5,7,8,9,10].fast(0.1))    // Apply a kaleidoscopic effect with dynamic parameters
//   .color(0.5, 0.3)               // Color the oscillator
//   .colorama(0.1)                 // hue, make it purple
//   .rotate(0.009,()=>Math.sin(time)* -0.001 )   // Slowly rotate
//   .modulateRotate(o0,()=>Math.sin(time) * 0.003)
//   .modulate(o0, 0.9)
//   .scale(0.9)
//   .out(o2)                      // color rectangle

src(o1)
  // .mult(s0)
//   .out(o3)                      // waveform

// src(o2)                         // check this to output o2 to o3
  
  // .diff(shape(12, .5).rotate(0, [.1,.2,.3]))
  // .modulateRepeat(osc(2), 1, 1, 1, 1)    // Modulate the repetition with an oscillator
  // .modulateScrollX(osc(2),1,0)
  // .modulateRotate(osc(1,0.5,0).kaleid(10).scale(0.5),15,0)   // Add rotation with kaleidoscopic modulation
  // .color(0.3, 0.2)              // swirl
  
  // .add(o3)
  .out(o0)



p1: stack(                      // supersaw pad sound
  s("supersaw")
  .chord("Abm9 [Ebm7|Ebm9]").slow(4)   // 4-bar vamp between 2 chords
  .voicing()
  .struct("x!1")
  .phaser(.25)
  .gain(.45)
  .room(1.5)
  .hpf(160)
)

p2: stack(                      // shaker similar effect as hihat
  s("shaker_small!16")
  .bpf(sine.slow(1).range(2500,5500))
  .bpq(rand.range(1,3))
  .pan(rand.range(0,1))
  .gain(rand.range(2,6))
)

// p3: stack(                      // 808 hihat sound
//   s("hh!16")
//   .bank("RolandTR808")
//   .bpf(sine.slow(3).range(4000,8000))
//   .bpq(2)
//   .pan(rand.range(0,1))         // random panned
//   .phaser(4)
//   .gain(rand.range(.8,2))       // random volume
// )

// p4: stack(                      // 808 percussion sound
//   s("[bd sh rim bd][sd rim sh bd][bd sh sd rim][lt mt rim ht]")
//   .bank("RolandTR808")
//   .distort(2)
//   .hpf(300)                     // cut low due to having additional kick
//   .gain(.15)
// )

// p5: stack(                      // acid-like bass sound
//   n("[0 [8|6|7] [11|6|3] [10|4|7]]!4?")
//   .scale("Ab:dorian Eb:minor".slow(4))
//   .s("<square sawtooth>*8")
//   .transpose("-24")
//   .lpf(500)                     // lpf w/ envelope
//   .lpq(15)
//   .lpa(.001).lpd(.1).lps(.2).lpr(.05)
//   .lpenv(3)
//   .distort(4)                   // heavily overdrived
//   .gain(.02)
// )

// p6: stack(                      // sax arp melody
//   n("[0 6 3 4]?".add("<0 [3|8] [2|7] [4|9] [1|6]>").fast(4))
//   .scale("Eb:minor Eb:dorian".slow(4))
//   .s("sax_stacc")
//   .transpose("[0|-12]")
//   .room(.8)
//   .gain(rand.range(1.2,2))
// )

// p7: stack(                      // percussion 
//   s("east")
//   .struct("[x x] [~ x ~ ~] [x ~ ~ x] [~ x]")    // samba-like rhythm
//   .hpf(2000)
//   .hpq(12)
//   .gain(rand.range(.2,1))
// )

// p8: stack(                      // kicks
//   s("bd")
//   .bank("AkaiMPC60")
//   .struct("x!4")                // 4 on floor
//   .distort(1.15)                // slightly overdrived
//   .gain(.6)
// )

// p9: stack(                     // high pluck
//   note("[bb6|db7|eb7|eb6|gb6|bb5|db6]".fast(8))
//   .s("z_square")
//   .attack(.008)
//   .decay(rand.range(.05,.18))
//   .sustain(0)
//   .release(rand.range(.05,.18))
//   .pan(rand.range(0,1))
//   .delay(.5)                    // added 3/16 delay
//   .delaytime(.45)
//   .gain(.55)
// )

// p10: stack(                      // piano
//   note("[eb6 ~ ~ bb5] [~ ab5] [db6 ~ ~ gb5] [~ f5] ".slow(4))
//   .s("steinway")
//   .delay(.7)                    // added a bit delay
//   .delaytime(.2)
//   .gain(1)
// )

all(x=>
    x.fft(4)                        // FFT w/ 4 frequency bands
      .scope({                      // visualize
        pos:.5,                     // Set the horizontal position of the scope to the center
        smear:.95                   // smoother effect
      })
)

```

## My Steps

### Audio Part

- I separated the layers into multiple sections using _p1, p2, p3 etc._. I used the **setcpm** function to set the tempo to 100.

- I have 10 audio layers in this project.
  - My first layer is a phased supersaw pad sound. It is a 4-bar vamp between 2 chords.

  ```javascript
  p1: stack(                      // supersaw pad sound
  s("supersaw")
  .chord("Abm9 [Ebm7|Ebm9]").slow(4)   // 4-bar vamp between 2 chords
  .voicing()
  .struct("x!1")
  .phaser(.25)
  .gain(.45)
  .room(1.5)
  .hpf(160)
  )
  ```

  - I used hihat and shaker as my second and third layers. I used different EQ and random panning for altering the sound.

  ```javascript
  p2: stack(                      // shaker similar effect as hihat
    s("shaker_small!16")
    .bpf(sine.slow(1).range(2500,5500))
    .bpq(rand.range(1,3))
    .pan(rand.range(0,1))
    .gain(rand.range(2,6))
  )

  p3: stack(                      // 808 hihat sound
    s("hh!16")
    .bank("RolandTR808")
    .bpf(sine.slow(3).range(4000,8000))
    .bpq(2)
    .pan(rand.range(0,1))         // random panned
    .phaser(4)
    .gain(rand.range(.8,2))       // random volume
  )
  ```

  - I used several 808 drum samples as a percussion on my fourth layer. As there is a separate kick track, I high-passed this track to make it not conflict with the kick.
  
  ```javascript
  p4: stack(                      // 808 percussion sound
  s("[bd sh rim bd][sd rim sh bd][bd sh sd rim][lt mt rim ht]")
  .bank("RolandTR808")
  .distort(2)
  .hpf(300)                     // cut low due to having additional kick
  .gain(.15)
  )
  ```

  - I used a square/sawtooth wave running into a high-resonance filter with a frequency envelope like acid bass as my 5th layer. The sequence adds intervals randomly.

  ```javascript
  p5: stack(                      // acid-like bass sound
    n("[0 [8|6|7] [11|6|3] [10|4|7]]!4?")
    .scale("Ab:dorian Eb:minor".slow(4))
    .s("<square sawtooth>*8")
    .transpose("-24")
    .lpf(500)                     // lpf w/ envelope
    .lpq(15)
    .lpa(.001).lpd(.1).lps(.2).lpr(.05)
    .lpenv(3)
    .distort(4)                   // heavily overdrived
    .gain(.02)
  )
  ```

  - I used an arpeggiated saxophone for the melody. I used random octave to make the pitch range wider.

  ```javascript
  p6: stack(                      // sax arp melody
    n("[0 6 3 4]?".add("<0 [3|8] [2|7] [4|9] [1|6]>").fast(4))
    .scale("Eb:minor Eb:dorian".slow(4))
    .s("sax_stacc")
    .transpose("[0|-12]")
    .room(.8)
    .gain(rand.range(1.2,2))
  )
  ```

  - I used a clave-like sound in a samba-like rhythm for my seventh layer.

  ```javascript
  p7: stack(                      // percussion 
    s("east")
    .struct("[x x] [~ x ~ ~] [x ~ ~ x] [~ x]")    // samba-like rhythm
    .hpf(2000)
    .hpq(12)
    .gain(rand.range(.2,1))
  )
  ```

  - I added a kick drum as my eighth layer.

  ```javascript
  p8: stack(                      // kicks
    s("bd")
    .bank("AkaiMPC60")
    .struct("x!4")                // 4 on floor
    .distort(1.15)                // slightly overdrived
    .gain(.6)
  )
  ```

  - I added a high-pitch square wave arpeggio to fill the upper register. I also added a 3/16 delay to strengthen the sound.

  ```javascript
  p9: stack(                     // high pluck
    note("[bb6|db7|eb7|eb6|gb6|bb5|db6]".fast(8))
    .s("z_square")
    .attack(.008)
    .decay(rand.range(.05,.18))
    .sustain(0)
    .release(rand.range(.05,.18))
    .pan(rand.range(0,1))
    .delay(.5)                    // added 3/16 delay
    .delaytime(.45)
    .gain(.55)
  )
  ```

  - The last layer is a slow piano part. I also added a delay to it.

  ```javascript
  p10: stack(                      // piano
    note("[eb6 ~ ~ bb5] [~ ab5] [db6 ~ ~ gb5] [~ f5] ".slow(4))
    .s("steinway")
    .delay(.7)                    // added a bit delay
    .delaytime(.2)
    .gain(1)
  )

  ```

  - Finally, I adjusted the gain to balance the mix, and added some reverb to some of the tracks.

### Video Part

- I took the waveform of entire mix into the video using _feedstrudel_. This is the **s0**.

```javascript
  all(x=>x.fft(4).scope({pos:.5,smear:.95}))
```

```javascript
  await initHydra({feedStrudel:1})
```

- My **o1** is a series of repeated rectangles, covered with pixelized rotating rainbow oscillator. I used the source itself with the mouse as a modulator.

```javascript
osc(8,-0.5, 1)
  .color(-1.5, -1.5, -1.5)
  .blend(o0)                        // uncheck this to make it pale
  .rotate(-0.5, -0.5)               // rotating rainbow
  .modulate(shape(4)
    .rotate(0.5, 0.5)
    .scale(2)
    .repeatX([2,3,4], [2,4,3])        
    .modulate(o0, () => mouse.x * 0.005)    // modulate itself
    .repeatY(2, 2)
  )                                 // repeated rectangles
  .pixelate(160,120)
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
  .out(o2)                      // color rectangle
```

- I used the _mult_ to apply the color from **o1** to the waveform generated from the mix (s0), then output it to **o3**.

```javascript
src(o1)
  .mult(s0)
  .out(o3)                      // waveform
```

- I took **o2** and blended with some rotating shapes, and created a swirl effect. Then I added **o3** on top of it for the final output.

```javascript
src(o2)                         // check this to output o2 to o3
  .diff(shape(12, .5).rotate(0, [.1,.2,.3]))
  .modulateRepeat(osc(2), 1, 1, 1, 1)    // Modulate the repetition with an oscillator
  .modulateScrollX(osc(2),1,0)
  .modulateRotate(osc(1,0.5,0).kaleid(10).scale(0.5),15,0)   // Add rotation with kaleidoscopic modulation
  .color(0.3, 0.2)              // swirl
  .add(o3)
  .out(o0)
```
