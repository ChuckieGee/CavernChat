const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;
const express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

// Connect to mongo
mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db){
    if(err) throw err;

    console.log('MongoDB connected...');

    // Connect to Socket.io
    client.on('connection', function(socket){
        let chat = db.collection('chats');
        let room = db.collection('rooms');
        const _id = socket.id

        // Create function to send  message status
        sendMsgStatus = function(s){
            socket.emit('msgStatus', s);
        }

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('msgOutput', res);
        });

        // Handle username input (Create messages)
        socket.on('nameInput', function(data){
            let name = data.name;

            //some quick validation check for a username
            if(name == ''){
                //send error status
                sendMsgStatus('Please enter a username')
            } else {
                client.emit('userJoined', [data])
            }
            
        });

        // Handle input events
        socket.on('msgInput', function(data){
            let name = data.name;
            let message = data.message;

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                socket.emit('Error');
                sendMsgStatus('Please enter a name and a message');
                console.log('enter a name and/or message.')
            } else {
                // Insert message
                chat.insert({name: name, message: message}, function(){
                    client.emit('msgOutput', [data]);

                    // Send status object
                    sendMsgStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }


        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected');
            console.log('Got disconnect!');
        });
        // Handle clear
        socket.on('msgClear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('msgCleared');
            });
        });

 //Handle rooms///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        room.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
        }

        socket.on('roomInput', function(data){
            let name = data.name;
    
            // Check for name and message
            if(name == ''){
                // Send error status
                sendRoomStatus('Please enter a name and message');
            } else {
                // Insert message
                room.insert({name: name}, function(){
                    client.emit('roomOutput', [data]);
    
                    // Send status object
                    sendRoomStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });
        socket.on('roomClear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('roomCleared');
            });
        });
        sendRoomStatus = function(s){
            socket.emit('roomStatus', s);
        }
            // Emit the messages
            socket.emit('roomOutput', res);
        });
    });

});

//Handle routing

//Define router and get HTTP requests
router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });
  
  router.get("/",function(req,res){
    res.sendFile(path + "index.html"); //send files to the web-browser
  });
  
  router.get("/about",function(req,res){
    res.sendFile(path + "about.html");
  });
  
  router.get("/friends",function(req,res){
    res.sendFile(path + "friends.html");
  });

  router.get("/contact",function(req,res){
    res.sendFile(path + "contact.html");
  });

  router.get("/basic_Chat",function(req,res){
    res.sendFile(path + "basic_Chat.html");
  });

  router.get("/rooms",function(req,res){
      res.sendFile(path + "rooms.html");
  });

  router.get("/info",function(req,res){
    res.sendFile(path + "info.html");
  });
  
  app.use("/",router);
  
  app.use("*",function(req,res){
    res.sendFile(path + "404.html");
  });
  
  app.listen(3000,function(){
    console.log("Live at Port 3000");
  });
  