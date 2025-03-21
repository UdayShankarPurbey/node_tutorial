const Product = require("../models/product");

const insertSampleProduct = async (req, res) => {
  try {
    const product = [
      {
        name: "Wireless Headphones",
        price: 59.99,
        category: "Electronics",
        instock: true,
        tags: ["wireless", "headphones", "bluetooth"],
      },
      {
        name: "Bluetooth Speaker",
        price: 45.0,
        category: "Electronics",
        instock: true,
        tags: ["bluetooth", "portable", "speaker"],
      },
      {
        name: "Smart Watch",
        price: 129.99,
        category: "Wearables",
        instock: false,
        tags: ["fitness", "smartwatch", "wearable"],
      },
      {
        name: "Laptop Stand",
        price: 29.99,
        category: "Accessories",
        instock: true,
        tags: ["ergonomic", "laptop", "stand"],
      },
      {
        name: "Gaming Mouse",
        price: 45.5,
        category: "Accessories",
        instock: true,
        tags: ["gaming", "mouse", "RGB"],
      },
      {
        name: "4K LED TV",
        price: 799.0,
        category: "Electronics",
        instock: false,
        tags: ["4k", "tv", "smart"],
      },
      {
        name: "Bluetooth Earbuds",
        price: 59.99,
        category: "Electronics",
        instock: true,
        tags: ["earbuds", "bluetooth", "wireless"],
      },
      {
        name: "Coffee Maker",
        price: 89.99,
        category: "Home Appliances",
        instock: true,
        tags: ["coffee", "maker", "kitchen"],
      },
      {
        name: "Air Fryer",
        price: 120.0,
        category: "Home Appliances",
        instock: true,
        tags: ["air fryer", "kitchen", "appliance"],
      },
      {
        name: "Electric Toothbrush",
        price: 69.99,
        category: "Health & Beauty",
        instock: true,
        tags: ["toothbrush", "electric", "health"],
      },
      {
        name: "Portable Charger",
        price: 25.0,
        category: "Electronics",
        instock: true,
        tags: ["charger", "portable", "power bank"],
      },
      {
        name: "Electric Kettle",
        price: 39.99,
        category: "Home Appliances",
        instock: true,
        tags: ["kettle", "electric", "kitchen"],
      },
      {
        name: "LED Desk Lamp",
        price: 34.99,
        category: "Home Decor",
        instock: false,
        tags: ["desk", "lamp", "LED"],
      },
      {
        name: "Smartphone",
        price: 599.99,
        category: "Electronics",
        instock: true,
        tags: ["smartphone", "android", "mobile"],
      },
      {
        name: "Fitness Tracker",
        price: 49.99,
        category: "Wearables",
        instock: true,
        tags: ["fitness", "tracker", "wearable"],
      },
      {
        name: "Robot Vacuum",
        price: 299.99,
        category: "Home Appliances",
        instock: true,
        tags: ["vacuum", "robot", "cleaner"],
      },
      {
        name: "Portable Blender",
        price: 35.0,
        category: "Home Appliances",
        instock: true,
        tags: ["blender", "portable", "kitchen"],
      },
      {
        name: "Noise Cancelling Headphones",
        price: 149.99,
        category: "Electronics",
        instock: true,
        tags: ["headphones", "noise cancelling", "audio"],
      },
      {
        name: "Action Camera",
        price: 79.99,
        category: "Electronics",
        instock: false,
        tags: ["camera", "action", "sports"],
      },
      {
        name: "Smart Thermostat",
        price: 199.0,
        category: "Home Appliances",
        instock: true,
        tags: ["thermostat", "smart", "home"],
      },
      {
        name: "Vacuum Sealer",
        price: 49.99,
        category: "Home Appliances",
        instock: true,
        tags: ["vacuum", "sealer", "kitchen"],
      },
      {
        name: "Electric Griddle",
        price: 59.99,
        category: "Home Appliances",
        instock: true,
        tags: ["griddle", "electric", "cooking"],
      },
      {
        name: "Outdoor Speaker",
        price: 89.99,
        category: "Electronics",
        instock: true,
        tags: ["outdoor", "speaker", "bluetooth"],
      },
      {
        name: "Mini Projector",
        price: 199.99,
        category: "Electronics",
        instock: true,
        tags: ["projector", "mini", "portable"],
      },
      {
        name: "Game Console",
        price: 399.99,
        category: "Electronics",
        instock: false,
        tags: ["gaming", "console", "video"],
      },
      {
        name: "E-Book Reader",
        price: 129.99,
        category: "Electronics",
        instock: true,
        tags: ["ebook", "reader", "tablet"],
      },
      {
        name: "Smart Light Bulb",
        price: 19.99,
        category: "Home Decor",
        instock: true,
        tags: ["light", "smart", "bulb"],
      },
      {
        name: "Digital Camera",
        price: 399.99,
        category: "Electronics",
        instock: true,
        tags: ["camera", "digital", "photography"],
      },
      {
        name: "Laptop",
        price: 799.0,
        category: "Electronics",
        instock: true,
        tags: ["laptop", "computer", "electronics"],
      },
      {
        name: "Fitness Dumbbells",
        price: 25.99,
        category: "Sports & Outdoors",
        instock: true,
        tags: ["fitness", "dumbbells", "workout"],
      },
      {
        name: "Home Theater System",
        price: 499.99,
        category: "Electronics",
        instock: true,
        tags: ["home theater", "audio", "speakers"],
      },
      {
        name: "Smart Speaker",
        price: 99.99,
        category: "Electronics",
        instock: true,
        tags: ["smart", "speaker", "voice assistant"],
      },
      {
        name: "Portable Air Conditioner",
        price: 249.99,
        category: "Home Appliances",
        instock: true,
        tags: ["air conditioner", "portable", "cooling"],
      },
      {
        name: "Camera Drone",
        price: 599.99,
        category: "Electronics",
        instock: false,
        tags: ["drone", "camera", "aerial"],
      },
      {
        name: "Soundbar",
        price: 199.99,
        category: "Electronics",
        instock: true,
        tags: ["soundbar", "audio", "home theater"],
      },
      {
        name: "Portable Solar Charger",
        price: 39.99,
        category: "Outdoor Gear",
        instock: true,
        tags: ["solar", "charger", "outdoor"],
      },
      {
        name: "Electric Skateboard",
        price: 399.99,
        category: "Sports & Outdoors",
        instock: true,
        tags: ["electric", "skateboard", "sports"],
      },
      {
        name: "Gaming Chair",
        price: 129.99,
        category: "Furniture",
        instock: true,
        tags: ["gaming", "chair", "comfortable"],
      },
      {
        name: "Treadmill",
        price: 299.99,
        category: "Sports & Outdoors",
        instock: true,
        tags: ["treadmill", "fitness", "exercise"],
      },
      {
        name: "Adjustable Dumbbells",
        price: 159.99,
        category: "Sports & Outdoors",
        instock: true,
        tags: ["dumbbells", "adjustable", "fitness"],
      },
      {
        name: "Dehumidifier",
        price: 99.99,
        category: "Home Appliances",
        instock: true,
        tags: ["dehumidifier", "appliance", "air"],
      },
      {
        name: "Electric Heater",
        price: 69.99,
        category: "Home Appliances",
        instock: true,
        tags: ["electric", "heater", "home"],
      },
      {
        name: "Water Purifier",
        price: 129.99,
        category: "Home Appliances",
        instock: true,
        tags: ["water", "purifier", "clean"],
      },
      {
        name: "Cordless Drill",
        price: 59.99,
        category: "Tools",
        instock: true,
        tags: ["cordless", "drill", "tool"],
      },
      {
        name: "Smart Lock",
        price: 199.99,
        category: "Home Security",
        instock: true,
        tags: ["smart", "lock", "security"],
      },
      {
        name: "Instant Pot",
        price: 99.99,
        category: "Home Appliances",
        instock: true,
        tags: ["instant pot", "cooking", "kitchen"],
      },
      {
        name: "UV Sanitizer Box",
        price: 45.0,
        category: "Health & Beauty",
        instock: true,
        tags: ["UV", "sanitizer", "box"],
      },
      {
        name: "Electric Grill",
        price: 79.99,
        category: "Home Appliances",
        instock: true,
        tags: ["grill", "electric", "kitchen"],
      },
      {
        name: "Electric Blanket",
        price: 59.99,
        category: "Home Appliances",
        instock: true,
        tags: ["blanket", "electric", "cozy"],
      },
      {
        name: "Smart Refrigerator",
        price: 1499.99,
        category: "Home Appliances",
        instock: true,
        tags: ["smart", "refrigerator", "home"],
      },
      {
        name: "Hair Dryer",
        price: 39.99,
        category: "Health & Beauty",
        instock: true,
        tags: ["hair dryer", "beauty", "hair care"],
      },
      {
        name: "Blender",
        price: 29.99,
        category: "Home Appliances",
        instock: true,
        tags: ["blender", "kitchen", "appliance"],
      },
    ];

    const sampleProduct = await Product.insertMany(product);

    res
      .status(201)
      .json({
        success: true,
        message: `Sample ${sampleProduct.length} product inserted successfully`,
      });
  } catch (error) {
    console.log("Error inserting sample product : ", error);
    res
      .status(500)
      .json({ success: false, message: "Error inserting sample product" });
  }
};

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          instock: true,
          price: { $gte: 100 },
        },
      },
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: `Product stats ${result.length} retrieved successfully`,
      data: result,
    });
  } catch (error) {
    console.log("Error getting product stats : ", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting product stats" });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          avgPrice: {
            $avg: "$price",
          },
          maxPrice: {
            $max: "$price",
          },
          minPrice: {
            $min: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          avgPrice: 1,
          maxPrice: 1,
          minPrice: 1,
          priceRange: {
            $subtract: ["$maxPrice", "$minPrice"],
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: `Product analysis ${result.length} retrieved successfully`,
      data: result,
    });
  } catch (error) {
    console.log("Error getting product analysis : ", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting product analysis" });
  }
};

module.exports = {
  insertSampleProduct,
  getProductStats,
  getProductAnalysis,
};
