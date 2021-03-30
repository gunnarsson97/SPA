import Drop from './drop.js'
import Hang from './hangman/mainHangman.js'

const btn = document.getElementById('btn2')
let counter = 0

btn.addEventListener('click', function () {
  // main div for hangman widow (the window)
  var div = document.createElement('div')
  div.id = 'hangman' + counter.toString()
  div.classList.add('hangmanstyle')
  div.draggable = 'true'

  // x button to close
  var x = document.createElement('button')
  x.id = 'x'
  x.innerHTML = 'X'
  x.type = 'button'
  x.className = 'x'
  div.appendChild(x)

  // div content used for style
  var c = document.createElement('div')
  c.id = 'c'

  // start button for the game
  var btnStart = document.createElement('button')
  btnStart.id = 'btnStart'
  btnStart.type = 'button'
  btnStart.innerHTML = 'Start'
  btnStart.classList.remove('hide')
  btnStart.classList.add('button2')
  c.appendChild(btnStart)

  var wrapper = document.createElement('div')
  wrapper.className = 'wrapper'

  // wrong or right display if you lost or won
  var wrongOrRight = document.createElement('p')
  wrongOrRight.id = 'wrongOrRight'
  wrongOrRight.classList.add('hide')

  // the lines for the hangman game
  var lines = document.createElement('p')
  lines.id = 'lines'
  wrapper.appendChild(wrongOrRight)
  wrapper.appendChild(lines)

  // input for character
  var input = document.createElement('input')
  input.id = 'input'
  input.type = 'text'
  input.placeholder = 'Letter'
  input.classList.add('hide')
  input.maxLength = '1'
  wrapper.appendChild(input)

  // submit button for the input
  var btnSubmit = document.createElement('button')
  btnSubmit.id = 'btnSubmit'
  btnSubmit.type = 'button'
  btnSubmit.innerHTML = 'Submit'
  btnSubmit.classList.add('hide')
  btnSubmit.classList.add('button2')
  wrapper.appendChild(btnSubmit)

  c.appendChild(wrapper)

  // storage for wreong letters
  var wrong = document.createElement('div')
  wrong.id = 'wrong'
  var wrongLetter = document.createElement('p')
  wrongLetter.id = 'wrongLetter'
  wrong.appendChild(wrongLetter)
  wrong.classList.add('hide')
  c.appendChild(wrong)

  counter++

  // all img for the hangman
  var hangmanImg = document.createElement('div')
  hangmanImg.id = 'hangman_img'
  hangmanImg.classList.add('hide')

  c.appendChild(hangmanImg)
  div.appendChild(c)

  div.style.left = '40px'
  div.style.top = '40px'

  Hang.run(btnStart, btnSubmit, input, wrong, wrongOrRight, wrongLetter, c, hangmanImg, lines)
  Drop.main(div, x)

  document.body.appendChild(div)
})
