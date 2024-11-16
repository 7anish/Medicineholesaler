const multer = require('multer')
const path  =  require('path');



const Storage = multer.diskStorage({
    destination : function(req,file , cb){
        cb(null , './public');
    },
    filename : function(req,file , cb){
        const ext = path.extname(file.originalname)
        cb(null , `${Date.now()}${ext}`);
    }
})

const upload =  multer({ storage : Storage })

module.exports = {
    upload
}