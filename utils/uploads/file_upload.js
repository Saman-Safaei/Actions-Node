const multer = require("multer");
const fileMimetypes = ["image/jpg", "image/jpeg", "image/png"];

const storage = multer.diskStorage({
    destination: "files/",
    filename: (req, file, cb) => {
        const filename = file.originalname.replace(/\s/g, "_");
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