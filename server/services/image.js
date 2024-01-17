const { Image } = require("../models");
const mongoose = require("mongoose");
const path = require("path");
const { nanoid } = require("nanoid");
const axios = require("axios");

const config = require("../config/config");

const IMAGE_PORT = config.image_server.primary.port;
const IMAGE_HOST = `${config.image_server.primary.location}:${IMAGE_PORT}`;

const addImages = async (files) => {
  const sendingFiles = [];

  for (let file of files) {
    let newItem = {
      ...file,
    };
    let buff = file.buffer;
    let base64buffer = buff.toString("base64");
    let ext = path.extname(file.originalname);
    newItem["buffer"] = base64buffer;
    newItem["id"] = nanoid();
    newItem["ext"] = ext;

    sendingFiles.push(newItem);
  }

  const up = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: { files: sendingFiles },
    url: `${IMAGE_HOST}/sinbad_images`,
  });

  const result = [];
  for (let item of up.data.result) {
    let img = new Image();
    img.image_id = item.image_id;
    img.url = item.url;
    img.size = item.size;
    let img_result = await img.save();
    result.push(img_result);
  }

  return result;
};

const deleteImages = async (files) => {
  const up = await axios({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: { files: files },
    url: `${IMAGE_HOST}/sinbad_images`,
  });

  return up.data;
};

module.exports = {
  addImages,
  deleteImages,
};
