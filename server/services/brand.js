const { Brand } = require('../models');
const mongoose = require('mongoose');

const getBrand = async (_id) => {
  const brand = await Brand.findOne({ _id });
  return brand;
};
const getBrands = async () => {
  const brands = await Brand.find({});
  return brands;
};

const createBrand = async (brand_name) => {
  const brand = new Brand({
    name: brand_name,
  });
  const result = await brand.save();
  return result;
};

const deleteBrand = async (_id) => {
  const result = await Brand.deleteOne({ _id });
  return result;
};

const deleteAllBrands = async () => {
  const result = await Brand.deleteMany({});
  return result;
};

module.exports = {
  getBrand,
  getBrands,
  createBrand,
  deleteBrand,
  deleteAllBrands,
};
