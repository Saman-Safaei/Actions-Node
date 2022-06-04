const { createApp } = require("./server");

createApp().catch(() => {
    console.log("an error occured !");
});