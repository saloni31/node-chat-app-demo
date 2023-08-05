const messageBox = document.querySelector("#messages");
const textBox = document.querySelector("input");
const sendButton = document.querySelector("button");
// const room = new Room();
  

function createMessage(text, ownMessage = false) {
  const messageElement = document.createElement("div");
  messageElement.className = "chat-message";
  const subMesssageElement = document.createElement("div");
  subMesssageElement.className =
    "px-4 py-4 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
  if (ownMessage) {
    subMesssageElement.className += " float-right bg-blue-800 text-white";
  }
  subMesssageElement.innerText = text;
  messageElement.appendChild(subMesssageElement);

  messageBox.appendChild(messageElement);
}

const socket = io();

socket.on("connection", (socket) => {
  console.log(socket.id);
});

socket.on("receive-message", (message) => {
  createMessage(message);
});

sendButton.addEventListener("click", () => {
  blogPost = {
    "title": "question about",
    "mentor_id": "64b6c086a50dc7576750192a",
    "blog_id": "64b6cace38329073bcf5d8e8",
    "_id": "64b967691144a03a843750e3",
    "replies": [],
    "__v": 0
  }
  socket.emit('createThread',blogPost)
  // if (textBox.value != "") {
  //   socket.emit("send-message", textBox.value);
  //   createMessage(textBox.value, true);
  //   textBox.value = "";
  // }
});
