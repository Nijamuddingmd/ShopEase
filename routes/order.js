const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authMiddleware } = require('./auth');

const router = express.Router();

// Create order from cart
router.post('/', authMiddleware, async (req, res) => {
  const { shippingInfo } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    // Calculate total price
    const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    // Prepare order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
    }));
    // Create order
    const order = new Order({
      user: req.user.userId,
      orderItems,
      shippingInfo,
      totalPrice,
    });
    await order.save();
    // Clear cart
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user's orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('orderItems.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: get all orders
router.get('/all', authMiddleware, (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}, async (req, res) => {
  try {
    const orders = await Order.find().populate('orderItems.product user');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 