// const { v4: uuidv4 } = require("uuid");
// const ROOM_MAX_CAPACITY = 2;

// class Room {
//   constructor() {
//     this.roomsState = [];
//   }

//   // joinRoom(blogId,blogPostId) {
//   //   return new Promise((resolve) => {
//   //     console.log('in join Room')
//   //     let state = {
//   //       blogId,
//   //       blogPostId
//   //     };

//   //     this.roomsState.push(state);
//   //     return resolve(state);
//   //   });
//   // }

//   leaveRoom(id) {
//     this.roomsState = this.roomsState.filter((room) => {
//       if (room.id === id) {
//         if (room.users === 1) {
//           return false;
//         } else {
//           room.users--;
//         }
//       }
//       return true;
//     });
//   }
// }

// module.exports = Room;

module.exports.addUser = (blogPostId,userId,message) => {
  const isUserExist = users.find(user => user.userId === userId);
  if (!isUserExist) {
      const user = { blogPostId,userId, message};
      users.push(user);
      // io.emit('getUsers', users);
  }
}