import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessageModel.js";
import Group from "./models/GroupModel.js";

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
  console.log(`Client Disconnected: ${socket.id}`);
  for (const [userId, socketId] of userSocketMap.entries()) {
    if (socketId === socket.id) {
      userSocketMap.delete(userId);
      break;
    }
  }
};


const sendMessage = async (message) => {
  const senderSocketId = userSocketMap.get(message.sender);
  const recipientSocketId = userSocketMap.get(message.recipient);

  const createdMessage = await Message.create(message);

  const messageData = await Message.findById(createdMessage._id)
    .populate("sender", "id email displayName profilePic")
    .populate("recipient", "id email displayName profilePic");

  if (recipientSocketId) {
    io.to(recipientSocketId).emit("receiveMessage", messageData);
  }

  if (senderSocketId) {
    io.to(senderSocketId).emit("receiveMessage", messageData);
  }
};


// const sendGroupMessage = async (message) => {
// const {groupId, sender, content, messageType, fileUrl}= message;
// const createdMessage = await Message.create({
//   sender,
//   recipient: null,
//   content,
//   messageType,
//   timestamp: new Date(),
//   fileUrl,
// });

// const messageData = await Message.findById(createdMessage._id).populate("sender", "id email displayName profilePic").exec();

// await Group.findByIdAndUpdate(groupId,{
//   $push: {messages: createdMessage._id},
// });

// const group = await Group.findById(groupId).populate("members");

// const finalData = {...messageData._doc, groupId: group._id};

// if (group && group.members) {
//     group.members.forEach((member) => {
//         const memberSocketId = userSocketMap.get(member._id.toString());
//         if (memberSocketId) {
//             io.to(memberSocketId).emit("receiveGroupMessage", finalData);
//         }
//     });
//     const adminSocketId = userSocketMap.get(group.admin._id.toString());
//     if (adminSocketId) {
//         io.to(adminSocketId).emit("receiveGroupMessage", finalData);
//     }
// }};

//   io.on("connection", (socket) => {
//     const userId = socket.handshake.query.userId;

//     if (userId) {
//       userSocketMap.set(userId, socket.id);
//       console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
//     } else {
//       console.log("User ID not provided during connection.");
//     }

//     socket.on("sendMessage", sendMessage);
//     socket.on("sendGroupMessage", sendGroupMessage);
//     socket.on("disconnect", () => disconnect(socket));
//   });
// };

const sendGroupMessage = async (message) => {
    console.log("sendGroupMessage function called with message:", message);

    const { groupId, sender, content, messageType, fileUrl } = message;

    try {
        const createdMessage = await Message.create({
            sender,
            recipient: null,
            content,
            messageType,
            timestamp: new Date(),
            fileUrl,
        });

        console.log("Message created successfully:", createdMessage);

        const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email displayName profilePic")
            .exec();

        console.log("Message data after population:", messageData);

        await Group.findByIdAndUpdate(groupId, {
            $push: { messages: createdMessage._id },
        });

        console.log(`Group ${groupId} updated with new message ID:`, createdMessage._id);

        const group = await Group.findById(groupId).populate("members");

        console.log("Group data after population:", group);

        const finalData = { ...messageData._doc, groupId: group._id };

        if (group && group.members) {
            group.members.forEach((member) => {
                const memberSocketId = userSocketMap.get(member._id.toString());
                if (memberSocketId) {
                    console.log(`Emitting message to member ${member._id} with socket ID ${memberSocketId}`);
                    io.to(memberSocketId).emit("receiveGroupMessage", finalData);
                } else {
                    console.log(`No socket ID found for member ${member._id}, message not sent`);
                }
            });

            const adminSocketId = userSocketMap.get(group.admin._id.toString());
            if (adminSocketId) {
                console.log(`Emitting message to admin ${group.admin._id} with socket ID ${adminSocketId}`);
                io.to(adminSocketId).emit("receiveGroupMessage", finalData);
            } else {
                console.log(`No socket ID found for admin ${group.admin._id}, message not sent`);
            }
        }
    } catch (error) {
        console.error("Error in sendGroupMessage function:", error);
    }
};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
        userSocketMap.set(userId, socket.id);
        console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
        console.log("User ID not provided during connection.");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("sendGroupMessage", sendGroupMessage);
    socket.on("disconnect", () => disconnect(socket));
});
};

export default setupSocket;