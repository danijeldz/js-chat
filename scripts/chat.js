// add new chat documents
// setting up real-time listener for new chat messages
// updating the username
// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room
    this.username = username
    this.chats = db.collection("chats")
  }
  async addChat(message) {
    const now = new Date()
    // create object with chat data
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    }
    // save the chat document
    const response = await this.chats.add(chat)
    return response
  }
}

const chatroom = new Chatroom("gaming", "ryu")
console.log(chatroom)

chatroom
  .addChat("greetings from Mars")
  .then(() => console.log("message stored"))
  .catch((err) => console.log(err))
