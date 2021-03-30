
let itemArea

/**
 * Program for dropping item.
 *
 * @param {HTMLDivElement} div the div that is dropable.
 * @param {HTMLButtonElement}x button for closing window.
 */
function main (div, x) {
  'use strict'

  itemArea = div
  const droppableArea = document.getElementById('drop')

  /**
   * Start of the drag event.
   *
   * @param {HTMLElement} event the event that happenning.
   */
  function dragStartHandler (event) {
    itemArea = document.getElementById(event.target.id)
    document.body.removeChild(div)
    document.body.appendChild(div)
    const style = window.getComputedStyle(event.target, null)
    // Remember the original position.
    event.dataTransfer.setData('text/plain',
      (parseInt(style.getPropertyValue('left'), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue('top'), 10) - event.clientY)
    )

    event.dataTransfer.dropEffect = 'move'

    console.log('DRAG START')
    console.log(event)
  }

  /**
   * Log when drop is ended.
   *
   * @param {HTMLElement} event the event that happenning.
   */
  function dragEndHandler (event) {
    console.log('DRAG END')
    console.log(event)
  }

  /**
   * Drophandler when droping item.
   *
   * @param {HTMLElement} event the event that happenning.
   */
  function dropHandler (event) {
    const offset = event.dataTransfer.getData('text/plain').split(',')
    console.log('DROP')
    itemArea.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px'
    itemArea.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px'
    event.preventDefault()
  }

  itemArea.addEventListener('dragstart', dragStartHandler)
  itemArea.addEventListener('dragend', dragEndHandler)

  droppableArea.addEventListener('dragenter', (event) => {
    event.preventDefault()
  })
  droppableArea.addEventListener('dragover', (event) => {
    event.preventDefault()
  })
  droppableArea.addEventListener('drop', dropHandler)

  x.addEventListener('click', event => {
    div.parentNode.removeChild(div)
  })

  div.addEventListener('click', event => {
    try {
      if (document.body.lastChild !== div) {
        document.body.removeChild(div)
        document.body.appendChild(div)
      }
    } catch (error) {
      console.log('Close')
    }
  })
}
export default {
  main
}
