import Message from "../models/MessageModel.js";
import { mkdirSync, renameSync } from "fs";

export const getMessages = async (req, res) => {
    try {
        const user1 = req.userId;
        const user2 = req.body.id;

        if (!user1 || !user2) {
            return res.status(400).send("Both user ID's are required.");
        }

        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 },
            ],
        }).sort({ timestamp: 1 });

        return res.status(200).json({ messages });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};


export const uploadFile = async (request, response, next) => {
    try {
        if (!request.file) {
            return response.status(400).send("File is required");
        }

        const date = Date.now();
        let fileDir = `uploads/files/${date}`;
        let fileName = `${fileDir}/${request.file.originalname}`;

        mkdirSync(fileDir, { recursive: true });

        renameSync(request.file.path, fileName);

        return response.status(200).json({ filePath: fileName });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};
