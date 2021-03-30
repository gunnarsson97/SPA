let mycount = 0

/**
 * Memory progrram.
 *
 * @param {HTMLDivElement} memory the memory window.
 * @param {HTMLElement} td the td (table).
 * @param {HTMLDivElement} content div with content.
 * @param {HTMLButtonElement} restart restart button.
 * @param {number} countRight count number of rights.
 * @param {number} countWrong count number of wrongs.
 * @param {HTMLElement} score to show the score.
 */
function run (memory, td, content, restart, countRight, countWrong, score) {
  'use strict'

  const nrOfBlocks = td.length
  const hiddenBlocks = new Array(td.length)
  const lockedBlocks = new Array(2)
  const lockedCards = new Array(2)
  const temp = td
  let counter = 0
  let pos = -1
  const previous = []

  for (let i = 0; i < nrOfBlocks; i++) {
    temp[i].setAttribute('id', mycount)
    mycount++
    temp[i].onclick = function () {
      displayHidden(i)
    }
    randomizeBlocks(i)
  }

  /**
   * Check if dublicates.
   *
   * @param {number} nr a number.
   * @returns {boolean} true or false if dublicate.
   */
  function checkForDuplicates (nr) {
    var isDuplicate = false
    var count = 0

    for (var i = 0; i < nrOfBlocks; i++) {
      if (hiddenBlocks[i] === nr) {
        count++
      }
    }
    if (count === 2) {
      isDuplicate = true
    }
    return isDuplicate
  }

  /**
   * Randomize position.
   *
   * @param {number} currPos position.
   */
  function randomizeBlocks (currPos) {
    var randNr = Math.floor((Math.random() * (td.length / 2)) + 1)

    while (checkForDuplicates(randNr)) {
      randNr = Math.floor((Math.random() * (td.length / 2)) + 1)
    }
    hiddenBlocks[currPos] = randNr
  }

  /**
   * Make it none clickable.
   */
  function toggleClickable () {
    const box = temp

    for (let i = 0; i < nrOfBlocks; i++) {
      if (box[i].style.pointerEvents === 'none') {
        box[i].style.pointerEvents = ''
      } else {
        box[i].style.pointerEvents = 'none'
      }
    }
  }

  /**
   * Check if you get a match.
   *
   * @param {number} currId position of choosen box.
   */
  function checkMatch (currId) {
    if (counter === 1) {
      lockedCards[0] = hiddenBlocks[currId]
      lockedBlocks[0] = currId
      temp[lockedBlocks[0]].style.pointerEvents = 'none'
    } else if (counter === 2) {
      lockedCards[1] = hiddenBlocks[currId]
      lockedBlocks[1] = currId
      temp[lockedBlocks[0]].style.pointerEvents = ''

      if (lockedCards[0] === lockedCards[1]) {
        window.console.log('yeey a match!')

        temp[lockedBlocks[0]].style.pointerEvents = 'none'
        temp[lockedBlocks[1]].style.pointerEvents = 'none'

        countRight++
        console.log(countRight)
      } else {
        previous.pop()
        previous.pop()
        countWrong++
        window.console.log('sorry...no match')
        window.console.log('flipping back in 3 secs')
        toggleClickable()
        console.log('done')
        window.setTimeout(function () {
          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < nrOfBlocks; j++) {
              if (hiddenBlocks[j] === lockedCards[i]) {
                const box = temp[lockedBlocks[i]]

                box.style.backgroundImage = 'none'
                box.innerHTML = '?'
                for (let i = 0; i < nrOfBlocks; i++) {
                  temp[i].onclick = function () {
                    displayHidden(i)
                  }
                }
              }
            }
          }
          toggleClickable()
        }, 200)
        console.log('done2')
      }
      checkWon()
      counter = 0
    }
  }

  /**
   * Display a hidden box.
   *
   * @param {number} currId id of box to be displayed.
   */
  function displayHidden (currId) { // jshint ignore:line.
    const currBlock = temp[currId]
    currBlock.innerHTML = ''
    currBlock.style.backgroundImage = "url('/img/" + hiddenBlocks[currId] + ".png')"

    currBlock.onclick = function () {
      window.alert('You have to choose another card')
    }

    counter++
    window.console.log('Click: ' + counter)
    checkMatch(currId)
  }

  /**
   * Check if you won.
   */
  function checkWon () {
    console.log(countRight === (nrOfBlocks / 2))
    if (countRight === (nrOfBlocks / 2)) {
      content.classList.add('hide')
      restart.classList.remove('hide')
      score.classList.remove('hide')
      score.innerHTML = 'Number of wrongs: ' + countWrong
      for (let i = 0; i < temp.length; i++) {
        const box = temp[i]
        box.style.backgroundImage = 'none'
        box.innerHTML = '?'
        box.style.pointerEvents = ''
        countRight = 0
        countWrong = 0
      }
      run(memory, td, content, restart, countRight, countWrong, score)
    }
  }

  document.addEventListener('keydown', function (event) {
    if (memory === document.body.lastChild) {
      for (let i = 0; i < temp.length; i++) {
        temp[i].style.border = 'none'
      }

      if (pos >= 0 & pos < nrOfBlocks) {
        temp[pos].style.border = 'none'
      }

      if (event.keyCode === 39 & pos < (nrOfBlocks - 1)) {
        pos++
        temp[pos].style.border = '5px solid white'
      } else if (event.keyCode === 37 & pos > 0) {
        pos--
        temp[pos].style.border = '5px solid white'
      } else if (event.keyCode === 13 & pos > -1 & pos < nrOfBlocks) {
        let c = 0
        let len = previous.length
        if (previous.length === 0) {
          len = 1
        }
        for (let i = 0; i < len; i++) {
          if (temp[pos] !== previous[i]) {
            c++

            if (c === len) {
              previous.push(temp[pos])
              displayHidden(pos)
            }
          }
        }
      } else if (pos >= 0 & pos < nrOfBlocks) {
        temp[pos].style.border = '5px solid white'
      }
    }
  })
}
export default {
  run
}
