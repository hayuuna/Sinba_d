const { Router } = require('express');
const validate = require('../../middlewares/vaildate');
// const brandValidation = require("../../validation/brand");
const imageController = require('../../controllers/image');

const multer = require('multer');
const upload = multer();

const router = Router();
router.post('/', upload.any(), imageController.addImages);
router.delete('/', imageController.deleteImages);

module.exports = router;
