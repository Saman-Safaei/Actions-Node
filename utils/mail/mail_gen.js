module.exports = (user, hash) => {
  return "<h1>Actions</h1>" +
    `<p>Welcome to our service dear ${user}.</p>` +
    `<p>Copy this url to your browser or click to <a href='${process.env.ORIGIN}/auth/?t=${hash}'>this link</a> .</p>` +
    `<p><strong>${process.env.ORIGIN}/auth/?t=${hash}</strong></p>` ;
}
