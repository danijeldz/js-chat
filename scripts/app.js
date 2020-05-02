// DOM QUERIES
const chatList = document.querySelector("ul.chat-list")
const newChatForm = document.querySelector(".new-chat")
const newNameForm = document.querySelector(".new-name")
const updateMssg = document.querySelector(".update-mssg")
const changeRoom = document.querySelector(".chat-rooms")

// Check localStorage for a name
const username = localStorage.username ? localStorage.username : "Anonymus"
// CLASS INSTANCES
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom("general", username)

// change Room
changeRoom.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const roomId = e.target.id
    chatUI.clear()
    chatroom.updateRoom(roomId)
    chatroom.getChats((chat) => chatUI.render(chat))
    console.log(chatroom.room)
  }
})

// add a new name
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault()
  // update the name via chatroom
  const newName = newNameForm.name.value.trim()
  chatroom.updateName(newName)
  // reset the form
  newNameForm.reset()
  // show confirmation message to user
  updateMssg.innerHTML = `<span class="success">Name updated successfuly to ${newName}</span>`
  setTimeout(() => (updateMssg.innerHTML = ""), 3000)
})

// add a new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = newChatForm.message.value.trim()
  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset()
    })
    .catch((err) => {
      console.log(err)
    })
})

// get the chats and render
chatroom.getChats((data) => chatUI.render(data))
