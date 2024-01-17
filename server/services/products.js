const { Product, Image } = require('../models');

const catchAsync = require('../utils/catchAsync');

const getProductById = async (product_id) => {
  const product = await Product.findOne({ _id: product_id });

  return product;
};
const getProducts = async (page, category_id) => {
  const perPage = 30;
  let query = {};
  if (category_id !== undefined) {
    query = {
      category_id: { $in: category_id },
    };
  }
  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(perPage * (page - 1))
    .limit(perPage);
  return { products, total, currentPage: page };
};

const createProduct = async (body) => {
  const product = new Product({
    ...body,
  });

  const result = await product.save();

  return result;
};

const patchProduct = async (product, body) => {
  const result = await product.updateOne({ $set: body });
  return result;
};

const deleteProduct = async (product_id) => {
  const result = await Product.deleteOne({ _id: product_id });
  return result;
};

const addMainImagesToProduct = async (product, images) => {
  product.main_images = [...product.main_images, ...images];
  const result = await product.save();
  return result;
};

const addDetailImagesToProduct = async (product, images) => {
  product.detail_images = [...product.detail_images, ...images];
  const result = await product.save();
  return result;
};

const deleteMainImagesToProduct = async (product, images) => {
  let result = [];
  product.main_images = product.main_images.filter((item) => {
    return !images.includes(item.image_id);
  });
  let result_product = await product.save();

  for (let img of images) {
    let iresult = await Image.deleteOne({ image_id: img });
    result.push(iresult);
  }

  return result_product;
};
const deleteDetailImagesToProduct = async (product, images) => {
  let result = [];
  product.detail_images = product.detail_images.filter((item) => {
    return !images.includes(item.image_id);
  });
  let result_product = await product.save();

  for (let img of images) {
    let iresult = await Image.deleteOne({ image_id: img });
    result.push(iresult);
  }

  return result_product;
};

const deleteAllMainImagesToProduct = async (product) => {
  for (let img of product.main_images) {
    let iresult = await Image.deleteOne({ image_id: img.image_id });
  }

  product.main_images = [];
  const result = await product.save();

  return result;
};
const deleteAllDetailImagesToProduct = async (product) => {
  for (let img of product.detail_images) {
    let iresult = await Image.deleteOne({ image_id: img.image_id });
  }

  product.detail_images = [];
  const result = await product.save();

  return result;
};

module.exports = {
  getProductById,
  createProduct,
  patchProduct,
  getProducts,
  deleteProduct,
  addMainImagesToProduct,
  addDetailImagesToProduct,
  deleteMainImagesToProduct,
  deleteDetailImagesToProduct,
  deleteAllMainImagesToProduct,
  deleteAllDetailImagesToProduct,
};
