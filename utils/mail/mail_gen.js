module.exports = (user, hash) => {
  return "<h1>Actions</h1>" + 
    `<p>Welcome to our service dear ${user}.</p>` +
    `<a href='${"https://api-actions-node.herokuapp.com/auth/?t=" + hash}'>Verify Your Email</a>`;
}
