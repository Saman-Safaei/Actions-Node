const fs = require("fs");
const { relativePath } = require("../relative_path");

module.exports = function (filename) {
    const filepath = relativePath("files", filename);
    const isFileExists = fs.existsSync(filepath);
    let isFileRemoved = false;

    if (!isFileExists) return isFileRemoved;

    if (isFileExists) {
        fs.rm(filepath, (err) => {
            if (!err) isFileRemoved = true;
        });
    }

    return isFileRemoved;
}