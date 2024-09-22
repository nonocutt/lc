# Strudel Patch 3

Noah Wang MTEC-343 Assignment 3

## Final Code

```strudel
// set the tempo to 128
setcpm(128/4)

// supersaw pad sound
p1: stack(
  s("supersaw")
  .chord("[F^7#11|F^13|F^9] [Ab^9|Ab^7#11|Ab^13]")
  .slow(4)
  .voicing() // loop between F and Ab and randomly choose function
  .struct("x!0.5") // double the chord length
  .phaser(.25)
  .gain(.4)
  .room(1.5)
)

// bass sound
p2: stack(
  note("[[~ f1 ~ ~] [c2 ~ ~ f2] [~ ~ f2 ~] [~ ~ f2 c2]]!2 [[~ ab1 ~ ~] [eb2 ~ ~ ab2] [~ ~ ab2 ~] [~ ~ ab2 eb2]]!2")
  .slow(4)
  .add(note("0,.1"))  // detuning
  .add(note("-.1,0"))
  .s("z_sawtooth")
  .lpf(500)
  .lpq(15)
  .lpa(.001).lpd(.05).lps(.2).lpr(.05)
  .lpenv(2.5)
  .gain(.5)
  .drive(3)
)

// kick sound
p3: stack(
  s("bd!4")
  .bank("EmuDrumulator")
  .delay(.25)
  .delayt(.352)
  .delayfb(.6)
  .drive(11)
  .gain(1)
)

// hihat sound
p4: stack(
  s("[hh!4][hh!4][hh!3 oh][hh!2 oh hh]")
  .bank("Linn9000")
  .hpf(5000)
  .gain(.5)
)

// pluck seq
p5: stack(
  n(("[2|5|3|7]?".add("<[0|[2|6]|[3|5]|[7|9]|4]>*2")).fast(16))  // randomly add a number to the sequence
  .scale(("F:lydian Ab:lydian").slow(4))
  .s("gm_fx_brightness")
  .attack(.01)
  .decay(.06)
  .sustain(.2)
  .release(.06)
  .gain(4)
  .pan((".25|.5|.75").fast(4))  // random panning
  .delay(.5)
  .delayt(.352)
  .delayfb(.5)
  .lpf(sine.slow(3).range(600,3000))
  .lpq(10)
  .lpa(.001).lpd(.05).lps(.2).lpr(.05)
  .lpenv(2)
)
```

## My Steps

- I separated the layers into multiple sections using _p1, p2, p3 etc._. I used the **setcpm** function to set the tempo to 128.

- My first layer is the phased supersaw pad sound.
  - I used the **chord** function to loop between F major and Ab major.
  - I used the **struct** function to double the chord length.
  - I added a phaser and a reverb to the synth, then adjusted the balance.

```strudel
p1: stack(
  s("supersaw")
  .chord("[F^7#11|F^13|F^9] [Ab^9|Ab^7#11|Ab^13]")
  .slow(4)
  .voicing() // loop between F and Ab and randomly choose function
  .struct("x!0.5") // double the chord length
  .phaser(.25)
  .gain(.4)
  .room(1.5)
)
```

- My second layer is the filtered bass sound.
  - I typed the sequence to make it loop, then I added 2 more layers for detuning.
  - I used a filter with resonance, and filter envelope for the acid sound effect.
  - I added an overdrive effect to the bass synth.

```strudel
p2: stack(
  note("[[~ f1 ~ ~] [c2 ~ ~ f2] [~ ~ f2 ~] [~ ~ f2 c2]]!2 [[~ ab1 ~ ~] [eb2 ~ ~ ab2] [~ ~ ab2 ~] [~ ~ ab2 eb2]]!2")
  .slow(4)
  .add(note("0,.1"))  // detuning
  .add(note("-.1,0"))
  .s("z_sawtooth")
  .lpf(500)
  .lpq(15)
  .lpa(.001).lpd(.05).lps(.2).lpr(.05)
  .lpenv(2.5)
  .gain(.5)
  .drive(3)
)
```

- My third layer is the kick drum sound.
  - I added a 3/16 note delay to the drum and slightly changed the feedback and delay amount.

```strudel
p3: stack(
  s("bd!4")
  .bank("EmuDrumulator")
  .delay(.25)
  .delayt(.352)
  .delayfb(.6)
  .drive(11)
  .gain(1)
)
```

- My fourth layer is a hi-hat sequence consists of closed hi-hat and open hi-hat.
  - I slightly filtered the samples to make the sound lighter.

```strudel
p4: stack(
  s("[hh!4][hh!4][hh!3 oh][hh!2 oh hh]")
  .bank("Linn9000")
  .hpf(5000)
  .gain(.5)
)
```

- My last layer is a random sequence. I used random gate to make the note trigger randomly, and I also made the order of the note random.
  - I added random panning and a delay to make the soundstage bigger.
  - I also added a filter with LFO to change the timbre.

```strudel
p5: stack(
  n(("[2|5|3|7]?".add("<[0|[2|6]|[3|5]|[7|9]|4]>*2")).fast(16))  // randomly add a number to the sequence
  .scale(("F:lydian Ab:lydian").slow(4))
  .s("gm_fx_brightness")
  .attack(.01)
  .decay(.06)
  .sustain(.2)
  .release(.06)
  .gain(4)
  .pan((".25|.5|.75").fast(4))  // random panning
  .delay(.5)
  .delayt(.352)
  .delayfb(.5)
  .lpf(sine.slow(3).range(600,3000))
  .lpq(10)
  .lpa(.001).lpd(.05).lps(.2).lpr(.05)
  .lpenv(2)
)
```
