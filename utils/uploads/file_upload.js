const multer = require("multer");
const fileMimetypes = ["image/jpg", "image/jpeg", "image/png"];

const storage = multer.diskStorage({
    destination: "files/",
    filename: (req, file, cb) => {
        const currentDate = new Date();
        const dateString = currentDate.getFullYear() + "_" 
            + (currentDate.getMonth() + 1) + "_" 
            + (currentDate.getDay() + 1) + "_" 
            + (currentDate.getHours()) + currentDate.getMinutes() + currentDate.getSeconds();
        const fileExtension = file.originalname.split(".").pop();
        
        const filename = file.originalname.replace(/[^A-Za-z1-9]/g, "_") + dateString + "." + fileExtension;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (fileMimetypes.includes(file.mimetype))
            return cb(null, true);
        else
            return cb(null, false);
    }
});

module.exports = upload;