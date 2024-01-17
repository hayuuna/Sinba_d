const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("i am category");
  res.json({ brand: "nike" });
});

module.exports = router;
