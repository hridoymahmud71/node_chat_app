
// get login page
function getInbox(req,res,next) {
   
    res.render("inbox");    

}

async function search(req,res,next) {
    
}

module.exports = {
    getInbox,
    search
}