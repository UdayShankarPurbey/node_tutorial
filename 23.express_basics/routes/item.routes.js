const express = require('express');
const { asyncHandler, ApiError } = require('../middlewares/errorHandler');

const router = express.Router();

const items = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Smartphone' },
  { id: 3, name: 'Wireless Headphones' },
  { id: 4, name: 'Smartwatch' },
  { id: 5, name: 'Bluetooth Speaker' },
  { id: 6, name: 'Gaming Console' },
  { id: 7, name: 'Tablet' },
  { id: 8, name: 'Digital Camera' },
  { id: 9, name: 'External Hard Drive' },
  { id: 10, name: '4K Monitor' },
];

router.get(
  '/items',
  asyncHandler(async (req, res) => {
    res.json(items);
  }),
);

router.post(
  '/item',
  asyncHandler(async (req, res) => {
    const { name } = req?.body;
    if (!name) {
      throw new ApiError('Item Name is Required', 400);
    }

    const newItem = {
      id: items.length + 1,
      name: name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
  }),
);

module.exports = router;
