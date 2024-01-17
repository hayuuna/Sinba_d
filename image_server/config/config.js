const dotenv = require("dotenv");
const yaml = require("js-yaml");
const { readFileSync } = require("fs");
const path = require("path");

dotenv.config();

const yaml_config_filename = process.env.APP_CONFIG_FILE;
let yaml_config = {};
try {
  const configs = yaml.load(
    readFileSync(path.resolve(__dirname, `../${yaml_config_filename}`), "utf8")
  );
  let result = {};
  if (process.env.NODE_MODE === "DEV") {
    result = configs.dev;
  } else if (process.env.NODE_MODE === "PROD") {
    result = configs.prod;
  } else {
    throw new Error("NODE_MODE 타입 에러!");
  }
  yaml_config = {
    env: process.env.NODE_MODE,
    ...result,
  };
} catch (err) {
  throw new Error(err);
}

module.exports = yaml_config;
