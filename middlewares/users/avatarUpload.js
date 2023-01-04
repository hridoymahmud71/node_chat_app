// imports 
const uploader = require("./../../utilities/singleUploader");

function avatarUpload(req,res,next) {

    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png","image/webp"],
        1000000,
        "Only .jpg, jpeg, .webp  or .png format allowed!"
      );

    //  call the middleware function 

    upload.any()(req,res,(err)=>{
        if (err) {
            res.status(500).json({
              errors: {
                avatar: {
                  msg: err.message,
                },
              },
            });
          } else {
            console.log("??")
            next();
          }
    });
}

module.exports = avatarUpload;