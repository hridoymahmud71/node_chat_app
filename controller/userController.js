
// get users page
function getUsers(req,res,next) {
    console.log(process.env.APP_NAME)

    res.render("users");    

}

module.exports = {
    getUsers
}