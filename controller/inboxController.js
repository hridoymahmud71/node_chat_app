// external imports
const createError = require("http-errors");

// internal imports
const escape = require("../utilities/escape");
const User = require("../models/People");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// get inbox page
async function getInbox(req, res, next) {
  try {
    const conversations = await Conversation.find({
      $or: [
        { "creator.id": req.user.userid },
        { "participant.id": req.user.userid },
      ],
    });

    console.log(conversations);

    res.locals.data = conversations;

    // res.status(200).json(res.locals.data);
    res.render("inbox");
  } catch (err) {
    next(err);
  }
  res.render("inbox");
}

async function search(req, res, next) {
  const query = req.body.query;
  const searchQuery = query.replace("+88", "");

  const name_regex = new RegExp(escape(searchQuery), "i");
  const mobile_regex = new RegExp("^" + escape("+88" + searchQuery));
  const email_regex = new RegExp("^" + escape(searchQuery) + "$", "i");

  try {
    if (searchQuery === "") {
      throw createError("Nothing to search !");
      return;
    }

    const users = await User.find(
      {
        $and: [
          {
            $not: [{ _id: req.user.userid }],

            $or: [
              {
                name: name_regex,
              },
              {
                mobile: mobile_regex,
              },
              {
                email: email_regex,
              },
            ],
          },
        ],
      },
      "name avatar"
    );

    // response with user list
    res.json(users);
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

async function addConversation(req, res, next) {
  // console.log("\n------------------------\n",req.user,req.body,"\n------------------------\n");
  try {
    const newConversation = new Conversation({
      creator: {
        id: req.user.userid,
        name: req.user.username,
        avatar: req.user.avatar || null,
      },
      participant: {
        id: req.body.id,
        name: req.body.participant_name,
        avatar: req.body.avatar || null,
      },
    });

    const result = await newConversation.save();
    res.status(200).json({
      message: "Conversation added !",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// get messages of a conversation
async function getMessages(req, res, next) {
  try {
    const messages = await Message.find({
      conversation_id: req.params.conversation_id,
    }).sort("-createdAt"); // latest first

    const { participant } = await Conversation.findById(
      req.params.conversation_id
    );

    res.status(200).json({
      data: {
        messages: messages,
        participant,
      },
      user: req.user.userid,
      conversation_id: req.params.conversation_id,
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknows error occured!",
        },
      },
    });
  }
}

async function sendMessage(req, res, next) {
  if (!(req.body.message || (req.files && req.files.length > 0))) {
    res.status(500).json({
      errors: {
        common: "message text or attachment is required!",
      },
    });
    return;
  }

  try {
    // 1. prepare attachment queue
    let attachments = null;

    if (req.files && req.files.length > 0) {
      attachments = [];

      req.files.forEach((file) => {
        attachments.push(file.filename);
      });
    }

    // 2. Store a sent message
    const newMessage = new Message({
      text: req.body.message,
      attachment: attachments,
      sender: {
        id: req.user.userid,
        name: req.user.username,
        avatar: req.user.avatar || null,
      },
      receiver: {
        id: req.body.receiverId,
        name: req.body.receiverName,
        avatar: req.body.avatar || null,
      },
      conversation_id: req.body.conversationId,
    });

    const result = await newMessage.save();

    // 3. emit message by socket @TODO

    // 4. send final response
    res.status(200).json({
        message: "Successful!",
        data: result,
      });

  } catch (err) {
    res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
  }
}

module.exports = {
  getInbox,
  search,
  addConversation,
  getMessages,
  sendMessage,
};
