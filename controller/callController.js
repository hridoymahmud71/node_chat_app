

// get call page
async function callPage(req, res, next) {
  try {
    
    res.render("call",{
      conversationId:req.params.conversation_id
    });
  } catch (err) {
    
    next(err);
  }
}

module.exports = {
  callPage,
};
