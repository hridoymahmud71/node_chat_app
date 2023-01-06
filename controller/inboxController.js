
// external imports
const createError = require("http-errors");

// internal imports
const User = require("../models/People");
const Conversation = require("../models/Conversation");

// get inbox page
function getInbox(req,res,next) {
   
    res.render("inbox");    

}

async function search(req,res,next) {
    
}

async function addConversation(req,res,next) {
    
}

module.exports = {
    getInbox,
    search,
    addConversation
}