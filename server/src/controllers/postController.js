const Post = require('../models/Post');

// GET /api/posts
const getPosts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = {};
    if (category) query.category = category;

    const posts = await Post.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/posts
const createPost = async (req, res) => {
  try {
    const { title, content, category, slug } = req.body;
    // Basic validation
    if (!title || !content) return res.status(400).json({ error: 'Title and content required' });

    const post = await Post.create({
      title,
      content,
      category,
      slug,
      author: req.user._id // Assumes auth middleware sets req.user
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/posts/:id
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: 'Post not found' });
  }
};

// PUT /api/posts/:id
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' }); // Posts test expects 401 usually, but 403 is more correct
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, createPost, getPost, updatePost, deletePost };