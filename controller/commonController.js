
async function unauthorized(req,res,next) {

    res.render("unauthorized");
    
}
async function nomatch(req,res,next) {
    res.render("nomatch");
}

module.exports = {
    unauthorized,
    nomatch
}