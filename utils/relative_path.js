const path = require("path");

module.exports.relativePath = (...paths) => {
    const currentDir = path.resolve(path.dirname(require.main.filename));
    return path.join(currentDir, ...paths);
}
module.exports.path = path;