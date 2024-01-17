const { Router } = require('express');
const validate = require('../../middlewares/vaildate');
const brandValidation = require('../../validation/brand');
const brandController = require('../../controllers/brand');

const router = Router();
router
  .get('/:id', brandController.getBrand)
  .get('/', brandController.getBrands)
  .delete(
    '/:id',
    validate(brandValidation.deleteBrand),
    brandController.deleteBrand
  )
  .delete('/', brandController.deleteBrand)
  .post(
    '/',
    // validate(brandValidation.createBrand),
    brandController.createBrand
  );

module.exports = router;
