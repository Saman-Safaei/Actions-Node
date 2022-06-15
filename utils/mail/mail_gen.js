module.exports = (user, hash) => {
  return "<h1>Actions</h1>" + 
    `<p>Welcome to our service dear ${user}.</p>` +
    `<a href='${"http://localhost:3030/auth/?t=" + hash}'>Verify Your Email</a>`;
}
