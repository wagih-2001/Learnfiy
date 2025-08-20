const { default: axiosClient } = require('./axiosClient');

const getLatestProduct = () => axiosClient.get('/products?populate=*');

const getProductById = id =>
  axiosClient.get(`/products?filters[documentId][$eq]=${id}&populate=*`);

const getProductByCategory = category =>
  axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

export default {
  getLatestProduct,
  getProductById,
  getProductByCategory
};



