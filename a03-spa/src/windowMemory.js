import Drop from './drop.js'
import MemoryGame from './memory/mainMemory.js'
const btn = document.getElementById('btn3')
let counter = 0

btn.addEventListener('click', function () {
  // the memory window.
  var memory = document.createElement('div')
  memory.id = 'memory' + counter.toString()
  memory.classList.add('memorystyle')
  memory.draggable = 'true'

  // x button for closing.
  var x = document.createElement('button')
  x.id = 'x'
  x.innerHTML = 'X'
  x.type = 'button'
  x.className = 'x'
  memory.appendChild(x)

  // headline.
  var head = document.createElement('h2')
  head.id = 'memory_header'
  head.innerHTML = 'Memory Game!'
  memory.appendChild(head)

  // size 4x4 for the game.
  var four4 = document.createElement('button')
  four4.id = 'four_4'
  four4.innerHTML = '4x4'
  four4.type = 'button'
  four4.className = 'feature'
  memory.appendChild(four4)

  // size 2x4 for the game.
  var four2 = document.createElement('button')
  four2.id = 'four_2'
  four2.innerHTML = '2x4'
  four2.type = 'button'
  four2.className = 'feature'
  memory.appendChild(four2)

  // size 2x2 for the game.
  var two2 = document.createElement('button')
  two2.id = 'two_2'
  two2.innerHTML = '2x2'
  two2.type = 'button'
  two2.className = 'feature'
  memory.appendChild(two2)

  var content = document.createElement('div')
  content.id = 'content'

  var gameArea = document.createElement('table')
  gameArea.id = 'gameArea' + counter.toString()

  /**
   * Create the table 4x4, 2x4 or 2x2.
   *
   * @param {number} numberOftr Number of tr.
   * @param {number} numberOftd Number of td.
   * @param {Array} tdArray Array with all td.
   * @param {Array} arrayRows Array with all rows.
   */
  function createTable (numberOftr, numberOftd, tdArray, arrayRows) {
    for (let j = 0; j < numberOftr; j++) {
      var row = document.createElement('tr')
      row.id = 'tr' + j.toString()

      for (let i = 0; i < numberOftd; i++) {
        var col = document.createElement('td')
        col.innerHTML = '?'
        col.id = 'td' + i.toString()
        tdArray.push(col)
        row.appendChild(col)
      }
      arrayRows.push(row)
      gameArea.appendChild(row)
    }
    content.appendChild(gameArea)
  }

  // restart button.
  var restart = document.createElement('button')
  restart.id = 'restart'
  restart.type = 'button'
  restart.innerHTML = 'RESTART'
  restart.classList.add('restart_btn')
  restart.classList.add('hide')
  memory.appendChild(restart)

  var score = document.createElement('b')
  score.id = 'score'
  score.classList.add('hide')
  memory.appendChild(score)

  restart.addEventListener('click', function () {
    content.classList.remove('hide')
    score.classList.add('hide')
    restart.classList.add('hide')
  })

  memory.appendChild(content)

  Drop.main(memory, x)

  four4.addEventListener('click', function () {
    four4.classList.add('hide')
    four2.classList.add('hide')
    two2.classList.add('hide')
    memory.classList.remove('memorystyle')
    memory.classList.add('memorystyleBig')
    var arrayRows = []
    var tdArray = []
    const numberOftr = 4
    const numberOftd = 4
    createTable(numberOftr, numberOftd, tdArray, arrayRows)

    const countWrong = 0
    const countRight = 0
    MemoryGame.run(memory, tdArray, content, restart, countRight, countWrong, score)
  })
  four2.addEventListener('click', function () {
    four4.classList.add('hide')
    four2.classList.add('hide')
    two2.classList.add('hide')
    var arrayRows = []
    var tdArray = []
    const numberOftr = 2
    const numberOftd = 4
    createTable(numberOftr, numberOftd, tdArray, arrayRows)

    const countWrong = 0
    const countRight = 0
    MemoryGame.run(memory, tdArray, content, restart, countRight, countWrong, score)
  })
  two2.addEventListener('click', function () {
    four4.classList.add('hide')
    four2.classList.add('hide')
    two2.classList.add('hide')
    var arrayRows = []
    var tdArray = []
    const numberOftr = 2
    const numberOftd = 2
    createTable(numberOftr, numberOftd, tdArray, arrayRows)

    const countWrong = 0
    const countRight = 0
    MemoryGame.run(memory, tdArray, content, restart, countRight, countWrong, score)
  })

  counter++
  document.body.appendChild(memory)
})
