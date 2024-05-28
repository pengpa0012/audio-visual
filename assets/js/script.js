// display visuals on playing...
let wave, playing, freq, amp, mic, recorder, button, input, fft, selectedSound

function setup() {
  createCanvas(windowWidth, windowHeight)
  // wave = new p5.Oscillator('sine')
  button = createButton('Record')
  button.class("record")
  button.position(width / 2, height / 2)
  button.mousePressed(record)

  input = createFileInput(uploadAudio)
  input.position(width / 2 + button.width, height / 2)

  mic = new p5.AudioIn()
  mic.start()
  recorder = new p5.SoundRecorder()
  recorder.setInput(mic)
  soundFile = new p5.SoundFile()
  fft = new p5.FFT(0.9, 1024)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function record() {
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

function uploadAudio(file) {
  if(file.type == "audio") {
    selectedSound = loadSound(file.data, sound => {
      sound.play()
      input.class("hide")
      button.class("hide")
    })
  } else {
    input.elt.value = ""
    alert("Wrong File Type")
  }
}

function draw() {
  clear()
  button.position(width / 2, height / 2)
  let spectrum = fft.analyze()
  noStroke()
  fill(0)
  for (let i = 0; i < spectrum.length; i++){
    let x = map(i * 10, 0, spectrum.length, 0, width)
    let h = -height + map(spectrum[i], 0, 255, height, 0)
    rect(x, height, (width / spectrum.length) + 10, h)
  }

  if(selectedSound && !selectedSound.isPlaying()) {
    input.class("show")
    button.class("show")
    input.elt.value = ""
  }

  // if (playing) {
  //   wave.freq(freq, 0.1)
  //   wave.amp(amp, 0.1)
  // }
}

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
