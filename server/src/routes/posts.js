const express = require('express');
const router = express.Router(); 
const { getPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/postController');

// Mock authentication middleware
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Basic mock decoding: expect "fake-jwt-token-for-USERID"
      const parts = token.split('-');
      const userId = parts[parts.length - 1]; 
      
      if (!userId) throw new Error('Invalid token');

      req.user = { _id: userId }; // Mock the user object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Define routes using the router object
router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;