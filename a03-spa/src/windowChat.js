import Chat from './chat/chat.js'
import Drop from './drop.js'
const btn = document.getElementById('btn')
let counter = 0
btn.addEventListener('click', function () {
  // the chat window.
  var chat = document.createElement('div')
  chat.id = 'chat' + counter.toString()

  chat.classList.add('chatStyle')
  chat.draggable = 'true'

  // btn for clearing chat.
  var btnClear = document.createElement('input')
  btnClear.id = 'btnClear'
  btnClear.type = 'button'
  btnClear.value = 'ClearChat'
  chat.append(btnClear)

  btnClear.addEventListener('click', function () {
    out.innerHTML = ''
  })

  // x button for closing.
  var x = document.createElement('button')
  x.id = 'x'
  x.innerHTML = 'X'
  x.type = 'button'
  x.className = 'x'
  chat.appendChild(x)

  // output area.
  var out = document.createElement('div')
  out.id = 'out'
  chat.appendChild(out)

  // bottom of chat (for styyling).
  var bottomOfChat = document.createElement('div')
  bottomOfChat.id = 'bottomOfChat'

  // send button
  var btnSend = document.createElement('input')
  btnSend.id = 'btnSend'
  btnSend.type = 'button'
  btnSend.value = 'Send'

  // input for writing your messages.
  var chatInput = document.createElement('input')
  chatInput.id = 'chatInput'
  chatInput.type = 'text'
  chatInput.placeholder = 'Write your message !'

  bottomOfChat.appendChild(chatInput)
  bottomOfChat.appendChild(btnSend)

  chat.appendChild(bottomOfChat)

  Chat.run(out, chatInput, btnSend)
  chat.style.left = '400px'
  chat.style.top = '100px'
  Drop.main(chat, x)
  counter++
  document.body.appendChild(chat)
})
