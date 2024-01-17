const { Router } = require('express');
const validate = require('../../middlewares/vaildate');
const productsValidation = require('../../validation/products');
const productsController = require('../../controllers/products');

const multer = require('multer');
const upload = multer();

const router = Router();
router
  .get(
    '/:id',
    validate(productsValidation.getProduct),
    productsController.getProduct
  )
  .get(
    '/',
    validate(productsValidation.getProducts),
    productsController.getProducts
  )
  .delete(
    '/:id',
    validate(productsValidation.deleteProduct),
    productsController.deleteProduct
  )
  .post(
    '/',
    validate(productsValidation.createProduct),
    productsController.createProduct
  )
  .post(
    '/:id/images/:image_type',
    upload.any(),
    validate(productsValidation.addImage),
    productsController.addImagesToProduct
  )
  .patch(
    '/:id',
    validate(productsValidation.patchProduct),
    productsController.patchProduct
  )
  .delete(
    '/:id/images/:image_type',
    validate(productsValidation.deleteImage),
    productsController.deleteImagesInProduct
  )
  .delete(
    '/:id/images/:image_type/all',
    validate(productsValidation.deleteImage),
    productsController.deleteAllImagesInProduct
  );
module.exports = router;
