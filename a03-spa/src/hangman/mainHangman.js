
/**
 * The hangman game.
 *
 * @param {HTMLButtonElement} btnStart button for start.
 * @param {HTMLButtonElement} btnSubmit button for submit.
 * @param {HTMLInputElement} input input for char.
 * @param {HTMLDivElement} wrong for wrongs.
 * @param {HTMLDivElement} wrongOrRight for wrong or right.
 * @param {HTMLElement} wrongLetter store wrong letter.
 * @param {HTMLDivElement} c c div to place in.
 * @param {HTMLDivElement} hangmanImg div for img.
 * @param {HTMLElement} lines for the lines.
 */
function run (btnStart, btnSubmit, input, wrong, wrongOrRight, wrongLetter, c, hangmanImg, lines) {
  const buttonStart = btnStart

  btnStart.addEventListener('click', function () {
    console.log('start')
    hangmanImg.classList.remove('hide')
    btnStart.classList.add('hide')
    btnSubmit.classList.remove('hide')
    input.classList.remove('hide')
    wrong.classList.remove('hide')
    wrongOrRight.classList.add('hide')
    wrongLetter.classList.add('hide')
    c.classList.remove('red')
    c.classList.remove('green')
  })

  buttonStart.addEventListener('click', play)
  const buttonSubmit = btnSubmit

  var list = ['calm', 'amusing', 'brown', 'paste', 'veil', 'shaky', 'oatmeal',
    'trip', 'snakes', 'try', 'anxious', 'team', 'hesitant', 'fat', 'airport', 'rice',
    'notice', 'wacky', 'abrupt', 'melodic']
  let answer = ''
  var strArr = []
  var wrongChars = []

  /**
   * Make the lines.
   */
  function play () {
    answer = list[Math.floor(Math.random() * 20)]

    for (let index = 0; index < answer.length; index++) {
      strArr.push('_ ')
    }
    lines.innerHTML = createStr(strArr)
  }
  /**
   * Create array.
   *
   * @param {Array} arr array big as the word choosen.
   * @returns {Array} array that is created.
   */
  function createStr (arr) {
    let temp = ''
    for (let i = 0; i < arr.length; i++) {
      temp = temp.concat(arr[i])
    }
    return temp
  }
  let errorCounter = 0
  let corectCounter = 0
  let temp = ''

  /**
   * When taking in a char.
   */
  function submit () {
    wrongLetter.classList.remove('hide')
    let counter = 0
    const myinput = input.value
    for (let index = 0; index < answer.length; index++) {
      if (myinput.indexOf(answer[index]) !== -1 && myinput !== temp) {
        temp = myinput
        counter++
        strArr[index] = myinput
        corectCounter++
      }
    }
    if (counter === 0) {
      wrongChars.push(myinput)
      errorCounter++
    }
    lines.innerHTML = createStr(strArr)
    wrongLetter.innerHTML = wrongChars

    if (errorCounter === 1) {
      hangmanImg.style.backgroundImage = "url('img2/hill.png')"
    }
    if (errorCounter === 2) {
      hangmanImg.style.backgroundImage = "url('img2/hangCon.png')"
    }
    if (errorCounter === 3) {
      hangmanImg.style.backgroundImage = "url('img2/gallow.png')"
    }
    if (errorCounter === 4) {
      hangmanImg.style.backgroundImage = "url('img2/head.png')"
    }
    if (errorCounter === 5) {
      hangmanImg.style.backgroundImage = "url('img2/body.png')"
    }
    if (errorCounter === 6) {
      hangmanImg.style.backgroundImage = "url('img2/leftArm.png')"
    }
    if (errorCounter === 7) {
      hangmanImg.style.backgroundImage = "url('img2/rigthtArm.png')"
    }
    if (errorCounter === 8) {
      hangmanImg.style.backgroundImage = "url('img2/leftLeg.png')"
    }

    if (errorCounter === 9) {
      temp = ''
      hangmanImg.style.background = ''
      wrongOrRight.classList.remove('hide')
      wrongOrRight.innerHTML = 'You Lost!'
      buttonStart.classList.remove('hide')
      hangmanImg.classList.add('hide')
      buttonSubmit.classList.add('hide')
      input.classList.add('hide')
      c.classList.add('red')
      errorCounter = 0
      corectCounter = 0
      wrongChars = []
      strArr = []
    }
    if (corectCounter === answer.length) {
      wrongOrRight.classList.remove('hide')
      wrongOrRight.innerHTML = 'You Win!'
      buttonStart.classList.remove('hide')
      hangmanImg.classList.add('hide')
      buttonSubmit.classList.add('hide')
      input.classList.add('hide')
      c.classList.add('green')
      errorCounter = 0
      corectCounter = 0
      wrongChars = []
      strArr = []
      temp = ''
    }
  }
  buttonSubmit.addEventListener('click', submit)
}
export default {
  run
}
