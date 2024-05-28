let wave, playing, freq, amp

function setup() {
  createCanvas(windowWidth, windowHeight)
  wave = new p5.Oscillator('sine')  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  if (playing) {
    wave.freq(freq, 0.1)
    wave.amp(amp, 0.1)
  }
}

function mousePressed() {
  playing = playing ? false : true
  if(playing) {
    wave.start()
  } else {
    wave.stop()
  }
}

function mouseMoved() {
  if(playing) {
    freq = constrain(map(mouseX, 0, width, 100, 500), 100, height)
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1)
    fill(0)
    noStroke()
    rect(mouseX, mouseY, 10, 10)
  }
}