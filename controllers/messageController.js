const { createMessage, deleteMessage } = require('../models/messageModel');

exports.postMessage = async (req, res) => {
    try {
        const { title, text } = req.body;
        if (!req.user || !req.user.id) {
            return res.status(401).send("Not authenticated.");
        }
        console.log("the user id is: ")
        console.log(req.user.id);
        await createMessage({ title, text, authorId: req.user.id });
        res.redirect('/home');
    } catch (err) {
        console.error("Error in postMessage:", err);
        res.status(500).send("Error posting message.");
    }
};
  

exports.deleteMessage = async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).send("Not authorized.");
    }
    await deleteMessage(req.params.id);
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting message.");
  }
};
