import User from "../models/UserModel.js";
import Message from "../models/MessageModel.js";
import mongoose from "mongoose";

export const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).send("searchTerm is required.");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [{ displayName: regex },{ email: regex }],
        },
      ],
    });

    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error"); 
  }
};

export const getContactsForDMList = async (req, res) => {
    try {
        let { userId } = req;
        userId = new mongoose.Types.ObjectId(userId);

        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }],
                },
            },
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender",
                        },
                    },
                    lastMessageTime: { $first: "$timestamp" },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo",
                },
            },
            { $unwind: "$contactInfo" },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    displayName: "$contactInfo.displayName",
                    profilePic: "$contactInfo.profilePic",
                },
            },
            { $sort: { lastMessageTime: -1 } },
        ]);

        return res.status(200).json({ contacts });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};


export const getAllContacts = async (req, res) => {
    try {
        const users = await User.find(
            {
                _id: { $ne: req.userId },
            },
            "displayName _id email"
        );

        const contacts = users.map((user) => ({
            label: user.displayName ? `${user.displayName}` : user.email,
            value: user._id,
        }));

        return res.status(200).json({ contacts });
    } catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error");
    }
};
