import axiosClient from './axiosClient';

const AddToCart = payload => axiosClient.post('/carts', payload);

const getUserCartItem = email =>
  axiosClient.get(
    `carts?populate[products][populate]=banner&filters[email][$eq]=${email}`
  );

const deleteCartItem = documentId => {
  return axiosClient.delete(`/carts/${documentId}`);
};

export default {
  AddToCart,
  getUserCartItem,
  deleteCartItem,
};
