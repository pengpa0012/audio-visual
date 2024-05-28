let wave, playing, freq, amp, mic, recorder, button

function setup() {
  createCanvas(windowWidth, windowHeight)
  // wave = new p5.Oscillator('sine')
  button = createButton('Record')
  button.class("record")
  button.position(width / 2, height / 2)
  button.mousePressed(record)

  mic = new p5.AudioIn()
  mic.start()
  recorder = new p5.SoundRecorder()
  recorder.setInput(mic)
  soundFile = new p5.SoundFile()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function record() {
  console.log(button.elt)
  if(button.class() == "record") {
    recorder.record(soundFile)
    button.html("stop")
    button.class("stop")
  } else if(button.class() == "stop") {
    recorder.stop()
    button.html("play")
    button.class("play")
  } else {
    soundFile.play()
    button.html("playing...")
    button.class("playing... disable")
    soundFile.onended(() => {
      button.html("record")
      button.class("record")
    })
  }
}

// function draw() {
  // if (playing) {
  //   wave.freq(freq, 0.1)
  //   wave.amp(amp, 0.1)
  // }
// }

// function mousePressed() {
//   playing = playing ? false : true
//   if(playing) {
//     wave.start()
//   } else {
//     wave.stop()
//   }
// }

// function mouseMoved() {
//   if(playing) {
//     freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500)
//     amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1)
//     fill(0)
//     noStroke()
//     const pixelX =  Math.floor(mouseX / 10) * 10
//     const pixelY =  Math.floor(mouseY / 10) * 10
//     rect(pixelX, pixelY, 10, 10)
//   } else {
//     // fade out
//     freq = 100
//     amp = 0
//   }
// }
