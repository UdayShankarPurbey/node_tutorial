const NewProduct = require('../models/products');

const resolvers = {
  Query: {
    products: async () => await NewProduct.find({}),
    product: async (_, { id }) => await NewProduct.findById(id),
  },

  Mutation: {
    createProduct: async (_, { title, category, price, inStock }) => {
      const newProduct = await NewProduct.create({ title, category, price, inStock });
      return newProduct;
    },
    deleteProduct: async (_, { id }) => {
      const product = await NewProduct.findByIdAndDelete(id);
      if (!product) return false;
      return true;
    },
    updateProduct: async (_, { id, ...updates }) => {
      const product = await NewProduct.findByIdAndUpdate(id, updates, { new: true });
      if (!product) return null;
      return product;
    },
  },
};

module.exports = resolvers;
