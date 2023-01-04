
// get login page
function getInbox(req,res,next) {
    console.log(process.env.APP_NAME)

    res.render("inbox");    

}

module.exports = {
    getInbox
}