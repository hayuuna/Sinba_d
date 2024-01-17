const path = require("path");
const express = require("express");
const { nanoid } = require("nanoid");
const multer = require("multer");
const fs = require("fs");
const config = require("./config/config");

const IMAGE_PATH = path.join("./images");
const PORT = config.image_server.primary.port;
const HOST = `${config.image_server.primary.location}:${PORT}`;

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "images/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, nanoid() + ext);
    },
  }),
});

const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.post("/sinbad_images", (req, res) => {
  const result = [];
  for (let img of req.body["files"]) {
    let buff = new Buffer.from(img["buffer"], "base64");
    delete img["buffer"];

    let filename = `${img["id"]}${img["ext"]}`;
    let filepath = `${IMAGE_PATH}/${filename}`;
    let url = `${HOST}/images/${filename}`;

    result.push({ image_id: img.id, url, size: img.size });
    fs.writeFileSync(filepath, buff);
  }
  res.json({ message: "Successfully uploaded files", result });
});

app.delete("/sinbad_images", (req, res) => {
  const result = [];
  for (let filename of req.body["files"]) {
    if (!filename) {
      continue;
    }
    let filepath = `./${IMAGE_PATH}/${filename}`;
    if (fs.existsSync(filepath)) {
      fs.rmSync(filepath);
      result.push(filename);
    }
  }
  res.json({ message: "Successfully deleted files", result });
});

app.listen(PORT, () => {});
