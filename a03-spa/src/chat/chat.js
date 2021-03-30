
const localStorage = window.localStorage
/**
 * A chat program for the the socket.
 *
 * @param {HTMLDivElement} out output for chat messages.
 * @param {HTMLInputElement} chatInput  input fro chat message.
 * @param {HTMLButtonElement} btnSend  button for sending message.
 */
function run (out, chatInput, btnSend) {
  var websocket = new WebSocket('ws://vhost3.lnu.se:20080/socket/')
  websocket.onopen = function () {
    console.log('Socket open')
    console.log(websocket)
    if (localStorage.getItem('username') == null) {
      chatInput.placeholder = 'Enter Username'
    }
  }
  websocket.onmessage = function (event) {
    if (JSON.parse(event.data).username !== 'The Server') {
      const p = document.createElement('p')
      p.innerHTML = JSON.parse(event.data).username + ': ' + JSON.parse(event.data).data
      out.appendChild(p)
    }
    console.log('Receiving message: ' + event.data)
    console.log(event)
    console.log(websocket)
  }

  btnSend.addEventListener('click', event => {
    if (localStorage.getItem('username') == null) {
      localStorage.setItem('username', chatInput.value)
      chatInput.placeholder = 'Write your message !'
    } else {
      const message = chatInput.value
      const data = {
        type: 'message',
        data: message,
        username: localStorage.getItem('username'),
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }
      websocket.send(JSON.stringify(data))
    }
    chatInput.value = ''
  })
}
export default {
  run
}
