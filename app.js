const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const path = require("path");
const {addUser} = require("./public/room");
require('./db/connection');
const blogModel = require("./public/models/blogModel")
const blogPostModel = require("./public/models/BlogPostModel")



const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const io = socketIO(server);

// const room = new Room();

const router = express.Router();

app.use(express.json())
  

server.on("error", (err) => {
  console.log("Error opening server");
});

io.on("connection", (socket) => {
  console.log('User connected with '+socket.id);

  socket.on("createThread", ({blogPost,message}) => {
    console.log('create thread for '+ blogPost.blog_id+ ' And '+ blogPost._id);
    addUser(blogPost._id,blogPost.mentor_id,message)
    socket.broadcast.emit('createThread' , {blogPost,message});
    // room.joinRoom(blogPost.blog_id,blogPost._id)
    
  });

  socket.on("addReply",({userId,blogPostId,message}) => {
    console.log('Add Reply for '+ userId + ' And '+ blogPostId);
    addUser(blogPostId,userId,message)
    socket.broadcast.emit('addReply' , {userId,blogPostId,message});
  })

// users = [
//   blog_post_id => {
//     userId,
//     message
//   }
// ]


/*
1. API call to save data into db.
2. client will emit our event
3. add all details in users array
4. broadcast clients event to manage display level on front.
*/
});

app.use(router)
app.post('/api/v1/blog',async (req,res,next)=>{
  try{
    console.log(req.body)
    const blog = await blogModel.create(req.body);
    if(!blog){
      res.send(500,{
        'statusCode' : "Internal server error",
      })
    }
    res.send(201,{
      'statusCode' : "success",
      blog
    })
  }catch(error){
    console.log(error)
  }
  
})

app.post('/api/v1/createThread',async(req,res) => {
  try{
    const blogPost = await blogPostModel.create(req.body);
    if(!blogPost){
      res.send(500,{
        'statusCode' : "Internal server error",
      })
    }

    console.log(blogPost)
    io.sockets.emit('createThread',blogPost)

    
    res.send(201,{
      'statusCode' : "success",
      blogPost
    })
  }catch(error){
    console.log(error)
  }
})



server.listen(8001, () => {
  console.log("Server working on port 8001");
});
