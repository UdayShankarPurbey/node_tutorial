const products = require('../data/product');

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find((item) => item.id === id),
  },

  Mutation: {
    createProduct: (_, { title, category, price, inStock }) => {
      const newProduct = {
        id: `${products.length + 1}`,
        title,
        category,
        price,
        inStock,
      };
      products.push(newProduct);
      return newProduct;
    },
    deleteProduct: (_, { id }) => {
      const index = products.findIndex((item) => item.id == id);
      if (index === -1) return false;
      products.splice(index, 1);
      return true;
    },
    updateProduct: (_, { id, ...updates }) => {
      const index = products.findIndex((item) => item.id == id);
      if (index === -1) return null;
      const updateProduct = {
        ...products[index],
        ...updates,
      };

      products[index] = updateProduct;
      return updateProduct;
    },
  },
};

module.exports = resolvers;
