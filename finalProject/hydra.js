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

src(o3)
  // .add(o2)
  // .add(o1)
  .brightness(-0.5)
  .pixelate(160,120)
  .out(o0)                      // final output
