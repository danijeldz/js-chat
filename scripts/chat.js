class Chatroom {
  constructor(room, username) {
    this.room = room
    this.username = username
    this.chats = db.collection("chats")
    this.unsub
  }
  async addChat(message) {
    const now = new Date()
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    }
    const response = await this.chats.add(chat)
    return response
  }
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data())
          }
        })
      })
  }
  updateName(name) {
    this.username = name
    window.localStorage.setItem("username", name)
  }
  updateRoom(room) {
    this.room = room
    console.log("room updated")
    if (this.unsub) {
      this.unsub()
    }
  }
}

// Testing the class Chatroom
// const chatroom = new Chatroom("general", "ryu")

// chatroom.getChats((data) => {
//   console.log(data)
// })

// setTimeout(() => {
//   chatroom.updateRoom("general")
//   chatroom.updateName("Yoshi")
//   chatroom.getChats((data) => console.log(data))
//   chatroom.addChat("Yaba daba dooooo!")
// })
