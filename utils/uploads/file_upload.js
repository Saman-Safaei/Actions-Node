const multer = require("multer");
const fileMimetypes = ["image/jpg", "image/jpeg", "image/png"];

const storage = multer.diskStorage({
    destination: "files/",
    filename: (req, file, cb) => {
        const currentDate = new Date('fa-IR');
        const dateString = currentDate.getFullYear() + "_" 
            + (currentDate.getMonth() + 1) + "_" 
            + (currentDate.getDay() + 1) + "_" 
            + (currentDate.getHours()) + currentDate.getMinutes() + currentDate.getSeconds();
        
        const filename = file.originalname.replace(/[^A-Za-z.]/g, "_") + dateString;
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